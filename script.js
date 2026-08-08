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
