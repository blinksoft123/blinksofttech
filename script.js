/**
 * BLINKSOFTTECH Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initFAQAccordion();
  initTestimonialsCarousel();
  initContactForm();
  initScrollAnimations();
});

/**
 * Sticky Navigation Bar
 * Adds class 'scrolled' to header on vertical scroll.
 */
function initStickyHeader() {
  const header = document.querySelector('.header-nav');
  const scrollThreshold = 20;

  const checkScroll = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Trigger check in case of refresh down page
}

/**
 * Mobile Hamburger Menu and Navigation Drawer
 */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu-wrapper');
  const mobileLinks = document.querySelectorAll('.nav-links-mobile a');
  const quoteBtn = document.querySelector('.nav-menu-wrapper .btn');

  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent background scrolling when menu is open
    if (navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  if (quoteBtn) {
    quoteBtn.addEventListener('click', closeMenu);
  }
}

/**
 * FAQ Accordion Panels
 * Sets max-height of content to scrollHeight for a smooth sliding transition.
 */
function initFAQAccordion() {
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const faqItem = header.parentElement;
      const faqBody = faqItem.querySelector('.faq-body');
      const isActive = faqItem.classList.contains('active');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
          item.querySelector('.faq-body').style.maxHeight = '0px';
        }
      });

      // Toggle current item
      if (isActive) {
        faqItem.classList.remove('active');
        faqBody.style.maxHeight = '0px';
      } else {
        faqItem.classList.add('active');
        faqBody.style.maxHeight = faqBody.scrollHeight + 'px';
      }
    });
  });
}

/**
 * Testimonials Carousel / Navigation Dots
 */
function initTestimonialsCarousel() {
  const track = document.querySelector('.testimonial-track');
  const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
  const dotsContainer = document.querySelector('.testimonial-dots');
  
  if (!track || slides.length === 0) return;

  const dots = Array.from(dotsContainer.querySelectorAll('.dot'));

  const moveToSlide = (targetIndex) => {
    // Slide left/right using CSS transform percentage
    track.style.transform = `translateX(-${targetIndex * 100}%)`;
    
    // Update active class on dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[targetIndex].classList.add('active');
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      moveToSlide(index);
    });
  });

  // Optional: Auto slide every 8 seconds
  let autoSlideInterval = setInterval(() => {
    const currentActiveDot = dotsContainer.querySelector('.dot.active');
    let nextIndex = dots.indexOf(currentActiveDot) + 1;
    if (nextIndex >= slides.length) {
      nextIndex = 0;
    }
    moveToSlide(nextIndex);
  }, 8000);

  // Clear interval if user interacts
  dotsContainer.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
  });
}

/**
 * Contact and Estimate Request Form Submissions
 */
function initContactForm() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      // Disable button during submitting simulation
      btn.disabled = true;
      btn.textContent = 'Envoi en cours...';

      // Simulate network request
      setTimeout(() => {
        // Show success alert
        alert('Merci pour votre message ! Notre équipe BLINKSOFTTECH vous contactera dans les plus brefs délais.');
        
        // Reset form
        form.reset();
        btn.disabled = false;
        btn.textContent = originalText;
      }, 1200);
    });
  });
}

/**
 * Scroll Fade-in Animations (Intersection Observer)
 */
function initScrollAnimations() {
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: make everything visible immediately
    document.querySelectorAll('.fade-in-section').forEach(section => {
      section.classList.add('is-visible');
    });
    return;
  }

  const animOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Trigger animation only once
      }
    });
  }, animOptions);

  const sectionsToAnimate = document.querySelectorAll('.fade-in-section');
  sectionsToAnimate.forEach(section => {
    observer.observe(section);
  });
}
