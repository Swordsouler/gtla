import React from "react";
import { Spinner } from "react-activity";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Review from "../../ui-kit/Review/Review";
import "./List.scss";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { setDeviceId } from "../../redux/ReviewManager";
import { useParams } from "react-router-dom";


export default function List() {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const deviceId = useSelector((state: RootState) => state.ReviewManager.deviceId);
    const statusReviews = useSelector((state: RootState) => state.ReviewManager.status);
    const reviews = useSelector((state: RootState) => state.ReviewManager.reviews);
    const theme = useSelector((state: RootState) => state.AppData.theme);
    const currentReview = useSelector((state: RootState) => state.ReviewManager.currentReview);
    const selfId = useSelector((state: RootState) => state.ReviewManager.selfId);
    const {id} = useParams<{id: string}>();

    React.useEffect(() => {
        let idc = id ?? selfId; 
        if(deviceId === "" || deviceId === idc) return;
        if(idc !== undefined && deviceId !== idc) {
            dispatch(setDeviceId(idc));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deviceId, id]);

    return (
        <div id="list">
            {
                (statusReviews === "idle" ?
                    (reviews.length > 0 ? 
                        reviews.map((review) => <Review key={review.id} {...review} isShown={currentReview?.id === review.id} />) : 
                        <div id="list__no-reviews">Aucun avis n'a été trouvé</div>) :
                        <div id="list__spinner"><Spinner size={30} color={theme === "light" ? "#524291" : "#9ad45b"} /></div>)
            }
        </div>
    );
}