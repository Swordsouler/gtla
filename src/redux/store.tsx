import { configureStore } from "@reduxjs/toolkit";
import FormReducer from "./Form";
import InspectorReducer from "./Inspector";

const store = configureStore({
	reducer: {
		Form: FormReducer,
		Inspector: InspectorReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;