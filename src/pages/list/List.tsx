import React from "react";
import { Spinner } from "react-activity";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Review from "../../ui-kit/Review/Review";
import "./List.scss";
import { useLocation } from "react-router";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { setDeviceId } from "../../redux/ReviewManager";

const getUserIdInUrl = (url: string): string | undefined => {
    const split = url.split("/");
    const userId = split.length > 2 ? split[2].toLowerCase() : undefined;
    return userId;
}

export default function List() {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const {pathname} = useLocation();
    const deviceId = useSelector((state: RootState) => state.ReviewManager.deviceId);
    const statusReviews = useSelector((state: RootState) => state.ReviewManager.status);
    const reviews = useSelector((state: RootState) => state.ReviewManager.reviews);
    const theme = useSelector((state: RootState) => state.AppData.theme);
    const currentReview = useSelector((state: RootState) => state.ReviewManager.currentReview);
    const selfId = useSelector((state: RootState) => state.ReviewManager.selfId);

    React.useEffect(() => {
        const id = getUserIdInUrl(pathname) ?? selfId;
        if(deviceId === "" || deviceId === id) return;
        if(id !== undefined && deviceId !== id) {
            dispatch(setDeviceId(id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deviceId, pathname]);

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