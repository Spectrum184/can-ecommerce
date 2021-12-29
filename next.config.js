module.exports = {
  reactStrictMode: true,
  env: {
    "BASE_URL": "http://localhost:3000",
    "MONGODB_URL": "mongodb+srv://thanhtk:<password>@cluster0.3i2nz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    "ACCESS_TOKEN_SECRET": "YOUR_ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET": "YOUR_REFRESH_TOKEN_SECRET",
    "CLOUD_UPDATE_PRESET": "kgcxl17h",
    "CLOUD_NAME": "sonobe",
    "CLOUD_API": "	https://api.cloudinary.com/v1_1/sonobe"
  },
  images: {
    loader: 'cloudinary',
    path: ''
  },
}
