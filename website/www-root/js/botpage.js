{
  const more = document.getElementById('ls-more');
  const less = document.getElementById('ls-less');
  const custom = document.getElementById('ls-custom-content');

  // When true, it is closed.
  let allowExtension = true;

  // Calculate the height required to display the children.
  // Get each child's height, top and bottom margin
  // Then sum them together
  const getExtendedHeight = () => [...custom.children]
    .map((elem) => {
      const height = elem.clientHeight;
      let topMargin = 2;
      let bottomMargin = 2;

      try {
        topMargin = parseInt(document.defaultView.getComputedStyle(elem, '').getPropertyValue('margin-top'), 10);
        bottomMargin = parseInt(document.defaultView.getComputedStyle(elem, '').getPropertyValue('margin-bottom'), 10);
      } catch (e) {
        // Do nothing!
        // Too bad other browsers
      }

      return topMargin + height + bottomMargin;
    })
    .reduce((prev, curr) => prev + curr, 0);

  // Set the height, if the contents is extended
  const setExtendedHeight = () => {
    custom.style.height = `${getExtendedHeight()}px`;
  };

  // If unextended, extend
  more.addEventListener('click', () => {
    allowExtension = false;
    setExtendedHeight();
    more.classList.add('hidden');
    less.classList.remove('hidden');
  });

  // If extended, shrink
  less.addEventListener('click', () => {
    allowExtension = true;
    custom.style.height = '150px';
    less.classList.add('hidden');
    more.classList.remove('hidden');
  });

  window.addEventListener('resize', () => {
    // If extended and resize occurs, resize the box
    if (!allowExtension) {
      setExtendedHeight();
    }
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
