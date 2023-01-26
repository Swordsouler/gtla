import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReviewProps } from "../ui-kit/Review/Review";

type Inspector = {
	reviews: ReviewProps[];
	currentReview?: ReviewProps;
}

const initialState: Inspector = {
	reviews: [],
	currentReview: undefined
};

export const InspectorSlice = createSlice({
	name: "Inspector",
	initialState: initialState,
	reducers: {
		loadReviews: (state) => {
			state.reviews = [{
				id: "1",
				latitude: 0,
				longitude: 0,
				address: "14 Rue Chabanais, 75002 Paris",
				website: "https://www.hokkaido.kintarogroup.com/",
				type: "Restaurant asiatique",
				visitedDate: 1674689741,
				locationName: "Hokkaido"
			}, {
				id: "2",
				latitude: 0,
				longitude: 0,
				address: "",
				rating: 4,
				visitedDate: 1674689741,
				locationName: "Hokkaido"
			}, {
				id: "3",
				latitude: 0,
				longitude: 0,
				address: "",
				visitedDate: 1674689741,
				locationName: "Hokkaido"
			}, {
				id: "4",
				latitude: 0,
				longitude: 0,
				address: "Centre commercial les ulysses",
				rating: 1,
				visitedDate: 1674689741,
				locationName: "Burger King Les Ulysses",
				type: "Fast-Food",
				review: "Ce fast-food est mauvais, c'est juste pour les gras du bide. En plus ils ont changé leurs récompenses avec les points de fidélité, ont peut même plus ce péter le bide correctement. Déçu de cette enseigne mais j'irai mangé quand même parce que je suis un gros."
			}];
		},
		onClickReview: (state, action: PayloadAction<string>) => {
			if (state.reviews.length === 0) return;
			if (state.currentReview && state.currentReview.id === action.payload) {
				state.currentReview = undefined;
			} else {
				state.currentReview = state.reviews.find((review) => review.id === action.payload);
			}
		}
	},
});

export const { loadReviews, onClickReview } = InspectorSlice.actions;
export default InspectorSlice.reducer;