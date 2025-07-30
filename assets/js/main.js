// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Set random fractal background
    setRandomFractalBackground();
    
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle hero button click
    const heroButton = document.querySelector('.btn-primary');
    if (heroButton && heroButton.getAttribute('href') === '#projects') {
        heroButton.addEventListener('click', function(e) {
            e.preventDefault();
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                const offsetTop = projectsSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.2)';
            nav.style.backdropFilter = 'blur(30px)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.1)';
            nav.style.backdropFilter = 'blur(20px)';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project cards for animation and add hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);

        // Add hover effects for GIF animation or video
        const img = card.querySelector('.project-img');
        const video = card.querySelector('.project-gif');
        const hoverGif = card.getAttribute('data-hover-gif');

        if (img && hoverGif && !video) {
            // Standard GIF swap for image
            const originalSrc = img.src;
            card.addEventListener('mouseenter', function() {
                img.src = hoverGif;
            });
            card.addEventListener('mouseleave', function() {
                img.src = originalSrc;
            });
        } else if (img && video && hoverGif) {
            // For cards with a video (fractal, torus)
            card.addEventListener('mouseenter', function() {
                img.style.display = 'none';
                video.style.display = 'block';
                video.currentTime = 0;
                video.play();
            });
            card.addEventListener('mouseleave', function() {
                video.pause();
                video.style.display = 'none';
                img.style.display = '';
            });
        }
    });

    // Load and render timeline
    loadTimeline();
});

// Timeline functionality
async function loadTimeline() {
    try {
        const response = await fetch('assets/timeline.json');
        const timelineData = await response.json();
        renderTimeline(timelineData);
    } catch (error) {
        console.error('Error loading timeline:', error);
    }
}

function renderTimeline(data) {
    const container = document.querySelector('.timeline-container');
    if (!container) return;

    container.innerHTML = '';
    
    data.forEach(yearData => {
        const yearSection = document.createElement('div');
        yearSection.className = 'timeline-year';
        
        const yearTitle = document.createElement('h3');
        yearTitle.className = 'timeline-year-title';
        yearTitle.textContent = yearData.year;
        yearSection.appendChild(yearTitle);
        
        yearData.entries.forEach(entry => {
            const entryElement = document.createElement('div');
            entryElement.className = 'timeline-entry';
            
            entryElement.innerHTML = `
                <div class="timeline-content">
                    <h4 class="timeline-title">${entry.title}</h4>
                    <p class="timeline-text">${entry.text}</p>
                </div>
                <div class="timeline-media">
                    ${entry.media.map(mediaItem => {
                        if (mediaItem.type === 'image') {
                            return `<img src="${mediaItem.image}" alt="${mediaItem.description}" class="timeline-image">`;
                        }
                        return '';
                    }).join('')}
                </div>
            `;
            
            yearSection.appendChild(entryElement);
        });
        
        container.appendChild(yearSection);
    });
}

// Random fractal background functionality
function setRandomFractalBackground() {
    const fractalImages = [
        'fractal-random_chaos-1753709455235',
        'fractal-random_chaos-1753709573585',
        'fractal-random_chaos-1753712094260',
        'fractal-random_chaos-1753713117984',
        'fractal-random_chaos-1753713173352',
        'fractal-random_chaos-1753713219204',
        'fractal-random_chaos-1753719177982',
        'fractal-random_chaos-1753719198940',
        'fractal-random_chaos-1753719219898',
        'fractal-random_chaos-1753719226157',
        'fractal-random_chaos-1753719237141',
        'fractal-random_chaos-1753719248816',
        'fractal-random_chaos-1753719255283',
        'fractal-random_chaos-1753719271037',
        'fractal-random_chaos-1753722756059',
        'fractal-random_chaos-1753729578759',
        'fractal-vertical-1',
        'fractal-vertical-2',
        'fractal-random_chaos-1753734717778',
        'fractal-random_chaos-1753737280840'
    ];

    // WebP support detection
    function supportsWebP(callback) {
        const img = new window.Image();
        img.onload = function () { callback(img.width > 0 && img.height > 0); };
        img.onerror = function () { callback(false); };
        img.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4TAYAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
    }

    // Select a random fractal image
    const randomIndex = Math.floor(Math.random() * fractalImages.length);
    const selectedImage = fractalImages[randomIndex];
    const basePath = `assets/images/fractal_backgrounds/${selectedImage}`;
    const cacheBuster = Date.now();
    document.body.style.backgroundImage = '';

    supportsWebP(function (isSupported) {
        const ext = isSupported ? '.webp' : '.png';
        const imagePath = `${basePath}${ext}`;
        setTimeout(() => {
            document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.6)), url('${imagePath}?v=${cacheBuster}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundAttachment = 'fixed';
            // Force Safari repaint
            void document.body.offsetHeight;
            document.body.style.webkitTransform = 'scale(1)';
        }, 10);
        console.log(`Applied random fractal background: ${selectedImage}${ext}`);
    });
}
