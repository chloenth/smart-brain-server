const returnClarifyRequestOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the Account's Security section
  const PAT = process.env.PAT;
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = process.env.USER_ID;
  const APP_ID = process.env.APP_ID;
  // Change these to whatever model and image URL you want to use
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Key ' + PAT,
    },
    body: raw,
  };

  return requestOptions;
};

const handleImage = (db) => (req, res) => {
  const { id, imageUrl } = req.body;

  fetch(
    'https://api.clarifai.com/v2/models/face-detection/outputs',
    returnClarifyRequestOptions(imageUrl)
  )
    .then((response) => {
      if (!response.ok) {
        console.log('Fetch failed with status:', response.status);
        throw new Error('Network response was not ok');
      }

      return response.json();
    })
    .then((data) => {
      console.log('data: ', data);
      const clarifaiFace =
        data.outputs[0].data.regions[0].region_info.bounding_box;

      console.log('clarifaiFace: ', clarifaiFace);
      db('users')
        .returning('*')
        .where({ id })
        .increment('entries', 1)
        .returning('entries')
        .then((entries) =>
          res.json({ entries: entries[0].entries, clarifaiFace })
        )
        .catch((err) => {
          console.log(err);
          res.status(400).json('unable to get entries');
        });
    })
    .catch((err) => {
      console.log('i am in catch block');
      console.log(err);
      res.status(400).json('error getting face detection');
    });
};

module.exports = { handleImage };
