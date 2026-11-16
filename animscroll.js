/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

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
