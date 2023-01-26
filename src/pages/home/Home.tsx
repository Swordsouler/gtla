import React from "react";
import Review from "../../ui-kit/Review/Review";
import "./Home.scss";

export default function Home() {
    return (
        <div id="home">
            <h1>GTLAccueil</h1>
            <Review id={""} latitude={0} longitude={0} address={"14 Rue Chabanais, 75002 Paris"} website={"https://www.hokkaido.kintarogroup.com/"} type={"Restaurant asiatique"} visitedDate={1674689741} locationName={"Hokkaido"}/>
            <Review id={""} latitude={0} longitude={0} address={""} visitedDate={1674689741} locationName={"Hokkaido"}/>
            <Review id={""} latitude={0} longitude={0} address={""} visitedDate={1674689741} locationName={"Hokkaido"}/>
            <Review id={""} latitude={0} longitude={0} address={""} visitedDate={1674689741} locationName={"Hokkaido"}/>
        </div>
    );
}