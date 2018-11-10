window.addEventListener('load', () => {
  const navside = document.getElementById('navside');
  const menuIcon = document.getElementById('menu-icon');

  menuIcon.addEventListener('click', () => {
    navside.style.transform = 'translateX(0)';
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('.nav-container')) return;
    navside.style.transform = 'translateX(-250px)';
  });
});
