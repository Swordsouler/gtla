import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

type AppData = {
	theme: string;
}

const initialState: AppData = {
	theme: localStorage.getItem("theme") || (window.matchMedia('prefers-color-scheme: dark').matches ? "dark" : "light"),
};

export const AppDataSlice = createSlice({
	name: "AppData",
	initialState: initialState,
	reducers: {
		toggleTheme: (state) => {
			if(state.theme === "light") {
				state.theme = "dark";
				localStorage.setItem("theme", "dark");
			} else {
				state.theme = "light";
				localStorage.setItem("theme", "light");
			}
		}
	},
});

export const { toggleTheme } = AppDataSlice.actions;
export default AppDataSlice.reducer;