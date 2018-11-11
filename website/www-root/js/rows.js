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
  newButton.innerText = 'Delete';

  newRow.appendChild(newInput);
  newRow.appendChild(newButton);
  container.appendChild(newRow);

  console.log(row);
};

window.deleteRow = (button) => {
  const row = button.parentElement;
  const container = row.parentElement;

  container.removeChild(row);
};

require.config({
  paths: {
    vs: '../node_modules/monaco-editor/min/vs'
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

    if (selectedLanguageCode) {
      const selectedLanguageOption = languageOptionsBox.children[languageOptionsBox.selectedIndex];
      const selectedLanguageName = selectedLanguageOption.innerText;

      languageOptionsBox.removeChild(selectedLanguageOption);

      const languageRow = document.createElement('div');
      languageRow.setAttribute('class', 'box-container github');
      languageRow.dataset.title = selectedLanguageName;
      languageRow.id = selectedLanguageCode;

      const titleRow = document.createElement('div');
      const title = document.createElement('h3');
      const deleteLanguageButton = document.createElement('button');

      titleRow.setAttribute('class', 'ls-flex-row');
      title.innerText = selectedLanguageName;
      deleteLanguageButton.setAttribute('type', 'button');
      deleteLanguageButton.setAttribute('onclick', `deleteLanguage("${selectedLanguageCode}")`);
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
      const pageInput = document.createElement('input');
      pageLabel.setAttribute('for', `bot.contents.${selectedLanguageCode}.page`);
      pageLabel.innerText = pageLocalised;
      pageInput.setAttribute('name', `bot.contents.${selectedLanguageCode}.page`);
      pageInput.setAttribute('type', 'text');
      pageInput.setAttribute('class', 'full-width');

      titleRow.appendChild(title);
      titleRow.appendChild(deleteLanguageButton);
      languageRow.appendChild(titleRow);
      languageRow.appendChild(nameLabel);
      languageRow.appendChild(nameInput);
      languageRow.appendChild(descriptionLabel);
      languageRow.appendChild(descriptionInput);
      languageRow.appendChild(pageLabel);
      languageRow.appendChild(pageInput);

      languagesBox.appendChild(languageRow);
    }
  };
});

window.deleteLanguage = (id) => {
  const languageOptionsBox = document.getElementById('language');
  const languagesBox = document.getElementById('languages-box');

  const boxToDelete = document.getElementById(id);

  if (boxToDelete) {
    const name = boxToDelete.dataset.title;
    languagesBox.removeChild(boxToDelete);

    const option = document.createElement('option');
    option.innerText = name;
    option.setAttribute('value', id);

    languageOptionsBox.appendChild(option);
  }
};
