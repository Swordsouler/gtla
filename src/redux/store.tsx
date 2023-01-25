import { configureStore } from "@reduxjs/toolkit";
import FormReducer from "./Form";

const store = configureStore({
	reducer: {
		Form: FormReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;