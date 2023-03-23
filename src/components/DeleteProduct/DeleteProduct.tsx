import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { IProduct } from '../../types';
import { fetchProducts, productDeleted } from '../../slices/productsSlice';
import './DeleteProduct.scss'

const DeleteProduct = () => {

    const dispatch = useDispatch();
    const productsLoadingStatus = useSelector((state: RootState) => state.products.productsLoadingStatus);
    const products = useSelector((state: RootState) => state.products.items);
    const {request} = useHttp();

    const [selectedProductId, setSelectedProductId] = useState<string>("");

    const onDelete = useCallback(() => {
        request(`http://localhost:3001/items/${selectedProductId}`, "DELETE")
            .then(data => {
                console.log(data, 'Deleted');
                dispatch(productDeleted(selectedProductId));
                setSelectedProductId("");
            })
            .catch(err => console.log(err));
    }, [request, selectedProductId]);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleProductSelect = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProductId(event.target.value);
    }, []);

    return (
        <div className="product__delete">
            <h3>Удалите товар</h3>
            <>
                <select value={selectedProductId} onChange={handleProductSelect}>
                    <option value="">-- Выберите товар --</option>
                    {products.map((product: IProduct) => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                </select>
                <button style={{marginLeft: 15}} onClick={onDelete} disabled={!selectedProductId}>Удалить</button>
            </>
        </div>
    )
}

export default DeleteProduct;