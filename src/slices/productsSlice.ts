import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const initialState = {
    items: [],
    productsLoadingStatus: 'idle'
}

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/items");
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
        productUpdate: (state, action) => {
            const { id, purchasePrice, sellingPrice, quantity } = action.payload;
            // @ts-ignore
            const productToUpdate = state.items.find((product) => product.id === id);

            if (productToUpdate) {
                // @ts-ignore
                productToUpdate.purchasePrice = purchasePrice;
                // @ts-ignore
                productToUpdate.sellingPrice = sellingPrice;
                // @ts-ignore
                productToUpdate.quantity = quantity;
            }
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
    productDeleted,
    productUpdate
} = actions;