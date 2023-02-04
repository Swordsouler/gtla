import React from "react";
import { Spinner } from "react-activity";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { review } from "../Add";

export const LocationTitle = "Où êtes-vous ?";

export function LocationForm() {
    const [location, setLocation] = React.useState(review.locationName);
    return (
        <div className="add__form__content" key="location">
            <div className="input__container">
                <label htmlFor="add__location">Nom du restaurant</label>
                <input id="add__location" type="text" placeholder="Hokkaido" required value={location} onChange={(e) => setLocation(e.target.value)} autoFocus/>
            </div>
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
export function LocationSuggestions(): JSX.Element {

    const theme = useSelector((state: RootState) => state.AppData.theme);
    type Restaurant = {
        name: string;
        address: string;
    }

    const [suggestions, setSuggestions] = React.useState<Restaurant[]>([]);
    const onClick = (restaurant: Restaurant) => {
        review.locationName = restaurant.name;
        review.longitude = undefined;
        review.latitude = undefined;
        review.address = undefined;
        review.type = undefined;
        review.website = undefined;
        review.googleImages = undefined;

        //submit le formulaire
        //@ts-ignore
        document.getElementById("add__location").value = restaurant.name;
        document.getElementById("add__buttons__next")?.click();
    }
    React.useEffect(() => {
        //load l'api de google et stock les données dans suggestions
        setTimeout(() => {
            setSuggestions([{name: "Hokkaido", address: "Rue de la paix"}, {name: "Hokkaido", address: "Rue de la paix"}]);
        }, 1000);
    }, []);

    return (
        <div id="suggestion">
            {suggestions.length > 0 ? 
                suggestions.map((e, i) => <span id="suggestion__location" key={"Suggestion " + i} onClick={() => onClick(e)}>{e.name}</span>) : 
                (<div id="list__spinner"><Spinner size={15} color={theme === "light" ? "#524291" : "#9ad45b"} /></div>)}
        </div>
    );
}