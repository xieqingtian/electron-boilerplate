import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from './rootReducer';

export const initialState = {
    value: 0,
};

export const changeCountAsync = createAsyncThunk(
    'counter/changeCountAsync',
    async (count: number) => {
        await new Promise((resolve) => {
            setTimeout(resolve, 3000);
        });
        return count;
    },
);

const counter = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        changeCount(state, action: PayloadAction<number>) {
            switch (true) {
                case action.payload > 0:
                    state.value++;
                    break;
                case action.payload < 0:
                    state.value--;
                    break;
                default:
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(changeCountAsync.fulfilled, (state, action) => {
            state.value += action.payload;
        });
    },
});

export const { changeCount } = counter.actions;
export const selectCount = (state: RootState) => state.counter.value;
export default counter.reducer;
