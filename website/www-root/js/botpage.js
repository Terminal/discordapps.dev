{
  const more = document.getElementById('ls-more');
  const less = document.getElementById('ls-less');
  const custom = document.getElementById('ls-custom-content');

  more.addEventListener('click', () => {
    custom.setAttribute('style', 'max-height: unset');
    more.classList.add('hidden');
    less.classList.remove('hidden');
  });

  less.addEventListener('click', () => {
    custom.setAttribute('style', '');
    less.classList.add('hidden');
    more.classList.remove('hidden');
  });
}
