import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Form = {
	idk: string;
}

const initialState: Form = {
	idk: "idk"
};

export const FormSlice = createSlice({
	name: "Form",
	initialState: initialState,
	reducers: {
		initIdk: (state) => {
			state.idk = "idk";
		},
		setIdk: (state, action: PayloadAction<string>) => {
			state.idk = action.payload;
		}
	},
});

export const { initIdk, setIdk } = FormSlice.actions;
export default FormSlice.reducer;