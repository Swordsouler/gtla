import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Review from "../../ui-kit/Review/Review";
import "./Add.scss";

export default function Add() {
    const reviews = useSelector((state: RootState) => state.Inspector.reviews);
    return (
        <div id="add">
            {reviews.map((review) => <Review key={review.id} {...review} />)}
        </div>
    );
}