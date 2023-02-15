/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Review } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ReviewUpdateForm(props) {
  const {
    id: idProp,
    review,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    locationName: "",
    longitude: "",
    latitude: "",
    address: "",
    website: "",
    type: "",
    rating: "",
    review: "",
    visitedDate: "",
    userID: "",
    placeID: "",
  };
  const [locationName, setLocationName] = React.useState(
    initialValues.locationName
  );
  const [longitude, setLongitude] = React.useState(initialValues.longitude);
  const [latitude, setLatitude] = React.useState(initialValues.latitude);
  const [address, setAddress] = React.useState(initialValues.address);
  const [website, setWebsite] = React.useState(initialValues.website);
  const [type, setType] = React.useState(initialValues.type);
  const [rating, setRating] = React.useState(initialValues.rating);
  const [review, setReview] = React.useState(initialValues.review);
  const [visitedDate, setVisitedDate] = React.useState(
    initialValues.visitedDate
  );
  const [userID, setUserID] = React.useState(initialValues.userID);
  const [placeID, setPlaceID] = React.useState(initialValues.placeID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = reviewRecord
      ? { ...initialValues, ...reviewRecord }
      : initialValues;
    setLocationName(cleanValues.locationName);
    setLongitude(cleanValues.longitude);
    setLatitude(cleanValues.latitude);
    setAddress(cleanValues.address);
    setWebsite(cleanValues.website);
    setType(cleanValues.type);
    setRating(cleanValues.rating);
    setReview(cleanValues.review);
    setVisitedDate(cleanValues.visitedDate);
    setUserID(cleanValues.userID);
    setPlaceID(cleanValues.placeID);
    setErrors({});
  };
  const [reviewRecord, setReviewRecord] = React.useState(review);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(Review, idProp) : review;
      setReviewRecord(record);
    };
    queryData();
  }, [idProp, review]);
  React.useEffect(resetStateValues, [reviewRecord]);
  const validations = {
    locationName: [{ type: "Required" }],
    longitude: [],
    latitude: [],
    address: [],
    website: [{ type: "URL" }],
    type: [],
    rating: [],
    review: [],
    visitedDate: [{ type: "Required" }],
    userID: [{ type: "Required" }],
    placeID: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue
      ? getDisplayValue(currentValue)
      : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertTimeStampToDate = (ts) => {
    if (Math.abs(Date.now() - ts) < Math.abs(Date.now() - ts * 1000)) {
      return new Date(ts);
    }
    return new Date(ts * 1000);
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hour12: false,
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          locationName,
          longitude,
          latitude,
          address,
          website,
          type,
          rating,
          review,
          visitedDate,
          userID,
          placeID,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Review.copyOf(reviewRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ReviewUpdateForm")}
      {...rest}
    >
      <TextField
        label="Location name"
        isRequired={true}
        isReadOnly={false}
        value={locationName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              locationName: value,
              longitude,
              latitude,
              address,
              website,
              type,
              rating,
              review,
              visitedDate,
              userID,
              placeID,
            };
            const result = onChange(modelFields);
            value = result?.locationName ?? value;
          }
          if (errors.locationName?.hasError) {
            runValidationTasks("locationName", value);
          }
          setLocationName(value);
        }}
        onBlur={() => runValidationTasks("locationName", locationName)}
        errorMessage={errors.locationName?.errorMessage}
        hasError={errors.locationName?.hasError}
        {...getOverrideProps(overrides, "locationName")}
      ></TextField>
      <TextField
        label="Longitude"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={longitude}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              locationName,
              longitude: value,
              latitude,
              address,
              website,
              type,
              rating,
              review,
              visitedDate,
              userID,
              placeID,
            };
            const result = onChange(modelFields);
            value = result?.longitude ?? value;
          }
          if (errors.longitude?.hasError) {
            runValidationTasks("longitude", value);
          }
          setLongitude(value);
        }}
        onBlur={() => runValidationTasks("longitude", longitude)}
        errorMessage={errors.longitude?.errorMessage}
        hasError={errors.longitude?.hasError}
        {...getOverrideProps(overrides, "longitude")}
      ></TextField>
      <TextField
        label="Latitude"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={latitude}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              locationName,
              longitude,
              latitude: value,
              address,
              website,
              type,
              rating,
              review,
              visitedDate,
              userID,
              placeID,
            };
            const result = onChange(modelFields);
            value = result?.latitude ?? value;
          }
          if (errors.latitude?.hasError) {
            runValidationTasks("latitude", value);
          }
          setLatitude(value);
        }}
        onBlur={() => runValidationTasks("latitude", latitude)}
        errorMessage={errors.latitude?.errorMessage}
        hasError={errors.latitude?.hasError}
        {...getOverrideProps(overrides, "latitude")}
      ></TextField>
      <TextField
        label="Address"
        isRequired={false}
        isReadOnly={false}
        value={address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              locationName,
              longitude,
              latitude,
              address: value,
              website,
              type,
              rating,
              review,
              visitedDate,
              userID,
              placeID,
            };
            const result = onChange(modelFields);
            value = result?.address ?? value;
          }
          if (errors.address?.hasError) {
            runValidationTasks("address", value);
          }
          setAddress(value);
        }}
        onBlur={() => runValidationTasks("address", address)}
        errorMessage={errors.address?.errorMessage}
        hasError={errors.address?.hasError}
        {...getOverrideProps(overrides, "address")}
      ></TextField>
      <TextField
        label="Website"
        isRequired={false}
        isReadOnly={false}
        value={website}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              locationName,
              longitude,
              latitude,
              address,
              website: value,
              type,
              rating,
              review,
              visitedDate,
              userID,
              placeID,
            };
            const result = onChange(modelFields);
            value = result?.website ?? value;
          }
          if (errors.website?.hasError) {
            runValidationTasks("website", value);
          }
          setWebsite(value);
        }}
        onBlur={() => runValidationTasks("website", website)}
        errorMessage={errors.website?.errorMessage}
        hasError={errors.website?.hasError}
        {...getOverrideProps(overrides, "website")}
      ></TextField>
      <TextField
        label="Type"
        isRequired={false}
        isReadOnly={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              locationName,
              longitude,
              latitude,
              address,
              website,
              type: value,
              rating,
              review,
              visitedDate,
              userID,
              placeID,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      ></TextField>
      <TextField
        label="Rating"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={rating}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              locationName,
              longitude,
              latitude,
              address,
              website,
              type,
              rating: value,
              review,
              visitedDate,
              userID,
              placeID,
            };
            const result = onChange(modelFields);
            value = result?.rating ?? value;
          }
          if (errors.rating?.hasError) {
            runValidationTasks("rating", value);
          }
          setRating(value);
        }}
        onBlur={() => runValidationTasks("rating", rating)}
        errorMessage={errors.rating?.errorMessage}
        hasError={errors.rating?.hasError}
        {...getOverrideProps(overrides, "rating")}
      ></TextField>
      <TextField
        label="Review"
        isRequired={false}
        isReadOnly={false}
        value={review}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              locationName,
              longitude,
              latitude,
              address,
              website,
              type,
              rating,
              review: value,
              visitedDate,
              userID,
              placeID,
            };
            const result = onChange(modelFields);
            value = result?.review ?? value;
          }
          if (errors.review?.hasError) {
            runValidationTasks("review", value);
          }
          setReview(value);
        }}
        onBlur={() => runValidationTasks("review", review)}
        errorMessage={errors.review?.errorMessage}
        hasError={errors.review?.hasError}
        {...getOverrideProps(overrides, "review")}
      ></TextField>
      <TextField
        label="Visited date"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={
          visitedDate && convertToLocal(convertTimeStampToDate(visitedDate))
        }
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : Number(new Date(e.target.value));
          if (onChange) {
            const modelFields = {
              locationName,
              longitude,
              latitude,
              address,
              website,
              type,
              rating,
              review,
              visitedDate: value,
              userID,
              placeID,
            };
            const result = onChange(modelFields);
            value = result?.visitedDate ?? value;
          }
          if (errors.visitedDate?.hasError) {
            runValidationTasks("visitedDate", value);
          }
          setVisitedDate(value);
        }}
        onBlur={() => runValidationTasks("visitedDate", visitedDate)}
        errorMessage={errors.visitedDate?.errorMessage}
        hasError={errors.visitedDate?.hasError}
        {...getOverrideProps(overrides, "visitedDate")}
      ></TextField>
      <TextField
        label="User id"
        isRequired={true}
        isReadOnly={false}
        value={userID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              locationName,
              longitude,
              latitude,
              address,
              website,
              type,
              rating,
              review,
              visitedDate,
              userID: value,
              placeID,
            };
            const result = onChange(modelFields);
            value = result?.userID ?? value;
          }
          if (errors.userID?.hasError) {
            runValidationTasks("userID", value);
          }
          setUserID(value);
        }}
        onBlur={() => runValidationTasks("userID", userID)}
        errorMessage={errors.userID?.errorMessage}
        hasError={errors.userID?.hasError}
        {...getOverrideProps(overrides, "userID")}
      ></TextField>
      <TextField
        label="Place id"
        isRequired={false}
        isReadOnly={false}
        value={placeID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              locationName,
              longitude,
              latitude,
              address,
              website,
              type,
              rating,
              review,
              visitedDate,
              userID,
              placeID: value,
            };
            const result = onChange(modelFields);
            value = result?.placeID ?? value;
          }
          if (errors.placeID?.hasError) {
            runValidationTasks("placeID", value);
          }
          setPlaceID(value);
        }}
        onBlur={() => runValidationTasks("placeID", placeID)}
        errorMessage={errors.placeID?.errorMessage}
        hasError={errors.placeID?.hasError}
        {...getOverrideProps(overrides, "placeID")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || review)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || review) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
