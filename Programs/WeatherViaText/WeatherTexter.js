const axios = require('axios');
const Twilio = require('twilio');
const config = require('./config');
const argv = require('yargs').argv;

const client = new Twilio(config.twilioAccountSid, config.twilioAuthToken);

async function getWeather(location) {
  try {
    const mapsUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${config.googleMapsApiKey}`;
    const mapsResponse = await axios.get(mapsUrl);
    const { lat, lng } = mapsResponse.data.results[0].geometry.location;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${config.openWeatherApiKey}`;
    const weatherResponse = await axios.get(weatherUrl);
    const { temp, pressure, humidity, temp_min, temp_max } = weatherResponse.data.main;
    const { description, icon } = weatherResponse.data.weather[0];
    return `The current weather in ${location} is ${temp}°F with ${description}. Temperature ranges between ${temp_min}°F and ${temp_max}°F, humidity is at ${humidity}% and pressure is at ${pressure} hPa.`;
  } catch (error) {
    console.error(error);
    return `Unable to get weather for ${location}.`;
  }
}

async function sendWeatherText(location, phoneNumber) {
  const message = await getWeather(location);
  client.messages
    .create({
      body: message,
      from: config.twilioPhoneNumber,
      to: phoneNumber
    })
    .then(message => console.log(`Text sent to ${phoneNumber}: ${message.body}`))
    .catch(error => console.error(error));
}

const location = argv.location;
const phoneNumber = argv.phoneNumber;

if (!location || !phoneNumber) {
  console.error('Error: location and phoneNumber are required arguments.');
} else {
  sendWeatherText(location, phoneNumber);
}
