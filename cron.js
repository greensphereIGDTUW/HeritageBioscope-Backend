import cron from 'cron'; 
import https from 'https'; 

const backendUrl = 'https://heritagebioscope.onrender.com';

const job = new cron.CronJob('*/14 * * * *', function () { // This function will be executed every 14 minutes.

console.log('Restarting server");

// Perfora an HTTPS GET request to hit any backend api.

https.get (backendUrl, (res) => {

if (res.statusCode === 200) (

console.log('Server restarted');

}else { console.error(

"failed to restart server with status code: ${res.statusCode)"
  );
      })

.on('error', (err) {

console.error('Error during Restart:', err.message);
  });
});

export default job; 
