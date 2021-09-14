const stacked = {
  name: 'Stacked',
  description: 'A flexible template that allows you to choose custom ratios.',
  lockAspectRatio: false,
  image:
    'https://i0.wp.com/www.alphr.com/wp-content/uploads/2021/03/image1-34.png?resize=690%2C1192&ssl=1',
  face: {
    aspect: 4 / 3,
    left: 0,
    top: 0,
    z: 0,
  },
  highlight: {
    aspect: 1,
    left: 0,
    top: 0,
    z: 1,
  },
};

const blurred = {
  name: 'Blurred',
  description: 'Highlight your clip and fill extra space with a blurred video.',
  lockAspectRatio: true,
  image:
    'https://i0.wp.com/www.alphr.com/wp-content/uploads/2021/03/image1-34.png?resize=690%2C1192&ssl=1',
  highlight: {
    aspect: 1,
    left: 0,
    top: 225,
    height: 375,
    z: 0,
  },
  background: true,
};

const fullscreen = {
  name: 'Fullscreen',
  description: 'Display your footage in portrait mode. Great for clips with no facecam.',
  lockAspectRatio: true,
  image:
    'https://i0.wp.com/www.alphr.com/wp-content/uploads/2021/03/image1-34.png?resize=690%2C1192&ssl=1',
  highlight: {
    aspect: 9 / 16,
    left: 0,
    top: 0,
    height: 812,
    z: 1,
  },
};

const smallcam = {
  name: 'Small Facecam',
  description: 'Display your footage overlayed with a small face cam clip.',
  lockAspectRatio: true,
  image:
    'https://i0.wp.com/www.alphr.com/wp-content/uploads/2021/03/image1-34.png?resize=690%2C1192&ssl=1',
  face: {
    aspect: 4 / 3,
    left: 0,
    top: 150,
    height: 150,
    z: 1,
  },
  highlight: {
    aspect: 1,
    left: 0,
    top: 250,
    height: 375,
    z: 0,
  },
  background: true,
};

const templates = [
  // stacked,  ---Removed for now
  blurred,
  fullscreen,
  smallcam,
];

export default templates;
