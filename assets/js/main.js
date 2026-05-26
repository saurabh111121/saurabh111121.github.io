/**
 * DevOps Engineer Portfolio - Main JavaScript
 * Pure vanilla JS, no jQuery dependencies
 * Author: Saurabh
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ============================================================
  // 1. THEME SWITCHER
  // ============================================================

  const themeSwitcher = (() => {
    const STORAGE_KEY = 'portfolio-theme';
    const VALID_THEMES = ['dark', 'light', 'cyberpunk', 'nord', 'dracula', 'solarized', 'midnight'];
    const toggleBtn = document.querySelector('.theme-toggle-btn');
    const dropdown = document.querySelector('.theme-dropdown');
    const themeOptions = document.querySelectorAll('.theme-option');

    /**
     * Apply the given theme to the document and persist it.
     */
    function setTheme(theme) {
      if (!VALID_THEMES.includes(theme)) theme = 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(STORAGE_KEY, theme);
    }

    /**
     * Load saved theme from localStorage or default to 'dark'.
     */
    function loadSavedTheme() {
      const saved = localStorage.getItem(STORAGE_KEY);
      setTheme(saved || 'dark');
    }

    /**
     * Toggle dropdown visibility.
     */
    function toggleDropdown(e) {
      e.stopPropagation();
      if (dropdown) {
        dropdown.classList.toggle('visible');
      }
    }

    /**
     * Close dropdown when clicking outside.
     */
    function closeDropdownOnOutsideClick(e) {
      if (dropdown && !dropdown.contains(e.target) && e.target !== toggleBtn) {
        dropdown.classList.remove('visible');
      }
    }

    // Initialize
    loadSavedTheme();

    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleDropdown);
    }

    themeOptions.forEach(option => {
      option.addEventListener('click', () => {
        const theme = option.getAttribute('data-theme');
        setTheme(theme);
        if (dropdown) dropdown.classList.remove('visible');
      });
    });

    document.addEventListener('click', closeDropdownOnOutsideClick);

    return { setTheme };
  })();


  // ============================================================
  // 2. STICKY HEADER
  // ============================================================

  const stickyHeader = (() => {
    const header = document.getElementById('header');
    const SCROLL_THRESHOLD = 80;

    function update() {
      if (!header) return;
      if (window.scrollY > SCROLL_THRESHOLD) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }

    // Set initial state
    update();

    return { update };
  })();


  // ============================================================
  // 3. MOBILE NAVIGATION
  // ============================================================

  const mobileNav = (() => {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const navLinks = document.querySelectorAll('.nav-links a');

    function open() {
      document.body.classList.add('mobile-nav-active');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
    }

    function close() {
      document.body.classList.remove('mobile-nav-active');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    }

    function toggle() {
      document.body.classList.contains('mobile-nav-active') ? close() : open();
    }

    if (toggleBtn) toggleBtn.addEventListener('click', toggle);
    if (overlay) overlay.addEventListener('click', close);
    navLinks.forEach(link => link.addEventListener('click', close));

    return { open, close, toggle };
  })();


  // ============================================================
  // 4. SMOOTH SCROLL
  // ============================================================

  const smoothScroll = (() => {
    const HEADER_OFFSET = 80;

    function scrollToTarget(targetSelector) {
      const target = document.querySelector(targetSelector);
      if (!target) return;

      const targetPosition = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }

    // Attach to all anchor links pointing to hash targets
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.length > 1) {
          e.preventDefault();
          scrollToTarget(href);
        }
      });
    });

    return { scrollToTarget };
  })();


  // ============================================================
  // 5. ACTIVE NAV ON SCROLL
  // ============================================================

  const activeNavOnScroll = (() => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const HEADER_OFFSET = 80;

    function update() {
      const scrollPos = window.scrollY + HEADER_OFFSET + 50;

      sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < bottom) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    return { update };
  })();


  // ============================================================
  // 6. TYPING EFFECT
  // ============================================================

  const typingEffect = (() => {
    const element = document.querySelector('.typing-text');
    if (!element) return;

    const words = ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'CI/CD', 'SRE', 'Linux', 'GitOps'];
    const TYPE_SPEED = 50;    // ms per character typing
    const DELETE_SPEED = 30;  // ms per character deleting
    const PAUSE_AFTER_TYPE = 2000;  // ms pause after full word typed
    const PAUSE_AFTER_DELETE = 500; // ms pause after full word deleted

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function tick() {
      const currentWord = words[wordIndex];

      if (!isDeleting) {
        // Typing
        charIndex++;
        element.textContent = currentWord.substring(0, charIndex);

        if (charIndex === currentWord.length) {
          // Finished typing, pause then start deleting
          isDeleting = true;
          setTimeout(tick, PAUSE_AFTER_TYPE);
          return;
        }
        setTimeout(tick, TYPE_SPEED);
      } else {
        // Deleting
        charIndex--;
        element.textContent = currentWord.substring(0, charIndex);

        if (charIndex === 0) {
          // Finished deleting, move to next word
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(tick, PAUSE_AFTER_DELETE);
          return;
        }
        setTimeout(tick, DELETE_SPEED);
      }
    }

    // Start the typing effect
    tick();
  })();


  // ============================================================
  // 7. SCROLL ANIMATIONS (IntersectionObserver)
  // ============================================================

  const scrollAnimations = (() => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;

          // Support staggered animations via data-delay
          const delay = el.getAttribute('data-delay');
          if (delay) {
            el.style.transitionDelay = `${delay}ms`;
          }

          el.classList.add('animated');
          // Stop observing once animated
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.15
    });

    animatedElements.forEach(el => observer.observe(el));
  })();


  // ============================================================
  // 8. BACK TO TOP BUTTON
  // ============================================================

  const backToTop = (() => {
    const btn = document.querySelector('.back-to-top');
    const SHOW_THRESHOLD = 300;

    function update() {
      if (!btn) return;
      if (window.scrollY > SHOW_THRESHOLD) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }

    if (btn) {
      btn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // Set initial state
    update();

    return { update };
  })();


  // ============================================================
  // 9. SKILL FILTER
  // ============================================================

  const skillFilter = (() => {
    const filterBtns = document.querySelectorAll('.skill-filter-btn');
    const skillCards = document.querySelectorAll('[data-category]');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter') || btn.textContent.trim().toLowerCase();

        skillCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  })();


  // ============================================================
  // 10. CONTACT FORM (Formspree integration)
  // ============================================================

  const contactForm = (() => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('.btn-submit, #submit-btn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');
    const btnSuccess = submitBtn?.querySelector('.btn-success');
    const charCountEl = document.getElementById('char-count');
    const messageField = document.getElementById('contact-message');
    const emailField = document.getElementById('contact-email');
    const hiddenReplyTo = document.getElementById('hidden-replyto');

    // Character counter
    if (messageField && charCountEl) {
      messageField.addEventListener('input', () => {
        const len = messageField.value.length;
        charCountEl.textContent = len;
        if (len > 450) {
          charCountEl.style.color = 'var(--warning, #d29922)';
        } else if (len > 500) {
          charCountEl.style.color = 'var(--danger, #f85149)';
        } else {
          charCountEl.style.color = '';
        }
      });
    }

    const subjectField = document.getElementById('contact-subject');
    const hiddenSubject = document.getElementById('hidden-subject');

    // Sync email to hidden _replyto field
    if (emailField && hiddenReplyTo) {
      emailField.addEventListener('input', () => {
        hiddenReplyTo.value = emailField.value;
      });
    }

    // Sync subject selection to email subject line
    if (subjectField && hiddenSubject) {
      subjectField.addEventListener('change', () => {
        const name = document.getElementById('contact-name')?.value || 'Someone';
        hiddenSubject.value = `[Portfolio] ${subjectField.value} — from ${name}`;
      });
    }

    // Form submit via Formspree AJAX
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!submitBtn) return;

      // Sync hidden fields one final time before submit
      if (hiddenReplyTo && emailField) {
        hiddenReplyTo.value = emailField.value;
      }
      if (hiddenSubject && subjectField) {
        const name = document.getElementById('contact-name')?.value || 'Someone';
        hiddenSubject.value = `[Portfolio] ${subjectField.value} — from ${name}`;
      }

      // Show loading state
      submitBtn.classList.add('loading');
      if (btnText) btnText.style.display = 'none';
      if (btnLoading) btnLoading.style.display = 'inline-flex';

      // Submit to Web3Forms (primary) with Formspree fallback
      const formData = new FormData(form);
      const FORMSPREE_URL = 'https://formspree.io/f/mvovnglz';

      fetch(form.action, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          showSuccess();
        } else {
          // Web3Forms failed — try Formspree as fallback
          return submitToFormspree(formData);
        }
      })
      .catch(() => {
        // Web3Forms unreachable — try Formspree as fallback
        return submitToFormspree(formData);
      });

      function submitToFormspree(data) {
        fetch(FORMSPREE_URL, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        })
        .then(response => {
          if (response.ok) {
            showSuccess();
          } else {
            showError('Failed — try again');
          }
        })
        .catch(() => {
          showError('Network error — try again');
        });
      }

      function showSuccess() {
        if (btnLoading) btnLoading.style.display = 'none';
        if (btnSuccess) btnSuccess.style.display = 'inline-flex';
        submitBtn.classList.remove('loading');
        submitBtn.classList.add('success');

        setTimeout(() => {
          form.reset();
          if (charCountEl) charCountEl.textContent = '0';
          submitBtn.classList.remove('success');
          if (btnSuccess) btnSuccess.style.display = 'none';
          if (btnText) btnText.style.display = 'inline';
        }, 3000);
      }

      function showError(msg) {
        if (btnLoading) btnLoading.style.display = 'none';
        submitBtn.classList.remove('loading');
        if (btnText) {
          btnText.textContent = msg;
          btnText.style.display = 'inline';
        }
        setTimeout(() => {
          if (btnText) btnText.textContent = 'Send Message';
        }, 3000);
      }
    });
  })();


  // ============================================================
  // 11. SCROLL PROGRESS BAR
  // ============================================================

  const scrollProgress = (() => {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return { update: () => {} };

    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${scrollPercent}%`;
    }

    // Set initial state
    update();

    return { update };
  })();


  // ============================================================
  // 12. PARALLAX ON HERO
  // ============================================================

  const heroParallax = (() => {
    const hero = document.querySelector('.hero, #hero, .hero-section');
    if (!hero) return { update: () => {} };

    function update() {
      const scrollY = window.scrollY;
      // Only apply parallax when hero is in view
      if (scrollY < hero.offsetHeight + hero.offsetTop) {
        hero.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    }

    return { update };
  })();


  // ============================================================
  // UNIFIED SCROLL HANDLER (requestAnimationFrame)
  // ============================================================

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        stickyHeader.update();
        activeNavOnScroll.update();
        backToTop.update();
        scrollProgress.update();
        heroParallax.update();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

});
