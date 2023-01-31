import React from "react";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { RootState } from "../../../redux/store";

export const ReviewTitle = "Donnez-nous votre avis";

export function ReviewForm() {
    const theme = useSelector((state: RootState) => state.AppData.theme);
    return (
        <div className="add__form__content" key="review">
            <Rating
                initialValue={0}
                fillColor={theme === "light" ? "#524291" : "#9ad45b"}
                emptyColor="#888888"/>
            <div className="input__container">
                <label htmlFor="add__review">Avis sur le restaurant</label>
                <textarea id="add__review" placeholder="Ce restaurant était très bon..."/>
            </div>
        </div>
    );
}

export function ReviewOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    
}