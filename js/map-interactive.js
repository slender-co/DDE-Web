/**
 * Interactive Map System for Active Sites
 * Uses Leaflet for real map integration
 */

let map = null;
let markers = [];
let selectedProject = null;
let projectsData = [];

// Initialize map when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeViewToggle();
    loadProjectsData();
    // Initialize navigation after a short delay to ensure DOM is ready
    setTimeout(() => {
        initializeProjectNavigation();
    }, 500);
});

/**
 * Load projects from JSON file
 */
async function loadProjectsData() {
    try {
        const response = await fetch('data/projects.json');
        const data = await response.json();
        projectsData = data.projects;
        initializeMap();
        renderProjectList();
        initializeCategoryFilters();
    } catch (error) {
        console.error('Error loading projects data:', error);
        // Fallback to hardcoded data if JSON fails
        projectsData = getDefaultProjects();
        initializeMap();
        renderProjectList();
        initializeCategoryFilters();
    }
}

/**
 * Default projects (fallback)
 */
function getDefaultProjects() {
    return [
        {
            id: "napa",
            name: "Napa Valley Estate",
            projectId: "#NV-2024-08",
            status: "Active",
            address: "1234 Silverado Trail, Napa, CA 94558",
            coordinates: { lat: 38.2975, lng: -122.2869, display: "38.2975° N, 122.2869° W" },
            jobSize: "Large Scale",
            workType: "Estate Development",
            type: "Structural",
            category: "Commercial",
            features: ["Custom Foundation Design", "Site Grading", "Utility Installation"],
            description: "Large-scale site development with comprehensive excavation and foundation work.",
            startDate: "2024-03-15",
            estimatedCompletion: "2024-11-30"
        },
        {
            id: "sonoma",
            name: "Sonoma Commercial Site",
            projectId: "#SV-2024-12",
            status: "In Progress",
            address: "5678 Sonoma Highway, Sonoma, CA 95476",
            coordinates: { lat: 38.2919, lng: -122.4580, display: "38.2919° N, 122.4580° W" },
            jobSize: "Medium Scale",
            workType: "Land Development",
            type: "Commercial",
            category: "Infrastructure",
            features: ["Site Grading", "Land Development", "Access Roads"],
            description: "Comprehensive site development including land preparation and grading.",
            startDate: "2024-05-01",
            estimatedCompletion: "2025-02-15"
        },
        {
            id: "santa-barbara",
            name: "Santa Barbara Modern",
            projectId: "#SB-2023-99",
            status: "Final Phase",
            address: "9012 State Street, Santa Barbara, CA 93101",
            coordinates: { lat: 34.4208, lng: -119.6982, display: "34.4208° N, 119.6982° W" },
            jobSize: "Large Scale",
            workType: "Residential Construction",
            type: "Residential",
            category: "Residential",
            features: ["Modern Architecture", "Energy Efficient", "Smart Home Integration"],
            description: "Contemporary residential construction with cutting-edge design.",
            startDate: "2023-08-20",
            estimatedCompletion: "2024-12-31"
        }
    ];
}

/**
 * Initialize Leaflet map
 */
function initializeMap() {
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) return;

    // Wait a bit to ensure container has dimensions
    setTimeout(() => {
        // Clear any existing map
        if (map) {
            map.remove();
        }

        // Initialize map centered on California
        map = L.map('map-container', {
            center: [36.7783, -119.4179], // Center of California
            zoom: 6,
            zoomControl: false, // We'll add custom controls
            attributionControl: true
        });

    // Add dark theme tile layer (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Add custom zoom controls
    const zoomControl = L.control.zoom({
        position: 'bottomright'
    });
    zoomControl.addTo(map);

    // Style the zoom controls
    setTimeout(() => {
        const zoomControls = document.querySelector('.leaflet-control-zoom');
        if (zoomControls) {
            zoomControls.classList.add('custom-zoom-controls');
        }
    }, 100);

        // Add markers for each project
        renderMarkers();

        // Invalidate size to ensure proper rendering
        setTimeout(() => {
            if (map) {
                map.invalidateSize();
            }
        }, 200);
    }, 100);
}

/**
 * Render markers on map
 */
function renderMarkers() {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    projectsData.forEach(project => {
        const marker = createMarker(project);
        markers.push(marker);
        marker.addTo(map);
    });

    // Fit map to show all markers if there are multiple
    if (markers.length > 1) {
        const group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
    } else if (markers.length === 1) {
        map.setView([markers[0].getLatLng().lat, markers[0].getLatLng().lng], 10);
    }
}

