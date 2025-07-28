// Gallery functionality with embedded data
let allPhotos = [];
let currentPhotoIndex = 0;
let isSlideshow = false;
let slideshowInterval = null;

console.log('Gallery.js loaded successfully');

// Embedded gallery data to avoid CORS issues
const galleryData = [
  {
    "src": "images/italy/tower.JPG",
    "location": "Pisa",
    "caption": "Some nice looking Italian architecture",
    "date": "May 2024"
  },
  {
    "src": "images/italy/pisa.JPG",
    "location": "Pisa",
    "caption": "It actually leans !!!",
    "date": "May 2024"
  },
  {
    "src": "images/italy/window.JPG",
    "location": "Florence",
    "caption": "Window framing of the Ponte Vecchio, from the Uffizi gallery",
    "date": "May 2024"
  },
  {
    "src": "images/london/ldn_beef.jpeg",
    "location": "London",
    "caption": "Posing with the beefeaters guarding the crown jewels at the tower of London",
    "date": "September 2024"
  },
  {
    "src": "images/london/ldn_mirror.jpeg",
    "location": "London",
    "caption": "Convex mirror in one the old book-filled hiddens rooms of the Royal Instituion, where Faraday used to live and work",
    "date": "September 2024"
  },
  {
    "src": "images/london/ldn_museum_tavern.jpeg",
    "location": "London",
    "caption": "Guinness at the Museum Tavern, notably frequented by Karl Marx",
    "date": "September 2024"
  },
  {
    "src": "images/london/ldn_contrast.jpeg",
    "location": "London",
    "caption": "Contrasting view of the City skyline from the tower of London",
    "date": "September 2024"
  },
  {
    "src": "images/london/ldn_clock.jpeg",
    "location": "London",
    "caption": "One of the several clocks sticking out of walls in the City of London, with the \"Walkie Talkie\" in the background",
    "date": "September 2024"
  },
  {
    "src": "images/london/ldn_market.jpeg",
    "location": "London",
    "caption": "Walking through Borough Market afterhours",
    "date": "September 2024"
  },
  {
    "src": "images/london/ldn_westminster_2.jpeg",
    "location": "London",
    "caption": "Westminster Abbey",
    "date": "September 2024"
  },
  {
    "src": "images/london/ldn_window.jpeg",
    "location": "London",
    "caption": "Window framing of the tower bridge, from the tower of London",
    "date": "September 2024"
  },
  {
    "src": "images/corsica/lying.jpg",
    "location": "Corsica",
    "caption": "Sunbathing in the flowers after a long exhausting hike. That's the life!",
    "date": "April 2024"
  },
  {
    "src": "images/corsica/house_sunset.jpg",
    "location": "Marseille",
    "caption": "Dramatic seaside house in Marseille",
    "date": "April 2024"
  },
  {
    "src": "images/corsica/tree.jpg",
    "location": "Corsica",
    "caption": "How is this tree real!? There's gotta be a bug in the simulation",
    "date": "April 2024"
  },
  {
    "src": "images/corsica/goat.jpg",
    "location": "Corsica",
    "caption": "A goat on the side of the road",
    "date": "April 2024"
  },
  {
    "src": "images/corsica/tower.jpg",
    "location": "Corsica",
    "caption": "Genoese tower",
    "date": "April 2024"
  },
  {
    "src": "images/corsica/house.jpg",
    "location": "Corsica",
    "caption": "A house in the mountains",
    "date": "April 2024"
  },
  {
    "src": "images/corsica/gang.jpg",
    "location": "Corsica",
    "caption": "Group photo",
    "date": "April 2024"
  },
  {
    "src": "images/corsica/climbing_in_sunset.jpg",
    "location": "Corsica",
    "caption": "Climbing at sunset",
    "date": "April 2024"
  },
  {
    "src": "images/corsica/window.jpg",
    "location": "Corsica",
    "caption": "Window view",
    "date": "April 2024"
  },
  {
    "src": "images/corsica/climbing.jpg",
    "location": "Corsica",
    "caption": "Rock climbing",
    "date": "April 2024"
  },
  {
    "src": "images/corsica/boat_church.jpg",
    "location": "Corsica",
    "caption": "Coastal church",
    "date": "April 2024"
  },
  {
    "src": "images/corsica/church_statue.jpg",
    "location": "Corsica",
    "caption": "Church interior",
    "date": "April 2024"
  },
  {
    "src": "images/corsica/corsican_walls.jpg",
    "location": "Corsica",
    "caption": "Ancient stone walls",
    "date": "April 2024"
  },
  {
    "src": "images/corsica/wave.jpg",
    "location": "Corsica",
    "caption": "Mediterranean waves",
    "date": "April 2024"
  },
  {
    "src": "images/switzerland/sw_st_bernard_3.jpg",
    "location": "St. Bernard Pass",
    "caption": "Backcountry skiing in the Great St. Bernard pass",
    "date": "February 2024"
  },
  {
    "src": "images/switzerland/sw_st_bernard_2.jpg",
    "location": "St. Bernard Pass",
    "caption": "The Great St. Bernard Hospice, where we drank and ate some well deserved wine and cheese",
    "date": "February 2024"
  },
  {
    "src": "images/switzerland/sw_st_bernard_4.jpg",
    "location": "St. Bernard Pass",
    "caption": "Backcountry skiing in the Great St. Bernard pass",
    "date": "February 2024"
  },
  {
    "src": "images/switzerland/sw_lauterbrunnen.jpg",
    "location": "Lauterbrunnen",
    "caption": "Lauterbrunnen valley",
    "date": "February 2024"
  },
  {
    "src": "images/switzerland/sw_matterhorn.jpg",
    "location": "Zermatt",
    "caption": "Sunset on the Matterhorn",
    "date": "February 2024"
  },
  {
    "src": "images/switzerland/sw_lausanne_view_from_church.jpg",
    "location": "Lausanne",
    "caption": "View of Lausanne and lake Geneva from the top of the Notre-Dame cathedral",
    "date": "February 2024"
  },
  {
    "src": "images/switzerland_fall24/evian.jpeg",
    "location": "Évian",
    "caption": "The Cachat spring supposedly the first source for the famous Evian water is the reference for water quality measurements around the world. I swear it tasted good!",
    "date": "Fall 2024"
  },
  {
    "src": "images/massif_sunset.JPG",
    "location": "Swiss Alps",
    "caption": "Alpine sunset",
    "date": "February 2024"
  },
  {
    "src": "images/japan/jp_arch.jpg",
    "location": "Japan",
    "caption": "Sights on the Nakasendo trail",
    "date": "Summer 2023"
  },
  {
    "src": "images/japan/jp_shrine.jpg",
    "location": "Japan",
    "caption": "For their annual festival in Nagiso they carry a shrine from one end of the village to the other",
    "date": "Summer 2023"
  },
  {
    "src": "images/japan/jp_monkey.jpg",
    "location": "Japan",
    "caption": "Baby monkey in the Iwatayama Monkey Park in Kyoto",
    "date": "Summer 2023"
  },
  {
    "src": "images/japan/jp_street.jpg",
    "location": "Tokyo",
    "caption": "The first walk down Dotombori is confusing, to say the least",
    "date": "Summer 2023"
  },
  {
    "src": "images/japan/jp_wood_temple.jpg",
    "location": "Kyoto",
    "caption": "Daitoku-ji temple in Kyoto",
    "date": "Summer 2023"
  },
  {
    "src": "images/japan/jp_tsubakuro.jpg",
    "location": "Japanese Alps",
    "caption": "The view on Mt. Tsubakuro from the Ensanzo mountain hut",
    "date": "Summer 2023"
  },
  {
    "src": "images/japan/jp_magome.jpg",
    "location": "Magome",
    "caption": "Calm street in Narai",
    "date": "Summer 2023"
  },
  {
    "src": "images/japan/jp_family.jpg",
    "location": "Japan",
    "caption": "Family portrait",
    "date": "Summer 2023"
  },
  {
    "src": "images/japan/jp_lantern.jpg",
    "location": "Japan",
    "caption": "Paper lantern",
    "date": "Summer 2023"
  },
  {
    "src": "images/japan/jp_restaurant.jpg",
    "location": "Japan",
    "caption": "Traditional restaurant",
    "date": "Summer 2023"
  },
  {
    "src": "images/guadeloupe_waves.jpg",
    "location": "Guadeloupe",
    "caption": "The rocky waves on the atlantic coast",
    "date": "Winter 2022"
  },
  {
    "src": "images/guadeloupe_cow.jpg",
    "location": "Guadeloupe",
    "caption": "A very nice cow that let us cross his path",
    "date": "Winter 2022"
  },
  {
    "src": "images/guadeloupe_desirade.jpg",
    "location": "Guadeloupe",
    "caption": "View of La Désirade island from La Pointe des Châteaux",
    "date": "Winter 2022"
  },
  {
    "src": "images/gaspesie_2.jpg",
    "location": "Gaspé",
    "caption": "Backcountry skiing on Mt. Albert",
    "date": "Winter 2023"
  },
  {
    "src": "images/gaspesie_1.jpg",
    "location": "Gaspé",
    "caption": "Backcountry skiing on Mt. Albert",
    "date": "Winter 2023"
  },
  {
    "src": "images/mtl_sunset.jpg",
    "location": "Montreal",
    "caption": "The view from my apartment",
    "date": "Ongoing"
  },
  {
    "src": "images/sthilaire_apple.jpg",
    "location": "Mont-Saint-Hilaire",
    "caption": "An apple from an orchard in St-Hilaire",
    "date": "Fall 2022"
  },
  {
    "src": "images/martinique_stpierre.jpg",
    "location": "Martinique",
    "caption": "Walking around Saint-Pierre",
    "date": "Winter 2022"
  },
  {
    "src": "images/martinique_pelee.jpg",
    "location": "Martinique",
    "caption": "View of Mount Pelée's crater – the volcano that errupted in 1902, killing 28 000",
    "date": "Winter 2022"
  },
  {
    "src": "images/martinique_cyparis.jpg",
    "location": "Martinique",
    "caption": "One of the only survivors of the eruption of Mount Pelée was a prisoner named Cyparis – this is a picture of his cell",
    "date": "Winter 2022"
  },
  {
    "src": "images/caribbean_lily.jpg",
    "location": "Caribbean",
    "caption": "Water lily",
    "date": "Winter 2022"
  },
  {
    "src": "images/caribbean_python.jpg",
    "location": "Caribbean",
    "caption": "Tree python",
    "date": "Winter 2022"
  },
  {
    "src": "images/caribbean_bird.JPG",
    "location": "Caribbean",
    "caption": "Tropical bird",
    "date": "Winter 2022"
  },
  {
    "src": "images/caribbean_mommy_bird.JPG",
    "location": "Caribbean",
    "caption": "Bird with chick",
    "date": "Winter 2022"
  },
  {
    "src": "images/caribbean_pigeon1.JPG",
    "location": "Caribbean",
    "caption": "Caribbean dove",
    "date": "Winter 2022"
  },
  {
    "src": "images/caribbean_pigeon2.JPG",
    "location": "Caribbean",
    "caption": "Tropical pigeon",
    "date": "Winter 2022"
  },
  {
    "src": "images/caribbean_boat.JPG",
    "location": "Caribbean",
    "caption": "Fishing boat",
    "date": "Winter 2022"
  },
  {
    "src": "images/caribbean_diamond.JPG",
    "location": "Martinique",
    "caption": "Le Petit Piton (which isn't very petit)",
    "date": "Winter 2022"
  },
  {
    "src": "images/caribbean_leo.JPG",
    "location": "St. Lucia",
    "caption": "St. Lucia's mountains from the boat",
    "date": "Winter 2022"
  },
  {
    "src": "images/martinique_balata.jpg",
    "location": "Martinique",
    "caption": "The Balata Gardens",
    "date": "Winter 2022"
  },
  {
    "src": "images/martinique_balata_lily.jpg",
    "location": "Martinique",
    "caption": "The Balata gardens",
    "date": "Winter 2022"
  },
  {
    "src": "images/martinique_beach.jpg",
    "location": "Martinique",
    "caption": "Petite Anse des Salines – A nude beach we accidentally went to",
    "date": "Winter 2022"
  },
  {
    "src": "images/martinique_sunset2.jpg",
    "location": "Martinique",
    "caption": "Caribbean sunset",
    "date": "Winter 2022"
  },
  {
    "src": "images/caribbean_sailboat.JPG",
    "location": "Caribbean",
    "caption": "Sailboat at anchor",
    "date": "Winter 2022"
  },
  {
    "src": "images/PEI_beach.JPG",
    "location": "Prince Edward Island",
    "caption": "Red sand beach",
    "date": "Summer 2022"
  },
  {
    "src": "images/PEI_beach_horizontal.JPG",
    "location": "Prince Edward Island",
    "caption": "PEI coastline",
    "date": "Summer 2022"
  },
  {
    "src": "images/PEI_bridge.JPG",
    "location": "Prince Edward Island",
    "caption": "Confederation Bridge",
    "date": "Summer 2022"
  },
  {
    "src": "images/PEI_rocks.JPG",
    "location": "Prince Edward Island",
    "caption": "Coastal rocks",
    "date": "Summer 2022"
  },
  {
    "src": "images/PEI_shack.JPG",
    "location": "Prince Edward Island",
    "caption": "Fisherman's shack",
    "date": "Summer 2022"
  },
  {
    "src": "images/mtl_church.JPG",
    "location": "Montreal",
    "caption": "Notre-Dame Basilica",
    "date": "Ongoing"
  },
  {
    "src": "images/mtl_duluth.JPG",
    "location": "Montreal",
    "caption": "Duluth Avenue",
    "date": "Ongoing"
  },
  {
    "src": "images/sunset_family.JPG",
    "location": "Canada",
    "caption": "Family sunset",
    "date": "Summer 2022"
  },
  {
    "src": "images/paris_invalides.jpeg",
    "location": "Paris",
    "caption": "Les Invalides",
    "date": "Spring 2024"
  },
  {
    "src": "images/paris_invalides_1.JPG",
    "location": "Paris",
    "caption": "Invalides dome",
    "date": "Spring 2024"
  },
  {
    "src": "images/paris_place_de_la_concorde.jpg",
    "location": "Paris",
    "caption": "Place de la Concorde",
    "date": "Spring 2024"
  },
  {
    "src": "images/paris_tuileries.jpeg",
    "location": "Paris",
    "caption": "Tuileries Garden",
    "date": "Spring 2024"
  },
  {
    "src": "images/wedding_car.JPG",
    "location": "Special Occasions",
    "caption": "Wedding day",
    "date": "2023"
  },
  {
    "src": "images/wedding_nana.JPG",
    "location": "Special Occasions",
    "caption": "Family celebration",
    "date": "2023"
  }
];

