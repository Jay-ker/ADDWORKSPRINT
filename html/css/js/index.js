document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const heroVideo = document.getElementById("hero-video");

  // Mobile Menu Toggle
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // Hero Video Handling
  if (heroVideo) {
    const videoContainer = heroVideo.parentElement;
    videoContainer.classList.add("video-loading");

    heroVideo.addEventListener("loadeddata", () => {
      heroVideo.classList.add("loaded");
      videoContainer.classList.remove("video-loading");
      heroVideo.play().catch(e => console.log("Playback retry failed:", e));
    });

    heroVideo.addEventListener("error", () => {
      console.log("Video failed to load, using fallback");
      heroVideo.style.display = "none";
      videoContainer.classList.remove("video-loading");
    });

    // Ensure autoplay works
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Auto-play prevented:", error);
      });
    }

    // Visibility-based playback
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          heroVideo.play().catch(e => console.log("Play failed:", e));
        } else {
          heroVideo.pause();
        }
      });
    }, { threshold: 0.1 });

    setTimeout(() => observer.observe(heroVideo), 500);

    // Mobile click-to-play button
    if ("ontouchstart" in window) {
      const playButton = document.createElement("button");
      playButton.innerHTML = "▶️ Play Video";
      playButton.className = "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold z-20";
      videoContainer.appendChild(playButton);

      playButton.addEventListener("click", () => {
        heroVideo.play().then(() => {
          playButton.style.display = "none";
        }).catch(e => console.log("Manual play failed:", e));
      });

      heroVideo.addEventListener("play", () => {
        playButton.style.display = "none";
      });
    }

    // Resize handling for mobile
    const handleVideoResize = () => {
      if (window.innerWidth < 768) {
        heroVideo.style.objectFit = "cover";
        heroVideo.style.width = "100%";
        heroVideo.style.height = "100%";
      }
    };

    window.addEventListener("resize", handleVideoResize);
    handleVideoResize();
  }

  // Sticky Navbar Shadow
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("shadow-lg");
    } else {
      header.classList.remove("shadow-lg");
    }
  });

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth"
        });
      }
    });
  });

  // Scroll-triggered animations
  const observeElements = () => {
    const animatedElements = document.querySelectorAll(
      '.stats-card, .hover-scale, .portfolio-hover, .animate-slide-left, .animate-slide-right'
    );

    const elementObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      elementObserver.observe(el);
    });
  };

  observeElements();

  // Lazy load contact background
  const contactBg = document.querySelector('.cta-gradient img');
  if (contactBg && contactBg.dataset.src) {
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          contactBg.src = contactBg.dataset.src;
          contactBg.addEventListener('load', () => {
            contactBg.style.opacity = '0.2';
          });
          contactObserver.unobserve(contactBg);
        }
      });
    });

    contactObserver.observe(contactBg);
  }

  // Preload contact image
  const preloadImage = (src) => {
    const img = new Image();
    img.src = src;
  };

  preloadImage('css/js/images/contact-bg.jpg');

  // Image loading states
  const images = document.querySelectorAll('img[src]');
  images.forEach(img => {
    if (!img.complete) {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease';

      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });

      img.addEventListener('error', () => {
        img.style.opacity = '0.5';
        console.log('Image failed to load:', img.src);
      });
    }
  });

  // Portfolio hover effects
  const portfolioItems = document.querySelectorAll('.portfolio-hover');
  portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const overlay = item.querySelector('.portfolio-overlay');
      if (overlay) {
        overlay.style.transform = 'translate(-50%, -50%) scale(1.1)';
      }
    });

    item.addEventListener('mouseleave', () => {
      const overlay = item.querySelector('.portfolio-overlay');
      if (overlay) {
        overlay.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    });
  });
});