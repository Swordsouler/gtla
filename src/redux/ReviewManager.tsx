import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataStore, SortDirection } from "aws-amplify";
import { Review } from "../models";
import { User } from "../models";
import { ReviewProps } from "../ui-kit/Review/Review";

type ReviewManager = {
	reviews: ReviewProps[];
	currentReview?: ReviewProps;
	selfId: string;
	status: 'idle' | 'loading' | 'failed';
	isDatastoreReady: boolean;
}

const initialState: ReviewManager = {
	reviews: [],
	currentReview: undefined,
	selfId: "",
	status: 'loading',
	isDatastoreReady: false
};

export const ReviewManagerSlice = createSlice({
	name: "ReviewManager",
	initialState: initialState,
	reducers: {
		onClickReview: (state, action: PayloadAction<string>) => {
			if (state.reviews.length === 0) return;
			if (state.currentReview && state.currentReview.id === action.payload) {
				state.currentReview = undefined;
			} else {
				state.currentReview = state.reviews.find((review) => review.id === action.payload);
			}
		},
		resetCurrentReview: (state) => {
			state.currentReview = undefined;
		},
		setIsDatastoreReady: (state, action: PayloadAction<boolean>) => {
			state.isDatastoreReady = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadReviews.pending, (state) => {
				if(state.selfId === "") return;
				state.status = 'loading';
			})
			.addCase(loadReviews.fulfilled, (state, action) => {
				if(action.payload === "not ready") return;
				if(state.selfId === "") return;
				state.status = 'idle';
				state.reviews = JSON.parse(action.payload ?? "[]");
				console.log("foundReviews", state.reviews);
			})
			.addCase(loadReviews.rejected, (state) => {
				if(state.selfId === "") return;
				state.status = 'failed';
			})
			.addCase(loadDeviceId.fulfilled, (state, action) => {
				if(state.selfId === "") {
					console.log("loadDeviceId", action.payload);

					state.selfId = action.payload;
					localStorage.setItem("deviceId", action.payload);
				}
			});
	},
});

export const { onClickReview, setIsDatastoreReady, resetCurrentReview } = ReviewManagerSlice.actions;
export default ReviewManagerSlice.reducer;

export const loadDeviceId = createAsyncThunk(
	'review/loadDeviceId',
	async () => {
		let deviceId = localStorage.getItem("deviceId");
		if(!deviceId || deviceId === "") {
			const user = await DataStore.save(
				new User({
					"Reviews": []
				})
			);
			deviceId = user.id;
		}
		return deviceId;
	}
);

export const loadReviews = createAsyncThunk(
	'review/loadReviews',
	async (deviceId: string) => {
		if(deviceId === "") return "not ready";
		console.log("loadReviews", deviceId);
		const reviews: ReviewProps[] = [];
		const query = (await DataStore.query(Review, (r) => r.userID.eq(deviceId), {
			sort: r => r.rating(SortDirection.DESCENDING).locationName(SortDirection.ASCENDING)
		}));
		query.forEach((review) => {
			reviews.push({
				id: review.id,
				latitude: review.latitude ?? undefined,
				longitude: review.longitude ?? undefined,
				address: review.address ?? undefined,
				website: review.website ?? undefined,
				type: review.type ?? undefined,
				visitedDate: review.visitedDate,
				locationName: review.locationName,
				rating: review.rating ?? undefined,
				review: review.review ?? undefined,
				images: review.images ?? undefined,
				placeID: review.placeID ?? undefined,
			});
		});
		return JSON.stringify(reviews);
	}
);

export function getFileExtension(filename: string){
    // get file extension
    const extension = filename.substring(filename.lastIndexOf('.') + 1, filename.length);
    return extension;
}