// Load photos (now just using embedded data)
function loadPhotos() {
    try {
        console.log('Loading embedded photo data...');
        allPhotos = galleryData;
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
        
        // Create image element to check dimensions
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.caption;
        img.loading = 'lazy';
        
        // Add load event to determine if image is horizontal
        img.onload = function() {
            if (this.naturalWidth > this.naturalHeight * 1.3) {
                item.classList.add('horizontal');
            } else {
                item.classList.add('vertical');
            }
        };
        
        const overlay = document.createElement('div');
        overlay.className = 'gallery-item-overlay';
        overlay.innerHTML = `
            <div class="gallery-item-title">${photo.location}</div>
            <div class="gallery-item-caption">${photo.caption}</div>
            <div class="gallery-item-date">${photo.date}</div>
        `;
        
        item.appendChild(img);
        item.appendChild(overlay);
        item.addEventListener('click', () => openLightbox(index));
        gallery.appendChild(item);
    });
    
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
        lightboxImg.src = photo.src;
        lightboxImg.alt = photo.caption;
        
        if (lightboxTitle) lightboxTitle.textContent = photo.location;
        if (lightboxDesc) lightboxDesc.textContent = photo.caption;
        if (lightboxDate) lightboxDate.textContent = photo.date;
        
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Update slideshow controls visibility
        updateSlideshowControls();
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
    updateLightboxContent();
}

