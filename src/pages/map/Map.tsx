import "./Map.scss";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { MapsLibraries } from "../add/Form/Location";
// TO DELETE: dummy array of reviews
import { ReviewProps } from "../../ui-kit/Review/Review";
const reviews: ReviewProps[] = [
  {
    id: "1",
    locationName: "ParisResto",
    latitude: 48.845,
    longitude: 2.341,
    address: "Paris",
    website: "https://www.paris.fr/",
    rating: 5,
    type: "Restaurant",
    visitedDate: 1620000000,
  },
  {
    id: "2",
    locationName: "ParisResto 2",
    latitude: 48.848,
    longitude: 2.337,
    address: "Paris",
    website: "https://www.paris.fr/",
    rating: 5,
    type: "Restaurant",
    visitedDate: 1620000000,
  },
  {
    id: "3",
    locationName: "No coords resto",
    address: "Paris",
    website: "https://www.paris.fr/",
    rating: 5,
    type: "Restaurant",
    visitedDate: 1620000000,
  },
];

///TODO Duc-Bao
export default function Map() {
  // const reviews = useSelector((state: RootState) => state.ReviewManager.reviews);

  const containerStyle = {
    width: "100vw",
    height: "calc(100vh - 50px)",
  };

  const center = {
    lat: 48.845,
    lng: 2.341,
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "MAPS_API_KEY",
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
