import React from "react";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { RootState } from "../../redux/store";
import "./Add.scss";

type Page = {
    title: string;
    form: (({theme}: {theme: string}) => JSX.Element);
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    suggestions?: JSX.Element;
}

const pages: Page[] = [{
    title: "Où êtes-vous ?",
    form: () => (
        <div className="add__form__content">
            <div className="input__container">
                <label htmlFor="add__name">Nom du restaurant</label>
                <input id="add__name" type="text" placeholder="Hokkaido"/>
            </div>
        </div>
    ),
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
        const name = document.getElementById("add__name") as HTMLInputElement;
        console.log(name.value);
    }
}, {
    title: "Donnez-nous plus d'informations",
    form: () => (
        <div className="add__form__content">
            <div className="input__container">
                <label htmlFor="add__cuisine">Type de cuisine</label>
                <input id="add__cuisine" type="text" placeholder="Japonaise"/>
            </div>
            <div className="input__container">
                <label htmlFor="add__address">Adresse</label>
                <input id="add__address" type="text" placeholder="1 rue de la paix"/>
            </div>
            <div className="input__container">
                <label htmlFor="add__website">Site web</label>
                <input id="add__website" type="text" placeholder="https://www.hokkaido.fr"/>
            </div>
        </div>
    ),
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => {

    }
}, {
    title: "Ajouter des photos",
    form: () => <AddPictures/>,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => {

    }
}, {
    title: "Donnez-nous votre avis",
    form: ({theme}) => (
        <div className="add__form__content">
            <Rating
                initialValue={0}
                fillColor={theme === "light" ? "#524291" : "#9ad45b"}
                emptyColor="#888888"/>
            <div className="input__container">
                <label htmlFor="add__review">Avis sur le restaurant</label>
                <textarea id="add__review" placeholder="Ce restaurant était très bon..."/>
            </div>
        </div>
    ),
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => {

    }
}];

export default function Add() {
    
    const theme = useSelector((state: RootState) => state.AppData.theme);
    const [currentPage, setCurrentPage] = React.useState<number>(2);

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
            {pages[currentPage].form({theme: theme})}
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
        <div id="add__page-ui">
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

function AddPictures() {
    const [photos, setPhotos] = React.useState<string[]>([]);
    return (
        <div className="add__form__content">
            <div className="input__container">
                <label htmlFor="add__photos" className="input__photo__container">{photos.length > 0 ? photos.map((e, index) => <img src={e} alt={"Restaurant" + index}/>) : <span>Ajouter des photos</span>}</label>
                <input id="add__photos" type="file" multiple onChange={(e) => {
                    e.preventDefault();
                    const files = e.target.files;
                    if (files) {
                        for (let i = 0; i < files.length; i++) {
                            const file = files[i];
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                if (e.target) {
                                    const result = e.target.result;
                                    if (result) {
                                        setPhotos([...photos, result as string]);
                                    }
                                }
                            }
                            reader.readAsDataURL(file);
                        }
                    }
                }}/>
            </div>
        </div>
    );
}