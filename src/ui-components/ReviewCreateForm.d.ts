/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ReviewCreateFormInputValues = {
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
export declare type ReviewCreateFormValidationValues = {
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
export declare type ReviewCreateFormOverridesProps = {
    ReviewCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type ReviewCreateFormProps = React.PropsWithChildren<{
    overrides?: ReviewCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ReviewCreateFormInputValues) => ReviewCreateFormInputValues;
    onSuccess?: (fields: ReviewCreateFormInputValues) => void;
    onError?: (fields: ReviewCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ReviewCreateFormInputValues) => ReviewCreateFormInputValues;
    onValidate?: ReviewCreateFormValidationValues;
} & React.CSSProperties>;
export default function ReviewCreateForm(props: ReviewCreateFormProps): React.ReactElement;
