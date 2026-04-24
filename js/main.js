(function () {
  'use strict';

  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.innerWidth <= 1024) {
          links.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  const yr = document.getElementById('year');
  if (yr) yr.textContent = String(new Date().getFullYear());

  // Testimonials carousel
  const testimonials = document.querySelector('[data-testimonials]');
  if (testimonials) {
    const slides = testimonials.querySelectorAll('.testimonial');
    const dots = testimonials.querySelectorAll('.testimonials-dot');
    const prevBtn = testimonials.querySelector('[data-prev]');
    const nextBtn = testimonials.querySelector('[data-next]');
    let current = 0;
    let autoplay;

    function goTo(index) {
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
    }

    function startAutoplay() {
      autoplay = setInterval(function () { goTo(current + 1); }, 7000);
    }
    function stopAutoplay() {
      clearInterval(autoplay);
    }

    prevBtn.addEventListener('click', function () {
      goTo(current - 1);
      stopAutoplay();
      startAutoplay();
    });
    nextBtn.addEventListener('click', function () {
      goTo(current + 1);
      stopAutoplay();
      startAutoplay();
    });
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goTo(parseInt(dot.dataset.index, 10));
        stopAutoplay();
        startAutoplay();
      });
    });

    testimonials.addEventListener('mouseenter', stopAutoplay);
    testimonials.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
  }

  // Hero photo carousel
  const heroCarousel = document.querySelector('[data-hero-carousel]');
  if (heroCarousel) {
    const slides = heroCarousel.querySelectorAll('.hero-slide');
    const dots = heroCarousel.querySelectorAll('.hero-carousel-dot');
    let currentHero = 0;
    let heroAutoplay;

    function heroGoTo(index) {
      slides[currentHero].classList.remove('is-active');
      dots[currentHero].classList.remove('is-active');
      currentHero = (index + slides.length) % slides.length;
      slides[currentHero].classList.add('is-active');
      dots[currentHero].classList.add('is-active');
    }

    function startHeroAutoplay() {
      heroAutoplay = setInterval(function () { heroGoTo(currentHero + 1); }, 5000);
    }
    function stopHeroAutoplay() {
      clearInterval(heroAutoplay);
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        heroGoTo(parseInt(dot.dataset.index, 10));
        stopHeroAutoplay();
        startHeroAutoplay();
      });
    });

    heroCarousel.addEventListener('mouseenter', stopHeroAutoplay);
    heroCarousel.addEventListener('mouseleave', startHeroAutoplay);

    startHeroAutoplay();
  }
  
})();
