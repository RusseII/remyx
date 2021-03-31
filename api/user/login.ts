import type { VercelRequest, VercelResponse } from '@vercel/node';
import getTwitchUserData from '../twitch/_getTwitchUserData';

const connectToDatabase = require('../_connectToDatabase');
// const addUser = require('./_addUser');
const getUserTwitchCredentials = require('../twitch/_getUserTwitchCredentials');

// const postNewStripeCustomer = require('../stripe/_postNewStripeCustomer');

const login = async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { code } = req.query;
    if (!code) {
      res.status(401).send('ERROR: NO CODE RECEIVED');
    }

    const credentials = await getUserTwitchCredentials(code);

    const twitchUserData = await getTwitchUserData(credentials.access_token);

    const db = await connectToDatabase();

    const filter = { twitch_id: twitchUserData.id };
    const options = { upsert: true };
    const updatedoc = {
      $set: twitchUserData,
    };

    db.collection('users').updateOne(filter, updatedoc, options);
    res.status(200).json(credentials);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = login;
