const cron = require('node-cron');
const request = require('request-promise');
const fs = require('fs');

cron.schedule('0 0 * * *', async () => {
  console.log('Fetching data...');
  const response = await request('https://jsonplaceholder.typicode.com/posts/1');
  fs.writeFileSync('response.json', response);
  console.log('Data saved to response.json');
});

console.log('Scheduler started');
