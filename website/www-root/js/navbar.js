window.addEventListener('load', () => {
  const navside = document.getElementById('ls-navside');
  const menuIcon = document.getElementById('menu-icon');
  const navbar = document.getElementById('ls-navbar');

  menuIcon.addEventListener('click', () => {
    navside.style.transform = 'translateX(0)';
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('.nav-container') || window.innerWidth >= 650) return;
    console.log(event.target);
    navside.style.transform = 'translateX(-250px)';
  });

  const checkSize = () => {
    if (window.innerWidth < 650) {
      navside.style.transform = 'translateX(-250px)';
      navbar.classList.remove('default');
    } else {
      navside.style.transform = 'translateX(0)';
      navbar.classList.add('default');
    }
  };

  checkSize();
  window.addEventListener('resize', checkSize);
});
