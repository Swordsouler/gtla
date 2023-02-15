import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

export enum ActionType {
  REVIEW_DETAIL_LIST = "REVIEW_DETAIL_LIST",
  REVIEW_DETAIL_MAP = "REVIEW_DETAIL_MAP",
  ACCESS_LIST = "ACCESS_LIST",
  ACCESS_MAP = "ACCESS_MAP",
  ACCESS_ADD = "ACCESS_ADD",
  SEARCH_NEARBY = "SEARCH_NEARBY",
  SEARCH_AUTOCOMPLETE = "SEARCH_AUTOCOMPLETE",
  LOAD_SHARED_LIST = "LOAD_SHARED_LIST",
  LOAD_SHARED_MAP = "LOAD_SHARED_MAP",
  LOAD_LOCAL_LIST = "LOAD_LOCAL_LIST",
  LOAD_LOCAL_MAP = "LOAD_LOCAL_MAP"
}

export enum S3ProtectionLevel {
  PRIVATE = "PRIVATE",
  PROTECTED = "PROTECTED",
  PUBLIC = "PUBLIC"
}

type EagerS3Data = {
  readonly key: string;
  readonly level: S3ProtectionLevel | keyof typeof S3ProtectionLevel;
  readonly identityId: string;
  readonly version: string;
}

type LazyS3Data = {
  readonly key: string;
  readonly level: S3ProtectionLevel | keyof typeof S3ProtectionLevel;
  readonly identityId: string;
  readonly version: string;
}

export declare type S3Data = LazyLoading extends LazyLoadingDisabled ? EagerS3Data : LazyS3Data

export declare const S3Data: (new (init: ModelInit<S3Data>) => S3Data)

type EagerAction = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Action, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly type?: ActionType | keyof typeof ActionType | null;
  readonly reviewID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAction = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Action, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly type?: ActionType | keyof typeof ActionType | null;
  readonly reviewID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Action = LazyLoading extends LazyLoadingDisabled ? EagerAction : LazyAction

export declare const Action: (new (init: ModelInit<Action>) => Action) & {
  copyOf(source: Action, mutator: (draft: MutableModel<Action>) => MutableModel<Action> | void): Action;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Reviews?: (Action | null)[] | null;
  readonly Actions?: (Action | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Reviews: AsyncCollection<Action>;
  readonly Actions: AsyncCollection<Action>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerReview = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Review, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly locationName: string;
  readonly longitude?: number | null;
  readonly latitude?: number | null;
  readonly address?: string | null;
  readonly website?: string | null;
  readonly type?: string | null;
  readonly rating?: number | null;
  readonly review?: string | null;
  readonly visitedDate: number;
  readonly images: (S3Data | null)[];
  readonly userID: string;
  readonly Actions?: (Action | null)[] | null;
  readonly placeID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReview = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Review, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly locationName: string;
  readonly longitude?: number | null;
  readonly latitude?: number | null;
  readonly address?: string | null;
  readonly website?: string | null;
  readonly type?: string | null;
  readonly rating?: number | null;
  readonly review?: string | null;
  readonly visitedDate: number;
  readonly images: (S3Data | null)[];
  readonly userID: string;
  readonly Actions: AsyncCollection<Action>;
  readonly placeID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Review = LazyLoading extends LazyLoadingDisabled ? EagerReview : LazyReview

export declare const Review: (new (init: ModelInit<Review>) => Review) & {
  copyOf(source: Review, mutator: (draft: MutableModel<Review>) => MutableModel<Review> | void): Review;
}