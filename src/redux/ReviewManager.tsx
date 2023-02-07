import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataStore, SortDirection } from "aws-amplify";
import { stat } from "fs";
import { changeSync } from "..";
import { Review } from "../models";
import { User } from "../models";
import { ReviewProps } from "../ui-kit/Review/Review";

type ReviewManager = {
	reviews: ReviewProps[];
	currentReview?: ReviewProps;
	deviceId: string;
	selfId: string;
	status: 'idle' | 'loading' | 'failed';
}

const initialState: ReviewManager = {
	reviews: [],
	currentReview: undefined,
	deviceId: "",
	selfId: "",
	status: 'loading'
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
		setDeviceId: (state, action: PayloadAction<string>) => {
			state.deviceId = action.payload;
		},
		setupSelfId: (state) => {
			state.deviceId = state.selfId;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadReviews.pending, (state) => {
				if(state.selfId === "") return;
				state.status = 'loading';
			})
			.addCase(loadReviews.fulfilled, (state, action) => {
				if(state.selfId === "") return;
				state.status = 'idle';
				state.reviews = JSON.parse(action.payload ?? "[]");
			})
			.addCase(loadReviews.rejected, (state) => {
				if(state.selfId === "") return;
				state.status = 'failed';
			})
			.addCase(loadDeviceId.fulfilled, (state, action) => {
				if(state.selfId === "") {

					state.selfId = action.payload;
					localStorage.setItem("deviceId", action.payload);
				} else {
					
					state.deviceId = action.payload;
				}
			});
	},
});

export const { onClickReview, setDeviceId, setupSelfId } = ReviewManagerSlice.actions;
export default ReviewManagerSlice.reducer;

export const loadDeviceId = createAsyncThunk(
	'review/loadDeviceId',
	async () => {
		let deviceId = localStorage.getItem("deviceId");
		console.log("loadDeviceId");
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
		console.log("loadReviews");
		if(deviceId === "") return;
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
				googleImages: review.googleImages ?? undefined,
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