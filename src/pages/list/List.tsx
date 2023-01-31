import { Spinner } from "react-activity";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Review from "../../ui-kit/Review/Review";
import "./List.scss";

export default function List() {
    const statusReviews = useSelector((state: RootState) => state.ReviewManager.status);
    const reviews = useSelector((state: RootState) => state.ReviewManager.reviews);
    const theme = useSelector((state: RootState) => state.AppData.theme);
    return (
        <div id="list">
            {
                statusReviews === "idle" ?
                    (reviews.length > 0 ? 
                        reviews.map((review) => <Review key={review.id} {...review} />) : 
                        <div id="list__no-reviews">Aucun avis n'a été trouvé</div>) :
                        <div id="list__spinner"><Spinner size={30} color={theme === "light" ? "#524291" : "#9ad45b"} /></div>
            }
        </div>
    );
}