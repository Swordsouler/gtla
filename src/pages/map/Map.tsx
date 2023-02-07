import "./Map.scss";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { MapsLibraries } from "../add/Form/Location";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import React from "react";
import { useParams } from "react-router";
import { changeSync } from "../..";
import { setIsDatastoreReady } from "../../redux/ReviewManager";

///TODO Duc-Bao
export default function Map() {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, any>>();
  const statusReviews = useSelector((state: RootState) => state.ReviewManager.status);
  const reviews = useSelector((state: RootState) => state.ReviewManager.reviews);
  const theme = useSelector((state: RootState) => state.AppData.theme);
  const currentReview = useSelector((state: RootState) => state.ReviewManager.currentReview);
  const selfId = useSelector((state: RootState) => state.ReviewManager.selfId);
  const isDatastoreReady = useSelector((state: RootState) => state.ReviewManager.isDatastoreReady);
  const {id} = useParams<{id: string}>();
  const isLoadedDataStore = React.useRef<boolean>(false);

  React.useEffect(() => {
      dispatch(setIsDatastoreReady(false));
      isLoadedDataStore.current = false;
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  React.useEffect(() => {
      let idc = id ?? selfId;
      if(isLoadedDataStore.current) return;
      if(selfId === "") return;
      if(!isDatastoreReady) return;
      if(idc !== undefined) {
          changeSync(idc);
          isLoadedDataStore.current = true;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, selfId, isDatastoreReady]);

  const containerStyle = {
    width: "100vw",
    height: "calc(100vh - 50px)",
  };

  const center = {
    lat: 48.845,
    lng: 2.341,
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY ?? "",
    libraries: MapsLibraries,
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      options={{
        styles: [
          {
            featureType: "all",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road",
            stylers: [
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "administrative",
            stylers: [
              {
                visibility: "on",
              },
            ],
          },
        ],
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}

      {reviews.map((review) => {
        return (
          review.latitude &&
          review.longitude && (
            <Marker
              key={review.id}
              position={{ lat: review.latitude, lng: review.longitude }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/micons/green-dot.png",
                size: new google.maps.Size(32, 32),
                labelOrigin: new google.maps.Point(16, -16),
              }}
              label={{
                text: review.locationName,
                color: "#458600",
                fontWeight: "bold",
                fontSize: "16px",
              }}
              onClick={() => {
                console.log("clicked on, ", review.locationName);
              }}
              onLoad={() => {
                console.log(review.locationName, "shown on map");
              }}
            />
          )
        );
      })}
    </GoogleMap>
  ) : (
    <></>
  );
}
