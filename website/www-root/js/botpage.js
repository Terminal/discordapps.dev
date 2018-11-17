{
  const more = document.getElementById('ls-more');
  const less = document.getElementById('ls-less');
  const custom = document.getElementById('ls-custom-content');
  const description = document.getElementById('ls-short-description');
  const slider = document.getElementById('ls-image-slider');

  more.addEventListener('click', () => {
    description.classList.add('hidden');
    custom.classList.remove('hidden');
    more.classList.add('hidden');
    less.classList.remove('hidden');
  });

  less.addEventListener('click', () => {
    custom.classList.add('hidden');
    description.classList.remove('hidden');
    less.classList.add('hidden');
    more.classList.remove('hidden');
  });

  if (slider) {
    tns({
      container: '#ls-image-slider',
    });
  }
}
