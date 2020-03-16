import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    count: 0
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
                default:
                    break;
            }
        }
    }
});

export const { changeCount } = count.actions;
export default count.reducer;
