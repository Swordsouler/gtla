import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./Map.scss";

///TODO Duc-Bao
export default function Map() {
    const reviews = useSelector((state: RootState) => state.ReviewManager.reviews);
    return (
        <div id="map">
            
        </div>
    );
}