/**
 * Create a marker for a project
 */
function createMarker(project) {
    const isActive = project.status === 'Active';
    const statusColors = {
        'Active': '#FFC107',
        'In Progress': '#3B82F6',
        'Final Phase': '#10B981',
        'Completed': '#6B7280',
        'Scheduled': '#A855F7'
    };

    const markerColor = statusColors[project.status] || '#6B7280';

    // Create custom icon
    const icon = L.divIcon({
        className: 'custom-marker',
        html: `
            <div class="marker-container ${isActive ? 'active' : ''}" style="--marker-color: ${markerColor};">
                <div class="marker-pin"></div>
                ${isActive ? '<div class="marker-pulse"></div>' : ''}
            </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24]
    });

    const marker = L.marker(
        [project.coordinates.lat, project.coordinates.lng],
        { icon: icon }
    );

    // Create popup content
    const popupContent = createPopupContent(project);
    marker.bindPopup(popupContent, {
        className: 'project-popup',
        maxWidth: 320,
        maxHeight: 600,
        closeButton: true,
        autoPan: true
    });


    // Add click handler
    marker.on('click', () => {
        selectProject(project.id);
    });

    return marker;
}

/**
 * Create popup content HTML
 */
function createPopupContent(project) {
    const statusColors = {
        'Active': '#FFC107',
        'In Progress': '#3B82F6',
        'Final Phase': '#10B981',
        'Completed': '#6B7280',
        'Scheduled': '#A855F7'
    };

    const statusColor = statusColors[project.status] || '#6B7280';

    return `
        <div class="popup-content">
            <div class="popup-header">
                <div class="popup-title-section">
                    <h5 class="popup-title">${project.name}</h5>
                    <p class="popup-address">${project.address || project.coordinates.display}</p>
                    <p class="popup-id">${project.projectId}</p>
                </div>
                <button class="popup-close" onclick="this.closest('.leaflet-popup').closePopup()" aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="M6 6l12 12"></path></svg>
                </button>
            </div>
            
            <div class="popup-status">
                <span class="status-badge" style="color: ${statusColor}; border-color: ${statusColor}; background: ${statusColor}20;">${project.status}</span>
                <span class="type-badge">${project.type || 'General'}</span>
                ${project.category ? `<span class="category-badge">${project.category}</span>` : ''}
            </div>

            <div class="popup-stats">
                <div class="stat-item">
                    <span class="stat-label">Project Scale</span>
                    <span class="stat-value">${project.jobSize || 'Not Specified'}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Work Type</span>
                    <span class="stat-value">${project.workType || 'General Construction'}</span>
                </div>
            </div>

            <div class="popup-features">
                <h6 class="features-title">Project Highlights</h6>
                <div class="features-grid">
                    ${project.features.map(feature => `
                        <div class="feature-item">
                            <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span class="feature-text">${feature}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

/**
 * Select a project
 */
function selectProject(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    selectedProject = projectId;

    // Update sidebar selection
    updateSidebarSelection(projectId);

    // Find and open marker popup
    const marker = markers.find(m => {
        const latLng = m.getLatLng();
        const proj = projectsData.find(p => 
            Math.abs(p.coordinates.lat - latLng.lat) < 0.001 && 
            Math.abs(p.coordinates.lng - latLng.lng) < 0.001
        );
        return proj && proj.id === projectId;
    });

    if (marker) {
        map.setView([project.coordinates.lat, project.coordinates.lng], 12);
        marker.openPopup();
        // Button will be added via popupopen event
    }
}

/**
 * Update sidebar selection
 */
function updateSidebarSelection(projectId) {
    const sidebarItems = document.querySelectorAll('.project-list-item');
    sidebarItems.forEach(item => {
        if (item.dataset.projectId === projectId) {
            item.classList.add('active');
            item.classList.remove('inactive');
        } else {
            item.classList.remove('active');
            item.classList.add('inactive');
        }
    });
}

/**
 * Initialize category filters
 */
function initializeCategoryFilters() {
    const filterContainer = document.getElementById('category-filters');
    if (!filterContainer) return;

    // Get unique categories from projects
    const categories = ['all', ...new Set(projectsData.map(p => p.category).filter(Boolean))];
    
    // Clear existing filters (except "All")
    const existingFilters = filterContainer.querySelectorAll('.category-filter-btn:not([data-category="all"])');
    existingFilters.forEach(btn => btn.remove());

    // Add click handler to "All" button
    const allBtn = filterContainer.querySelector('[data-category="all"]');
    if (allBtn) {
        allBtn.addEventListener('click', () => {
            filterByCategory('all');
            // Update active state
            filterContainer.querySelectorAll('.category-filter-btn').forEach(b => {
                b.classList.remove('active', 'bg-[#FFC107]/20', 'border-[#FFC107]/30', 'text-white');
                b.classList.add('text-stone-400', 'border-white/10');
            });
            allBtn.classList.add('active', 'bg-[#FFC107]/20', 'border-[#FFC107]/30', 'text-white');
            allBtn.classList.remove('text-stone-400', 'border-white/10');
        });
    }
    
    // Add category buttons
    categories.forEach(category => {
        if (category === 'all') return; // "All" already exists
        
        const btn = document.createElement('button');
        btn.className = 'category-filter-btn px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider text-stone-400 border border-white/10 hover:text-white hover:border-[#FFC107]/30 transition-all';
        btn.dataset.category = category;
        btn.textContent = category;
        
        btn.addEventListener('click', () => {
            filterByCategory(category);
            // Update active state
            filterContainer.querySelectorAll('.category-filter-btn').forEach(b => {
                b.classList.remove('active', 'bg-[#FFC107]/20', 'border-[#FFC107]/30', 'text-white');
                b.classList.add('text-stone-400', 'border-white/10');
            });
            btn.classList.add('active', 'bg-[#FFC107]/20', 'border-[#FFC107]/30', 'text-white');
            btn.classList.remove('text-stone-400', 'border-white/10');
        });
        
        filterContainer.appendChild(btn);
    });
}

/**
 * Filter projects by category
 */
function filterByCategory(category) {
    const filteredProjects = category === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.category === category);
    
    renderFilteredProjectList(filteredProjects);
}

/**
 * Render filtered project list
 */
function renderFilteredProjectList(projects) {
    const projectList = document.getElementById('project-list');
    if (!projectList) return;

    projectList.innerHTML = '';

    projects.forEach(project => {
        const item = document.createElement('div');
        item.className = 'project-list-item group p-5 border-b border-white/5 cursor-pointer transition-all relative';
        item.dataset.projectId = project.id;

        const isActive = project.status === 'Active';
        const statusColors = {
            'Active': '#FFC107',
            'In Progress': '#3B82F6',
            'Final Phase': '#10B981',
            'Completed': '#6B7280'
        };
        const statusColor = statusColors[project.status] || '#6B7280';

        item.innerHTML = `
            ${isActive ? '<div class="absolute left-0 top-0 bottom-0 w-1 bg-[#FFC107]"></div>' : ''}
            <div class="flex justify-between items-start mb-2">
                <h4 class="text-white font-bold text-sm uppercase ${!isActive ? 'text-stone-400 group-hover:text-white' : ''} transition-colors">${project.name}</h4>
                <span class="flex h-2 w-2 rounded-full" style="background-color: ${statusColor};"></span>
            </div>
            <p class="text-stone-500 text-xs mb-1 font-mono">${project.projectId}</p>
            <p class="text-stone-600 text-xs mb-3">${project.address || project.coordinates.display}</p>
            <div class="flex gap-2 flex-wrap mb-3">
                <span class="px-2 py-1 rounded text-[10px] bg-stone-800 text-stone-400 border border-white/5 uppercase font-bold">${project.type || 'General'}</span>
                ${project.category ? `<span class="px-2 py-1 rounded text-[10px] bg-[#FFC107]/10 text-[#FFC107] border border-[#FFC107]/20 uppercase font-bold">${project.category}</span>` : ''}
                <span class="px-2 py-1 rounded text-[10px] uppercase font-bold border" style="color: ${statusColor}; border-color: ${statusColor}; background: ${statusColor}20;">${project.status}</span>
            </div>
            <div class="pt-3 border-t border-white/5 space-y-2 mb-3">
                <div class="flex justify-between items-center">
                    <span class="text-stone-500 uppercase font-bold text-[10px]">Scale</span>
                    <span class="text-white font-bold text-xs">${project.jobSize || 'Not Specified'}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-stone-500 uppercase font-bold text-[10px]">Work Type</span>
                    <span class="text-white font-bold text-xs">${project.workType || 'General'}</span>
                </div>
            </div>
            <button class="directions-btn-list w-full mt-2" data-project-id="${project.id}" aria-label="Get Directions">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Get Directions</span>
            </button>
        `;

        item.addEventListener('click', () => {
            selectProject(project.id);
        });
        
        // Add directions button handler
        const directionsBtn = item.querySelector('.directions-btn-list');
        if (directionsBtn) {
            directionsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                window.openDirections(
                    project.address || `${project.coordinates.lat},${project.coordinates.lng}`,
                    project.coordinates.lat,
                    project.coordinates.lng
                );
            });
        }

        projectList.appendChild(item);
    });
    
    // Update navigation arrows after rendering
    if (window.updateProjectNavigationArrows) {
        window.updateProjectNavigationArrows();
    }
}

/**
 * Render project list in sidebar
 */
function renderProjectList() {
    renderFilteredProjectList(projectsData);
}

/**
 * Initialize view toggle buttons
 */
function initializeViewToggle() {
    const indexBtn = document.getElementById('view-index-btn');
    const summaryBtn = document.getElementById('view-summary-btn');
    const sidebarTitle = document.getElementById('sidebar-title');

    if (indexBtn) {
        indexBtn.addEventListener('click', () => {
            showProjectIndex();
            indexBtn.classList.add('bg-[#FFC107]', 'text-white');
            indexBtn.classList.remove('text-stone-400');
            if (summaryBtn) {
                summaryBtn.classList.remove('bg-[#FFC107]', 'text-white');
                summaryBtn.classList.add('text-stone-400');
            }
            if (sidebarTitle) {
                sidebarTitle.textContent = 'Project Index';
            }
        });
    }

    if (summaryBtn) {
        summaryBtn.addEventListener('click', () => {
            showSummaryView();
            summaryBtn.classList.add('bg-[#FFC107]', 'text-white');
            summaryBtn.classList.remove('text-stone-400');
            if (indexBtn) {
                indexBtn.classList.remove('bg-[#FFC107]', 'text-white');
                indexBtn.classList.add('text-stone-400');
            }
            if (sidebarTitle) {
                sidebarTitle.textContent = 'Summary';
            }
        });
    }
}

/**
 * Show project index view (list)
 */
function showProjectIndex() {
    const indexView = document.getElementById('project-index-view');
    const summaryView = document.getElementById('summary-view');
    
    if (indexView && summaryView) {
        indexView.classList.remove('hidden');
        summaryView.classList.add('hidden');
    }
}

/**
 * Show summary view (cards)
 */
function showSummaryView() {
    const indexView = document.getElementById('project-index-view');
    const summaryView = document.getElementById('summary-view');
    
    if (indexView && summaryView) {
        indexView.classList.add('hidden');
        summaryView.classList.remove('hidden');
        renderSummaryCards();
    }
}

/**
 * Render summary cards
 */
function renderSummaryCards() {
    const summaryGrid = document.getElementById('summary-grid');
    if (!summaryGrid) return;

    summaryGrid.innerHTML = '';

    projectsData.forEach(project => {
        const card = document.createElement('div');
        card.className = 'bg-[#1a1a1a] border border-white/10 rounded-lg p-4 hover:border-[#FFC107] transition-all cursor-pointer';
        card.dataset.projectId = project.id;

        const statusColors = {
            'Active': '#FFC107',
            'In Progress': '#3B82F6',
            'Final Phase': '#10B981',
            'Completed': '#6B7280',
            'Scheduled': '#A855F7'
        };

        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                    <h4 class="text-white font-bold text-sm uppercase mb-1">${project.name}</h4>
                    <p class="text-stone-500 text-[10px] font-mono mb-1">${project.projectId}</p>
                    <p class="text-stone-400 text-xs">${project.address || project.coordinates.display}</p>
                </div>
                <span class="text-[9px] uppercase font-bold border px-2 py-1 rounded flex-shrink-0 ml-2" style="color: ${statusColors[project.status] || '#6B7280'}; border-color: ${statusColors[project.status] || '#6B7280'}; background: ${statusColors[project.status] || '#6B7280'}20;">${project.status}</span>
            </div>
            
            <p class="text-stone-400 text-xs mb-3 leading-relaxed line-clamp-2">${project.description}</p>
            
            <div class="flex gap-2 flex-wrap mb-3">
                <span class="px-2 py-1 rounded text-[9px] bg-stone-800 text-stone-400 border border-white/5 uppercase font-bold">${project.type || 'General'}</span>
                ${project.category ? `<span class="px-2 py-1 rounded text-[9px] bg-[#FFC107]/10 text-[#FFC107] border border-[#FFC107]/20 uppercase font-bold">${project.category}</span>` : ''}
            </div>
            
            <div class="grid grid-cols-2 gap-2 mb-3">
                <div class="bg-stone-800/50 p-2 rounded border border-white/5">
                    <span class="block text-[9px] text-stone-500 uppercase font-bold mb-1">Scale</span>
                    <span class="block text-sm text-white font-bold">${project.jobSize || 'Not Specified'}</span>
                </div>
                <div class="bg-stone-800/50 p-2 rounded border border-white/5">
                    <span class="block text-[9px] text-stone-500 uppercase font-bold mb-1">Work Type</span>
                    <span class="block text-xs text-white font-bold">${project.workType || 'General'}</span>
                </div>
            </div>

            <div class="border-t border-white/10 pt-3">
                <h6 class="text-[10px] font-bold text-stone-400 uppercase mb-2">Project Highlights</h6>
                <div class="space-y-1.5">
                    ${project.features.slice(0, 3).map(feature => `
                        <div class="flex items-center gap-2">
                            <svg class="feature-icon-small" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span class="text-[10px] text-stone-300">${feature}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            showProjectIndex();
            setTimeout(() => selectProject(project.id), 100);
        });

        summaryGrid.appendChild(card);
    });
    
    // Update navigation arrows after rendering
    if (window.updateProjectNavigationArrows) {
        window.updateProjectNavigationArrows();
    }
}

