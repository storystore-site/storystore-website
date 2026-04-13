// ==========================================
// The Story Store - Main JavaScript
// ==========================================

// ==========================================
// Mobile Menu Toggle
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const dropdown = document.querySelector('.dropdown');
    const navLink = dropdown?.querySelector('.nav-link');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
        
        // Handle dropdown toggle in mobile menu
        if (navLink && window.innerWidth <= 968) {
            navLink.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
        
        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.main-nav a:not(.nav-link)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                dropdown?.classList.remove('active');
            });
        });
        
        // Also close for dropdown menu items
        const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                dropdown?.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !mainNav.contains(e.target)) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                dropdown?.classList.remove('active');
            }
        });
    }
    
    // Re-enable dropdown hover on desktop resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 968) {
            dropdown?.classList.remove('active');
            mainNav?.classList.remove('active');
            menuToggle?.classList.remove('active');
        }
    });
});

    // ==========================================
    // Catalogue search 
    // ==========================================
    const SEARCH_BASE_URL = 'https://storystore.ath.nz/index.php/search';
    const SEARCH_PARAM    = 's';

    const searchForm  = document.getElementById('catalogue-search');
    const searchInput = document.getElementById('search-input');

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const term = searchInput.value.trim();
            if (!term) return;
            const url = `${SEARCH_BASE_URL}?${SEARCH_PARAM}=${encodeURIComponent(term)}`;
            window.open(url, '_blank', 'noopener');
            searchInput.value = '';
        });
    }

