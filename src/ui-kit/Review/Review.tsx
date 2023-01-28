import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Rating } from 'react-simple-star-rating';
import { JsxElement } from 'typescript';
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
    const theme = useSelector((state: RootState) => state.AppData.theme);
    const visitedDate = moment(new Date(props.visitedDate*1000)).format("DD/MM/YYYY");
    
    return (
        <div id="review">
            <div id="review__header" className="no-select" onClick={onClick}>
                <Rating
                    readonly
                    initialValue={3}
                    fillColor={theme === "light" ? "#524291" : "#9ad45b"}
                    emptyColor="#888888"
                    style={{height: "22px"}}
                    size={20}/>
                <span id="review__location-name">{props.locationName}</span>
                <span id="review__date">{visitedDate}</span>
            </div>
            <div id={"review__content" + (isShown ? "__visible" : "__hidden")} className={"review__content"}>
                <Sentences {...props}/>
                <Review {...props}/>
                <ImagesCarousel {...props}/>
            </div>
        </div>
    );
});

const Sentences = (props: ReviewProps) => {
    const visitedDate = moment(new Date(props.visitedDate*1000)).format("dddd Do MMMM YYYY à HH:mm");
    const address = props.address;
    const type = props.type;
    const website = props.website;
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

const Review = (props: ReviewProps) => {
    const review = props.review;
    if(review === null || review === undefined || review === "") return null;
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

const ImagesCarousel = (props: ReviewProps) => {
    return (
        <div id="review__content__carousel">
            <img src="https://www.eau-a-la-bouche.fr/wp-content/uploads/2022/01/hokkaido-paris.png"/>
            <img src="https://assets.justacote.com/photos_entreprises/hokkaido-paris-14490420520.png"/>
            <img src="data:image/jpeg;base64,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"/>
        </div>
    );
}




export const ReviewBlock = React.memo((props: {title: string, children: string | JSX.Element[]}) => {
    const [isShown, setIsShown] = React.useState(false);
    const onClick = () => {
        setIsShown(!isShown);
    };
    const theme = useSelector((state: RootState) => state.AppData.theme);
    
    return (
        <div id="review">
            <div id="review__header" className="no-select" onClick={onClick}>
                <span id="review__location-name">{props.title}</span>
            </div>
            <div id={"review__content" + (isShown ? "__visible" : "__hidden")} className={"review__content"}>
                <p id="review__content__sentence">
                    {props.children}
                </p>
            </div>
        </div>
    );
});