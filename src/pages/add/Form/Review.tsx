import React from "react";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { RootState } from "../../../redux/store";
import { review } from "../Add";

export const ReviewTitle = "Donnez-nous votre avis";

export function ReviewForm() {
    const [advice, setAdvice] = React.useState(review.review);
    const theme = useSelector((state: RootState) => state.AppData.theme);
    const onChange = (value: string) => {
        review.review = advice === "" ? undefined : advice;
        setAdvice(value);
    }
    return (
        <div className="add__form__content" key="review">
            <Rating
                initialValue={review.rating}
                fillColor={theme === "light" ? "#524291" : "#9ad45b"}
                emptyColor="#888888"
                onClick={(rate: number) => {
                    review.rating = rate;
                }}/>
            <div className="input__container">
                <label htmlFor="add__review">Avis sur le restaurant</label>
                <textarea id="add__review" placeholder="Ce restaurant était très bon..." value={advice} onChange={(e) => onChange(e.target.value)} autoFocus/>
            </div>
        </div>
    );
}

export function ReviewOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    const advice = document.getElementById("add__review") as HTMLInputElement;
    review.review = advice.value === "" ? undefined : advice.value;
}