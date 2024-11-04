// App State
const state = {
  currentMode: 'movies',
  currentGenre: 'all',
  searchQuery: '',
};

// DOM Elements
const loadingContainer = document.getElementById('loading-container');
const contentGrid = document.getElementById('content-grid');
const searchInput = document.getElementById('search-input');
const navButtons = document.querySelectorAll('.nav-btn');
const genreFilter = document.getElementById('genre-filter');
const sectionTitle = document.getElementById('section-title');
const featuredContent = document.getElementById('featured-content');

const featuredMovies = [
  {
      id: 'thangalaan',
      image: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/thangalaan-et00343221-1711022603.jpg',
  },
  {
      id: 'nunakkuzhi',
      image: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/nunakuzhi-et00403448-1719990235.jpg',
  },
  {
      id: 'committee_kurrollu',
      image: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/committee-kurrollu-et00401906-1722407341.jpg',
  },
  {
      id: 'prakramam',
      image: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/parakramam-et00407023-1722835478.jpg',
  },
  {
      id: 'mr_bachchan',
      image: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/mr-bachchan-naam-tho-suna-hoga-et00380150-1702889526.jpg',
  }
];

// Initialize App
function initializeApp() {
  setupEventListeners();
  updateContent();
  setupFeaturedContent();
  setTimeout(() => {
      loadingContainer.style.display = 'none';
  }, 1500);
}

// Event Listeners Setup
function setupEventListeners() {
  navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
          navButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.currentMode = btn.dataset.type;
          updateContent();
      });
  });

  searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase();
      updateContent();
  });

  genreFilter.addEventListener('change', (e) => {
      state.currentGenre = e.target.value;
      updateContent();
  });
}

// Content Rendering
function updateContent() {
  const content = state.currentMode === 'movies' ? movieData.movies : movieData.webSeries;
  const filteredContent = content.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(state.searchQuery);
      const matchesGenre = state.currentGenre === 'all' || item.genre === state.currentGenre;
      return matchesSearch && matchesGenre;
  });

  sectionTitle.textContent = `${state.currentMode === 'movies' ? 'Popular Movies' : 'Popular Series'}`;
  renderContentGrid(filteredContent);
}

function renderContentGrid(items) {
  contentGrid.innerHTML = items.map(item => `
      <div class="content-card" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="card-image">
          <div class="card-info">
              <h3 class="card-title">${item.name}</h3>
              <div class="card-meta">
                  ${item.genre || 'Drama'} • ${item.year || '2024'}
              </div>
          </div>
      </div>
  `).join('');

  document.querySelectorAll('.content-card').forEach(card => {
      card.addEventListener('click', () => {
          const id = card.dataset.id;
          window.location.href = `video.html?${state.currentMode}=${id}`;
      });
  });
}

// Featured Content
function setupFeaturedContent() {
  let currentIndex = 0;

  function updateFeatured() {
      const item = featuredMovies[currentIndex];
      featuredContent.style.backgroundImage = `url(${item.image})`;
      currentIndex = (currentIndex + 1) % featuredMovies.length;
  }

  updateFeatured();
  setInterval(updateFeatured, 5000);
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
