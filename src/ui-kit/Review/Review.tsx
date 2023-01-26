import moment from 'moment';
import React from 'react';
import { Rating } from 'react-simple-star-rating';
import { Review } from '../../models';
import './Review.scss';

export default React.memo((props: Review) => {

    const [isShown, setIsShown] = React.useState(false);
    const visitedDate = moment(new Date(props.visitedDate*1000)).format("dddd Do MMMM YYYY à HH:mm");

    const onClick = () => {
        setIsShown(!isShown);
    };
    
    return (
        <div id="review" className="no-select">
            <div id="review__header" onClick={onClick}>
                <Rating
                    readonly
                    initialValue={3}
                    fillColor={getComputedStyle(document.documentElement).getPropertyValue("--color-primary")}
                    emptyColor="#888888"
                    style={{height: "40px"}}/>
                <span id="review__location-name">{props.locationName}</span>
            </div>
            <div id={"review__content" + (isShown ? "__visible" : "__hidden")} className={"review__content"}>
                <p id="review__sentence">
                    <span className='review__content__bold'>{props.locationName}</span> est un <span className='review__content__bold'>{props.type}</span> localisé à <span className='review__content__bold'>{props.address}</span>. 
                    Vous y avez déjeuné le <span className='review__content__bold'>{visitedDate}</span> et l'expérience était <span className='review__content__bold'>excellente</span>.
                    Ce restaurant dispose d'un site web à l'adresse suivante : <a href={props.website ?? ""} className='review__content__bold'>{props.website}</a>.
                </p>
            </div>
        </div>
    );
});