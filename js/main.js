/**
 * Main JavaScript for Dirt Dudes Excavating
 * Handles animations, navigation, and interactive elements
 */

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    initializeAnimations();
    initializeNavigation();
    initializeSlider();
    initializeHeaderScroll();
});

/**
 * Initialize Hero Background Video
 */
function initializeHeroVideo() {
    const video = document.getElementById('hero-video');
    const fallback = document.getElementById('hero-fallback');
    
    if (!video) {
        console.warn('Hero video element not found');
        return;
    }
    
    console.log('Initializing hero video...');
    
    // Hide fallback initially (will show if video fails)
    if (fallback) {
        fallback.style.display = 'none';
        fallback.style.zIndex = '0';
    }
    
    video.style.zIndex = '1';
    video.style.display = 'block';
    video.style.opacity = '1';
    
    // Check if browser can play the video format
    const canPlayMP4 = video.canPlayType('video/mp4');
    const canPlayMOV = video.canPlayType('video/quicktime');
    
    console.log('Can play MP4:', canPlayMP4);
    console.log('Can play MOV:', canPlayMOV);
    
    if (canPlayMP4) {
        console.log('Browser supports MP4 - video should work!');
    }
    
    // Try to load and play video
    video.load(); // Force reload
    
    // Try to play video
    const attemptPlay = () => {
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Video is playing successfully');
                // Video is playing, hide fallback
                if (fallback) {
                    fallback.style.display = 'none';
                }
                video.style.display = 'block';
                video.style.opacity = '1';
            }).catch(error => {
                console.warn('Video autoplay failed:', error);
                console.warn('This is likely because the browser does not support .MOV files.');
                console.warn('Please convert the video to MP4 format for better compatibility.');
                // Show fallback image if video fails to play
                if (fallback) {
                    fallback.style.display = 'block';
                }
                video.style.display = 'none';
            });
        }
    };
    
    // Handle video load errors
    video.addEventListener('error', (e) => {
        console.error('Video failed to load:', e);
        console.error('Video error details:', video.error);
        // Show fallback image
        if (fallback) {
            fallback.style.display = 'block';
        }
        video.style.display = 'none';
    });
    
    // Handle video loaded successfully
    video.addEventListener('loadeddata', () => {
        console.log('Video data loaded');
        attemptPlay();
    });
    
    // Handle when video can start playing
    video.addEventListener('canplay', () => {
        console.log('Video can start playing');
        attemptPlay();
    });
    
    // Ensure video loops (backup in case loop attribute doesn't work)
    video.addEventListener('ended', () => {
        console.log('Video ended, restarting...');
        video.currentTime = 0;
        video.play().catch(() => {
            // If play fails, just restart
            video.currentTime = 0;
        });
    });
    
    // Try to play immediately
    setTimeout(() => {
        attemptPlay();
    }, 100);
    
    // Force play on user interaction (for browsers that block autoplay)
    const playOnInteraction = () => {
        if (video.paused) {
            video.play().catch(() => {});
        }
    };
    
    document.addEventListener('click', playOnInteraction, { once: true });
    document.addEventListener('touchstart', playOnInteraction, { once: true });
}

/**
 * GSAP Animations
 */
function initializeAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Title Reveal Animation
    const tl = gsap.timeline();
    
    tl.to('.reveal-text', {
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
    })
    .to('.js-fade-element', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.6");
    
    // Scroll-triggered animations for sections
    gsap.utils.toArray('section').forEach((section, index) => {
        if (index > 0) { // Skip hero section
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        }
    });
}

/**
 * Navigation Functions
 */
function initializeNavigation() {
    // Highlight current page/section on load
    updateActiveNavigation();
    
    // Handle scroll-based section highlighting on home page
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        initializeScrollNavigation();
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    
    // Close mobile menu when clicking outside
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });
    }
}

/**
 * Update active navigation based on current page
 */
