import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ReviewProps } from "../../ui-kit/Review/Review";
import "./Add.scss";
import { InformationsTitle, InformationsForm, InformationsOnSubmit } from "./Form/Informations";
import { LocationForm, LocationOnSubmit, LocationTitle } from "./Form/Location";
import { PicturesForm, PicturesOnSubmit, PicturesTitle } from "./Form/Pictures";
import { ReviewForm, ReviewOnSubmit, ReviewTitle } from "./Form/Review";

type Page = {
    title: string;
    form: JSX.Element;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    suggestions?: JSX.Element;
}

export const review: ReviewProps = {
    id: "",
    locationName: "",
    visitedDate: new Date().getTime() / 1000,
};

const pages: Page[] = [{
    title: LocationTitle,
    form: <LocationForm />,
    onSubmit: LocationOnSubmit
}, {
    title: InformationsTitle,
    form: <InformationsForm />,
    onSubmit: InformationsOnSubmit
}, {
    title: PicturesTitle,
    form: <PicturesForm/>,
    onSubmit: PicturesOnSubmit
}, {
    title: ReviewTitle,
    form: <ReviewForm />,
    onSubmit: ReviewOnSubmit
}];

export default function Add() {
    
    const theme = useSelector((state: RootState) => state.AppData.theme);
    const [currentPage, setCurrentPage] = React.useState<number>(0);

    const onBack = () => {
        if(currentPage > 0)
            setCurrentPage(currentPage - 1);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        pages[currentPage].onSubmit(e);
        if(currentPage < pages.length - 1)
            setCurrentPage(currentPage + 1);
    }
    
    return (
        <form id="add" onSubmit={onSubmit}>
            <PageUI currentPage={currentPage} />
            <h2>{pages[currentPage].title}</h2>
            {pages[currentPage].form}
            <div className="add__buttons">
                <input type="button" id="add__buttons__previous" value={"Précédent"} disabled={currentPage === 0} onClick={onBack}/>
                <div className="fill-space"/>
                <input type="submit" id="add__buttons__next" value={currentPage === pages.length - 1 ? "Terminer" : "Suivant"}/>
            </div>
        </form>
    );
}

const PageUI = ({currentPage}: {currentPage: number}) => {
    return (
        <div id="add__page-ui" className="no-select">
            {pages.map((page, index) => {
                if (index > currentPage) {
                    return <div key={index} id="add__page-ui__number" className="add__page-ui__number__disabled"><span>{index+1}</span></div>
                } else {
                    return <div key={index} id="add__page-ui__number"><span>{index+1}</span></div>
                }
            })}
        </div>
    );
}