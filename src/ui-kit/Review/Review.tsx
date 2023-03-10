import moment from "moment";
import React from "react";
import { Spinner } from "react-activity";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { performAction } from "../../analytics/analytics";
import { ActionType, LazyS3Data } from "../../models";
import { onClickReview } from "../../redux/ReviewManager";
import { RootState } from "../../redux/store";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import { MapsLibraries } from "../../pages/add/Form/Location";
import "./Review.scss";
export type ReviewProps = {
  id: string;
  locationName: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  website?: string;
  rating?: number;
  type?: string;
  review?: string;
  visitedDate: number;
  images?: (LazyS3Data | null)[];
  placeID?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default React.memo(
  ({
    review,
    isShown,
    disabled,
    context,
  }: {
    review: ReviewProps;
    isShown: boolean;
    disabled?: boolean;
    context: "LIST" | "MAP";
  }) => {
    const dispatch = useDispatch();
    const selfId = useSelector(
      (state: RootState) => state.ReviewManager.selfId
    );

    const onClick = () => {
      dispatch(onClickReview(review.id));
      if (isShown) return;
      if (context === "MAP") {
        performAction(ActionType.REVIEW_DETAIL_MAP, selfId, review.id);
      } else if (context === "LIST") {
        performAction(ActionType.REVIEW_DETAIL_LIST, selfId, review.id);
      }
    };
    const theme = useSelector((state: RootState) => state.AppData.theme);
    const visitedDate = moment(new Date(review.visitedDate)).format(
      "DD/MM/YYYY"
    );
    const [imageShown, setImageShown] = React.useState<boolean>(false);
    React.useEffect(() => {
      if (isShown) {
        setImageShown(isShown);
      } else {
        setTimeout(() => {
          setImageShown(isShown);
        }, 500);
      }
    }, [isShown]);
    return (
      <div id="review" className={disabled ? "review__disabled" : ""}>
        <div
          id="review__header"
          className="no-select"
          onClick={disabled ? undefined : onClick}
        >
          <Rating
            readonly
            initialValue={review.rating ?? 0}
            fillColor={theme === "light" ? "#524291" : "#9ad45b"}
            emptyColor="#888888"
            style={{ height: "22px" }}
            size={20}
          />
          <span id="review__location-name">{review.locationName}</span>
          <span id="review__date">{visitedDate}</span>
        </div>
        <div
          id={"review__content" + (isShown ? "__visible" : "__hidden")}
          className={"review__content"}
        >
          <Sentences {...review} />
          <Review {...review} />
          {imageShown && <ImagesCarousel {...review} />}
        </div>
      </div>
    );
  }
);

const Sentences = (props: ReviewProps) => {
  const visitedDate = moment(new Date(props.visitedDate)).format(
    "dddd Do MMMM YYYY ?? HH:mm"
  );
  const address = props.address;
  const type = props.type;
  const website = props.website;
  const rating = props.rating;
  const sentences: JSX.Element[] = [];
  sentences.push(
    <span key={sentences.length} className="review__content__bold">
      {props.locationName}
    </span>
  );
  sentences.push(<span key={sentences.length}> est un </span>);
  sentences.push(
    <span key={sentences.length} className="review__content__bold">
      {type?.toLowerCase() ?? "restaurant"}
    </span>
  );
  if (address) {
    sentences.push(<span key={sentences.length}> localis?? ?? </span>);
    sentences.push(
      <span key={sentences.length} className="review__content__bold">
        {address}
      </span>
    );
  }
  sentences.push(<span key={sentences.length}>.</span>);
  sentences.push(<span key={sentences.length}> Vous y avez d??jeun?? le </span>);
  sentences.push(
    <span key={sentences.length} className="review__content__bold">
      {visitedDate}
    </span>
  );
  if (rating) {
    sentences.push(<span key={sentences.length}> et l'exp??rience ??tait </span>);
    sentences.push(
      <span key={sentences.length} className="review__content__bold">
        {RatingToString(rating)}
      </span>
    );
  }
  sentences.push(<span key={sentences.length}>.</span>);
  if (website) {
    sentences.push(
      <span key={sentences.length}>
        {" "}
        Ce restaurant dispose d'un site web ?? l'adresse suivante :{" "}
      </span>
    );
    sentences.push(
      <a
        key={sentences.length}
        href={props.website ?? ""}
        target={"_blank"}
        rel={"noopener noreferrer"}
        className="review__content__bold"
      >
        {props.website}
      </a>
    );
    sentences.push(<span key={sentences.length}>.</span>);
  }

  return <p id="review__content__sentence">{sentences}</p>;
};

const Review = (props: ReviewProps) => {
  const review = props.review;
  if (review === null || review === undefined || review === "") return null;
  const sentences: JSX.Element[] = [];

  if (review) {
    sentences.push(
      <span key={sentences.length}>
        {" "}
        Voici ce que vous avez ??crit ?? propos de votre exp??rience :{" "}
      </span>
    );
    sentences.push(
      <span key={sentences.length} className="review__content__bold">
        {review}
      </span>
    );
  }

  return <p id="review__content__sentence">{sentences}</p>;
};

const RatingToString = (rating: number) => {
  switch (rating) {
    case 1:
      return "mauvaise";
    case 2:
      return "moyenne";
    case 3:
      return "correcte";
    case 4:
      return "bonne";
    case 5:
      return "excellente";
    default:
      return "correcte";
  }
};

/* function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
} */

const ImagesCarousel = (props: ReviewProps) => {
  const theme = useSelector((state: RootState) => state.AppData.theme);
  const [images, setImages] = React.useState<string[]>([]);
  const [isImageLoaded, setIsLoaded] = React.useState<boolean>(false);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY ?? "",
    libraries: MapsLibraries,
  });
  const map = React.useRef<google.maps.Map>();
  const mapLoad = React.useCallback(
    (maps: google.maps.Map) => {
      if (!isLoaded) return;
      map.current = maps;
    },
    [isLoaded]
  );

  React.useEffect(() => {
    async function loadImages() {
      const tempImages: string[] = [];
      props.images?.forEach(async (image) => {
        if (!image) return;
        tempImages.push(
          "https://gtla-storage-88691f07145011-prod.s3.eu-west-3.amazonaws.com/public/" +
            image.key
        );
      });
      setImages(tempImages);
      if (!props.placeID) {
        setIsLoaded(true);
        return;
      }
      if (!isLoaded) return;
      if (!map.current) return;
      let googleService = new window.google.maps.places.PlacesService(
        map.current!
      );
      googleService.getDetails(
        { placeId: props.placeID!, fields: ["photo"] },
        (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            place?.photos
              ?.filter((photo, i) => i < 3)
              .forEach(async (photo) => {
                if (!photo) return;
                tempImages.push(
                  photo.getUrl({ maxWidth: 400, maxHeight: 400 })
                );
                console.log(photo.getUrl({ maxWidth: 400, maxHeight: 400 }));
              });
            setImages(tempImages);
            setIsLoaded(true);
          }
        }
      );
      /*const length = props.googleImages ? props.googleImages.length : 0;
      for (let i = 0; i < length; i++) {
        if (!(props.googleImages && props.googleImages[i])) continue;
        const image = props.googleImages[i];
        if (!image) continue;
        await sleep(0.05);
        tempImages.push(image);
        console.log("load");
        setImages(tempImages);
      }*/
    }
    loadImages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.images, props.placeID, isLoaded, map.current]);
  if (!isLoaded) return <p>Chargement des images...</p>;
  console.log(images);
  //if () return null;
  return (
    <>
      {images.length !== 0 && isImageLoaded && (
        <div
          id={"review__content__carousel"}
          className={isImageLoaded ? "" : "review__content__carousel__loading"}
        >
          {images.map((image, index) => {
            return (
              <img
                src={image}
                alt={"Restaurant " + index}
                key={"Restaurant " + index}
              />
            );
          })}
        </div>
      )}
      {!isImageLoaded && (
        <div
          id="list__spinner"
          style={{ paddingBottom: "10px", paddingTop: "10px" }}
        >
          <GoogleMap onLoad={mapLoad}></GoogleMap>
          <Spinner
            size={20}
            color={theme === "light" ? "#524291" : "#9ad45b"}
          />
        </div>
      )}
    </>
  );
};

export const ReviewBlock = React.memo(
  (props: { title: string; children: string | JSX.Element[] }) => {
    const [isShown, setIsShown] = React.useState(false);
    const onClick = () => {
      setIsShown(!isShown);
    };

    return (
      <div id="review">
        <div id="review__header" className="no-select" onClick={onClick}>
          <span id="review__location-name">{props.title}</span>
        </div>
        <div
          id={"review__content" + (isShown ? "__visible" : "__hidden")}
          className={"review__content"}
        >
          <p id="review__content__sentence">{props.children}</p>
        </div>
      </div>
    );
  }
);
