/**
 * Forest Dew Udawalawa — Creative Motion & Animation System
 * International Boutique Hospitality Standards (Aman, One&Only, Rosewood)
 * GSAP 3.12+ and ScrollTrigger with native IntersectionObserver & CSS fallbacks.
 */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initAnimations() {
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-fade-up, .reveal-fade-in, .reveal-clip-right, .reveal-clip-up').forEach(el => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

    if (hasGSAP) {
      window.gsap.registerPlugin(window.ScrollTrigger);

      // 1. Hero Staggered Cinematic Intro
      const heroTimeline = window.gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      if (document.querySelector('.hero-cinematic')) {
        heroTimeline
          .from('.hero-kicker', { y: 24, opacity: 0, duration: 0.8, delay: 0.15 })
          .from('.hero-title', { y: 45, opacity: 0, duration: 1.1 }, '-=0.5')
          .from('.hero-lead', { y: 30, opacity: 0, duration: 0.9 }, '-=0.7')
          .from('.hero-actions', { y: 24, opacity: 0, duration: 0.8 }, '-=0.6')
          .from('.hero-meta-panel', { y: 36, opacity: 0, duration: 0.95 }, '-=0.7')
          .from('.hero-scroll-indicator', { opacity: 0, duration: 0.6 }, '-=0.3');
      }

      // 2. Scroll-Triggered Headings & Cards
      window.gsap.utils.toArray('.reveal-fade-up').forEach(item => {
        window.gsap.fromTo(item, 
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // 3. Cinematic Clip-Path Image Reveals
      window.gsap.utils.toArray('.reveal-clip-right').forEach(item => {
        window.gsap.fromTo(item,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.25,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: item,
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // 4. Subtle Parallax for Full Bleed & Sanctuary Sections
      window.gsap.utils.toArray('.hero-bg-media img, .page-hero-bg img, .sanctuary-aerial-card img').forEach(img => {
        window.gsap.to(img, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement || img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        });
      });

      // 5. Magnetic Hover Effect for Luxury Elements on Non-Touch Devices
      if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('.btn-gold, .btn-graphite, .header-cta, .theme-toggle-btn, .luxury-concierge-pill, .hero-scene-btn, .sanctuary-pill, .gallery-filter-btn, .party-btn').forEach(btn => {
          btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.22;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.22;
            window.gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
          });

          btn.addEventListener('mouseleave', () => {
            window.gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
          });
        });
      }

      // 6. Scale In Reveals
      window.gsap.utils.toArray('.reveal-scale-in').forEach(item => {
        window.gsap.fromTo(item,
          { scale: 0.94, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

    } else {
      // Robust IntersectionObserver Fallback
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              obs.unobserve(entry.target);
            }
          });
        }, { rootMargin: '0px 0px -40px 0px', threshold: 0.08 });

        document.querySelectorAll('.reveal-fade-up, .reveal-fade-in, .reveal-clip-right, .reveal-clip-up, .reveal-scale-in').forEach(el => {
          observer.observe(el);
        });
      } else {
        document.querySelectorAll('.reveal-fade-up, .reveal-fade-in, .reveal-clip-right, .reveal-clip-up, .reveal-scale-in').forEach(el => {
          el.classList.add('is-revealed');
        });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }

})();
