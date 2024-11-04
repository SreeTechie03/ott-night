class MovieApp {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.loadMovieData();
    }

    initializeElements() {
        this.movieDetails = document.getElementById('movieDetails');
        this.videoContainer = document.getElementById('videoPlayerContainer');
        this.videoPlayer = document.getElementById('videoPlayer');
        this.closeVideoBtn = document.getElementById('closeVideo');
        this.playButton = document.getElementById('playButton');
        this.trailerButton = document.getElementById('trailerButton');
        this.searchInput = document.getElementById('searchInput');
        this.recommendationsGrid = document.getElementById('recommendationsGrid');
        this.navbar = document.querySelector('.navbar');
    }

    setupEventListeners() {
        this.closeVideoBtn.addEventListener('click', () => this.closeVideo());
        this.playButton.addEventListener('click', () => this.playMovie());
        this.trailerButton.addEventListener('click', () => this.playTrailer());
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.videoContainer.style.display === 'block') {
                this.closeVideo();
            }
        });
    }

    loadMovieData() {
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get('movie');

        if (movieId && movieData[movieId]) {
            this.displayMovieDetails(movieData[movieId]);
            this.loadRecommendations(movieId);
            this.movieDetails.style.display = 'grid';
        } else {
            this.showAllMovies();
            this.movieDetails.style.display = 'none';
        }
    }

    displayMovieDetails(movie) {
        document.getElementById('moviePoster').src = movie.image;
        document.getElementById('movieTitle').textContent = movie.name;
        document.getElementById('movieYear').textContent = movie.releaseDate;
        document.getElementById('movieRating').textContent = movie.rating;
        document.getElementById('movieDirector').textContent = movie.director;
        document.getElementById('movieCast').textContent = movie.cast;
        document.getElementById('moviePlot').textContent = movie.summary;
    }

    showAllMovies() {
        const allMovies = Object.entries(movieData);
        this.updateRecommendations(allMovies);
    }

    handleSearch(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        const filteredMovies = Object.entries(movieData).filter(([_, movie]) => 
            movie.name.toLowerCase().includes(searchTerm) ||
            movie.cast.toLowerCase().includes(searchTerm) ||
            movie.director.toLowerCase().includes(searchTerm)
        );

        if (searchTerm) {
            this.movieDetails.style.display = 'none';
            this.updateRecommendations(filteredMovies);
        } else {
            this.loadMovieData();
        }
    }

    playMovie() {
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get('movie');
        const movie = movieData[movieId];

        if (movie) {
            this.videoPlayer.src = movie.videoUrl;
            this.videoContainer.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    playTrailer() {
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get('movie');
        const movie = movieData[movieId];

        if (movie && movie.trailer) {
            window.open(movie.trailer, '_blank');
        }
    }

    closeVideo() {
        this.videoContainer.style.display = 'none';
        this.videoPlayer.src = '';
        document.body.style.overflow = 'auto';
    }

    loadRecommendations(currentMovieId) {
        const recommendations = Object.entries(movieData)
            .filter(([id, _]) => id !== currentMovieId)
            .slice(0, 6);
        
        this.updateRecommendations(recommendations);
    }

    updateRecommendations(movies) {
        this.recommendationsGrid.innerHTML = movies.map(([id, movie]) => `
            <div class="movie-card" onclick="window.location.href='?movie=${id}'">
                <img src="${movie.image}" alt="${movie.name}" loading="lazy">
                <div class="movie-card-info">
                    <div class="movie-card-rating">${movie.rating}</div>
                    <h4>${movie.name}</h4>
                    <p>${movie.releaseDate}</p>
                </div>
            </div>
        `).join('');
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MovieApp();
});