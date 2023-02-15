import "./Map.scss";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { MapsLibraries } from "../add/Form/Location";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import React from "react";
import { useParams } from "react-router";
import { changeSync, deviceId } from "../..";
import { onClickReview, resetCurrentReview, setIsDatastoreReady } from "../../redux/ReviewManager";
import Review from "../../ui-kit/Review/Review";
import { ActionType } from "../../models";
import { performAction } from "../../analytics/analytics";

///TODO Duc-Bao
export default function Map() {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, any>>();
  const reviews = useSelector((state: RootState) => state.ReviewManager.reviews);
  const theme = useSelector((state: RootState) => state.AppData.theme);
  const currentReview = useSelector((state: RootState) => state.ReviewManager.currentReview);
  const selfId = useSelector((state: RootState) => state.ReviewManager.selfId);
  const isDatastoreReady = useSelector((state: RootState) => state.ReviewManager.isDatastoreReady);
  const {id} = useParams<{id: string}>();
  const isLoadedDataStore = React.useRef<boolean>(false);

  

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let longitude = position.coords.longitude;
      let latitude = position.coords.latitude;
      setCenter({ lat: latitude, lng: longitude });
    });
    dispatch(resetCurrentReview());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  React.useEffect(() => {
      if(deviceId === "") return;
      if(!isDatastoreReady) return;
      let idc = id ?? selfId;
      if(idc === selfId) {
          performAction(ActionType.LOAD_LOCAL_MAP, idc);
      } else {
          performAction(ActionType.LOAD_SHARED_MAP, idc);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceId, isDatastoreReady]);
  

  const containerStyle = {
    width: "100vw",
    height: "calc(100vh - 50px)",
  };

  const [center, setCenter] = React.useState({ lat: 0, lng: 0 });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY ?? "",
    libraries: MapsLibraries,
  });

  return isLoaded ? (
    <GoogleMap
      id="map"
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      options={{
          styles: (theme === "dark" ? nightMapStyles : lightMapStyles),
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
                url: "https://maps.google.com/mapfiles/ms/micons/" + (theme === "dark" ? "green" : "blue") + "-dot.png",
                size: new google.maps.Size(32, 32),
                labelOrigin: new google.maps.Point(16, -16),
              }}
              label={{
                text: review.locationName,
                color: theme === "light" ? "#524291" : "#9ad45b",
                fontWeight: "bold",
                fontSize: "16px",
              }}
              onClick={() => {
                dispatch(onClickReview(review.id))
              }}
              onLoad={() => {
                //console.log(review.locationName, "shown on map");
              }}
            >
              
              {currentReview && currentReview.id === review.id ? (
                <InfoWindow onCloseClick={() => dispatch(onClickReview(currentReview.id))}>
                  <Review key={review.id} review={review} isShown={currentReview?.id === review.id} disabled context="MAP" />
                </InfoWindow>
                ) : null}
            </Marker>
          )
        );
      })}
    </GoogleMap>
  ) : (
    <></>
  );
}

const lightMapStyles = [
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
];

const nightMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },



  {
    featureType: "all",
    elementType: "labels.text",
    stylers: [{visibility: "off"}],
  },
  {
    featureType: "poi",
    elementType: "labels.icon",
    stylers: [{visibility: "off"}],
  },
  {
    featureType: "road",
    stylers: [{visibility: "on"}],
  },
  {
    featureType: "administrative",
    stylers: [{visibility: "on"}],
  },


  {
    featureType: "administrative.locality",
    stylers: [{visibility: "off"}],
  },
];
