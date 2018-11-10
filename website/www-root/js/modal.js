/* exported: openModal */

window.openModal = (button) => {
  const name = button.id.substr(0, button.id.lastIndexOf('-'));
  const modal = document.getElementById(name);

  modal.style.display = 'block';
  modal.classList.remove('modal--close');

  const closeButtons = [...modal.getElementsByClassName('ls-exit-modal')];
  const images = modal.getElementsByTagName('img');

  [...images].forEach((image) => {
    image.setAttribute('src', image.dataset.src);
  });

  const close = (e) => {
    if (e.target === modal || closeButtons.includes(e.target)) {
      modal.classList.add('modal--close');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 575);
    }
  };

  modal.addEventListener('click', close);
};
