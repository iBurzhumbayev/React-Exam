import { createBrowserRouter } from "react-router-dom";
import { GeneralPage, ErrorPage, ProductsPage, AddProductPage, DeleteProductPage, WarehouseInfoPage } from '../routes';

const router = createBrowserRouter([
    {
        path: '/', 
        element: <GeneralPage/>, 
        errorElement: <ErrorPage/>, 
        children: [
            {
                path: '/',
                element: <WarehouseInfoPage/>
            },
            {
                path: '/products',
                element: <ProductsPage/>
            },
            {
                path: '/product-add',
                element: <AddProductPage/>
            },
            {
                path: '/product-delete',
                element: <DeleteProductPage/>
            },
        ]
    }
]);

export default router;