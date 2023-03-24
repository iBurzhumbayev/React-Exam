import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const initialState = {
    items: [],
    LoadingStatus: 'idle'
}

export const fetchOperation = createAsyncThunk(
    'products/fetchOperation',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/operation");
    }
);

const operationSlice = createSlice({
    name: 'operation',
    initialState,
    reducers: {
        updateOperation: (state, action) => {
            console.log(action)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOperation.pending, state => {state.LoadingStatus = 'loading'})
            .addCase(fetchOperation.fulfilled, (state, action) => {
                state.LoadingStatus = 'idle';
                state.items = action.payload;
            })
            .addCase(fetchOperation.rejected, state => {
                state.LoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = operationSlice;

export default reducer;
export const {
    updateOperation,

} = actions;