// ==========================================
// Interactive Map with School Locations
// ==========================================
function initMap() {
    console.log('Attempting to initialize map...');
    
    const mapElement = document.getElementById('map');
    if (!mapElement) {
        console.error('Map element not found');
        return;
    }
    
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded');
        return;
    }
    
    console.log('Map element and Leaflet found, creating map...');
    
    try {
        // New Zealand centered coordinates
        const map = L.map('map', {
            center: [-36.8485, 174.7633], // Auckland center
            zoom: 10,
            scrollWheelZoom: true,
            zoomControl: true
        });
        
        console.log('Map created successfully');
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);
        
        console.log('Tile layer added');
        
        // Custom icon for schools
        const schoolIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: #FF4441; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        
        // School locations data - all schools helped by The Story Store
        const schools = [
            { name: "St Mary's Catholic School, Avondale", lat: -36.901769, lng: 174.694193, url: "https://www.stmarysavondale.school.nz/" },
            { name: "Waatea School, Māngere", lat: -36.960716, lng: 174.802431, url: "https://www.waatea.school.nz/" },
            { name: "Kelston Girls' College, Kelston", lat: -36.906505, lng: 174.664083, url: "https://www.kelstongirls.school.nz/" },
            { name: "Balmoral SDA School, Balmoral", lat: -36.8877918, lng: 174.7446968, url: "https://www.balmoralsda.school.nz/" },
            { name: "Harrisville Primary", lat: -37.239965, lng: 174.951571, url: "https://www.harrisville.school.nz/" },
            { name: "Edmonton Primary", lat: -36.86594, lng: 174.6402195, url: "https://www.edmonton-primary.school.nz/" },
            { name: "Hare Krishna School", lat: -36.7698845, lng: 174.5886856, url: "https://www.harekrishna.school.nz/" },
            { name: "St Joseph's Otahuhu", lat: -36.9446587, lng: 174.8449329, url: "https://www.stjosephsotahuhu.school.nz/" },
            { name: "Holy Family School, Porirua", lat: -41.1401813, lng: 174.856658, url: "https://www.holyfamily.school.nz/" },
            { name: "Liston College, Henderson", lat: -36.8662873, lng: 174.6205178, url: "https://www.liston.school.nz/" },
            { name: "Chaucer School, Blockhouse Bay", lat: -36.9149071, lng: 174.6919779, url: "https://www.chaucer.school.nz/" },
            { name: "Rowandale School, Manurewa", lat: -37.0246767, lng: 174.8723607, url: "https://www.rowandale.school.nz/" },
            { name: "Pomaria Road School, Henderson", lat: -36.86140698, lng: 174.62635920, url: "https://pomaria.school.nz/" },
            { name: "Waterlea School, Māngere Bridge", lat: -36.9437048, lng: 174.7703739, url: "https://www.waterlea.school.nz/" },
            { name: "St Therese, Mt Roskill", lat: -36.908619, lng: 174.7468862, url: "https://sainttherese.school.nz/" },
            { name: "Horeke School", lat: -35.3595776, lng: 173.5773707, url: "https://www.horeke.school.nz/" },
            { name: "Mangamuka School, Hokianga", lat: -35.2139517, lng: 173.5347848, url: "https://mangamukaschool.weebly.com/" },
            { name: "Matihetihe School, Hokianga", lat: -35.438008, lng: 173.2819125, url: null },
            { name: "Herekino School", lat: -35.2630941, lng: 173.208167, url: "https://www.herekino.school.nz/" },
            { name: "Pokuru School", lat: -38.0565676, lng: 175.2342273, url: "https://pokuru.school.nz/" },
            { name: "Glenavon School", lat: -36.9102077, lng: 174.6995213, url: "https://www.glenavon.school.nz/" },
            { name: "Little Pearls", lat: -36.9101673, lng: 174.6814484, url: "https://www.littlepearls.org.nz/" },
            { name: "Iqra School, New Lynn", lat: -36.9072096, lng: 174.6788084, url: "https://www.iqra.school.nz/" },
            { name: "Postgate School", lat: -41.1123277, lng: 174.8771208, url: "https://www.postgate.school.nz/" },
            { name: "Te Papapa School", lat: -36.9152052, lng: 174.7970525, url: "https://www.tepapapa.school.nz/" },
            { name: "May Road School", lat: -36.9153535, lng: 174.7282249, url: "https://www.mayroad.school.nz/" },
            { name: "Waimahia Intermediate", lat: -37.0363045, lng: 174.8635214, url: "https://www.waimahia.school.nz/" },
            { name: "Te Hapara School, Gisborne", lat: -38.6513371, lng: 177.9985925, url: "https://www.tehapara.school.nz/" },
            { name: "Ruapotaka School", lat: -36.8879681, lng: 174.8581398, url: "https://www.ruapotaka.school.nz/" },
            { name: "Henderson Intermediate", lat: -36.86078, lng: 174.62730, url: "https://www.hendersonint.school.nz/" },
            { name: "Zayed College", lat: -36.9788397, lng: 174.7899422, url: "https://www.zayedcollege.school.nz/" },
            { name: "Henderson North School", lat: -36.8695393, lng: 174.6233069, url: "https://www.hns.school.nz/" },
            { name: "Rosebank School, Auckland", lat: -36.8892878, lng: 174.6840847, url: "https://www.rosebank.school.nz/" },
            { name: "Mangere Central School", lat: -36.9736235, lng: 174.7885664, url: "https://mangerecentral.weebly.com/" },
            { name: "Northern Health School", lat: -35.7258202, lng: 174.3206573, url: "https://www.nhs.school.nz/" },
            { name: "Rosehill Intermediate", lat: -37.0777281, lng: 174.9332309, url: "https://rosehillintermediate.school.nz/" },
            { name: "Oranga Primary School", lat: -36.9072563, lng: 174.7984679, url: "https://www.oranga.school.nz/" },
            { name: "Sommerville Special School", lat: -36.8933525, lng: 174.8616974, url: "https://www.sommervillespecialschool.school.nz/" },
            { name: "St Michael's School, Newmarket", lat: -36.8727567, lng: 174.7818377, url: "https://www.smcs.school.nz/" },
            { name: "Fairburn School, Otahuhu", lat: -36.9482496, lng: 174.8473088, url: "https://www.fairburn.school.nz/" },
            { name: "Birdwood School, Ranui", lat: -36.8558873, lng: 174.5991412, url: "https://www.birdwood.school.nz/" },
            { name: "Moanataiari School, Thames", lat: -37.1291008, lng: 175.5296963, url: "https://moana.school.nz/" },
            { name: "St Patrick's School, Panmure", lat: -36.9021983, lng: 174.8543854, url: "https://www.saintpatricks.school.nz/" },
            { name: "Ranui School", lat: -36.8658075, lng: 174.6004291, url: "https://www.ranui.school.nz/" }
        ];
        
        // Add markers for each school
        schools.forEach(school => {
            const popupContent = `
                <div style="text-align: center; padding: 0.5rem;">
                    <h4 style="margin: 0 0 0.5rem 0; color: #FF4441; font-size: 1rem;">${school.name}</h4>
                    ${school.url ? `<a href="${school.url}" target="_blank" rel="noopener noreferrer" style="color: #252c7c; text-decoration: underline; font-size: 0.9rem;">Visit School Website →</a>` : ''}
                </div>
            `;
            
            const marker = L.marker([school.lat, school.lng], { icon: schoolIcon })
                .addTo(map)
                .bindPopup(popupContent);
            
            // Add hover effect
            marker.on('mouseover', function() {
                this.openPopup();
            });
        });
        
        console.log('All markers added');
        
        // Fit bounds to show all markers
        if (schools.length > 0) {
            const bounds = L.latLngBounds(schools.map(s => [s.lat, s.lng]));
            map.fitBounds(bounds, { padding: [50, 50] });
        }
        
        console.log('Map initialization complete!');
        
    } catch (error) {
        console.error('Error initializing map:', error);
    }
}

