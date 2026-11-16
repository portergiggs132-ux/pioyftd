/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * 1. Header toggle (DIBUAT AMAN: Tidak akan error meski HTML dihapus)
   */
  const headerToggleBtn = document.querySelector('.header-toggle');
  if (headerToggleBtn) {
    function headerToggle() {
      const header = document.querySelector('#header');
      if (header) header.classList.toggle('header-show');
      headerToggleBtn.classList.toggle('bi-list');
      headerToggleBtn.classList.toggle('bi-x');
    }
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  /**
   * 2. Hide mobile nav on same-page/hash links (DIBUAT AMAN)
   */
  const navmenuLinks = document.querySelectorAll('#navmenu a');
  if (navmenuLinks.length > 0) {
    navmenuLinks.forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.header-show') && headerToggleBtn) {
          headerToggleBtn.click();
        }
      });
    });
  }

  /**
   * 3. Toggle mobile nav dropdowns (DIBUAT AMAN)
   */
  const dropdowns = document.querySelectorAll('.navmenu .toggle-dropdown');
  if (dropdowns.length > 0) {
    dropdowns.forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });
  }


  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  // Pastikan tag section kamu benar, jika pakai <div id="..."> ganti 'section' jadi 'div' atau class-nya
  const sections = document.querySelectorAll('section'); 

  // ==========================================
  // 1. FUNGSI UNTUK MENGUBAH STATUS ACTIVE
  // ==========================================
  const setActiveLink = (id) => {
    navLinks.forEach(link => {
      link.classList.remove('active');
      // Cocokkan href link dengan ID section
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('active');
      }
    });
  };

  // ==========================================
  // 2. EVENT KLIK (Manual)
  // ==========================================
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      // Hapus active dari semua, tambahkan ke yang diklik
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ==========================================
  // 3. EVENT SCROLL (Intersection Observer)
  // ==========================================
  const observerOptions = {
    root: null,
    // rootMargin: '-20% 0px -70% 0px' artinya trigger saat 20% atas section masuk layar
    rootMargin: '-20% 0px -70% 0px', 
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        setActiveLink(id);
      }
    });
  }, observerOptions);

  // Amati setiap section
  sections.forEach(section => {
    observer.observe(section);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');

  // Toggle Hamburger Menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Tutup menu saat link diklik (mobile)
  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Tutup menu saat klik di luar
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });

  // Scroll Spy untuk Active Link
  const sections = document.querySelectorAll('section');
  
  const setActiveLink = (id) => {
    navLinkItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('active');
      }
    });
  };

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        setActiveLink(id);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('card-rotate-3d');
  if (!card) return;

  const scene = card.closest('.abt-card-scene');

  // 1. Pause CSS animation saat mouse masuk
  scene.addEventListener('mouseenter', () => {
    card.classList.add('abt-paused');
  });

  // 2. Efek miring (tilt) mengikuti mouse
  scene.addEventListener('mousemove', (e) => {
    const rect = scene.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 30;
    const rotateX = ((centerY - y) / centerY) * 20;

    // Tambahkan transition hanya saat mouse bergerak agar smooth
    card.style.transition = 'transform 0.1s ease-out';
    card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  });

  // 3. Lanjutkan animasi putar & reset posisi saat mouse keluar
  scene.addEventListener('mouseleave', () => {
    card.classList.remove('abt-paused');
    card.style.transition = 'transform 0.6s ease';
    card.style.transform = ''; // Reset inline style agar kembali ke CSS keyframes
  });

  // ===== Scroll Reveal Animation =====
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('abt-is-visible');
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(
    '.abt-heading, .abt-desc, .abt-connect, .abt-visual-col, .abt-info-card'
  );

  animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });

  // Inject style untuk class visible
  if (!document.getElementById('abt-anim-style')) {
    const style = document.createElement('style');
    style.id = 'abt-anim-style';
    style.textContent = `.abt-is-visible { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);
  }
});
(function() {
    // Semua class animasi yang terdaftar
    const animClasses = [
        'anim-fade-up', 'anim-fade-down', 'anim-fade-left', 'anim-fade-right',
        'anim-zoom-in', 'anim-zoom-out', 'anim-rotate-in', 'anim-blur-in',
        'anim-clip-up', 'anim-clip-down', 'anim-clip-left', 'anim-clip-right',
        'anim-flip-x', 'anim-flip-y', 'anim-skew', 'anim-scale-up',
        'anim-slide-fade', 'anim-bounce-in', 'anim-stagger'
    ];
    
    // Bangun selector otomatis
    const selector = animClasses.map(c => '.' + c).join(', ');
    const elements = document.querySelectorAll(selector);
    
    if (!elements.length) return;
    
    // Fallback untuk browser lama
    if (!('IntersectionObserver' in window)) {
        elements.forEach(el => el.classList.add('is-visible'));
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animasi sekali saja
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
})();
function startReveal() {
    const allReveals = document.querySelectorAll('.reveal');

    // Buat Observer baru
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // MUNCUL: Tambahkan class saat masuk viewport
                entry.target.classList.add('in-view');
            } else {
                // HILANG: Hapus class saat keluar viewport (agar bisa di-animasi ulang)
                entry.target.classList.remove('in-view');
            }
        });
    }, {
        threshold: 0.15, // Animasi mulai saat 15% section terlihat
        rootMargin: '0px 0px -10% 0px' // Trigger sedikit lebih awal dari tepi bawah layar
    });

    // Observe SEMUA section (tanpa unobserve)
    allReveals.forEach(sec => scrollObserver.observe(sec));
}
const contactForm = document.querySelector("#contact-form");

if (contactForm) {

  contactForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const loading = contactForm.querySelector(".loading");
    const errorMessage = contactForm.querySelector(".error-message");
    const sentMessage = contactForm.querySelector(".sent-message");
    const submitButton = contactForm.querySelector("button[type='submit']");

    loading.style.display = "block";
    errorMessage.style.display = "none";
    sentMessage.style.display = "none";

    submitButton.disabled = true;

    emailjs.sendForm(
      "service_jpbzeul",
      "template_lsl4xsl",
      contactForm
    )

    .then(function() {

      loading.style.display = "none";
      sentMessage.style.display = "block";

      contactForm.reset();

    })

    .catch(function(error) {

      loading.style.display = "none";
      errorMessage.textContent =
        "Failed to send message. Please try again.";

      errorMessage.style.display = "block";

      console.error("EmailJS Error:", error);

    })

    .finally(function() {

      submitButton.disabled = false;

    });

  });

}
document.addEventListener('DOMContentLoaded', () => {
  const animElements = document.querySelectorAll('.anim');

  // Fallback untuk browser lama
  if (!('IntersectionObserver' in window)) {
    animElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Jika elemen MASUK ke viewport -> tambahkan class animasi
        entry.target.classList.add('is-visible');
      } else {
        // Jika elemen KELUAR dari viewport -> hapus class (reset animasi)
        entry.target.classList.remove('is-visible');
      }
    });
  }, {
    threshold: 0.15,       // Trigger saat 15% elemen terlihat
    rootMargin: '0px 0px -50px 0px' // Offset 50px dari bawah
  });

  // Observe semua elemen
  animElements.forEach(el => observer.observe(el));
});
document.addEventListener('DOMContentLoaded', () => {
  const animElements = document.querySelectorAll('.anim');

  if (!('IntersectionObserver' in window)) {
    animElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  // FIX: Tambahkan debounce untuk mencegah trigger berulang
  let ticking = false;

  const observer = new IntersectionObserver((entries) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  }, {
    threshold: 0.2, // Naikkan threshold agar tidak terlalu sensitif
    rootMargin: '0px 0px -100px 0px' // Tambah margin untuk trigger lebih awal
  });

  animElements.forEach(el => observer.observe(el));
});
