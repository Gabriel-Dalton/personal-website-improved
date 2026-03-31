'use strict';

document.addEventListener('DOMContentLoaded', function () {

  // Hero image load transition
  var heroImg = document.querySelector('.hero-image-wrapper img');
  if (heroImg) {
    if (!heroImg.complete) {
      heroImg.style.opacity = '0';
      heroImg.addEventListener('load', function () {
        heroImg.style.transition = 'opacity 0.5s ease';
        heroImg.style.opacity = '1';
      });
    }
  }

  // Project modals
  var workCards = document.querySelectorAll('[data-modal]');
  var body = document.body;

  function openModal(id) {
    var overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.add('active');
    body.style.overflow = 'hidden';
  }

  function closeModal(overlay) {
    if (!overlay) return;
    overlay.classList.remove('active');
    body.style.overflow = '';
  }

  function closeActiveModal() {
    var active = document.querySelector('.modal-overlay.active');
    if (active) closeModal(active);
  }

  workCards.forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(this.getAttribute('data-modal'));
    });
  });

  document.querySelectorAll('.modal-close').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeModal(this.closest('.modal-overlay'));
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === this) closeModal(this);
    });
  });

  document.querySelectorAll('.modal').forEach(function (m) {
    m.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeActiveModal();
  });

});
