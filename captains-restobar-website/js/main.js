/* ==========================================================================
   Captain's Resto-Bar — Main JavaScript
   Redesigned by Rogue Signal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========== MOBILE NAVIGATION ==========
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
      // Update aria
      const expanded = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', expanded);
      // Lock body scroll when menu is open
      document.body.style.overflow = expanded ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ========== ACTIVE NAV LINK ==========
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a:not(.nav__cta)').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ========== SCROLL NAV EFFECT ==========
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  // ========== MENU TAB FILTERING ==========
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuCategories = document.querySelectorAll('.menu-category');

  if (menuTabs.length && menuCategories.length) {
    menuTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.dataset.category;

        menuTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        menuCategories.forEach(cat => {
          if (filter === 'all' || cat.dataset.category === filter) {
            cat.style.display = 'block';
            cat.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            cat.style.display = 'none';
          }
        });
      });
    });
  }

  // ========== GALLERY FILTERING ==========
  const galleryFilters = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (galleryFilters.length && galleryItems.length) {
    galleryFilters.forEach(filter => {
      filter.addEventListener('click', () => {
        const tag = filter.dataset.filter;

        galleryFilters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');

        galleryItems.forEach(item => {
          if (tag === 'all' || item.dataset.tag === tag) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ========== GALLERY LIGHTBOX ==========
  if (galleryItems.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox__overlay"></div>
      <div class="lightbox__content">
        <button class="lightbox__close" aria-label="Close lightbox">&times;</button>
        <img class="lightbox__image" src="" alt="">
        <p class="lightbox__caption"></p>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .lightbox {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 2000;
        align-items: center;
        justify-content: center;
      }
      .lightbox.open { display: flex; }
      .lightbox__overlay {
        position: absolute;
        inset: 0;
        background: rgba(6, 13, 26, 0.95);
        backdrop-filter: blur(8px);
      }
      .lightbox__content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        text-align: center;
        animation: fadeIn 0.3s ease;
      }
      .lightbox__image {
        max-width: 90vw;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 8px;
      }
      .lightbox__close {
        position: absolute;
        top: -48px;
        right: 0;
        background: none;
        border: none;
        color: rgba(201, 162, 78, 0.8);
        font-size: 2rem;
        cursor: pointer;
        transition: color 0.3s ease;
        padding: 0.5rem;
        line-height: 1;
      }
      .lightbox__close:hover { color: #c9a24e; }
      .lightbox__caption {
        color: rgba(176, 168, 152, 0.8);
        font-size: 0.85rem;
        margin-top: 1rem;
        letter-spacing: 0.5px;
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(lightbox);

    const lbOverlay = lightbox.querySelector('.lightbox__overlay');
    const lbClose = lightbox.querySelector('.lightbox__close');
    const lbImage = lightbox.querySelector('.lightbox__image');
    const lbCaption = lightbox.querySelector('.lightbox__caption');

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const label = item.querySelector('.gallery-item__label');
        lbImage.src = img.src;
        lbImage.alt = img.alt;
        lbCaption.textContent = label ? label.textContent : img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    lbOverlay.addEventListener('click', closeLightbox);
    lbClose.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========== SCROLL ANIMATIONS ==========
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

  // ========== TESTIMONIAL ROTATION ==========
  const testimonials = document.querySelectorAll('.testimonial');
  if (testimonials.length > 1) {
    let currentIndex = 0;

    // Ensure first is visible, rest hidden
    testimonials.forEach((t, i) => {
      t.style.display = i === 0 ? 'block' : 'none';
      t.style.opacity = i === 0 ? '1' : '0';
    });

    setInterval(() => {
      // Fade out current
      testimonials[currentIndex].style.opacity = '0';

      setTimeout(() => {
        testimonials[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % testimonials.length;
        testimonials[currentIndex].style.display = 'block';

        // Trigger reflow, then fade in
        void testimonials[currentIndex].offsetHeight;
        testimonials[currentIndex].style.opacity = '1';
      }, 400);
    }, 6000);
  }

  // ========== HIDE SCROLL INDICATOR ON SCROLL ==========
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      scrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '1';
      scrollIndicator.style.transition = 'opacity 0.4s ease';
    }, { passive: true });
  }

});
