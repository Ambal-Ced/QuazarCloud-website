// Main JavaScript for Quazar Cloud

// Card click handlers
document.addEventListener('DOMContentLoaded', function() {
    // Portfolio card navigation
    const portfolioCard = document.getElementById('portfolio-card');
    if (portfolioCard) {
        portfolioCard.addEventListener('click', function() {
            window.location.href = 'portfolio/index.html';
        });
    }

    // Download card navigation
    const downloadCard = document.getElementById('download-card');
    if (downloadCard) {
        downloadCard.addEventListener('click', function() {
            window.location.href = 'download/index.html';
        });
    }

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});

