/* =================================
   MuseHub Creative — Main JavaScript
   ================================= */

document.addEventListener('DOMContentLoaded', function() {
  
  // =================================
  // SMOOTH SCROLLING
  // =================================
  const scrollLinks = document.querySelectorAll('[data-scroll]');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-scroll');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
        
        // Update active nav link
        updateActiveNavLink(targetId);
      }
    });
  });
  
  // =================================
  // MOBILE MENU TOGGLE
  // =================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  hamburgerBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Update aria-expanded
    const isExpanded = this.classList.contains('active');
    this.setAttribute('aria-expanded', isExpanded);
    mobileMenu.setAttribute('aria-hidden', !isExpanded);
  });
  
  function closeMobileMenu() {
    hamburgerBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!hamburgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });
  
  // =================================
  // NAVBAR SCROLL EFFECT
  // =================================
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // =================================
  // ACTIVE NAV LINK ON SCROLL
  // =================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function updateActiveNavLink(activeId) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-nav') === activeId) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    if (current) {
      updateActiveNavLink(current);
    }
  });
  
  // =================================
  // REVEAL ANIMATIONS ON SCROLL
  // =================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
  
  // =================================
  // COUNTER ANIMATION
  // =================================
  const counters = document.querySelectorAll('.counter');
  
  const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = function() {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + suffix;
          }
        };
        
        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, {
    threshold: 0.5
  });
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
  
  // =================================
  // NEWSLETTER FORM VALIDATION
  // =================================
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const formMsg = document.getElementById('formMsg');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = newsletterEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      // Clear previous messages
      formMsg.textContent = '';
      formMsg.classList.remove('success', 'error');
      
      if (!email) {
        formMsg.textContent = 'Please enter your email address.';
        formMsg.classList.add('error');
        return;
      }
      
      if (!emailRegex.test(email)) {
        formMsg.textContent = 'Please enter a valid email address.';
        formMsg.classList.add('error');
        return;
      }
      
      // Simulate form submission
      const submitBtn = newsletterForm.querySelector('.newsletter-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Subscribing...';
      submitBtn.disabled = true;
      
      setTimeout(function() {
        formMsg.textContent = 'Thank you for subscribing! Check your inbox for confirmation.';
        formMsg.classList.add('success');
        newsletterEmail.value = '';
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Subscribed!';
        
        setTimeout(function() {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 2000);
      }, 1500);
    });
  }
  
  // =================================
  // BACK TO TOP BUTTON
  // =================================
  const backToTopBtn = document.getElementById('backToTop');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // =================================
  // RIPPLE EFFECT ON BUTTONS
  // =================================
  const rippleButtons = document.querySelectorAll('.ripple');
  
  rippleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.5)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.marginLeft = '-10px';
      ripple.style.marginTop = '-10px';
      
      this.appendChild(ripple);
      
      setTimeout(function() {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add ripple animation keyframes dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  // =================================
  // FOOTER YEAR
  // =================================
  const footerYear = document.getElementById('footerYear');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
  
  // =================================
  // CATEGORY CARD INTERACTIONS
  // =================================
  const catCards = document.querySelectorAll('.cat-card');
  
  catCards.forEach(card => {
    card.addEventListener('click', function() {
      // Add click animation
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
    
    // Keyboard accessibility
    card.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
  
  // =================================
  // LIFESTYLE CARD BUTTONS
  // =================================
  const lifestyleButtons = document.querySelectorAll('.lifestyle-card-btn');
  
  lifestyleButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
      this.disabled = true;
      
      setTimeout(() => {
        this.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
        
        setTimeout(() => {
          this.innerHTML = originalText;
          this.disabled = false;
        }, 1500);
      }, 1000);
    });
  });
  
  // =================================
  // LAZY LOADING IMAGES (Enhanced)
  // =================================
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading
    lazyImages.forEach(img => {
      img.addEventListener('load', function() {
        this.style.opacity = '1';
      });
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease';
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const lazyLoadObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;
          img.addEventListener('load', function() {
            this.style.opacity = '1';
          });
          lazyLoadObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease';
      lazyLoadObserver.observe(img);
    });
  }
  
  // =================================
  // PERFORMANCE: Debounce resize events
  // =================================
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Handle resize if needed
      // For example: recalculate layouts, reload animations, etc.
    }, 250);
  });
  
  // =================================
  // INITIAL ANIMATION TRIGGER
  // =================================
  // Trigger initial reveal animations for elements in viewport
  setTimeout(function() {
    revealElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.classList.add('active');
      }
    });
  }, 100);
  
});

// =================================
// UTILITY FUNCTIONS
// =================================

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}
