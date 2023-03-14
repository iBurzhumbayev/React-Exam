import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { IProduct } from '../../types';
import { fetchProducts, productDeleted } from './productsSlice';
import Spinner from '../Spinner/Spiner';

const ProductList = () => {
    
    const dispatch = useDispatch();
    const productsLoadingStatus = useSelector((state: RootState) => state.products.productsLoadingStatus);
    const products = useSelector((state: RootState) => state.products.items);
    const {request} = useHttp();

    useEffect(() => {
        //@ts-ignore
        dispatch(fetchProducts())
    }, [])

    const onDelete = useCallback((id: string) => {
        request(`http://localhost:3001/items/${id}`, "DELETE")
            .then(data => console.log(data, 'Deleted'))
            // @ts-ignore
            .then(dispatch(productDeleted(id)))
            .catch(err => console.log(err));
        // eslint-disable-next-line  
    }, [request]);


    if (productsLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (productsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    return (
        <div>
            <ul>
                {products.map((product: IProduct) => (
                    <li key={product.id}>
                        {product.name} - {product.purchasePrice} - {product.sellingPrice} - {product.quantity}
                        <button onClick={() => onDelete(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
