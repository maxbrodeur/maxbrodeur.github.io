// Fractal Gallery JavaScript
let fractals = [];
let shuffledFractals = []; // Random mix for gallery view
let shuffledMethodFractals = {}; // Store shuffled versions per method
let displayedFractals = []; // Currently displayed fractals for lightbox navigation
let currentFractalIndex = 0;
let currentMethod = 'gallery'; // Changed from 'all'
let slideshowInterval = null;
let slideshowIndex = 0;

// Configuration
const GALLERY_DISPLAY_COUNT = 500; // Show 500 fractals in gallery view to show vastness
const METHOD_DISPLAY_COUNT = 300; // Show 300 per method
const SLIDESHOW_INTERVAL = 10000; // 10 seconds

// Method descriptions (with HTML support for links)
const methodDescriptions = {
    "gallery": 'This is a collection of attractors obtained from randomly searching the coefficient space of iterative maps for chaos. To get in touch for research or artistic inquiries, you can reach me at: maxbrodeur at epfl dot ch',
    "Polynomial Map": 'These attractors are generated using 2D quadratic polynomial iterative maps (12 coefficients) as described in <a href="https://paulbourke.net/fractals/sprott/paper203.pdf" target="_blank">Sprott\'s work on polynomial maps</a>. To generate some yourself, please visit <a href="https://maxbrodeur.github.io/fractal-generator/" target="_blank">this web app I made</a>.',
    "Reservoir Map": 'Reservoir computing leverages the dynamics of randomly connected recurrent networks to learn tasks. Here we explore their attractors.',
    "RNN Map": 'We visualize the attractors of activity in recurrent neural networks at the <em>edge of chaos</em>, as described by <a href="https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.61.259" target="_blank">Sompolinsky et al.</a> Below, we see these high-dimensional structures through the first twenty principal components (in pairs).'
};

// Special methods that should be excluded from the main gallery
const excludedFromGallery = ["RNN Map"];

// Tab display names (method -> display name)
const tabDisplayNames = {
    "RNN Map": "Edge of Chaos"
};

