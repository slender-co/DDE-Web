/**
 * Gallery Page Functionality
 * Handles filtering, lightbox, and dynamic gallery loading
 */

let galleryData = [];
let currentFilter = 'all';

/**
 * Load gallery data from JSON file
 */
async function loadGalleryData() {
    try {
        const response = await fetch('data/gallery-full.json');
        const data = await response.json();
        galleryData = data.items || [];
        renderGallery();
    } catch (error) {
        console.error('Error loading gallery data:', error);
        document.getElementById('gallery-grid').innerHTML = 
            '<p class="col-span-full text-center text-stone-500">Error loading gallery. Please refresh the page.</p>';
    }
}

/**
 * Filter gallery items by category
 */
function filterGallery(category) {
    currentFilter = category;
    
    // Update active filter button
    document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
        if (btn.dataset.filter === category) {
            btn.classList.add('active', 'bg-[#FFC107]', 'text-[#1a1a1a]');
            btn.classList.remove('text-stone-600', 'hover:bg-stone-100');
        } else {
            btn.classList.remove('active', 'bg-[#FFC107]', 'text-[#1a1a1a]');
            btn.classList.add('text-stone-600', 'hover:bg-stone-100');
        }
    });
    
    renderGallery();
}

/**
 * Render gallery items based on current filter
 */
function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    
    // Filter items
    const filteredItems = currentFilter === 'all' 
        ? galleryData 
        : galleryData.filter(item => item.category === currentFilter);
    
    if (filteredItems.length === 0) {
        grid.innerHTML = '<p class="col-span-full text-center text-stone-500 py-12">No items found in this category.</p>';
        return;
    }
    
    // Render items
    grid.innerHTML = filteredItems.map(item => `
        <div class="gallery-item group cursor-pointer" data-id="${item.id}">
            <div class="relative overflow-hidden rounded-lg shadow-lg bg-stone-200 aspect-[4/3]">
                <img 
                    src="${item.image}" 
                    alt="${item.title}"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 class="text-lg font-bold mb-2 uppercase">${item.title}</h3>
                        ${item.description ? `<p class="text-sm text-stone-300">${item.description}</p>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click handlers for lightbox
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const itemId = item.dataset.id;
            const galleryItem = galleryData.find(i => i.id === itemId);
            if (galleryItem) {
                openLightbox(galleryItem);
            }
        });
    });
}

/**
 * Open lightbox with image
 */
function openLightbox(item) {
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    
    if (!lightbox || !lightboxImage) return;
    
    lightboxImage.src = item.image;
    lightboxImage.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxDescription.textContent = item.description || '';
    
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

/**
 * Close lightbox
 */
function closeLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox) return;
    
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = '';
}

/**
 * Initialize gallery functionality
 */
function initializeGallery() {
    // Load gallery data
    loadGalleryData();
    
    // Filter button handlers
    document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            filterGallery(filter);
        });
    });
    
    // Lightbox close handlers
    const lightboxClose = document.getElementById('lightbox-close');
    const lightbox = document.getElementById('gallery-lightbox');
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGallery);
} else {
    initializeGallery();
}
