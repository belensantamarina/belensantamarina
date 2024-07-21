import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

const websiteEmail = 'belenls@me.com';
const client = new SESv2Client({
  region: 'eu-west-2',
  credentials: {
    accessKeyId: `${process.env.BS_SES_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.BS_SES_SECRET_ACCESS_KEY}`,
  },
});

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
  const { email, message, name, obfuscated } = requestBody;

  const emailForReceiver = createEmail(
    email,
    websiteEmail,
    `Unspoken Rituals: New message from ${name}`,
    `Here's the obfuscated message from ${name} <${email}>:
    \n\n${obfuscated}`,
  );

  const commandForReceiver = new SendEmailCommand(emailForReceiver);
  const sendFromReceiver = await client.send(commandForReceiver);

  const responseBody = {
    sendFromReceiver,
    requestBody,
  };

  console.log('responseBody', responseBody);
  const response = JSON.stringify(responseBody);

  return new Response(response);
};
