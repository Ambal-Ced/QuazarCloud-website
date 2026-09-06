// Main JavaScript for Quazar Cloud

// Card click handlers
document.addEventListener('DOMContentLoaded', function() {
    // Portfolio card navigation
    const portfolioCard = document.getElementById('portfolio-card');
    if (portfolioCard) {
        portfolioCard.addEventListener('click', function() {
            window.open('https://arzenportfolio.vercel.app/', '_blank', 'noopener');
        });
    }

    // Download card navigation
    const downloadCard = document.getElementById('download-card');
    if (downloadCard) {
        downloadCard.addEventListener('click', function() {
            window.location.href = 'download/index.html';
        });
    }

    // LinkedIn card navigation
    const linkedinCard = document.getElementById('linkedin-card');
    if (linkedinCard) {
        linkedinCard.addEventListener('click', function() {
            window.open('https://www.linkedin.com/in/ambal-ced3604/', '_blank', 'noopener');
        });
    }

    // GitHub card navigation
    const githubCard = document.getElementById('github-card');
    if (githubCard) {
        githubCard.addEventListener('click', function() {
            window.open('https://github.com/Ambal-Ced', '_blank', 'noopener');
        });
    }

    // Facebook card navigation
    const facebookCard = document.getElementById('facebook-card');
    if (facebookCard) {
        facebookCard.addEventListener('click', function() {
            window.open('https://www.facebook.com/justine.ambal.364', '_blank', 'noopener');
        });
    }

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});

