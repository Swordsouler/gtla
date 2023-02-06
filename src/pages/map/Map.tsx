import "./Map.scss";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { MapsLibraries } from "../add/Form/Location";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

///TODO Duc-Bao
export default function Map() {
  const reviews = useSelector((state: RootState) => state.ReviewManager.reviews);

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
