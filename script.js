const burgerMenu = document.getElementById('burgerMenu');
const navMenu = document.getElementById('navMenu');

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('active');
  navMenu.classList.toggle('show');
});


// ---test


const slides = document.querySelectorAll('.video-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

// --- SHOW SLIDE FUNCTION ---
function showSlide(index) {
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    const video = slide.querySelector('video');
    const playBtn = slide.querySelector('.play-pause');

    if (i === index) {
      video.play();
      playBtn.textContent = '❚❚';
    } else {
      video.pause();
      video.currentTime = 0;
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  currentSlide = index;
}

// --- DOT NAVIGATION ---
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => showSlide(i));
});

// --- NAV ARROWS (desktop only) ---
document.querySelectorAll('.nav-arrow').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('next')) showSlide(currentSlide + 1);
    else showSlide(currentSlide - 1);
  });
});

// --- PLAY/PAUSE ---
document.querySelectorAll('.play-pause').forEach(button => {
  button.addEventListener('click', e => {
    const video = e.target.closest('.video-slide').querySelector('video');
    if (video.paused) {
      video.play();
      e.target.textContent = '❚❚';
    } else {
      video.pause();
      e.target.textContent = '►';
    }
  });
});

// --- MUTE TOGGLE + VOLUME SLIDER ---
document.querySelectorAll('.mute-toggle').forEach(button => {
  button.addEventListener('click', e => {
    const container = e.target.closest('.controls-container');
    const video = e.target.closest('.video-slide').querySelector('video');
    const sliderWrapper = container.querySelector('.volume-slider-wrapper');

    video.muted = !video.muted;
    e.target.textContent = video.muted ? '🔇' : '🔊';

    // Toggle vertical volume slider
    if (!video.muted) {
      sliderWrapper.classList.add('visible');
    } else {
      sliderWrapper.classList.remove('visible');
    }
  });
});

// --- VOLUME INPUT HANDLING ---
document.querySelectorAll('.volume-slider').forEach(slider => {
  slider.addEventListener('input', e => {
    const video = e.target.closest('.video-slide').querySelector('video');
    video.volume = e.target.value;
  });
});

// --- SWIPE SUPPORT FOR MOBILE ---
let starttX = 0;

slides.forEach(slide => {
  slide.addEventListener('touchstart', e => {
    starttX = e.touches[0].clientX;
  });

  slide.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = starttX - endX;
    if (deltaX > 50) showSlide(currentSlide + 1);
    else if (deltaX < -50) showSlide(currentSlide - 1);
  });
});

// --- FADE-IN ON SCROLL ---
const fadeSection = document.querySelector('.fade-in-section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      fadeSection.classList.add('visible');
    }
  });
}, { threshold: 0.3 });

observer.observe(fadeSection);

// --- INIT ---
showSlide(currentSlide);





// -----------INFO SHIT
const offerSlides = document.querySelectorAll(".offer-slide");
const offerNext = document.querySelector(".offer-next");
const offerPrev = document.querySelector(".offer-prev");
const indicators = document.querySelectorAll(".indicator");
let offerIndex = 0;

function showOfferSlide(index) {
  offerSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  // Update indicators
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === index);
  });
}

offerNext.addEventListener("click", () => {
  offerIndex = (offerIndex + 1) % offerSlides.length;
  showOfferSlide(offerIndex);
});

offerPrev.addEventListener("click", () => {
  offerIndex = (offerIndex - 1 + offerSlides.length) % offerSlides.length;
  showOfferSlide(offerIndex);
});

// Indicator navigation functionality
indicators.forEach(indicator => {
  indicator.addEventListener("click", () => {
    offerIndex = parseInt(indicator.getAttribute("data-index"));
    showOfferSlide(offerIndex);
  });
});

// Optional: Swipe support for mobile
let startX = 0;

document.querySelector(".offer-slider").addEventListener("touchstart", (e) => {
  startX = e.changedTouches[0].screenX;
});

document.querySelector(".offer-slider").addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].screenX;
  if (endX < startX - 50) {
    offerNext.click();
  } else if (endX > startX + 50) {
    offerPrev.click();
  }
});









// particlkes

const canvas = document.getElementById("landing-particles");
  const ctx = canvas.getContext("2d");

  let particlesArray;
  const colors = ["#FFD700", "#FF69B4", "#00FFFF", "#ADFF2F", "#FFA07A"];

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  window.addEventListener("resize", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initParticles();
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 3 + 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.speedX = Math.random() * 1.2 - 0.6;
      this.speedY = Math.random() * 1.2 - 0.6;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

      this.draw();
    }
  }

  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 80; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => p.update());
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();



  

