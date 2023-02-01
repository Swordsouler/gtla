import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

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

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Reviews?: (Review | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Reviews: AsyncCollection<Review>;
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
  readonly googleImages: (string | null)[];
  readonly userID: string;
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
  readonly googleImages: (string | null)[];
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Review = LazyLoading extends LazyLoadingDisabled ? EagerReview : LazyReview

export declare const Review: (new (init: ModelInit<Review>) => Review) & {
  copyOf(source: Review, mutator: (draft: MutableModel<Review>) => MutableModel<Review> | void): Review;
}