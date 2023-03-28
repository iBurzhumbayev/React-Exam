import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { IProduct } from '../../types';
import { fetchProducts, productDeleted, productUpdate } from '../../slices/productsSlice';
import { updateWarehouse, fetchWarehouse } from '../../slices/warehouseSlice'
import { v4 as uuidv4 } from 'uuid'

const SaleProduct = () => {

    const dispatch = useDispatch();
    // const productsLoadingStatus = useSelector((state: RootState) => state.products.productsLoadingStatus);
    const products = useSelector((state: RootState) => state.products.items);
    const warehouse = useSelector((state: RootState)=> state.warehouse.items);
    const {request} = useHttp();

    const [selectedProductId, setSelectedProductId] = useState<string>("");
    const [selectedProductName, setSelectedProductName] = useState<string>("");
    const [selectedProductQuantity, setSelectedProductQuantity] = useState<number>();
    const [selectedQuantity, setSelectedQuantity] = useState<number>();

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


    const warehouseMoney = (sellingPrice:number) => {
		// @ts-ignore
		const money = warehouse.money + sellingPrice
		// @ts-ignore
		request("http://localhost:3001/warehouse", "PUT", JSON.stringify({money}))
            .then(res => console.log(res, 'Отправка успешна'))
			// @ts-ignore
			.then(dispatch(updateWarehouse(money)))
            .catch(err => console.log(err));

		// @ts-ignore
		dispatch(fetchWarehouse())
	}

    
    const onSale = useCallback(() => {

        const saleTotalQuantity = products.find((p: any) => p.name === selectedProductName);
        const existingProduct = products.find((p: any) => p.id === selectedProductId);
        // @ts-ignore
        const sellingPrice = saleTotalQuantity.sellingPrice * selectedQuantity

        // @ts-ignore
        if (saleTotalQuantity.quantity === selectedQuantity) {
            request(`http://localhost:3001/items/${selectedProductId}`, "DELETE")
            .then(data => {
                console.log(data, 'Deleted');
                dispatch(productDeleted(selectedProductId));
                setSelectedProductId('');
                alert(`Вы продали ${selectedProductName} в количестве ${selectedQuantity}`)
            })
            .then(() => {
                operation(selectedProductName, 'Продажа')
                // @ts-ignore
                warehouseMoney(sellingPrice)
            })
            .catch(err => console.log(err));
        } else {
            const updatedProduct = {
				// @ts-ignore
				...existingProduct,
				// @ts-ignore
				quantity: existingProduct.quantity - selectedQuantity,
			};
		
			// @ts-ignore
			request(`http://localhost:3001/items/${existingProduct.id}`, "PUT", JSON.stringify(updatedProduct))
				.then((res) => {
                    console.log(res, "Отправка успешна")
                    alert(`Вы продали ${selectedProductName} в количестве ${selectedQuantity}`)
                    dispatch(productUpdate(updatedProduct))
                    operation(selectedProductName, 'Продажа')
                    // @ts-ignore
                    warehouseMoney(sellingPrice)
                })
				.catch((err) => console.log(err));
        }
        setSelectedProductId("");
    }, [request, selectedProductId, selectedProductName]);


    useEffect(() => {
        // @ts-ignore
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleProductSelect = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProductId(event.target.value);
        setSelectedProductName(event.target.options[event.target.selectedIndex].text);
        setSelectedProductQuantity(Number(event.target.selectedOptions[0].getAttribute('data-quantity')))
        setSelectedQuantity(1)
    }, []);

    const handleQuantitySelect = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedQuantity(Number(event.target.value))
    }, []);

    console.log(selectedQuantity)

    return (
        <div className="product__delete">
            <h3>Продажа товара</h3>
            <>
                <select value={selectedProductId} onChange={handleProductSelect}>
                    <option value="">-- Выберите товар --</option>
                    {products.map((product: IProduct) => (
                        <option key={product.id} value={product.id} data-quantity={product.quantity}>{product.name}</option>
                    ))}
                </select>
                {selectedProductId && (
                    <select style={{marginLeft: 15}} value={selectedQuantity} onChange={handleQuantitySelect}>
                        {[...Array(selectedProductQuantity)].map((_, i) => (
                            <option key={i}>{i + 1}</option>
                        ))}
                    </select>
                )}
                <button style={{marginLeft: 15}} onClick={onSale} disabled={!selectedProductId}>Продать</button>
            </>
        </div>
    )
}

export default SaleProduct;
