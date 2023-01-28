import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ReviewBlock } from "../../ui-kit/Review/Review";
import "./Home.scss";

export default function Home() {
    const reviews = useSelector((state: RootState) => state.Inspector.reviews);
    return (
        <div id="home">
            <h1>Bienvenue sur GTLA</h1>
            <ReviewBlock title={"Qu'est-ce-que GTLA ?"}>
                {GTLAInformations}
            </ReviewBlock>
            <ReviewBlock title={"Pourquoi de site s'appelle GTLA ?"}>
                {GTLAName}
            </ReviewBlock>
            <ReviewBlock title={"Comment ajouter un avis ?"}>
                {AddReview}
            </ReviewBlock>
        </div>
    );
}

const GTLAInformations: JSX.Element[] = [
    <span key={0}>GTLA est un </span>,
    <span key={1} className='review__content__bold'>site web</span>,
    <span key={2}> qui permet de consulter et d'ajouter des </span>,
    <span key={3} className='review__content__bold'>avis</span>,
    <span key={4}> sur les </span>,
    <span key={5} className='review__content__bold'>restaurants</span>,
    <span key={6}> récemments visités.</span>,
];

const GTLAName: JSX.Element[] = [
    <span key={0}>GTLA fait référence à la phrase "</span>,
    <span key={1} className='review__content__bold'>J'étais là</span>,
    <span key={2}>" voulant témoigner du fait d'être passer par un endroit.</span>
];

const AddReview: JSX.Element[] = [
    <span key={0}>Pour ajouter un avis, il suffit de cliquer sur le bouton "</span>,
    <span key={1} className='review__content__bold'>Ajouter</span>,
    <span key={2}>" dans le menu en haut de l'écran.</span>,
    <br />,
    <span key={3}>Une fois sur la page d'ajout, il suffit de suivre les instructions qui s'affichent.</span>
];