// Wait for both DOM and window to be fully loaded
window.addEventListener('load', function() {
    console.log('Window loaded, waiting 100ms before initializing map...');
    setTimeout(initMap, 100);
});

// ==========================================
// Carousel Functionality
// ==========================================
const initCarousel = () => {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const images = track.querySelectorAll('img');
    const imageWidth = 280; // Width of each image
    const gap = 16; // Gap between images
    const slideAmount = imageWidth + gap;
    
    let currentPosition = 0;
    const maxScroll = -(slideAmount * (images.length - Math.floor(track.offsetWidth / slideAmount)));
    
    const updateCarousel = () => {
        track.style.transform = `translateX(${currentPosition}px)`;
        
        // Update button states
        prevBtn.disabled = currentPosition >= 0;
        nextBtn.disabled = currentPosition <= maxScroll;
        
        prevBtn.style.opacity = currentPosition >= 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentPosition <= maxScroll ? '0.5' : '1';
    };
    
    prevBtn.addEventListener('click', () => {
        if (currentPosition < 0) {
            currentPosition += slideAmount * 3; // Move 3 images at a time
            if (currentPosition > 0) currentPosition = 0;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentPosition > maxScroll) {
            currentPosition -= slideAmount * 3; // Move 3 images at a time
            if (currentPosition < maxScroll) currentPosition = maxScroll;
            updateCarousel();
        }
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let isDragging = false;
    let startPosition = 0;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        startPosition = currentPosition;
        track.style.transition = 'none';
    });
    
    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        const newPosition = startPosition + diff;
        
        if (newPosition <= 0 && newPosition >= maxScroll) {
            currentPosition = newPosition;
            track.style.transform = `translateX(${currentPosition}px)`;
        }
    });
    
    track.addEventListener('touchend', () => {
        isDragging = false;
        track.style.transition = 'transform 0.4s ease';
        updateCarousel();
    });
    
    // Recalculate on window resize
    window.addEventListener('resize', () => {
        currentPosition = 0;
        updateCarousel();
    });
    
    // Initial update
    updateCarousel();
};

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
} else {
    initCarousel();
}

// ==========================================
// Smooth Scroll with Offset for Fixed Header
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or empty
        if (!href || href === '#') return;
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            e.preventDefault();
            
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight - 20;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Intersection Observer for Scroll Animations
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about-section-item, .news-item, .contact-container');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add fade-in class styles dynamically
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ==========================================
// Header Shadow on Scroll
// ==========================================
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// Video Autoplay Optimization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('video');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(err => console.log('Video autoplay prevented:', err));
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });
    
    videos.forEach(video => videoObserver.observe(video));
});

// ==========================================
// Tooltip Functionality (for body links)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const tooltipLinks = document.querySelectorAll('[data-tooltip]');
    
    tooltipLinks.forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--story-grey);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-size: 0.875rem;
                white-space: nowrap;
                pointer-events: none;
                z-index: 1000;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
            
            this._tooltip = tooltip;
        });
        
        link.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                delete this._tooltip;
            }
        });
    });
});

// ==========================================
// Number Animation (for statistics)
// ==========================================
const animateNumber = (element, target) => {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
};

document.addEventListener('DOMContentLoaded', () => {
    const numberElements = document.querySelectorAll('.highlight-number');
    
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.textContent.replace(/,/g, ''));
                animateNumber(element, target);
                numberObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    numberElements.forEach(el => numberObserver.observe(el));
});

// ==========================================
// Expanding Image Effect
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const expandingImg = document.getElementById('expandingImg') || document.querySelector('.expanding-image');
    
    if (expandingImg) {
        console.log('Expanding image found, setting up animation');
        
        const updateImageWidth = function () {
            const rect = expandingImg.getBoundingClientRect();
            const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
            
            if (scrollProgress > 0 && scrollProgress < 1) {
                const width = 60 + (scrollProgress * 40); // 60% to 100%
                expandingImg.style.width = width + '%';
            }
        };
        
        // Run on scroll
        window.addEventListener('scroll', updateImageWidth);
        
        // Run once on load to set initial state
        updateImageWidth();
    } else {
        console.error('Expanding image element not found');
    }
});

// ==========================================
// Lazy Loading for Images
// ==========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.addEventListener('DOMContentLoaded', () => {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    });
}

// ==========================================
// Console Easter Egg
// ==========================================
console.log('%c📚 The Story Store', 'font-size: 24px; font-weight: bold; color: #FF4441;');
console.log('%cCollecting and sharing great books so all tamariki have access to stories they love', 'font-size: 14px; color: #58595B;');
console.log('%cInterested in contributing? Visit us at storystore.org.nz', 'font-size: 12px; color: #252c7c;');
