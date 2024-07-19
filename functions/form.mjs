import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

const websiteEmail = 'belenls@me.com';
const client = new SESv2Client({
  region: 'eu-west-2',
  credentials: {
    accessKeyId: `${process.env.BS_SES_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.BS_SES_SECRET_ACCESS_KEY}`,
  },
});

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

const createEmail = (sender, receiver, subject, content) => ({
  FromEmailAddress: 'no-reply@belensantamarina.com',
  FromEmailAddressIdentityArn: `${process.env.BS_SES_EMAIL_ARN}`,
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

  const emailForReceiver = createEmail(
    email,
    websiteEmail,
    `New message from ${name}`,
    `Here's the obfuscated message from ${name} <${email}>:
    \n\n${obfuscatedMessage}`,
  );

  const commandForReceiver = new SendEmailCommand(emailForReceiver);
  const sendFromReceiver = await client.send(commandForReceiver);

  const response = JSON.stringify({
    ...sendFromReceiver,
    dialog: `Message sent, will be received as follows:
    \n${obfuscatedMessage}`,
  });

  return new Response(response);
};
