import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

const websiteEmail = 'amoritan@me.com'; // 'belenls@me.com';
const client = new SESv2Client({ region: 'eu-west-2' });

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

const createEmail = (sender, receiver, subject, content) => ({
  FromEmailAddress: 'no-reply@belensantamarina.com',
  FromEmailAddressIdentityArn: `${process.env.EMAIL_ARN}`,
  Destination: {
    ToAddresses: [receiver],
  },
  ReplyToAddresses: [sender],
  Content: {
    Simple: {
      Subject: {
        Data: subject,
        Charset: 'utf-8',
      },
      Body: {
        Text: {
          Data: content,
          Charset: 'utf-8',
        },
      },
    },
  },
});

export default async (request, context) => {
  const requestBody = await request.json();
  const { email, message, name } = requestBody;
  const obfuscatedMessage = obfuscateMessage(message);

  const emailForSender = createEmail(
    websiteEmail,
    email,
    `Message sent to Belen Santamarina`,
    `Here's a copy of your message:\n ${message}`,
  );
  const emailForReceiver = createEmail(
    email,
    websiteEmail,
    `New message from ${name}`,
    `Here's the obfuscated from ${name} <${email}>:\n ${obfuscatedMessage.join('\n')}`,
  );

  const commandForSender = new SendEmailCommand(emailForSender);
  const commandForReceiver = new SendEmailCommand(emailForReceiver);
  const sendFromSender = await client.send(commandForSender);
  const sendFromReceiver = await client.send(commandForReceiver);

  const response = JSON.stringify({
    sendFromSender,
    sendFromReceiver,
  });

  return new Response(response);
};
