import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Rating } from 'react-simple-star-rating';
import { LazyS3Data, S3Data } from '../../models';
import { getFileExtension, onClickReview } from '../../redux/ReviewManager';
import { RootState } from '../../redux/store';
import './Review.scss';

export type ReviewProps = {
    id: string,
    locationName: string;
    latitude?: number;
    longitude?: number;
    address?: string;
    website?: string;
    rating?: number;
    type?: string;
    review?: string;
    visitedDate: number;
    images?: (LazyS3Data | null)[];
    googleImages?: string[];
    createdAt?: string;
    updatedAt?: string;
    isShown?: boolean;
};

export default React.memo((props: ReviewProps) => {
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(onClickReview(props.id));
    };
    const theme = useSelector((state: RootState) => state.AppData.theme);
    const visitedDate = moment(new Date(props.visitedDate)).format("DD/MM/YYYY");
    console.log(props);
    return (
        <div id="review">
            <div id="review__header" className="no-select" onClick={onClick}>
                <Rating
                    readonly
                    initialValue={props.rating ?? 0}
                    fillColor={theme === "light" ? "#524291" : "#9ad45b"}
                    emptyColor="#888888"
                    style={{height: "22px"}}
                    size={20}/>
                <span id="review__location-name">{props.locationName}</span>
                <span id="review__date">{visitedDate}</span>
            </div>
            <div id={"review__content" + (props.isShown ? "__visible" : "__hidden")} className={"review__content"}>
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
    sentences.push(<span key={sentences.length} className='review__content__bold'>{props.locationName}</span>);
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
    if (props.images === null || props.images === undefined || props.images.length === 0) return null;
    return (
        <div id="review__content__carousel">
            {
            props.images.map((image, index) => {
                if(image === null || image === undefined) return null;
                return (
                    <img src={"https://gtla-storage-88691f07145011-prod.s3.eu-west-3.amazonaws.com/public/" + image.key} alt={'Restaurant ' + index} key={"Restaurant " + index}/>
                );
            })
            }
        </div>
    );
}




export const ReviewBlock = React.memo((props: {title: string, children: string | JSX.Element[]}) => {
    const [isShown, setIsShown] = React.useState(false);
    const onClick = () => {
        setIsShown(!isShown);
    };
    
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