// Utility: Shuffle array (Fisher-Yates)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Load fractal data
async function loadFractals() {
    try {
        const response = await fetch('gallery-data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        fractals = await response.json();

        // Create shuffled version for gallery view (excluding special methods)
        const galleryFractals = fractals.filter(f => !excludedFromGallery.includes(f.method));
        shuffledFractals = shuffleArray(galleryFractals);

        // Initialize shuffled versions for special methods (Edge of Chaos)
        excludedFromGallery.forEach(method => {
            const methodFractals = fractals.filter(f => f.method === method);
            shuffledMethodFractals[method] = shuffleArray(methodFractals);
        });

        console.log('Fractals loaded:', fractals.length);
        console.log('Gallery view will show:', Math.min(GALLERY_DISPLAY_COUNT, fractals.length), 'fractals');
        
        initializeGallery();
    } catch (error) {
        console.error('Error loading fractals:', error);
        document.getElementById('gallery-grid').innerHTML = 
            '<div style="color: white; text-align: center; padding: 50px; font-size: 18px; grid-column: 1/-1;">Error loading fractals: ' + error.message + '</div>';
    }
}

// Initialize gallery
function initializeGallery() {
    createMethodTabs();

    // Check for method URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const methodParam = urlParams.get('method');
    if (methodParam && fractals.some(f => f.method === methodParam)) {
        switchMethod(methodParam);
    } else {
        renderGallery();
    }

    setupEventListeners();
}

// Create method tabs
function createMethodTabs() {
    const tabsContainer = document.getElementById('method-tabs');
    const methods = [...new Set(fractals.map(f => f.method))];

    // Separate regular methods from excluded (special) methods
    const regularMethods = methods.filter(m => !excludedFromGallery.includes(m));
    const specialMethods = methods.filter(m => excludedFromGallery.includes(m));

    // Add "Gallery" tab (shows all fractals except special ones)
    const galleryTab = createTab('gallery', 'Gallery', true);
    tabsContainer.appendChild(galleryTab);

    // Add regular method tabs
    regularMethods.forEach(method => {
        const tab = createTab(method, method, false);
        tabsContainer.appendChild(tab);
    });

    // Add special method tabs (e.g., Edge of Chaos) at the end
    specialMethods.forEach(method => {
        const displayName = tabDisplayNames[method] || method;
        const tab = createTab(method, displayName, false);
        tabsContainer.appendChild(tab);
    });
}

function createTab(method, label, isActive) {
    const tab = document.createElement('button');
    tab.className = 'method-tab' + (isActive ? ' active' : '');
    tab.textContent = label;
    tab.dataset.method = method;
    tab.addEventListener('click', () => switchMethod(method));
    return tab;
}

function switchMethod(method) {
    currentMethod = method;

    // Update active tab
    document.querySelectorAll('.method-tab').forEach(tab => {
        if (tab.dataset.method === method) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Toggle inverted mode for special methods (Edge of Chaos)
    if (excludedFromGallery.includes(method)) {
        document.body.classList.add('inverted');
    } else {
        document.body.classList.remove('inverted');
    }

    // Show/hide shuffle button based on method
    updateShuffleButtonVisibility();

    // Re-render gallery
    renderGallery();
}

// Update shuffle button visibility
function updateShuffleButtonVisibility() {
    const shuffleBtn = document.getElementById('shuffle-btn');
    if (currentMethod === 'gallery' || excludedFromGallery.includes(currentMethod)) {
        shuffleBtn.style.display = 'inline-block';
    } else {
        shuffleBtn.style.display = 'none';
    }
}

// Main render function - unified for all views
function renderGallery() {
    updateMethodDescription();
    renderGalleryGrid();
}

// Update the method description section
function updateMethodDescription() {
    const titleEl = document.getElementById('method-description-title');
    const textEl = document.getElementById('method-description-text');

    if (currentMethod === 'gallery') {
        const displayCount = Math.min(GALLERY_DISPLAY_COUNT, fractals.length);
        titleEl.textContent = 'Gallery';
        textEl.innerHTML = `${methodDescriptions[currentMethod]}`;
    } else {
        const methodFractals = fractals.filter(f => f.method === currentMethod);
        const displayCount = Math.min(METHOD_DISPLAY_COUNT, methodFractals.length);
        // Use display name if available
        titleEl.textContent = tabDisplayNames[currentMethod] || currentMethod;
        textEl.innerHTML = `${methodDescriptions[currentMethod] || 'Mathematical fractal generation method.'}`;
    }
}

// Render the gallery grid
function renderGalleryGrid() {
    const galleryContainer = document.getElementById('gallery-grid');
    galleryContainer.innerHTML = '';

    let sourceFractals;

    if (currentMethod === 'gallery') {
        // Show random mix of all fractals
        sourceFractals = shuffledFractals.slice(0, GALLERY_DISPLAY_COUNT);
    } else {
        // Show specific method fractals (use shuffled if available)
        const methodFractals = shuffledMethodFractals[currentMethod]
            || fractals.filter(f => f.method === currentMethod);
        sourceFractals = methodFractals.slice(0, METHOD_DISPLAY_COUNT);
    }
    
    // Store for lightbox navigation
    displayedFractals = sourceFractals;
    
    sourceFractals.forEach((fractal, displayIndex) => {
        const item = createGalleryItem(fractal, displayIndex);
        galleryContainer.appendChild(item);
    });
    
    // Log for debugging
    console.log(`Rendered ${sourceFractals.length} fractals for ${currentMethod}`);
}

function createGalleryItem(fractal, displayIndex) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    const img = document.createElement('img');
    img.src = fractal.src;
    img.alt = `${fractal.method} fractal ${fractal.index}`;
    img.loading = 'lazy'; // Ensure lazy loading
    
    item.appendChild(img);
    item.addEventListener('click', () => openLightbox(displayIndex));
    
    return item;
}

// Lightbox functionality
function openLightbox(index) {
    currentFractalIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxMethod = document.getElementById('lightbox-method');
    const lightboxIndex = document.getElementById('lightbox-index');
    
    const fractal = displayedFractals[index];
    
    lightboxImg.src = fractal.src;
    lightboxMethod.textContent = fractal.method;
    lightboxIndex.textContent = `Fractal ${fractal.index}`;
    
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
    currentFractalIndex = (currentFractalIndex + direction + displayedFractals.length) % displayedFractals.length;
    openLightbox(currentFractalIndex);
}

// Shuffle functionality
function shuffleGallery() {
    if (currentMethod === 'gallery') {
        const galleryFractals = fractals.filter(f => !excludedFromGallery.includes(f.method));
        shuffledFractals = shuffleArray(galleryFractals);
    } else {
        // Shuffle for specific method
        const methodFractals = fractals.filter(f => f.method === currentMethod);
        shuffledMethodFractals[currentMethod] = shuffleArray(methodFractals);
    }
    renderGallery();
}

// Fullscreen Slideshow
function startSlideshow() {
    const slideshow = document.getElementById('fullscreen-slideshow');
    const slideshowImg = document.getElementById('slideshow-image');
    
    slideshow.classList.add('active');
    slideshowIndex = 0;
    
    // Use displayed fractals for slideshow
    const slideshowFractals = shuffleArray([...displayedFractals]);
    
    function showNextSlide() {
        const fractal = slideshowFractals[slideshowIndex];
        slideshowImg.classList.remove('loaded');
        
        // Preload image
        const img = new Image();
        img.onload = () => {
            slideshowImg.src = fractal.src;
            slideshowImg.classList.add('loaded');
        };
        img.src = fractal.src;
        
        slideshowIndex = (slideshowIndex + 1) % slideshowFractals.length;
    }
    
    // Show first slide immediately
    showNextSlide();
    
    // Set up interval
    slideshowInterval = setInterval(showNextSlide, SLIDESHOW_INTERVAL);
}

function stopSlideshow() {
    const slideshow = document.getElementById('fullscreen-slideshow');
    slideshow.classList.remove('active');
    
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Shuffle button
    document.getElementById('shuffle-btn').addEventListener('click', shuffleGallery);
    
    // Initialize shuffle button visibility
    updateShuffleButtonVisibility();
    
    // Fullscreen slideshow button
    document.getElementById('fullscreen-btn').addEventListener('click', startSlideshow);
    
    // Slideshow exit on click
    document.getElementById('fullscreen-slideshow').addEventListener('click', stopSlideshow);
    
    // Lightbox close
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    
    // Lightbox navigation
    document.getElementById('lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
    document.getElementById('lightbox-next').addEventListener('click', () => navigateLightbox(1));
    
    // Click outside to close
    document.getElementById('lightbox').addEventListener('click', (e) => {
        if (e.target.id === 'lightbox') {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        }
        
        // Escape to exit slideshow
        const slideshow = document.getElementById('fullscreen-slideshow');
        if (slideshow.classList.contains('active') && e.key === 'Escape') {
            stopSlideshow();
        }
    });
    
    // Window resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            renderGallery();
        }, 250);
    });
}

// Fullscreen functionality (removed - replaced with slideshow)
function toggleFullscreen() {
    // Deprecated - keeping for compatibility but redirects to slideshow
    startSlideshow();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', loadFractals);
