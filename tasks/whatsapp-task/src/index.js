const tasks = require('jfrog-pipelines-tasks');
const axios = require('axios');

async function main() {
  const phoneNumberId = tasks.getInput('phone-number-id');
  const token = tasks.getInput('token');
  const to = parseInt(tasks.getInput('to'));
  const message = tasks.getInput('message');

  const options = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    data: {
      messaging_product: 'whatsapp',
      to: to,
      type: 'template',
      template: {
        name: message,
        language: {
          code: 'en_US'
        }
      }
    },
    url: 'https://graph.facebook.com/v15.0/' + phoneNumberId + '/messages'
  };
  await axios(options);
}

(
  async () => {
    await main();
  }
)();