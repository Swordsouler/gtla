import React from "react";
import { Spinner } from "react-activity";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { review } from "../Add";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

export const LocationTitle = "Où êtes-vous ?";
export const MapsLibraries: any = ["places"];
let timer: NodeJS.Timeout | null = null;
export function LocationForm() {
  const [location, setLocation] = React.useState(review.locationName);
  return (
    <div className="add__form__content" key="location">
      <div className="input__container">
        <label htmlFor="add__location">Nom du restaurant</label>
        <input
          id="add__location"
          type="text"
          placeholder="Hokkaido"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          autoFocus
        />
      </div>
      <LocationSuggestions autocomplete={location} />
    </div>
  );
}

export function LocationOnSubmit(e: React.FormEvent<HTMLFormElement>) {
  const location = document.getElementById("add__location") as HTMLInputElement;
  review.locationName = location.value;
}

///TODO Julien
//je sais pas quel donnée tu peut récupérer dans l'api de google
//tu peux modifier le type Restaurant
//tu peux compléter la fonction onClick
//tu peux modifier le useEffect pour récupérer les données de l'api de google
//le front est déjà fais
function LocationSuggestions(props: { autocomplete: string }): JSX.Element {
  const theme = useSelector((state: RootState) => state.AppData.theme);
  type Restaurant = {
    name: string;
    address: string | undefined;
    latitude: number | undefined;
    longitude: number | undefined;
    website: string | undefined;
    type: string | undefined;
    googleImages: string[] | undefined;
    placeId: string;
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDrpT0Ous6vGszl2fF4_luHqlW-OMyZ6fA",
    libraries: MapsLibraries,
  });
  const [waiting, setWaiting] = React.useState<boolean>(true);
  const [suggestions, setSuggestions] = React.useState<Restaurant[]>([]);
  const map = React.useRef<google.maps.Map>();
  const onClick = (restaurant: Restaurant) => {
    let googleService = new window.google.maps.places.PlacesService(
      map.current!
    );
    googleService.getDetails(
      {
        placeId: restaurant.placeId,
        fields: restaurant.address
          ? ["website"]
          : [
              "website",
              "formatted_address",
              "geometry",
              "photo",
              "type",
              "name",
            ],
      },
      (place, status) => {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK) return;
        if (!place) return;
        console.log(place);
        restaurant.website = place.website;
        if (place.formatted_address) {
          restaurant.name = place.name!;
          restaurant.address = place.formatted_address;
          restaurant.latitude = place.geometry!.location!.lat();
          restaurant.longitude = place.geometry!.location!.lng();
          restaurant.type = place.types![0];
          restaurant.googleImages =
            place.photos?.map((gi) => gi.getUrl()) || [];
        }
        nextStep(restaurant);
      }
    );
  };
  React.useEffect(() => {
    if (props.autocomplete && props.autocomplete.length > 3 && timer === null) {
      timer = setTimeout(() => {
        clearTimeout(timer!);
        timer = null;
        let googleService = new window.google.maps.places.AutocompleteService();
        googleService.getPlacePredictions(
          {
            input: props.autocomplete,
            types: ["restaurant"],
          },
          (results, status) => {
            if (status !== window.google.maps.places.PlacesServiceStatus.OK)
              return;
            if (!results) return;
            console.log(results);
            setSuggestions(
              results.map((e: any) => {
                return {
                  name: e.description,
                  address: undefined,
                  latitude: undefined,
                  longitude: undefined,
                  type: undefined,
                  googleImages: undefined,
                  website: undefined,
                  placeId: e.place_id,
                };
              })
            );
          }
        );
      }, 1500);
    }
  }, [props.autocomplete]);

  const getRestaurantNearby = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let longitude = position.coords.longitude;
      let latitude = position.coords.latitude;
      let googleService = new window.google.maps.places.PlacesService(
        map.current!
      );
      googleService.nearbySearch(
        {
          location: { lat: latitude, lng: longitude },
          rankBy: window.google.maps.places.RankBy.DISTANCE,

          //@ts-ignore
          type: ["restaurant"],
        },
        (results, status) => {
          if (status !== window.google.maps.places.PlacesServiceStatus.OK)
            return;
          if (!results) return;
          console.log(results);
          setSuggestions(
            results.map((e: any) => {
              let images = e.photos?.map((gi: any) => gi.getUrl()) || [];
              return {
                name: e.name,
                address: e.vicinity,
                latitude: e.geometry.location.lat(),
                longitude: e.geometry.location.lng(),
                type: e.types[0],
                googleImages: images,
                website: undefined,
                placeId: e.place_id,
              };
            })
          );
        }
      );
    });
  };
  const nextStep = (restaurant: Restaurant) => {
    review.locationName = restaurant.name;
    review.longitude = restaurant.longitude;
    review.latitude = restaurant.latitude;
    review.address = restaurant.address;
    review.type = restaurant.type;
    review.website = restaurant.website;
    review.googleImages = restaurant.googleImages;

    //submit le formulaire
    //@ts-ignore
    document.getElementById("add__location").value = restaurant.name;
    document.getElementById("add__buttons__next")?.click();
  };
  const mapLoad = React.useCallback(
    (maps: google.maps.Map) => {
      if (!navigator.geolocation) return;
      if (!isLoaded) return;
      map.current = maps;
    },
    [isLoaded]
  );

  if (!isLoaded) return <div>Chargement de la carte</div>;
  if (waiting && !props.autocomplete)
    return (
      <div>
        Tapez quelque chose ou cliquez ici
        <button
          type="button"
          onClick={() => {
            setWaiting(false);
            getRestaurantNearby();
          }}
        >
          Cherchez à proximité
        </button>
      </div>
    );
  return (
    <div id="suggestion">
      <GoogleMap onLoad={mapLoad}></GoogleMap>
      {suggestions.length > 0 ? (
        suggestions.map((e, i) => (
          <span
            id="suggestion__location"
            key={"Suggestion " + i}
            onClick={() => onClick(e)}
          >
            {e.name} {e.address ? " - " + e.address : ""}
          </span>
        ))
      ) : (
        <div id="list__spinner">
          <Spinner
            size={15}
            color={theme === "light" ? "#524291" : "#9ad45b"}
          />
        </div>
      )}
    </div>
  );
}