function updateActiveNavigation() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash.substring(1);
    
    // Remove all active states
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.classList.remove('text-[#FFC107]', 'border-b-2', 'border-[#FFC107]');
        if (!link.classList.contains('bg-[#1a1a1a]')) {
            link.classList.add('text-stone-600');
        }
    });
    
    // Highlight based on current page
    if (currentPath.includes('altadena.html')) {
        const altadenaLink = document.querySelector('[data-nav="altadena"]');
        if (altadenaLink) {
            altadenaLink.classList.remove('text-stone-600');
            altadenaLink.classList.add('text-[#FFC107]', 'border-b-2', 'border-[#FFC107]');
        }
    } else if (currentPath.includes('services.html')) {
        const servicesLink = document.querySelector('[data-nav="services"]');
        if (servicesLink) {
            servicesLink.classList.remove('text-stone-600');
            servicesLink.classList.add('text-[#FFC107]', 'border-b-2', 'border-[#FFC107]');
        }
    } else if (currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/')) {
        // On home page, highlight Home or current section
        if (currentHash) {
            const sectionLink = document.querySelector(`[data-nav="${currentHash}"]`);
            if (sectionLink) {
                sectionLink.classList.remove('text-stone-600');
                sectionLink.classList.add('text-[#FFC107]', 'border-b-2', 'border-[#FFC107]');
            }
        } else {
            const homeLink = document.querySelector('[data-nav="home"]');
            if (homeLink) {
                homeLink.classList.remove('text-stone-600');
                homeLink.classList.add('text-[#FFC107]', 'border-b-2', 'border-[#FFC107]');
            }
        }
    }
}

/**
 * Initialize scroll-based navigation highlighting
 */
function initializeScrollNavigation() {
    const sections = ['about', 'projects', 'locations', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link[data-nav]');
    
    const updateActiveOnScroll = () => {
        const scrollPosition = window.scrollY + 150;
        
        let activeSection = null;
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    activeSection = sectionId;
                }
            }
        });
        
        // Remove active from all
        navLinks.forEach(link => {
            link.classList.remove('text-[#FFC107]', 'border-b-2', 'border-[#FFC107]');
            link.classList.add('text-stone-600');
        });
        
        // Add active to current section or Home
        if (activeSection) {
            const activeLink = document.querySelector(`[data-nav="${activeSection}"]`);
            if (activeLink) {
                activeLink.classList.remove('text-stone-600');
                activeLink.classList.add('text-[#FFC107]', 'border-b-2', 'border-[#FFC107]');
            }
        } else if (window.scrollY < 100) {
            // If at top of page, highlight Home
            const homeLink = document.querySelector('[data-nav="home"]');
            if (homeLink) {
                homeLink.classList.remove('text-stone-600');
                homeLink.classList.add('text-[#FFC107]', 'border-b-2', 'border-[#FFC107]');
            }
        }
    };
    
    window.addEventListener('scroll', updateActiveOnScroll);
    updateActiveOnScroll(); // Initial check
}

/**
 * Update active nav link when clicked
 */
function updateActiveNavLink(clickedLink) {
    const navLinks = document.querySelectorAll('.nav-link[data-nav], .mobile-nav-link[data-nav]');
    navLinks.forEach(link => {
        link.classList.remove('text-[#FFC107]', 'border-b-2', 'border-[#FFC107]');
        if (!link.classList.contains('bg-[#1a1a1a]')) {
            link.classList.add('text-stone-600');
        }
    });
    
    if (clickedLink && clickedLink.hasAttribute('data-nav')) {
        clickedLink.classList.remove('text-stone-600');
        clickedLink.classList.add('text-[#FFC107]', 'border-b-2', 'border-[#FFC107]');
    }
}

function openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    }
}

/**
 * Header Scroll Effect
 */
function initializeHeaderScroll() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Before/After Slider
 */
function initializeSlider() {
    const slider = document.getElementById('slider-range');
    const beforeLayer = document.getElementById('before-layer');
    const sliderLine = document.getElementById('slider-line');
    
    if (!slider || !beforeLayer || !sliderLine) return;
    
    // Set initial position
    const initialValue = slider.value;
    beforeLayer.style.width = `${initialValue}%`;
    sliderLine.style.left = `${initialValue}%`;
    
    // Update on input
    slider.addEventListener('input', (e) => {
        const value = e.target.value;
        beforeLayer.style.width = `${value}%`;
        sliderLine.style.left = `${value}%`;
    });
    
    // Touch support for mobile
    let isDragging = false;
    
    slider.addEventListener('mousedown', () => {
        isDragging = true;
    });
    
    slider.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    // Prevent image drag interference
    beforeLayer.addEventListener('mousedown', (e) => {
        e.preventDefault();
    });
}