/**
 * Initialize project navigation arrows
 */
function initializeProjectNavigation() {
    const projectList = document.getElementById('project-list');
    const summaryGrid = document.getElementById('summary-grid');
    const prevProjectBtn = document.getElementById('prev-project-btn');
    const nextProjectBtn = document.getElementById('next-project-btn');
    const prevSummaryBtn = document.getElementById('prev-summary-btn');
    const nextSummaryBtn = document.getElementById('next-summary-btn');
    
    // Function to jump to next/previous project (actually selects it)
    function jumpToProject(direction) {
        const items = projectList.querySelectorAll('.project-list-item');
        if (items.length === 0) return;
        
        // Find currently active/selected project
        let currentIndex = -1;
        items.forEach((item, index) => {
            if (item.classList.contains('active')) {
                currentIndex = index;
            }
        });
        
        // If no active project, use first visible one
        if (currentIndex === -1) {
            const containerRect = projectList.getBoundingClientRect();
            for (let i = 0; i < items.length; i++) {
                const itemRect = items[i].getBoundingClientRect();
                if (itemRect.top >= containerRect.top && itemRect.bottom <= containerRect.bottom) {
                    currentIndex = i;
                    break;
                }
            }
            if (currentIndex === -1) currentIndex = 0;
        }
        
        // Calculate next/previous index
        let targetIndex;
        if (direction === 'next') {
            targetIndex = (currentIndex + 1) % items.length;
        } else {
            targetIndex = (currentIndex - 1 + items.length) % items.length;
        }
        
        // Select the target project
        const targetItem = items[targetIndex];
        const projectId = targetItem.dataset.projectId;
        if (projectId) {
            selectProject(projectId);
            targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    // Function to jump to next/previous card in summary
    function jumpToSummaryCard(direction) {
        const cards = summaryGrid.querySelectorAll('[data-project-id]');
        if (cards.length === 0) return;
        
        // Find currently visible card
        const container = summaryGrid.closest('.overflow-y-auto');
        if (!container) return;
        
        const containerRect = container.getBoundingClientRect();
        let currentIndex = -1;
        
        cards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            if (cardRect.top >= containerRect.top && cardRect.bottom <= containerRect.bottom) {
                currentIndex = index;
            }
        });
        
        if (currentIndex === -1) currentIndex = 0;
        
        // Calculate next/previous index
        let targetIndex;
        if (direction === 'next') {
            targetIndex = (currentIndex + 1) % cards.length;
        } else {
            targetIndex = (currentIndex - 1 + cards.length) % cards.length;
        }
        
        // Scroll to and select the target card
        const targetCard = cards[targetIndex];
        const projectId = targetCard.dataset.projectId;
        if (projectId) {
            showProjectIndex();
            setTimeout(() => {
                selectProject(projectId);
            }, 100);
        }
    }
    
    // Update arrow visibility based on scroll position
    function updateArrowVisibility(container, prevBtn, nextBtn) {
        if (!container || !prevBtn || !nextBtn) return;
        
        const hasScroll = container.scrollHeight > container.clientHeight;
        const isAtTop = container.scrollTop <= 10;
        const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
        
        if (hasScroll) {
            prevBtn.style.opacity = isAtTop ? '0' : '1';
            prevBtn.style.pointerEvents = isAtTop ? 'none' : 'auto';
            nextBtn.style.opacity = isAtBottom ? '0' : '1';
            nextBtn.style.pointerEvents = isAtBottom ? 'none' : 'auto';
        } else {
            prevBtn.style.opacity = '0';
            prevBtn.style.pointerEvents = 'none';
            nextBtn.style.opacity = '0';
            nextBtn.style.pointerEvents = 'none';
        }
    }
    
    // Set up event listeners for project list
    if (projectList && prevProjectBtn && nextProjectBtn) {
        prevProjectBtn.addEventListener('click', () => jumpToProject('prev'));
        nextProjectBtn.addEventListener('click', () => jumpToProject('next'));
        projectList.addEventListener('scroll', () => updateArrowVisibility(projectList, prevProjectBtn, nextProjectBtn));
        // Always show arrows if there are multiple projects
        const items = projectList.querySelectorAll('.project-list-item');
        if (items.length > 1) {
            prevProjectBtn.style.opacity = '1';
            prevProjectBtn.style.pointerEvents = 'auto';
            nextProjectBtn.style.opacity = '1';
            nextProjectBtn.style.pointerEvents = 'auto';
        }
    }
    
    // Set up event listeners for summary view
    if (summaryGrid && prevSummaryBtn && nextSummaryBtn) {
        const summaryContainer = summaryGrid.closest('.overflow-y-auto');
        prevSummaryBtn.addEventListener('click', () => jumpToSummaryCard('prev'));
        nextSummaryBtn.addEventListener('click', () => jumpToSummaryCard('next'));
        if (summaryContainer) {
            summaryContainer.addEventListener('scroll', () => updateArrowVisibility(summaryContainer, prevSummaryBtn, nextSummaryBtn));
            // Always show arrows if there are multiple cards
            const cards = summaryGrid.querySelectorAll('[data-project-id]');
            if (cards.length > 1) {
                prevSummaryBtn.style.opacity = '1';
                prevSummaryBtn.style.pointerEvents = 'auto';
                nextSummaryBtn.style.opacity = '1';
                nextSummaryBtn.style.pointerEvents = 'auto';
            }
        }
    }
    
    // Store update function for use after rendering
    window.updateProjectNavigationArrows = function() {
        setTimeout(() => {
            if (projectList && prevProjectBtn && nextProjectBtn) {
                const items = projectList.querySelectorAll('.project-list-item');
                if (items.length > 1) {
                    prevProjectBtn.style.opacity = '1';
                    prevProjectBtn.style.pointerEvents = 'auto';
                    nextProjectBtn.style.opacity = '1';
                    nextProjectBtn.style.pointerEvents = 'auto';
                } else {
                    prevProjectBtn.style.opacity = '0';
                    prevProjectBtn.style.pointerEvents = 'none';
                    nextProjectBtn.style.opacity = '0';
                    nextProjectBtn.style.pointerEvents = 'none';
                }
            }
            if (summaryGrid && prevSummaryBtn && nextSummaryBtn) {
                const cards = summaryGrid.querySelectorAll('[data-project-id]');
                if (cards.length > 1) {
                    prevSummaryBtn.style.opacity = '1';
                    prevSummaryBtn.style.pointerEvents = 'auto';
                    nextSummaryBtn.style.opacity = '1';
                    nextSummaryBtn.style.pointerEvents = 'auto';
                } else {
                    prevSummaryBtn.style.opacity = '0';
                    prevSummaryBtn.style.pointerEvents = 'none';
                    nextSummaryBtn.style.opacity = '0';
                    nextSummaryBtn.style.pointerEvents = 'none';
                }
            }
        }, 100);
    };
}

/**
 * Open directions in navigation app
 * Supports Google Maps, Apple Maps, and Waze
 * Made globally accessible for onclick handlers
 */
window.openDirections = function(address, lat, lng) {
    // Detect if user is on iOS (for Apple Maps preference)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    // Create navigation URLs
    // Use coordinates for more accurate navigation
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    const appleMapsUrl = `http://maps.apple.com/?daddr=${lat},${lng}`;
    const wazeUrl = `https://www.waze.com/ul?ll=${lat},${lng}&navigate=yes`;
    
    // Try to open native app, fallback to web
    if (isIOS) {
        // On iOS, try Apple Maps first
        window.open(appleMapsUrl, '_blank');
    } else {
        // On other platforms, use Google Maps
        window.open(googleMapsUrl, '_blank');
    }
};
