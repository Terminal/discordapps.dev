window.editors = {};

window.newRow = (button) => {
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
  newButton.setAttribute('onclick', 'deleteRow(this)');
  newButton.innerText = button.dataset.deleteLocalised;

  newRow.appendChild(newInput);
  newRow.appendChild(newButton);
  container.appendChild(newRow);
};

window.deleteRow = (button) => {
  const row = button.parentElement;
  const container = row.parentElement;

  container.removeChild(row);
};

require.config({
  paths: {
    vs: '/node_modules/monaco-editor/min/vs'
  }
});

require(['vs/editor/editor.main'], () => { // eslint-disable-line
  window.addLanguage = () => {
    const languageOptionsBox = document.getElementById('language');
    const languagesBox = document.getElementById('languages-box');

    const selectedLanguageCode = languageOptionsBox.value;

    const deleteLocalised = languagesBox.dataset.delete;
    const nameLocalised = languagesBox.dataset.name;
    const descriptionLocalised = languagesBox.dataset.description;
    const pageLocalised = languagesBox.dataset.page;

    if (selectedLanguageCode !== 'null') {
      const selectedLanguageOption = languageOptionsBox.children[languageOptionsBox.selectedIndex];
      const selectedLanguageName = selectedLanguageOption.innerText;

      languageOptionsBox.removeChild(selectedLanguageOption);

      const languageRow = document.createElement('div');
      languageRow.setAttribute('class', 'ls-main-content container box-shadow ls-round github');
      languageRow.dataset.title = selectedLanguageName;
      languageRow.id = selectedLanguageCode;

      const titleRow = document.createElement('div');
      const title = document.createElement('h3');
      const deleteLanguageButton = document.createElement('button');

      titleRow.setAttribute('class', 'ls-flex-row');
      title.innerText = selectedLanguageName;
      deleteLanguageButton.setAttribute('type', 'button');
      deleteLanguageButton.setAttribute('onclick', `deleteLanguage('${selectedLanguageCode}')`);
      deleteLanguageButton.setAttribute('class', 'ls-button');
      deleteLanguageButton.innerText = deleteLocalised;

      const nameLabel = document.createElement('label');
      const nameInput = document.createElement('input');
      nameLabel.setAttribute('for', `bot.contents.${selectedLanguageCode}.name`);
      nameLabel.innerText = nameLocalised;
      nameInput.setAttribute('name', `bot.contents.${selectedLanguageCode}.name`);
      nameInput.setAttribute('type', 'text');
      nameInput.setAttribute('class', 'full-width');
      const descriptionLabel = document.createElement('label');
      const descriptionInput = document.createElement('input');
      descriptionLabel.setAttribute('for', `bot.contents.${selectedLanguageCode}.description`);
      descriptionLabel.innerText = descriptionLocalised;
      descriptionInput.setAttribute('name', `bot.contents.${selectedLanguageCode}.description`);
      descriptionInput.setAttribute('type', 'text');
      descriptionInput.setAttribute('class', 'full-width');
      const pageLabel = document.createElement('label');
      const pageInput = document.createElement('textarea');
      const monacoInput = document.createElement('div');
      pageLabel.setAttribute('for', `bot.contents.${selectedLanguageCode}.page`);
      pageLabel.innerText = pageLocalised;
      pageInput.setAttribute('name', `bot.contents.${selectedLanguageCode}.page`);
      pageInput.id = `bot.contents.${selectedLanguageCode}.page`;
      pageInput.classList.add('full-width', 'ls-edit-page');
      monacoInput.classList.add('ls-edit-monaco');

      titleRow.appendChild(title);
      titleRow.appendChild(deleteLanguageButton);
      languageRow.appendChild(titleRow);
      languageRow.appendChild(nameLabel);
      languageRow.appendChild(nameInput);
      languageRow.appendChild(descriptionLabel);
      languageRow.appendChild(descriptionInput);
      languageRow.appendChild(pageLabel);
      languageRow.appendChild(pageInput);
      languageRow.appendChild(monacoInput);

      languagesBox.appendChild(languageRow);

      const editor = monaco.editor.create(monacoInput, { // eslint-disable-line
        language: 'markdown',
        automaticLayout: true,
        theme: 'vs-dark'
      });

      window.editors[selectedLanguageCode] = editor;
    }
  };

  window.addEventListener('load', () => {
    const monacos = [...document.getElementsByClassName('ls-edit-monaco')];
    monacos.forEach((div) => {
      const textarea = document.getElementById(`bot.contents.${div.parentElement.id}.page`);
      const editor = monaco.editor.create(div, { // eslint-disable-line
        language: 'markdown',
        automaticLayout: true,
        theme: 'vs-dark',
        value: textarea.value
      });

      window.editors[div.parentElement.id] = editor;
    });
  });
});

window.deleteLanguage = (id) => {
  const languageOptionsBox = document.getElementById('language');
  const languagesBox = document.getElementById('languages-box');

  const boxToDelete = document.getElementById(id);

  if (boxToDelete) {
    const name = boxToDelete.dataset.title;
    languagesBox.removeChild(boxToDelete);
    delete window.editors[id];

    const option = document.createElement('option');
    option.innerText = name;
    option.setAttribute('value', id);

    languageOptionsBox.appendChild(option);
  }
};

{
  const form = document.getElementById('edit-form');
  const formMessage = document.getElementById('form-message');
  const inputs = [...form.getElementsByTagName('input'), ...form.getElementsByTagName('select')];

  const pleaseWait = formMessage.dataset.wait;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    Object.keys(window.editors).forEach((languageCode) => {
      const textarea = document.getElementById(`bot.contents.${languageCode}.page`);
      const value = window.editors[languageCode].getValue();
      if (value.length > 0) {
        textarea.value = value;
      }
    });

    formMessage.classList.remove('hidden', 'secondary');
    formMessage.classList.add('asbestos');
    formMessage.innerText = pleaseWait;

    const formdata = new FormData(form);
    inputs.forEach(input => input.setAttribute('disabled', ''));

    fetch('/bots/add', {
      method: 'POST',
      body: formdata,
    })
      .then(data => data.json())
      .then((data) => {
        if (data.ok) {
          formMessage.classList.remove('alizarin', 'asbestos');
          formMessage.classList.add('emerald');
        } else {
          formMessage.classList.remove('emerald', 'asbestos');
          formMessage.classList.add('alizarin');
          inputs.forEach(input => input.removeAttribute('disabled'));
        }

        if (data.redirect) {
          setTimeout(() => {
            window.location.href = data.redirect;
          }, 500);
        }

        formMessage.innerText = data.message;
      });
  });
}
