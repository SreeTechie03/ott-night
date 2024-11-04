document.addEventListener('DOMContentLoaded', () => {
    const enterButton = document.getElementById('enterButton');
    
    if (enterButton) {
        enterButton.addEventListener('click', () => {
            window.location.href = '/movies.html';
        });
    } else {
        console.warn('Element with id "enterButton" not found.');
    }
});
