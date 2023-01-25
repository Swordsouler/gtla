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
    latitude?: number;
    longitude?: string;
    address?: string;
    website?: string;
    rating?: number;
    type?: string;
    review?: string;
    visitedDate?: number;
    googleImages?: string[];
};
export declare type ReviewCreateFormValidationValues = {
    latitude?: ValidationFunction<number>;
    longitude?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    website?: ValidationFunction<string>;
    rating?: ValidationFunction<number>;
    type?: ValidationFunction<string>;
    review?: ValidationFunction<string>;
    visitedDate?: ValidationFunction<number>;
    googleImages?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReviewCreateFormOverridesProps = {
    ReviewCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    latitude?: PrimitiveOverrideProps<TextFieldProps>;
    longitude?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    website?: PrimitiveOverrideProps<TextFieldProps>;
    rating?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    review?: PrimitiveOverrideProps<TextFieldProps>;
    visitedDate?: PrimitiveOverrideProps<TextFieldProps>;
    googleImages?: PrimitiveOverrideProps<TextFieldProps>;
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
