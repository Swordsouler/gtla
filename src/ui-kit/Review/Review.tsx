import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Rating } from 'react-simple-star-rating';
import { S3Data } from '../../models';
import { onClickReview } from '../../redux/Inspector';
import { RootState } from '../../redux/store';
import './Review.scss';

export type ReviewProps = {
    id: string,
    latitude: number;
    longitude: number;
    address: string;
    locationName: string;
    website?: string | null;
    rating?: number | null;
    type?: string | null;
    review?: string | null;
    visitedDate: number;
    images?: S3Data | null;
    googleImages?: (string | null)[] | null;
    createdAt?: string | null;
    updatedAt?: string | null;
};

export default React.memo((props: ReviewProps) => {
    const dispatch = useDispatch();
    const currentReview = useSelector((state: RootState) => state.Inspector.currentReview);
    const isShown = currentReview?.id === props.id;
    const onClick = () => {
        dispatch(onClickReview(props.id));
    };
    
    return (
        <div id="review" className="no-select">
            <div id="review__header" onClick={onClick}>
                <Rating
                    readonly
                    initialValue={3}
                    fillColor={getComputedStyle(document.documentElement).getPropertyValue("--color-primary")}
                    emptyColor="#888888"
                    style={{height: "23px"}}
                    size={20}/>
                <span id="review__location-name">{props.locationName}</span>
            </div>
            <div id={"review__content" + (isShown ? "__visible" : "__hidden")} className={"review__content"}>
                {DataToSentences(props)}
                {DataToReview(props)}
            </div>
        </div>
    );
});

const DataToSentences = (props: ReviewProps) => {
    const visitedDate = moment(new Date(props.visitedDate*1000)).format("dddd Do MMMM YYYY à HH:mm");
    const address = props.address;
    const type = props.type;
    const website = props.website;
    const review = props.review;
    const rating = props.rating;
    const sentences: JSX.Element[] = [];
    sentences.push(<span key={sentences.length}>{props.locationName}</span>);
    sentences.push(<span key={sentences.length}> est un </span>);
    sentences.push(<span key={sentences.length} className='review__content__bold'>{type?.toLowerCase() ?? "restaurant"}</span>);
    if (address) {
        sentences.push(<span key={sentences.length}> localisé à </span>);
        sentences.push(<span key={sentences.length} className='review__content__bold'>{address}</span>);
    }
    sentences.push(<span key={sentences.length}>.</span>);
    sentences.push(<span key={sentences.length}> Vous y avez déjeuné le </span>);
    sentences.push(<span key={sentences.length} className='review__content__bold'>{visitedDate}</span>);
    if(rating) {
        sentences.push(<span key={sentences.length}> et l'expérience était </span>);
        sentences.push(<span key={sentences.length} className='review__content__bold'>{RatingToString(rating)}</span>);
    }
    sentences.push(<span key={sentences.length}>.</span>);
    if (website) {
        sentences.push(<span key={sentences.length}> Ce restaurant dispose d'un site web à l'adresse suivante : </span>);
        sentences.push(<a key={sentences.length} href={props.website ?? ""} className='review__content__bold'>{props.website}</a>);
        sentences.push(<span key={sentences.length}>.</span>);
    }
    
    return (
        <p id="review__content__sentence">
            {sentences}
        </p>
    );
}

const DataToReview = (props: ReviewProps) => {
    const review = props.review;
    const sentences: JSX.Element[] = [];

    if(review) {
        sentences.push(<span key={sentences.length}> Voici ce que vous avez écrit à propos de votre expérience : </span>);
        sentences.push(<span key={sentences.length} className='review__content__bold'>{review}</span>);
    }
    
    return (
        <p id="review__content__sentence">
            {sentences}
        </p>
    );
}

const RatingToString = (rating: number) => {
    switch(rating) {
        case 1:
            return "mauvaise";
        case 2:
            return "moyenne";
        case 3:
            return "correcte";
        case 4:
            return "bonne";
        case 5:
            return "excellente";
        default:
            return "correcte";
    }
}