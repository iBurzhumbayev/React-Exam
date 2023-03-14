import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getResource } from "../../common/api";

const initialState = {
    items: [],
    productsLoadingStatus: 'idle'
}

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        return await getResource(`/items`);
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productCreated: (state, action) => {
            // @ts-ignore
            state.items.push(action.payload);
        },
        productDeleted: (state, action) => {
            // @ts-ignore
            state.items = state.items.filter((product) => product.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, state => {state.productsLoadingStatus = 'loading'})
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.productsLoadingStatus = 'idle';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, state => {
                state.productsLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = productsSlice;

export default reducer;
export const {
    productCreated,
    productDeleted
} = actions;