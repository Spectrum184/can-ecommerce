module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: 'http://localhost:3000',
    NEXTAUTH_URL: 'http://localhost:3000',
    NEXT_AUTH_SECRET: '',
    MONGODB_URL: '',
    ACCESS_TOKEN_SECRET: '',
    REFRESH_TOKEN_SECRET: 'YOUR_REFRESH_TOKEN_SECRET',
    CLOUD_UPDATE_PRESET: '',
    CLOUD_NAME: '',
    CLOUD_API: '',
    GOOGLE_ID: '',
    GOOGLE_SECRET: '',
    FACEBOOK_CLIENT_ID: '',
    FACEBOOK_CLIENT_SECRET: '',
    FACEBOOK_PAGE_ID: '',
  },
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/can-ecommerce/image/upload/',
  },
};
