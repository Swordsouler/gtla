import React from "react";
import { review } from "../Add";

export const LocationTitle = "Où êtes-vous ?";

export function LocationForm() {
    const [location, setLocation] = React.useState("");
    return (
        <div className="add__form__content" key="location">
            <div className="input__container">
                <label htmlFor="add__location">Localisation</label>
                <input id="add__location" type="text" placeholder="Paris" value={location} onChange={(e) => setLocation(e.target.value)}/>
            </div>
        </div>
    );
}

export function LocationOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    const location = document.getElementById("add__location") as HTMLInputElement;
    review.locationName = location.value;
}