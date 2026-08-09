const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
  });
});

const bookmarkButtons = document.querySelectorAll('.bookmark-toggle');
bookmarkButtons.forEach(button => {
  button.addEventListener('click', () => {
    const isSaved = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', String(!isSaved));
    button.querySelector('.bookmark-label').textContent = isSaved ? 'Save' : 'Saved';
  });
});

const weatherToggle = document.getElementById('weather-toggle');
const weatherInfo = document.getElementById('weather-info');
const weatherCard = document.querySelector('.weather-card');
const weatherMoods = [
  'Quiet rain and paper-soft clouds.',
  'Moonlit stillness with a hint of steam.',
  'Gentle fog and warm light through glass.',
  'Soft drizzle and the comfort of a candle-lit room.'
];
let weatherIndex = 0;

if (weatherToggle && weatherInfo) {
  weatherToggle.addEventListener('click', () => {
    weatherIndex = (weatherIndex + 1) % weatherMoods.length;
    weatherInfo.textContent = weatherMoods[weatherIndex];
    if (weatherCard) {
      weatherCard.classList.add('pulse');
      window.setTimeout(() => weatherCard.classList.remove('pulse'), 600);
    }
  });
}

// Lightbox functionality for visual memory gallery
const lightbox = document.getElementById('lightbox');
const lbInner = lightbox && lightbox.querySelector('.lightbox-inner');
const lbImg = lightbox && lightbox.querySelector('.lightbox-img');
const lbTitle = lightbox && lightbox.querySelector('.lightbox-caption h3');
const lbCaption = lightbox && lightbox.querySelector('.lightbox-caption p');
const lbClose = lightbox && lightbox.querySelector('.lightbox-close');

function openLightbox(src, alt, title, caption) {
  if (!lightbox) return;
  lbImg.src = src || '';
  lbImg.alt = alt || '';
  if (lbTitle) lbTitle.textContent = title || '';
  if (lbCaption) lbCaption.textContent = caption || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  if (lbImg) lbImg.src = '';
  document.body.style.overflow = '';
}

// Attach click listeners to gallery thumbnails
document.querySelectorAll('.memory-card .memory-thumb').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', (e) => {
    const src = img.getAttribute('data-large') || img.src;
    const title = img.getAttribute('data-title') || '';
    const caption = img.getAttribute('data-caption') || '';
    openLightbox(src, img.alt, title, caption);
  });
});

if (lbClose) lbClose.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}
if (lbInner) lbInner.addEventListener('click', (e) => e.stopPropagation());
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
