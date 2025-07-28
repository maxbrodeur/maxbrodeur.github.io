// Gallery functionality
let allPhotos = [];
let currentPhotoIndex = 0;
let isSlideshow = false;
let slideshowInterval = null;

console.log('Gallery.js loaded successfully');

// Load CSV data and display photos
async function loadPhotos() {
    try {
        console.log('Starting to load photos...');
        const response = await fetch('gallery-data.csv');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const csvText = await response.text();
        console.log('CSV loaded successfully, length:', csvText.length);
        
        const lines = csvText.split('\n').filter(line => line.trim() !== '');
        console.log('Total lines found:', lines.length);
        
        // Skip header row and process data
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                const columns = line.split(',');
                if (columns.length >= 4) {
                    allPhotos.push({
                        filename: columns[0].trim(),
                        title: columns[1].trim(),
                        description: columns[2].trim(),
                        date: columns[3].trim()
                    });
                }
            }
        }
        
        console.log('Processed photos:', allPhotos.length);
        displayPhotos();
        
    } catch (error) {
        console.error('Error loading photos:', error);
        const gallery = document.getElementById('gallery-grid');
        if (gallery) {
            gallery.innerHTML = '<div style="color: white; text-align: center; padding: 50px; font-size: 18px;">Error loading photos: ' + error.message + '</div>';
        }
    }
}

// Display photos in gallery
function displayPhotos() {
    const gallery = document.getElementById('gallery-grid');
    if (!gallery) {
        console.error('Gallery grid not found');
        return;
    }
    
    console.log('Displaying photos in gallery...');
    gallery.innerHTML = '';
    
    allPhotos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        item.innerHTML = `
            <img src="images/${photo.filename}" alt="${photo.title}" loading="lazy">
            <div class="photo-info">
                <h3>${photo.title}</h3>
                <p>${photo.description}</p>
                <span class="photo-date">${photo.date}</span>
            </div>
        `;
        
        item.addEventListener('click', () => openLightbox(index));
        gallery.appendChild(item);
    });
    
    console.log('Gallery populated with', allPhotos.length, 'photos');
}

// Lightbox functionality
function openLightbox(index) {
    currentPhotoIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxDate = document.getElementById('lightbox-date');
    
    if (lightbox && lightboxImg) {
        const photo = allPhotos[index];
        lightboxImg.src = `images/${photo.filename}`;
        lightboxImg.alt = photo.title;
        
        if (lightboxTitle) lightboxTitle.textContent = photo.title;
        if (lightboxDesc) lightboxDesc.textContent = photo.description;
        if (lightboxDate) lightboxDate.textContent = photo.date;
        
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    if (isSlideshow) {
        stopSlideshow();
    }
}

function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % allPhotos.length;
    openLightbox(currentPhotoIndex);
}

function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + allPhotos.length) % allPhotos.length;
    openLightbox(currentPhotoIndex);
}

// Slideshow functionality
function startSlideshow() {
    if (allPhotos.length === 0) {
        console.log('No photos loaded for slideshow');
        return;
    }
    
    isSlideshow = true;
    currentPhotoIndex = 0;
    openLightbox(currentPhotoIndex);
    
    const slideshowBtn = document.querySelector('.slideshow-btn');
    if (slideshowBtn) {
        slideshowBtn.textContent = 'Stop Slideshow';
        slideshowBtn.onclick = stopSlideshow;
    }
    
    slideshowInterval = setInterval(() => {
        nextPhoto();
    }, 3000);
}

function stopSlideshow() {
    isSlideshow = false;
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
    
    const slideshowBtn = document.querySelector('.slideshow-btn');
    if (slideshowBtn) {
        slideshowBtn.textContent = 'Start Slideshow';
        slideshowBtn.onclick = startSlideshow;
    }
}

// Initialize gallery
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing gallery...');
    loadPhotos();
    
    const slideshowBtn = document.querySelector('.slideshow-btn');
    if (slideshowBtn) {
        slideshowBtn.addEventListener('click', startSlideshow);
    }
    
    const lightboxClose = document.querySelector('.lightbox-close');
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    const lightboxNext = document.querySelector('.lightbox-next');
    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextPhoto);
    }
    
    const lightboxPrev = document.querySelector('.lightbox-prev');
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
                    nextPhoto();
                    break;
                case 'ArrowLeft':
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
