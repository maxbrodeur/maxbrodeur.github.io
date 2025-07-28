// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
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
        
        // Add hover effects for GIF animation
        const img = card.querySelector('.project-img');
        const hoverGif = card.getAttribute('data-hover-gif');
        
        if (img && hoverGif) {
            const originalSrc = img.src;
            
            card.addEventListener('mouseenter', function() {
                img.src = hoverGif;
            });
            
            card.addEventListener('mouseleave', function() {
                img.src = originalSrc;
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