function prevPhoto() {
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
        lightboxImg.src = photo.src;
        lightboxImg.alt = photo.caption;
        
        if (lightboxTitle) lightboxTitle.textContent = photo.location;
        if (lightboxDesc) lightboxDesc.textContent = photo.caption;
        if (lightboxDate) lightboxDate.textContent = photo.date;
    }
}

function updateSlideshowControls() {
    const navButtons = document.querySelectorAll('.lightbox-nav');
    const caption = document.querySelector('.lightbox-caption');
    
    if (isSlideshow) {
        navButtons.forEach(btn => btn.classList.add('slideshow-hidden'));
        if (caption) caption.classList.add('slideshow-hidden');
    } else {
        navButtons.forEach(btn => btn.classList.remove('slideshow-hidden'));
        if (caption) caption.classList.remove('slideshow-hidden');
    }
}

// Slideshow functionality
function startSlideshow() {
    if (allPhotos.length === 0) {
        console.log('No photos loaded for slideshow');
        return;
    }
    
    isSlideshow = true;
    
    // If lightbox isn't open, open it with first photo
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || lightbox.style.display !== 'flex') {
        currentPhotoIndex = 0;
        openLightbox(currentPhotoIndex);
    }
    
    updateSlideshowControls();
    
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
    
    updateSlideshowControls();
    
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
