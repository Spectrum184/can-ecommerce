module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: 'http://localhost:3000',
    NEXTAUTH_URL: 'http://localhost:3000',
    NEXT_AUTH_SECRET: 'chiuthua',
    MONGODB_URL:
      'mongodb+srv://thanhtk:thanh1804@cluster0.3i2nz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ACCESS_TOKEN_SECRET: 'dcmnoaothatday',
    REFRESH_TOKEN_SECRET: 'YOUR_REFRESH_TOKEN_SECRET',
    CLOUD_UPDATE_PRESET: 'kgcxl17h',
    CLOUD_NAME: 'sonobe',
    CLOUD_API: 'https://api.cloudinary.com/v1_1/sonobe',
    GOOGLE_ID:
      '919773181699-bb0tj7vpk61iujdc5528dd8e758e5obb.apps.googleusercontent.com',
    GOOGLE_SECRET: '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',
    FACEBOOK_CLIENT_ID: '2261398960828245',
    FACEBOOK_CLIENT_SECRET: '9bc6853c7efb08e30609937c4f752452',
  },
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/sonobe/image/upload/',
  },
};
