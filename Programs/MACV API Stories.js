// MACV = Microsoft Azure Computer Vision API

const axios = require('axios');
const config = require('./config');

const analyzeImage = async (imageUrl) => {
  try {
    const response = await axios.post(
      'https://westcentralus.api.cognitive.microsoft.com/vision/v2.1/analyze',
      {
        url: imageUrl
      },
      {
        headers: {
          'Ocp-Apim-Subscription-Key': config.computerVisionApiKey,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.objects;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const generateStory = async (imageUrl) => {
  const objects = await analyzeImage(imageUrl);
  if (!objects) {
    console.error('Error: Failed to analyze image.');
    return;
  }

  console.log('The image contains the following objects:');
  console.log(objects);

  let story = 'Once upon a time, there was ';
  objects.forEach((object, index) => {
    if (index === objects.length - 1) {
      story += `and a ${object.object}.`;
    } else if (index === 0) {
      story += `a ${object.object}, `;
    } else {
      story += `a ${object.object}, `;
    }
  });
  story += ' They all lived in a beautiful land, filled with wonder and adventure. ';
  story += 'One day, they embarked on a journey to discover the secrets of their land. ';
  story += 'Along the way, they faced many challenges, but they worked together and used their unique abilities to overcome them. ';
  story += 'In the end, they succeeded in their quest and learned that the true magic of their land was the bond of friendship they shared.';
  console.log('\nStory:\n' + story);
}

const imageUrl = 'https://example.com/image.jpg';
generateStory(imageUrl);
