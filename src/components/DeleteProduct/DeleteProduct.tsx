import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { IProduct } from '../../types';
import { fetchProducts, productDeleted } from '../../slices/productsSlice';
import { v4 as uuidv4 } from 'uuid'
import './DeleteProduct.scss'

const DeleteProduct = () => {

    const dispatch = useDispatch();
    const productsLoadingStatus = useSelector((state: RootState) => state.products.productsLoadingStatus);
    const products = useSelector((state: RootState) => state.products.items);
    const {request} = useHttp();

    const [selectedProductId, setSelectedProductId] = useState<string>("");
    const [selectedProductName, setSelectedProductName] = useState<string>("");

    const operation = (nameProduct: string, name:string) => {
        const newOperation = {
            id: uuidv4(),
            name,
            nameProduct,
            date: new Date()
        }
        //@ts-ignore
        request("http://localhost:3001/operation", "POST", JSON.stringify(newOperation))
            .then(res => console.log(res, 'Отправка успешна'))
            .catch(err => console.log(err));
    }


    const onDelete = useCallback(() => {
        request(`http://localhost:3001/items/${selectedProductId}`, "DELETE")
            .then(data => {
                console.log(data, 'Deleted');
                dispatch(productDeleted(selectedProductId));
                setSelectedProductId('');
            })
            .then(() => operation(selectedProductName, 'Удаление товара'))
            .catch(err => console.log(err));
    }, [request, selectedProductId, selectedProductName]);


    useEffect(() => {
        // @ts-ignore
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleProductSelect = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProductId(event.target.value);
        setSelectedProductName(event.target.options[event.target.selectedIndex].text);
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
