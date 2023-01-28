// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const S3ProtectionLevel = {
  "PRIVATE": "PRIVATE",
  "PROTECTED": "PROTECTED",
  "PUBLIC": "PUBLIC"
};

const { User, Review, S3Data } = initSchema(schema);

export {
  User,
  Review,
  S3ProtectionLevel,
  S3Data
};