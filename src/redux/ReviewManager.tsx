import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { DataStore } from "aws-amplify";
import { Review } from "../models";
import { User } from "../models";
import { ReviewProps } from "../ui-kit/Review/Review";

type ReviewManager = {
	isLoaded: boolean;
	reviews: ReviewProps[];
	currentReview?: ReviewProps;
	deviceId: string;
}

const initialState: ReviewManager = {
	isLoaded: false,
	reviews: [],
	currentReview: undefined,
	deviceId: ""
};

export const ReviewManagerSlice = createSlice({
	name: "ReviewManager",
	initialState: initialState,
	reducers: {
		setDeviceId: (state, action: PayloadAction<string>) => {
			state.deviceId = action.payload;
			localStorage.setItem("deviceId", action.payload);
		},
		setReviews: (state, action: PayloadAction<string>) => {
			state.isLoaded = true;
			if(state.deviceId === "") return;
			state.reviews = JSON.parse(action.payload);
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

export const { setReviews, onClickReview, setDeviceId } = ReviewManagerSlice.actions;
export default ReviewManagerSlice.reducer;


export async function loadDeviceId(dispatch: Dispatch) {
    let deviceId = localStorage.getItem("deviceId");
    if(!deviceId || deviceId === "") {
        const user = await DataStore.save(
            new User({
                "Reviews": []
            })
        );
        deviceId = user.id;
    }
    dispatch(setDeviceId(deviceId));
}

export async function loadReviews(dispatch: Dispatch, deviceId: string) {
	if(deviceId === "") return;
	const reviews: ReviewProps[] = [];
	const query = (await DataStore.query(Review, (r) => r.userID.eq(deviceId)));
	query.forEach((review) => {
		reviews.push({
			id: review.id,
			latitude: review.latitude ?? undefined,
			longitude: review.longitude ?? undefined,
			address: review.address ?? undefined,
			website: review.website ?? undefined,
			type: review.type ?? undefined,
			visitedDate: review.visitedDate,
			locationName: review.locationName
		});
	});
	/*
	reviews = [{
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
	}];*/
    dispatch(setReviews(JSON.stringify(reviews)));
}