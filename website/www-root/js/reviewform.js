{
  const form = document.getElementById('review-form');
  const formMessage = document.getElementById('form-message');
  const formMessageText = formMessage.getElementsByTagName('p')[0];
  const inputs = [...form.getElementsByTagName('input'), ...form.getElementsByTagName('select')];

  const pleaseWait = formMessage.dataset.wait;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    formMessage.classList.remove('hidden');
    formMessage.classList.add('asbestos');
    formMessageText.innerText = pleaseWait;

    const formdata = new FormData(form);
    inputs.forEach(input => input.setAttribute('disabled', ''));

    fetch(`${window.location.pathname}reviews`, {
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

        formMessageText.innerText = data.message;
      });
  });
}
