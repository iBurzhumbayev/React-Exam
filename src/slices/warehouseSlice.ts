import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const initialState = {
    items: [],
    LoadingStatus: 'idle'
}

export const fetchWarehouse = createAsyncThunk(
    'products/fetchWarehouse',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/warehouse");
    }
);

const warehouseSlice = createSlice({
    name: 'warehouse',
    initialState,
    reducers: {
        updateWarehouse: (state, action) => {
            console.log(action)
            // @ts-ignore
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWarehouse.pending, state => {state.LoadingStatus = 'loading'})
            .addCase(fetchWarehouse.fulfilled, (state, action) => {
                state.LoadingStatus = 'idle';
                state.items = action.payload;
            })
            .addCase(fetchWarehouse.rejected, state => {
                state.LoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = warehouseSlice;

export default reducer;
export const {
    updateWarehouse,

} = actions;