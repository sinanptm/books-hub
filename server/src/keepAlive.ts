import fetch from 'node-fetch';
import cron from 'node-cron';

const keepAlive = () => {
  fetch('https://books-hub-fnso.onrender.com/')
    .then(res => console.log(`Keep-alive ping: ${res.status}`))
    .catch(err => console.error(`Error pinging server: ${err.message}`));
};

cron.schedule('*/14 * * * *', () => {
  console.log('Pinging server to keep it alive...');
  keepAlive();
});