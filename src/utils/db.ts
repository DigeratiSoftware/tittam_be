import mongoose from 'mongoose';

export const connectMongo = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI not set');
  await mongoose.connect(uri);
  console.log('✅ Connected to MongoDB');
};
