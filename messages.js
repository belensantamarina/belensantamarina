/********************************/
/*           MESSAGES           */
/********************************/

const messagesForm = document.getElementById('messages');
const messageTextarea = document.getElementById('message');
const messageCharCountSpan = document.getElementById('messageCharCount');
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

    const responseBody = await response.json();
    console.log(responseBody);

  } catch (error) {
    console.error(error.message);
  }
};

messagesForm.addEventListener('submit', (event) => {
  event.preventDefault();

  sendMessage(event.target);
});
