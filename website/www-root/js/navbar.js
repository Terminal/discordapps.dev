document.addEventListener('DOMContentLoaded', () => {
  const navside = document.getElementById('ls-navside');
  const menuIcon = document.getElementById('menu-icon');

  menuIcon.addEventListener('click', () => {
    navside.style.transform = 'translateX(0)';
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('.nav-container') || window.innerWidth >= 650) return;
    navside.style.transform = 'translateX(-250px)';
  });
});
