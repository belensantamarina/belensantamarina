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

/* BUTTON: SUBMIT */
const submitButton = document.createElement('input');
submitButton.setAttribute('id', 'submit');
submitButton.setAttribute('type', 'submit');
submitButton.setAttribute('name', 'submit');
submitButton.value = 'Send';

form.appendChild(submitButton);

/* FORM: LOGIC */
mainContainer.appendChild(form);

const obfuscateMessage = (message) => {
  const validChars = /^[0-9A-Z:¡!¿?().";/]+$/;

  const messageChars = message
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split('');
  const messageCharsCount = messageChars.reduce((count, char) => {
    if (validChars.test(char)) {
      count[char] = (count[char] || 0) + 1;
    }
    return count;
  }, {});

  const messageCharsCountSorted = Object.entries(messageCharsCount).sort(
    ([, valueA], [, valueB]) => valueB - valueA,
  );

  return messageCharsCountSorted.map((char) => char.join(' → ')).join('\n');
};

const sendMessage = async (targetForm, submitter) => {
  const formData = new FormData(targetForm);
  const formDataObject = Object.fromEntries(formData);

  const requestBody = {
    ...formDataObject,
    obfuscated: obfuscateMessage(formDataObject.message),
  };

  for (const formElement of targetForm.elements) {
    formElement.setAttribute('disabled', 'disabled');
  }
  submitter.value = 'Sending...';

  console.log('requestBody', requestBody);

  try {
    const response = await fetch(targetForm.action, {
      method: targetForm.method,
      body: JSON.stringify(requestBody),
    });

    const responseBody = await response.json();
    if (responseBody) {
      console.log('responseBody', responseBody);
      submitter.value = 'Sent!';
      const responseParagraph = document.createElement('p');
      responseParagraph.textContent = `Message sent, will be received as follows:
      \n${responseBody.requestBody.obfuscated}`;
      targetForm.appendChild(responseParagraph);
    }
  } catch (error) {
    console.error(error.message);
    for (const formElement of targetForm.elements) {
      formElement.removeAttribute('disabled');
    }
    submitter.value = 'Error... (Try again)';
  }
};

form.addEventListener('submit', (event) => {
  sendMessage(event.target, event.submitter);

  event.preventDefault();
});
