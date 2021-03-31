import fetch from 'node-fetch';

const getTwitchUserData = async (accessToken) => {
  const url = `https://api.twitch.tv/kraken/user`;
  const clientId = process.env.TWITCH_CLIENT_ID;

  try {
    const data = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `OAuth ${accessToken}`,
        'Client-ID': clientId,
      },
    });
    if (!data.ok) return null;
    const resp = await data.json();
    const { email, name, _id: twitch_id, logo: twitch_profile_picture } = resp;
    return { email, name, twitch_id, twitch_profile_picture };
  } catch (e) {
    console.error(e);
    return e;
  }
};

export default getTwitchUserData;
