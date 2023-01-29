import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Review from "../../ui-kit/Review/Review";
import "./Map.scss";

export default function Map() {
    const reviews = useSelector((state: RootState) => state.Inspector.reviews);
    return (
        <div id="map">
            
        </div>
    );
}