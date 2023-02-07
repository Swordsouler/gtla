import React from "react";
import { Spinner } from "react-activity";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Review from "../../ui-kit/Review/Review";
import "./List.scss";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import { changeSync } from "../..";
import { setIsDatastoreReady } from "../../redux/ReviewManager";


export default function List() {
    const dispatch = useDispatch<ThunkDispatch<RootState, void, any>>();
    const statusReviews = useSelector((state: RootState) => state.ReviewManager.status);
    const reviews = useSelector((state: RootState) => state.ReviewManager.reviews);
    const theme = useSelector((state: RootState) => state.AppData.theme);
    const currentReview = useSelector((state: RootState) => state.ReviewManager.currentReview);
    const selfId = useSelector((state: RootState) => state.ReviewManager.selfId);
    const isDatastoreReady = useSelector((state: RootState) => state.ReviewManager.isDatastoreReady);
    const {id} = useParams<{id: string}>();
    const isLoaded = React.useRef<boolean>(false);

    React.useEffect(() => {
        dispatch(setIsDatastoreReady(false));
        isLoaded.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    React.useEffect(() => {
        let idc = id ?? selfId;
        if(isLoaded.current) return;
        if(selfId === "") return;
        if(!isDatastoreReady) return;
        if(idc !== undefined) {
            changeSync(idc);
            isLoaded.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, selfId, isDatastoreReady]);

    return (
        <div id="list">
            {
                statusReviews === "loading" ? 
                    <div id="list__spinner"><Spinner size={30} color={theme === "light" ? "#524291" : "#9ad45b"} /></div> : 
                    reviews.length > 0 ? 
                        reviews.map((review) => <Review key={review.id} review={review} isShown={currentReview?.id === review.id} />) : 
                        <div id="list__no-reviews">Aucun avis n'a été trouvé</div>
                    
                
            }
        </div>
    );
}