import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Review from "../../ui-kit/Review/Review";
import "./List.scss";

export default function List() {
    const reviews = useSelector((state: RootState) => state.Inspector.reviews);
    return (
        <div id="list">
            {reviews.map((review) => <Review key={review.id} {...review} />)}
        </div>
    );
}