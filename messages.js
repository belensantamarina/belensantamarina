/********************************/
/*           MESSAGES           */
/********************************/

const messagesForm = document.getElementById('messages');
const messageName = document.getElementById('name');
const messageEmail = document.getElementById('email');
const messageTextarea = document.getElementById('message');
const messageCharCountSpan = document.getElementById('messageCharCount');
const messageSubmit = document.getElementById('submit');
const maxChars = 140;

messageTextarea.addEventListener('input', () => {
  const nonSpaceChars = messageTextarea.value.replace(/\s/g, '');
  if (nonSpaceChars.length > maxChars) {
    let truncatedValue = '';
    let count = 0;

    for (let char of messageTextarea.value) {
      if (char !== ' ' && char !== '\t' && char !== '\n' && char !== '\r') {
        count++;
      }
      if (count > maxChars) {
        break;
      }
      truncatedValue += char;
    }
    messageTextarea.value = truncatedValue;
  }
  const currentLength = messageTextarea.value.replace(/\s/g, '').length;
  messageCharCountSpan.textContent = `${currentLength}/${maxChars}`;
});

const sendMessage = async (form) => {
  const formData = new FormData(form);
  const formDataObject = Object.fromEntries(formData);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: JSON.stringify(formDataObject),
    });

    messageName.setAttribute('disabled', 'disabled');
    messageEmail.setAttribute('disabled', 'disabled');
    messageTextarea.setAttribute('disabled', 'disabled');
    messageSubmit.setAttribute('disabled', 'disabled');
    messageSubmit.value = 'Sending...';

    const responseBody = await response.json();
    if (responseBody) {
      console.log(responseBody);
      messageSubmit.value = 'Sent!';
    }
  } catch (error) {
    console.error(error.message);
    messageSubmit.value = 'Error... (Try again)';
    messageName.removeAttribute('disabled');
    messageEmail.removeAttribute('disabled');
    messageTextarea.removeAttribute('disabled');
    messageSubmit.removeAttribute('disabled');
  }
};

messagesForm.addEventListener('submit', (event) => {
  event.preventDefault();

  sendMessage(event.target);
});
