/********************************/
/*             FORM             */
/********************************/

const mainContainer = document.querySelector('main');
const maxChars = 140;

const form = document.createElement('form');
form.setAttribute('method', 'post');
form.setAttribute('action', '/.netlify/functions/form');

/* INPUT: NAME */
const nameFieldset = document.createElement('fieldset');

const nameLabel = document.createElement('label');
nameLabel.setAttribute('for', 'name');
nameLabel.textContent = 'Name';
nameFieldset.appendChild(nameLabel);

const nameInput = document.createElement('input');
nameInput.setAttribute('id', 'name');
nameInput.setAttribute('type', 'text');
nameInput.setAttribute('name', 'name');
nameInput.setAttribute('required', 'required');
nameFieldset.appendChild(nameInput);

form.appendChild(nameFieldset);

/* INPUT: EMAIL */
const emailFieldset = document.createElement('fieldset');

const emailLabel = document.createElement('label');
emailLabel.setAttribute('for', 'email');
emailLabel.textContent = 'E-mail';
emailFieldset.appendChild(emailLabel);

const emailInput = document.createElement('input');
emailInput.setAttribute('id', 'email');
emailInput.setAttribute('type', 'email');
emailInput.setAttribute('name', 'email');
emailInput.setAttribute('required', 'required');
emailFieldset.appendChild(emailInput);

form.appendChild(emailFieldset);

/* INPUT: MESSAGE */
const messageFieldset = document.createElement('fieldset');
messageFieldset.setAttribute('class', 'textarea');

const messageLabel = document.createElement('label');
messageLabel.setAttribute('for', 'message');
messageLabel.textContent = 'Message';
messageFieldset.appendChild(messageLabel);

const messageInput = document.createElement('textarea');
messageInput.setAttribute('id', 'message');
messageInput.setAttribute('name', 'message');
messageInput.setAttribute('rows', '6');
messageInput.setAttribute('required', 'required');
messageFieldset.appendChild(messageInput);

const messageSpan = document.createElement('span');
messageSpan.textContent = `0/${maxChars}`;
messageFieldset.appendChild(messageSpan);

form.appendChild(messageFieldset);

/* BUTTON: SUBMIT */
const submitButton = document.createElement('input');
submitButton.setAttribute('id', 'submit');
submitButton.setAttribute('type', 'submit');
submitButton.setAttribute('name', 'submit');
submitButton.value = 'Send';

form.appendChild(submitButton);

/* FORM: APPEND */
mainContainer.appendChild(form);

messageInput.addEventListener('input', () => {
  const nonSpaceChars = messageInput.value.replace(/\s/g, '');
  if (nonSpaceChars.length > maxChars) {
    let truncatedValue = '';
    let count = 0;

    for (let char of messageInput.value) {
      if (char !== ' ' && char !== '\t' && char !== '\n' && char !== '\r') {
        count++;
      }
      if (count > maxChars) {
        break;
      }
      truncatedValue += char;
    }
    messageInput.value = truncatedValue;
  }
  const currentLength = messageInput.value.replace(/\s/g, '').length;
  messageSpan.textContent = `${currentLength}/${maxChars}`;
});

const sendMessage = async (target) => {
  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value,
      }),
    });

    const responseBody = await response.json();
    if (responseBody) {
      console.log(responseBody);
      submitButton.value = 'Sent!';
      const responseParagraph = document.createElement('p');
      responseParagraph.textContent = responseBody.dialog;
      form.appendChild(responseParagraph);
    }
  } catch (error) {
    console.error(error.message);
    submitButton.value = 'Error... (Try again)';
    nameInput.removeAttribute('disabled');
    emailInput.removeAttribute('disabled');
    messageInput.removeAttribute('disabled');
    submitButton.removeAttribute('disabled');
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  nameInput.setAttribute('disabled', 'disabled');
  emailInput.setAttribute('disabled', 'disabled');
  messageInput.setAttribute('disabled', 'disabled');
  submitButton.setAttribute('disabled', 'disabled');
  submitButton.value = 'Sending...';

  sendMessage(event.target);
});
