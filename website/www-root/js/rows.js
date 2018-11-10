window.newrow = (button) => {
  const row = button.parentElement;
  const container = row.parentElement;

  const newRow = document.createElement('div');
  const newInput = document.createElement('input');
  const newButton = document.createElement('button');

  newRow.setAttribute('class', 'ls-flex-row');

  newInput.setAttribute('name', row.children[0].getAttribute('name'));
  newInput.setAttribute('type', 'text');
  newInput.setAttribute('class', 'full-width');

  newButton.setAttribute('type', 'button');
  newButton.setAttribute('class', 'ls-button');
  newButton.addEventListener('click', () => {
    container.removeChild(newRow);
  });
  newButton.innerText = 'Delete';

  newRow.appendChild(newInput);
  newRow.appendChild(newButton);
  container.appendChild(newRow);

  console.log(row);
};
