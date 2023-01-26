/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Review } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
}) {
  const labelElement = <Text>{label}</Text>;
  const { tokens } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            color={tokens.colors.brand.primary[80]}
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
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
    latitude: "",
    longitude: "",
    address: "",
    locationName: "",
    website: "",
    rating: "",
    type: "",
    review: "",
    visitedDate: "",
    googleImages: [],
  };
  const [latitude, setLatitude] = React.useState(initialValues.latitude);
  const [longitude, setLongitude] = React.useState(initialValues.longitude);
  const [address, setAddress] = React.useState(initialValues.address);
  const [locationName, setLocationName] = React.useState(
    initialValues.locationName
  );
  const [website, setWebsite] = React.useState(initialValues.website);
  const [rating, setRating] = React.useState(initialValues.rating);
  const [type, setType] = React.useState(initialValues.type);
  const [review, setReview] = React.useState(initialValues.review);
  const [visitedDate, setVisitedDate] = React.useState(
    initialValues.visitedDate
  );
  const [googleImages, setGoogleImages] = React.useState(
    initialValues.googleImages
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = reviewRecord
      ? { ...initialValues, ...reviewRecord }
      : initialValues;
    setLatitude(cleanValues.latitude);
    setLongitude(cleanValues.longitude);
    setAddress(cleanValues.address);
    setLocationName(cleanValues.locationName);
    setWebsite(cleanValues.website);
    setRating(cleanValues.rating);
    setType(cleanValues.type);
    setReview(cleanValues.review);
    setVisitedDate(cleanValues.visitedDate);
    setGoogleImages(cleanValues.googleImages ?? []);
    setCurrentGoogleImagesValue("");
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
  const [currentGoogleImagesValue, setCurrentGoogleImagesValue] =
    React.useState("");
  const googleImagesRef = React.createRef();
  const validations = {
    latitude: [{ type: "Required" }],
    longitude: [{ type: "Required" }],
    address: [{ type: "Required" }],
    locationName: [{ type: "Required" }],
    website: [{ type: "URL" }],
    rating: [],
    type: [],
    review: [],
    visitedDate: [{ type: "Required" }],
    googleImages: [],
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
          latitude,
          longitude,
          address,
          locationName,
          website,
          rating,
          type,
          review,
          visitedDate,
          googleImages,
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
        label="Latitude"
        isRequired={true}
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
              latitude: value,
              longitude,
              address,
              locationName,
              website,
              rating,
              type,
              review,
              visitedDate,
              googleImages,
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
        label="Longitude"
        isRequired={true}
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
              latitude,
              longitude: value,
              address,
              locationName,
              website,
              rating,
              type,
              review,
              visitedDate,
              googleImages,
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
        label="Address"
        isRequired={true}
        isReadOnly={false}
        value={address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              latitude,
              longitude,
              address: value,
              locationName,
              website,
              rating,
              type,
              review,
              visitedDate,
              googleImages,
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
        label="Location name"
        isRequired={true}
        isReadOnly={false}
        value={locationName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              latitude,
              longitude,
              address,
              locationName: value,
              website,
              rating,
              type,
              review,
              visitedDate,
              googleImages,
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
        label="Website"
        isRequired={false}
        isReadOnly={false}
        value={website}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              latitude,
              longitude,
              address,
              locationName,
              website: value,
              rating,
              type,
              review,
              visitedDate,
              googleImages,
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
              latitude,
              longitude,
              address,
              locationName,
              website,
              rating: value,
              type,
              review,
              visitedDate,
              googleImages,
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
        label="Type"
        isRequired={false}
        isReadOnly={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              latitude,
              longitude,
              address,
              locationName,
              website,
              rating,
              type: value,
              review,
              visitedDate,
              googleImages,
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
        label="Review"
        isRequired={false}
        isReadOnly={false}
        value={review}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              latitude,
              longitude,
              address,
              locationName,
              website,
              rating,
              type,
              review: value,
              visitedDate,
              googleImages,
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
              latitude,
              longitude,
              address,
              locationName,
              website,
              rating,
              type,
              review,
              visitedDate: value,
              googleImages,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              latitude,
              longitude,
              address,
              locationName,
              website,
              rating,
              type,
              review,
              visitedDate,
              googleImages: values,
            };
            const result = onChange(modelFields);
            values = result?.googleImages ?? values;
          }
          setGoogleImages(values);
          setCurrentGoogleImagesValue("");
        }}
        currentFieldValue={currentGoogleImagesValue}
        label={"Google images"}
        items={googleImages}
        hasError={errors.googleImages?.hasError}
        setFieldValue={setCurrentGoogleImagesValue}
        inputFieldRef={googleImagesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Google images"
          isRequired={false}
          isReadOnly={false}
          value={currentGoogleImagesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.googleImages?.hasError) {
              runValidationTasks("googleImages", value);
            }
            setCurrentGoogleImagesValue(value);
          }}
          onBlur={() =>
            runValidationTasks("googleImages", currentGoogleImagesValue)
          }
          errorMessage={errors.googleImages?.errorMessage}
          hasError={errors.googleImages?.hasError}
          ref={googleImagesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "googleImages")}
        ></TextField>
      </ArrayField>
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
