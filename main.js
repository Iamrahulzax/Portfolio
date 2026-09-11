/* ==========================================================================
   RAHUL NEGI — PORTFOLIO INTERACTIVE CONTROLLER
   ========================================================================== */

// Reusable Personal Profile Data Object for easy updates
export const profile = {
  name: "Rahul Negi",
  role: "Computer Science Engineering Student",
  year: "3rd Year",
  college: "THDC Institute of Hydropower Engineering and Technology (THDC-IHET)",
  email: "rahulnegi270406@gmail.com",
  github: "https://github.com/Iamrahulzax",
  leetcode: "https://leetcode.com/u/rahulnegi_01/",
  kaggle: "https://www.kaggle.com/rahulnegi01",
  linkedin: "https://www.linkedin.com/in/rahul-negi-662a26428/",
  resume: "[INSERT RESUME LINK]"
};

document.addEventListener('DOMContentLoaded', () => {

  // 1. Lenis Smooth Scroll Engine
  let lenis;
  function initLenis() {
    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 1.0,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }
  initLenis();

  // 2. Header Scrolled State listener
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 3. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-item');
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // 4. Bilingual Language Switcher (EN / RU)
  const langToggleBtn = document.getElementById('langToggle');
  let currentLang = 'en';

  langToggleBtn?.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    document.body.className = `lang-${currentLang}`;

    // Update active label in button
    const activeLangEl = langToggleBtn.querySelector('.active-lang');
    const inactiveLangEl = langToggleBtn.querySelector('.inactive-lang');
    if (activeLangEl && inactiveLangEl) {
      if (currentLang === 'ru') {
        activeLangEl.textContent = 'RU';
        inactiveLangEl.textContent = 'EN';
      } else {
        activeLangEl.textContent = 'EN';
        inactiveLangEl.textContent = 'RU';
      }
    }

    // Update all elements with data-en / data-ru
    const translatableElements = document.querySelectorAll('[data-en][data-ru]');
    translatableElements.forEach(el => {
      const text = el.getAttribute(`data-${currentLang}`);
      if (text) {
        el.textContent = text;
      }
    });
  });

  // 5. Copy Email to Clipboard Toast
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyToast = document.getElementById('copyToast');

  copyEmailBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      if (copyToast) {
        copyToast.classList.add('show');
        setTimeout(() => {
          copyToast.classList.remove('show');
        }, 2200);
      }
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }
  });

  // 6. Project Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxTag = document.getElementById('lightboxTag');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.querySelector('.lightbox-backdrop');

  const mosaicItems = document.querySelectorAll('.mosaic-item');

  mosaicItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // Don't trigger lightbox if user clicks directly on GitHub/Demo buttons inside tile
      if (e.target.closest('a')) return;

      const img = item.querySelector('.mosaic-img');
      const title = item.querySelector('.tile-title');
      const tag = item.querySelector('.tile-tag');

      if (lightboxImg && img) lightboxImg.src = img.src;
      if (lightboxTitle && title) lightboxTitle.textContent = title.textContent;
      if (lightboxTag && tag) lightboxTag.textContent = tag.textContent;

      if (lightboxModal) {
        lightboxModal.classList.add('active');
        lightboxModal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      lightboxModal.setAttribute('aria-hidden', 'true');
    }
  }

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxBackdrop?.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // 7. Back to Top Smooth Scroll
  const backToTopBtn = document.getElementById('backToTopBtn');
  backToTopBtn?.addEventListener('click', () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // 9. Project Carousel Auto-Slide Controls
  const projectTrack = document.getElementById('projectTrack');
  const projectPrevBtn = document.getElementById('projectPrevBtn');
  const projectNextBtn = document.getElementById('projectNextBtn');
  const projectPauseBtn = document.getElementById('projectPauseBtn');
  const pauseBtnText = document.getElementById('pauseBtnText');

  let isPaused = false;

  projectPauseBtn?.addEventListener('click', () => {
    isPaused = !isPaused;
    if (isPaused) {
      projectTrack?.classList.add('paused');
      if (pauseBtnText) pauseBtnText.textContent = '[ AUTO-SLIDE OFF ]';
      projectPauseBtn.classList.remove('mint-btn');
    } else {
      projectTrack?.classList.remove('paused');
      if (pauseBtnText) pauseBtnText.textContent = '[ AUTO-SLIDE ON ]';
      projectPauseBtn.classList.add('mint-btn');
    }
  });

  const projectContainer = document.querySelector('.project-carousel-container');

  projectPrevBtn?.addEventListener('click', () => {
    if (projectContainer) {
      projectContainer.scrollBy({ left: -360, behavior: 'smooth' });
    }
  });

  projectNextBtn?.addEventListener('click', () => {
    if (projectContainer) {
      projectContainer.scrollBy({ left: 360, behavior: 'smooth' });
    }
  });

});

