// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ActionType = {
  "REVIEW_DETAIL_LIST": "REVIEW_DETAIL_LIST",
  "REVIEW_DETAIL_MAP": "REVIEW_DETAIL_MAP",
  "ACCESS_LIST": "ACCESS_LIST",
  "ACCESS_MAP": "ACCESS_MAP",
  "ACCESS_ADD": "ACCESS_ADD",
  "SEARCH_NEARBY": "SEARCH_NEARBY",
  "SEARCH_AUTOCOMPLETE": "SEARCH_AUTOCOMPLETE",
  "LOAD_SHARED_LIST": "LOAD_SHARED_LIST",
  "LOAD_SHARED_MAP": "LOAD_SHARED_MAP",
  "LOAD_LOCAL_LIST": "LOAD_LOCAL_LIST",
  "LOAD_LOCAL_MAP": "LOAD_LOCAL_MAP"
};

const S3ProtectionLevel = {
  "PRIVATE": "PRIVATE",
  "PROTECTED": "PROTECTED",
  "PUBLIC": "PUBLIC"
};

const { Action, User, Review, S3Data } = initSchema(schema);

export {
  Action,
  User,
  Review,
  ActionType,
  S3ProtectionLevel,
  S3Data
};