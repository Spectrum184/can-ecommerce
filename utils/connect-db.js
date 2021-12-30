import mongoose from 'mongoose';

export const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    console.log('🌈: Database already connected!');
    return;
  }

  console.log(process.env.MONGODB_URL);

  mongoose.connect(
    process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;

      console.log('🔥: Connected to mongo!');
    }
  );
};
