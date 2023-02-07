import { ThunkDispatch } from "@reduxjs/toolkit";
import { DataStore } from "aws-amplify";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Review, S3Data } from "../../models";
import { getFileExtension, loadReviews } from "../../redux/ReviewManager";
import { ReviewProps } from "../../ui-kit/Review/Review";
import "./Add.scss";
import {
  InformationsTitle,
  InformationsForm,
  InformationsOnSubmit,
} from "./Form/Informations";
import { LocationForm, LocationOnSubmit, LocationTitle } from "./Form/Location";
import {
  pictures,
  PicturesForm,
  PicturesOnSubmit,
  PicturesTitle,
} from "./Form/Pictures";
import { ReviewForm, ReviewOnSubmit, ReviewTitle } from "./Form/Review";
import { Storage } from "@aws-amplify/storage";
import { RootState } from "../../redux/store";

type Page = {
  title: string;
  form: JSX.Element;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  //suggestions?: JSX.Element;
};

export const review: ReviewProps = {
  id: "",
  locationName: "",
  visitedDate: 0
};

const pages: Page[] = [
  {
    title: LocationTitle,
    form: <LocationForm />,
    onSubmit: LocationOnSubmit,
  },
  {
    title: InformationsTitle,
    form: <InformationsForm />,
    onSubmit: InformationsOnSubmit,
  },
  {
    title: PicturesTitle,
    form: <PicturesForm />,
    onSubmit: PicturesOnSubmit,
  },
  {
    title: ReviewTitle,
    form: <ReviewForm />,
    onSubmit: ReviewOnSubmit,
  },
];

export default function Add() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const selfId = useSelector((state: RootState) => state.ReviewManager.selfId);

  const onBack = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  React.useEffect(() => {
    return () => {
      review.id = "";
      review.locationName = "";
      review.visitedDate = 0;
      review.type = undefined;
      review.address = undefined;
      review.website = undefined;
      review.review = undefined;
      review.rating = undefined;
      review.longitude = undefined;
      review.latitude = undefined;
      review.googleImages = undefined;
      review.images = undefined;
      pictures.length = 0;
    };
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    pages[currentPage].onSubmit(e);
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setIsSubmitting(true);
      const newReview = await DataStore.save(
        new Review({
          locationName: review.locationName,
          longitude: review.longitude,
          latitude: review.latitude,
          type: review.type,
          address: review.address,
          website: review.website,
          review: review.review,
          rating: review.rating,
          visitedDate: review.visitedDate,
          images: [],
          googleImages: review.googleImages ?? [],
          userID: selfId,
        })
      );
      const images: S3Data[] = [];
      for (let i = 0; i < pictures.length; i++) {
        const picture = pictures[i];
        await Storage.put(
            selfId +
            "/" +
            newReview.id +
            "-" +
            i +
            "." +
            getFileExtension(picture.name),
          picture,
          {
            contentType: picture.type,
          }
        );
        images.push(
          new S3Data({
            key:
              selfId +
              "/" +
              newReview.id +
              "-" +
              i +
              "." +
              getFileExtension(picture.name),
            level: "PUBLIC",
            identityId: "",
            version: "1",
          })
        );
      }
      if (images.length > 0) {
        await DataStore.save(
          Review.copyOf(newReview, (updated) => {
            updated.images = images;
            return updated;
          })
        );
      }
      dispatch(loadReviews(selfId));
      navigate("/list");
      setIsSubmitting(false);
    }
  };

  return (
    <form id="add" onSubmit={onSubmit}>
      <PageUI currentPage={currentPage} />
      <h2>{pages[currentPage].title}</h2>
      {pages[currentPage].form}
      <div className="add__buttons" style={{display: currentPage === 0 ? "none" : "flex"}}>
        <input
          type="button"
          id="add__buttons__previous"
          value={"Précédent"}
          disabled={currentPage === 0}
          onClick={onBack}
        />
        <div className="fill-space" />
        <input
          type={"submit"}
          id="add__buttons__next"
          value={currentPage === pages.length - 1 ? "Terminer" : "Suivant"}
          disabled={isSubmitting || currentPage === 0}
        />
        <input
          type={"submit"}
          id="add__buttons__first-form"
          value={""}
          style={{ display: "none" }}
          onClick={(e) => onSubmit(e)}
        />
      </div>
    </form>
  );
}

const PageUI = ({ currentPage }: { currentPage: number }) => {
  return (
    <div id="add__page-ui" className="no-select">
      {pages.map((page, index) => {
        if (index > currentPage) {
          return (
            <div
              key={index}
              id="add__page-ui__number"
              className="add__page-ui__number__disabled"
            >
              <span>{index + 1}</span>
            </div>
          );
        } else {
          return (
            <div key={index} id="add__page-ui__number">
              <span>{index + 1}</span>
            </div>
          );
        }
      })}
    </div>
  );
};
