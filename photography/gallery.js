// Gallery functionality
let allPhotos = [];
let currentPhotoIndex = 0;
let isSlideshow = false;
let slideshowInterval = null;

console.log('Gallery.js loaded successfully');

// Load JSON data and display photos
async function loadPhotos() {
    try {
        console.log('Starting to load photos...');
        const response = await fetch('gallery-data.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        allPhotos = await response.json();
        console.log('JSON loaded successfully, photos count:', allPhotos.length);
        
        console.log('Total photos loaded:', allPhotos.length);
        displayPhotos();
        
    } catch (error) {
        console.error('Error loading photos:', error);
        const gallery = document.getElementById('gallery-grid');
        if (gallery) {
            gallery.innerHTML = '<div style="color: white; text-align: center; padding: 50px; font-size: 18px;">Error loading photos: ' + error.message + '</div>';
        }
    }
}

// Helper function to get image aspect ratio
function getImageAspectRatio(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = function() {
            const aspectRatio = this.width / this.height;
            resolve(aspectRatio > 1.2 ? 'horizontal' : 'vertical');
        };
        img.onerror = function() {
            resolve('vertical'); // Default to vertical if load fails
        };
        img.src = src;
    });
}

// Display photos in gallery
async function displayPhotos() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) {
        console.error('Gallery grid element not found');
        return;
    }
    
    console.log('Displaying photos in gallery...');
    galleryGrid.innerHTML = '';
    
    // Process photos with proper aspect ratio detection
    for (let i = 0; i < allPhotos.length; i++) {
        const photo = allPhotos[i];
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        // Get aspect ratio before rendering
        const orientation = await getImageAspectRatio(photo.src);
        galleryItem.classList.add(orientation);
        
        galleryItem.innerHTML = `
            <img src="${photo.src}" alt="${photo.location}" loading="lazy">
            <div class="gallery-item-overlay">
                <div class="gallery-item-title">${photo.location}</div>
                <div class="gallery-item-caption">${photo.caption}</div>
                <div class="gallery-item-date">${photo.date}</div>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => openLightbox(i));
        galleryGrid.appendChild(galleryItem);
    }
    
    console.log('Gallery populated with', allPhotos.length, 'photos');
}

// Lightbox functionality
function openLightbox(index) {
    currentPhotoIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-description');
    const lightboxDate = document.getElementById('lightbox-date');
    
    if (lightbox && lightboxImg) {
        const photo = allPhotos[index];
        
        // Pre-load the image to avoid flashing
        const newImg = new Image();
        newImg.onload = function() {
            lightboxImg.src = this.src;
            lightboxImg.alt = photo.location;
            
            if (lightboxTitle) lightboxTitle.textContent = photo.location;
            if (lightboxDesc) lightboxDesc.textContent = photo.caption;
            if (lightboxDate) lightboxDate.textContent = photo.date;
        };
        newImg.src = photo.src;
        
        // Show lightbox if not already visible
        if (lightbox.style.display !== 'flex') {
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Add fade-in animation
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
        }
        
        // Update navigation visibility based on slideshow state
        updateNavigationVisibility();
    }
}

function updateNavigationVisibility() {
    const navElements = document.querySelectorAll('.lightbox-nav');
    const captionElement = document.querySelector('.lightbox-caption');
    
    if (isSlideshow) {
        navElements.forEach(nav => nav.classList.add('slideshow-hidden'));
        if (captionElement) captionElement.classList.add('slideshow-hidden');
    } else {
        navElements.forEach(nav => nav.classList.remove('slideshow-hidden'));
        if (captionElement) captionElement.classList.remove('slideshow-hidden');
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    if (isSlideshow) {
        stopSlideshow();
    }
}

function nextPhoto() {
    if (allPhotos.length === 0) return;
    currentPhotoIndex = (currentPhotoIndex + 1) % allPhotos.length;
    updateLightboxContent();
}

function prevPhoto() {
    if (allPhotos.length === 0) return;
    currentPhotoIndex = (currentPhotoIndex - 1 + allPhotos.length) % allPhotos.length;
    updateLightboxContent();
}

function updateLightboxContent() {
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-description');
    const lightboxDate = document.getElementById('lightbox-date');
    
    if (lightboxImg && allPhotos[currentPhotoIndex]) {
        const photo = allPhotos[currentPhotoIndex];
        
        // Pre-load the image to avoid flashing
        const newImg = new Image();
        newImg.onload = function() {
            lightboxImg.src = this.src;
            lightboxImg.alt = photo.location;
            
            if (lightboxTitle) lightboxTitle.textContent = photo.location;
            if (lightboxDesc) lightboxDesc.textContent = photo.caption;
            if (lightboxDate) lightboxDate.textContent = photo.date;
        };
        newImg.src = photo.src;
    }
}

// Slideshow functionality
function startSlideshow() {
    if (allPhotos.length === 0) {
        console.log('No photos loaded for slideshow');
        return;
    }
    
    isSlideshow = true;
    
    // If lightbox is not open, start from first photo
    if (document.getElementById('lightbox').style.display !== 'flex') {
        currentPhotoIndex = 0;
        openLightbox(currentPhotoIndex);
    } else {
        // Update navigation visibility for current lightbox
        updateNavigationVisibility();
    }
    
    const slideshowBtn = document.getElementById('slideshow-btn');
    if (slideshowBtn) {
        slideshowBtn.textContent = 'Stop Slideshow';
        slideshowBtn.onclick = stopSlideshow;
    }
    
    slideshowInterval = setInterval(() => {
        nextPhoto();
    }, 4000); // 4 seconds for better viewing
}

function stopSlideshow() {
    isSlideshow = false;
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
    
    // Restore navigation visibility
    updateNavigationVisibility();
    
    const slideshowBtn = document.getElementById('slideshow-btn');
    if (slideshowBtn) {
        slideshowBtn.textContent = 'Start Slideshow';
        slideshowBtn.onclick = startSlideshow;
    }
}

// Initialize gallery
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing gallery...');
    loadPhotos();
    
    const slideshowBtn = document.getElementById('slideshow-btn');
    if (slideshowBtn) {
        slideshowBtn.addEventListener('click', startSlideshow);
    }
    
    const lightboxClose = document.querySelector('.lightbox-close');
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    const lightboxNext = document.getElementById('lightbox-next');
    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextPhoto);
    }
    
    const lightboxPrev = document.getElementById('lightbox-prev');
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', prevPhoto);
    }
    
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.style.display === 'flex') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextPhoto();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    prevPhoto();
                    break;
                case ' ':
                    e.preventDefault();
                    if (isSlideshow) {
                        stopSlideshow();
                    } else {
                        startSlideshow();
                    }
                    break;
            }
        }
    });
    
    console.log('Gallery initialization complete');
});
