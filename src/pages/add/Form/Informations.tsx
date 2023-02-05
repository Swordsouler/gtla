import moment from "moment";
import React from "react";
import { review } from "../Add";

export const InformationsTitle = "Donnez-nous plus d'informations";

export function InformationsForm() {
    const [type, setType] = React.useState<string>(review.type || "");
    const [address, setAddress] = React.useState<string>(review.address || "");
    const [website, setWebsite] = React.useState<string>(review.website || "");
    const [date, setDate] = React.useState<string>(review.visitedDate ? moment(review.visitedDate).format("YYYY-MM-DDTHH:mm") : moment(new Date()).format("YYYY-MM-DDTHH:mm"));
    return (
        <div className="add__form__content" key="informations">
            <div className="input__container">
                <label htmlFor="add__type">Type de cuisine</label>
                <input id="add__type" type="text" placeholder="restaurant japonais" value={type} onChange={(e) => setType(e.target.value)} autoFocus/>
            </div>
            <div className="input__container">
                <label htmlFor="add__address">Adresse</label>
                <input id="add__address" type="text" placeholder="1 rue de la paix" value={address} onChange={(e) => setAddress(e.target.value)}/>
            </div>
            <div className="input__container">
                <label htmlFor="add__website">Site web</label>
                <input id="add__website" type="url" placeholder="https://www.hokkaido.fr" value={website} onChange={(e) => setWebsite(e.target.value)}/>
            </div>
            <div className="input__container">
                <label htmlFor="add__date">Date de visite</label>
                <input id="add__date" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)}/>
            </div>
        </div>
    );
}

export function InformationsOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    const type = document.getElementById("add__type") as HTMLInputElement;
    const address = document.getElementById("add__address") as HTMLInputElement;
    const website = document.getElementById("add__website") as HTMLInputElement;
    const date = document.getElementById("add__date") as HTMLInputElement;
    review.type = type.value === "" ? undefined : type.value;
    review.address = address.value === "" ? undefined : address.value;
    review.website = website.value === "" ? undefined : website.value;
    review.visitedDate = new Date(date.value).getTime();
}