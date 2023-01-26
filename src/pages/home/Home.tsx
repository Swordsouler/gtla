import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Review from "../../ui-kit/Review/Review";
import "./Home.scss";

export default function Home() {
    const reviews = useSelector((state: RootState) => state.Inspector.reviews);
    return (
        <div id="home">
            <h1>GTLAccueil</h1>
            {reviews.map((review) => <Review key={review.id} {...review} />)}
        </div>
    );
}