{
  const more = document.getElementById('ls-more');
  const less = document.getElementById('ls-less');
  const custom = document.getElementById('ls-custom-content');

  let allowExtension = true;

  // Calculate the height required to display the children.
  // Get each child's height, top and bottom margin
  // Then sum them together
  const getExtendedHeight = () => [...custom.children]
    .map((elem) => {
      const height = elem.clientHeight;
      const topMargin = parseInt(document.defaultView.getComputedStyle(elem, '').getPropertyValue('margin-top'), 10);
      const bottomMargin = parseInt(document.defaultView.getComputedStyle(elem, '').getPropertyValue('margin-bottom'), 10);

      return topMargin + height + bottomMargin;
    })
    .reduce((prev, curr) => prev + curr, 0);

  // Set the height, if the contents is extended
  const setExtendedHeight = () => {
    if (allowExtension) {
      custom.style.height = `${getExtendedHeight()}px`;
    }
  };

  more.addEventListener('click', () => {
    allowExtension = true;
    setExtendedHeight();
    more.classList.add('hidden');
    less.classList.remove('hidden');
  });

  // When shrinking, unextend
  less.addEventListener('click', () => {
    allowExtension = false;
    custom.style.height = '150px';
    less.classList.add('hidden');
    more.classList.remove('hidden');
  });

  window.addEventListener('resize', () => {
    setExtendedHeight();
  });

  window.addEventListener('load', () => {
    if (getExtendedHeight() < 150) {
      allowExtension = true;
      less.classList.add('hidden');
      more.classList.add('hidden');
      setExtendedHeight();
    }
  });
}
