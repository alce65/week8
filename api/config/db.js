import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

export async function mongoConnect() {
  const user = process.env.DB_USER;
  const passwd = process.env.DB_PASSWD;
  let databaseName;

  console.log('NODE_ENV', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'test') {
    databaseName = process.env.DB_NAME_TEST;
    console.log({ databaseName });
  } else if (process.env.NODE_ENV === 'dev') {
    databaseName = process.env.DB_NAME;
  } else {
    // process.env.NODE_ENV === "prod"
    databaseName = process.env.DB_NAME_PROD;
  }

  const uri = `mongodb+srv://${user}:${passwd}@cluster0.dj9ya.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

  const mongooseConnect = await mongoose.connect(uri);
  return mongooseConnect;
}
