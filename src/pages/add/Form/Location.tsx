import React from "react";
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