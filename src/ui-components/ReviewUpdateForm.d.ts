/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Review } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ReviewUpdateFormInputValues = {
    locationName?: string;
    longitude?: number;
    latitude?: number;
    address?: string;
    website?: string;
    type?: string;
    rating?: number;
    review?: string;
    visitedDate?: number;
    userID?: string;
    placeID?: string;
};
export declare type ReviewUpdateFormValidationValues = {
    locationName?: ValidationFunction<string>;
    longitude?: ValidationFunction<number>;
    latitude?: ValidationFunction<number>;
    address?: ValidationFunction<string>;
    website?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    rating?: ValidationFunction<number>;
    review?: ValidationFunction<string>;
    visitedDate?: ValidationFunction<number>;
    userID?: ValidationFunction<string>;
    placeID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReviewUpdateFormOverridesProps = {
    ReviewUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    locationName?: PrimitiveOverrideProps<TextFieldProps>;
    longitude?: PrimitiveOverrideProps<TextFieldProps>;
    latitude?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    website?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    rating?: PrimitiveOverrideProps<TextFieldProps>;
    review?: PrimitiveOverrideProps<TextFieldProps>;
    visitedDate?: PrimitiveOverrideProps<TextFieldProps>;
    userID?: PrimitiveOverrideProps<TextFieldProps>;
    placeID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ReviewUpdateFormProps = React.PropsWithChildren<{
    overrides?: ReviewUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    review?: Review;
    onSubmit?: (fields: ReviewUpdateFormInputValues) => ReviewUpdateFormInputValues;
    onSuccess?: (fields: ReviewUpdateFormInputValues) => void;
    onError?: (fields: ReviewUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ReviewUpdateFormInputValues) => ReviewUpdateFormInputValues;
    onValidate?: ReviewUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ReviewUpdateForm(props: ReviewUpdateFormProps): React.ReactElement;
