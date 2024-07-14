/********************************/
/*           MESSAGES           */
/********************************/

const messagesForm = document.getElementById('messages');
const messageTextarea = document.getElementById('message');
const messageCharCountSpan = document.getElementById('messageCharCount');
const maxChars = 140;

// const obfuscateMessage = (message) => {
//   const validChars = /^[0-9A-Z:¡!¿?().";/]+$/;

//   const messageChars = message
//     .toUpperCase()
//     .normalize('NFD')
//     .replace(/[\u0300-\u036f]/g, '')
//     .split('');
//   const messageCharsCount = messageChars.reduce((count, char) => {
//     if (validChars.test(char)) {
//       count[char] = (count[char] || 0) + 1;
//     }
//     return count;
//   }, {});

//   const messageCharsCountSorted = Object.entries(messageCharsCount).sort(
//     ([, valueA], [, valueB]) => valueB - valueA,
//   );

//   return messageCharsCountSorted;
// };

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

  console.log(formDataObject);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: JSON.stringify(formDataObject),
    });

    console.log(response);
    const json = await response.json();
    console.log(json);

  } catch (error) {
    console.error(error.message);
  }
};

messagesForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // const messagesFormData = new FormData(messagesForm);
  // const messagesFormDataObject = Object.fromEntries(messagesFormData);

  // const sentMessage = {
  //   ...messagesFormDataObject,
  //   obfuscated: obfuscateMessage(messagesFormDataObject.message),
  // };

  sendMessage(event.target);
});
