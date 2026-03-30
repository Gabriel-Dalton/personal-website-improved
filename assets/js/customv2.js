'use strict';

const testimonialsModalContainer = document.querySelector('[data-modal-container]');
const overlay = document.querySelector('[data-overlay]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const testimonialItems = document.querySelectorAll('[data-testimonials-item]');

const toggleTestimonialModal = () => {
  if (testimonialsModalContainer && overlay) {
    testimonialsModalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('modal-active');
  }
};

testimonialItems.forEach(item => {
  item.addEventListener('click', () => {
    const modalImg = item.querySelector('[data-testimonials-avatar]')?.innerHTML;
    const modalTitle = item.querySelector('[data-testimonials-title]')?.innerHTML;
    const modalText = item.querySelector('[data-testimonials-text]')?.innerHTML;

    const modalImgElement = document.querySelector('[data-modal-img]');
    const modalTitleElement = document.querySelector('[data-modal-title]');
    const modalTextElement = document.querySelector('[data-modal-text]');
    const testimonialRoleElement = document.querySelector('.testimonial-role');

    if (modalImgElement && modalImg) modalImgElement.innerHTML = modalImg;
    if (modalTitleElement && modalTitle) modalTitleElement.innerHTML = modalTitle;
    if (modalTextElement && modalText) modalTextElement.innerHTML = modalText;

    const roles = {
      'Tricia Collingham': 'Former Executive Director, Stanley Park Ecology Society',
      'Jordan Mittler': 'Founder, Mittler Senior Technology',
      'Revd. Philip Cochrane': "Former Priest, St. Paul's Anglican Church",
      'Michael Andersen': 'Founder, SustainableWWW'
    };
    const role = roles[modalTitle?.trim()] || '';
    if (testimonialRoleElement) testimonialRoleElement.textContent = role;

    toggleTestimonialModal();
  });
});

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', toggleTestimonialModal);
}

if (overlay) {
  overlay.addEventListener('click', toggleTestimonialModal);
}

const emailElement = document.querySelector('[data-email]');
if (emailElement) {
  emailElement.addEventListener('click', function() {
    const email = this.dataset.email;
    navigator.clipboard.writeText(email).then(() => {
      this.classList.add('copied');
      setTimeout(() => this.classList.remove('copied'), 2000);
    });
  });
}

function scrollTestimonials(direction) {
  const testimonialsList = document.querySelector('.testimonials-list');
  if (testimonialsList) {
    const scrollAmount = testimonialsList.offsetWidth * 0.8;
    testimonialsList.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  }
}
