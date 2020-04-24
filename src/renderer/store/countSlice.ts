import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

const delay = (time: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
};

export const asyncIncrease = createAsyncThunk('count/asyncIncrease', async (conut: number) => {
    await delay(3000);
    return conut;
});

const initialState = {
    count: 0,
};

const count = createSlice({
    name: 'count',
    initialState,
    reducers: {
        changeCount(state, action: PayloadAction<number>) {
            switch (true) {
                case action.payload > 0:
                    state.count++;
                    break;
                case action.payload < 0:
                    state.count--;
                    break;
                default:
            }
        },
    },
    extraReducers: {
        // @ts-ignore
        [asyncIncrease.fulfilled]: (state, action: PayloadAction<number>) => {
            state.count += action.payload;
        },
    },
});

export const { changeCount } = count.actions;
export default count.reducer;
