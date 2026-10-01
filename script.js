/* ==========================================================================
   ZEVIONIX TECHNOLOGIES - CLIENT JAVASCRIPT
   Interactive Behaviors, Tab Switchers, Forms & Telemetry
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  }

  // 2. Active Link Highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      const parentDropdown = link.closest('.nav-item');
      if (parentDropdown) {
        const topLink = parentDropdown.querySelector('.nav-link');
        if (topLink) topLink.classList.add('active');
      }
    }
  });

  // 3. Tab Switchers (e.g. on Index / AURA pages)
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      const parentContainer = btn.closest('section') || document;
      
      // Deactivate siblings
      parentContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      parentContainer.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      
      // Activate clicked
      btn.classList.add('active');
      const targetPanel = parentContainer.querySelector(`#${targetId}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // 4. Accordion Toggle
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const parentItem = q.closest('.faq-item');
      if (parentItem) {
        const isOpen = parentItem.classList.contains('active');
        
        // Optional: close other accordions in the same list
        const accordionList = parentItem.closest('.faq-list');
        if (accordionList) {
          accordionList.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
        }
        
        if (!isOpen) {
          parentItem.classList.add('active');
        }
      }
    });
  });

  // 5. Animated Number Counters
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute('data-target');
          const suffix = counter.getAttribute('data-suffix') || '';
          const prefix = counter.getAttribute('data-prefix') || '';
          let count = 0;
          const speed = target / 50;

          const updateCount = () => {
            count += speed;
            if (count < target) {
              counter.innerText = prefix + Math.ceil(count) + suffix;
              requestAnimationFrame(updateCount);
            } else {
              counter.innerText = prefix + target + suffix;
            }
          };
          updateCount();
          obs.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  // 6. Interactive Contact Form Submission Simulation
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting Encrypted Payload...';
      
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Inquiry Dispatched to Engineering Team!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        const formResponse = document.createElement('div');
        formResponse.className = 'form-success-banner';
        formResponse.style.cssText = 'background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #34d399; padding: 16px 20px; border-radius: 12px; margin-top: 20px; text-align: center; font-weight: 500;';
        formResponse.innerHTML = '<strong>Request Logged:</strong> A Senior Solutions Architect will connect within 4 business hours.';
        
        if (!contactForm.querySelector('.form-success-banner')) {
          contactForm.appendChild(formResponse);
        }
        
        contactForm.reset();
      }, 1200);
    });
  }

  // 7. Header Scroll Shadow Effect
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }
});