import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./Map.scss";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import React from "react";

type ReviewProps = {
    id: string,
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
    googleImages?: (string | null)[];
    createdAt?: string;
    updatedAt?: string;
    isShown?: boolean;
};

// dummy array of reviews
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
        visitedDate: 1620000000
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
        visitedDate: 1620000000
    },
];

///TODO Duc-Bao
export default function Map() {
    // const reviews = useSelector((state: RootState) => state.ReviewManager.reviews);

    const containerStyle = {
        width: "100vw",
        height: "calc(100vh - 50px)"
    };

    const center = {
        lat: 48.845,
        lng: 2.341
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "TODO_REPLACE_API_KEY"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map: any) {
        // TODO later
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}

            {reviews.map((review) => {
                return (
                    <Marker
                        key={review.id}
                        position={{ lat: review.latitude, lng: review.longitude }}
                        label={review.locationName}
                        onClick={() => {
                            console.log("clicked on, ", review.locationName);
                        }}
                    />
                )
            })}

            <></>
        </GoogleMap>
    ) : <></>
}
