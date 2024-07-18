export default async (request, context) => {

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

    return messageCharsCountSorted;
  };

  const requestBody = await request.json();

  const response = JSON.stringify({
    ...requestBody,
    obfuscated: obfuscateMessage(requestBody.message),
  });

  return new Response(response);
};
