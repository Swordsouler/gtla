import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { ReviewBlock } from "../../ui-kit/Review/Review";
import "./Home.scss";

export default function Home() {
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
            <ReviewBlock title={"Comment partager ma liste de restaurant ?"}>
                {ShareList()}
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
    <span key={1} className='review__content__bold'>Ajout</span>,
    <span key={2}>" dans le menu en haut de l'écran.</span>,
    <br key={3}/>,
    <span key={4}>Une fois sur la page d'ajout, il suffit de suivre les instructions qui s'affichent.</span>
];

const ShareList = (): JSX.Element[]  => {

    const selfId = useSelector((state: RootState) => state.ReviewManager.selfId);
    if(!selfId) return [];
    return [
        <span key={0}>Utilisez les liens ou les QRCode ci-dessous.</span>,
        <br key={3}/>,
        <span key={4} id="qr-codes">
            <span id="qr-code__container">
                <Link className='review__content__bold' to={"/list/" + selfId}>Liste</Link>
                <QRCode
                    size={256}
                    style={{ height: "150px", width: "150px", marginTop: "10px", outline: "1px solid var(--color-primary)"}}
                    value={(process.env.REACT_APP_REDIRECT_URL)  + "/list/" + selfId}
                    viewBox={`0 0 256 256`}/>
            </span>
            <span id="qr-code__container">
                <Link className='review__content__bold' to={"/map/" + selfId}>Carte</Link>
                <QRCode
                    size={256}
                    style={{ height: "150px", width: "150px", marginTop: "10px", outline: "1px solid var(--color-primary)"}}
                    value={(process.env.REACT_APP_REDIRECT_URL)  + "/map/" + selfId}
                    viewBox={`0 0 256 256`}/>
            </span>
        </span>
    ]
};