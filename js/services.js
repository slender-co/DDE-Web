/**
 * Services Page JavaScript
 * Handles smooth scrolling to service sections and active navigation highlighting
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    initializeServiceNavigation();
    handleAnchorLinks();
});

/**
 * Handle anchor links from homepage
 * Scrolls to the specific service section when arriving from a link
 */
function handleAnchorLinks() {
    const hash = window.location.hash;
    if (hash) {
        // Wait for page to fully load
        setTimeout(() => {
            const target = document.querySelector(hash);
            if (target) {
                const headerOffset = 120;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Highlight the active nav item
                updateActiveNav(hash);
            }
        }, 100);
    }
}

/**
 * Initialize service navigation
 */
function initializeServiceNavigation() {
    const navLinks = document.querySelectorAll('.service-nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Update active nav on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        if (current) {
            updateActiveNav(`#${current}`);
        }
    });
    
    // Handle click on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 120;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without triggering scroll
                history.pushState(null, null, targetId);
                
                updateActiveNav(targetId);
            }
        });
    });
}

/**
 * Update active navigation state
 */
function updateActiveNav(activeId) {
    const navLinks = document.querySelectorAll('.service-nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === activeId) {
            link.classList.add('text-[#FFC107]', 'border-[#FFC107]');
            link.classList.remove('text-stone-600', 'border-transparent');
        } else {
            link.classList.remove('text-[#FFC107]', 'border-[#FFC107]');
            link.classList.add('text-stone-600', 'border-transparent');
        }
    });
}

