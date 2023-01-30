import { configureStore } from "@reduxjs/toolkit";
import FormReducer from "./Form";
import ReviewManagerReducer from "./ReviewManager";
import AppDataReducer from "./AppData";

const store = configureStore({
	reducer: {
		Form: FormReducer,
		ReviewManager: ReviewManagerReducer,
		AppData: AppDataReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
