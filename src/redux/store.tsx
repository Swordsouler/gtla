import { configureStore } from "@reduxjs/toolkit";
import FormReducer from "./Form";
import InspectorReducer from "./Inspector";
import AppDataReducer from "./AppData";

const store = configureStore({
	reducer: {
		Form: FormReducer,
		Inspector: InspectorReducer,
		AppData: AppDataReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
