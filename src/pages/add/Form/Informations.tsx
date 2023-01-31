import React from "react";

export const InformationsTitle = "Donnez-nous plus d'informations";

export function InformationsForm() {
    const [type, setType] = React.useState<string>("");
    const [address, setAddress] = React.useState<string>("");
    const [website, setWebsite] = React.useState<string>("");
    return (
        <div className="add__form__content" key="informations">
            <div className="input__container">
                <label htmlFor="add__type">Type de cuisine</label>
                <input id="add__type" type="text" placeholder="Japonaise" value={type} onChange={(e) => setType(e.target.value)}/>
            </div>
            <div className="input__container">
                <label htmlFor="add__address">Adresse</label>
                <input id="add__address" type="text" placeholder="1 rue de la paix" value={address} onChange={(e) => setAddress(e.target.value)}/>
            </div>
            <div className="input__container">
                <label htmlFor="add__website">Site web</label>
                <input id="add__website" type="text" placeholder="https://www.hokkaido.fr" value={website} onChange={(e) => setWebsite(e.target.value)}/>
            </div>
        </div>
    );
}

export function InformationsOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    const type = document.getElementById("add__cuisine") as HTMLInputElement;
    const address = document.getElementById("add__address") as HTMLInputElement;
    const website = document.getElementById("add__address") as HTMLInputElement;
    /*review.type = type.value;
    review.address = address.value;
    review.website = website.value;*/
}