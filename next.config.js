module.exports = {
  reactStrictMode: true,
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/can-ecommerce/image/upload/',
    minimumCacheTTL: 60,
  },
  env: {
    BASE_URL: 'http://localhost:3000',
    NEXTAUTH_URL: 'http://localhost:3000',
    NEXT_AUTH_SECRET: 'chiuthua',
    MONGODB_URL:
      'mongodb+srv://vutrongcan:vutrongcan123@cluster0.emi3k.mongodb.net/can-ecommerce?retryWrites=true&w=majority',
    ACCESS_TOKEN_SECRET: 'candepzaikhoaito',
    REFRESH_TOKEN_SECRET: 'YOUR_REFRESH_TOKEN_SECRET',
    CLOUD_UPDATE_PRESET: 'pxvcb9nk',
    CLOUD_NAME: 'can-ecommerce',
    CLOUD_API: 'https://api.cloudinary.com/v1_1/can-ecommerce/upload',
    GOOGLE_ID:
      '960432847093-64hfpv7uis2is3bkculhr79mdq2vfcja.apps.googleusercontent.com',
    GOOGLE_SECRET: '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',
    FACEBOOK_CLIENT_ID: '1119424262134501',
    FACEBOOK_CLIENT_SECRET: '5f245d247efaf93597f59a35db8794eb',
    FACEBOOK_PAGE_ID: '1989678864417195',
  },
};
