import { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { IProduct, IWarehouse } from '../../types';
import { fetchProducts } from '../../slices/productsSlice';
import { fetchWarehouse } from '../../slices/warehouseSlice';
import './WarehouseInfo.scss'

const WarehouseInfo = () => {

    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products.items);
    const warehouse = useSelector((state: RootState) => state.warehouse.items);

    useEffect(() => {
        //@ts-ignore
        dispatch(fetchProducts())
        //@ts-ignore
        dispatch(fetchWarehouse())
    }, [])
    console.log(warehouse)
    // @ts-ignore
    const sortedProducts = [...products].sort((a, b) => a.quantity - b.quantity);


    // @ts-ignore
    const maxQuantity = sortedProducts[sortedProducts.length - 1]?.quantity;
    const mostFrequentProducts = products.filter((product: IProduct) => product.quantity === maxQuantity);

    const minQuantity = sortedProducts.reduce((min, product:  IProduct) => Math.min(min, product.quantity), Infinity);
    const leastFrequentProducts = products.filter((product: IProduct) => product.quantity === minQuantity);

    return (
        <ul className='warehouse'>
            <li className='warehouse__item'><p><span>Всего товаров:</span> {products.length}</p></li>
            <li className='warehouse__item'><p><span>Больше всего:</span> {mostFrequentProducts.map((product: IProduct) => product.name).join(', ')}</p></li>
            <li className='warehouse__item'><p><span>Меньше всего:</span> {leastFrequentProducts.map((product: IProduct) => product.name).join(', ')}</p></li>
            {/* @ts-ignore */}
            <li className='warehouse__item'><p><span>Деньги склада:</span> {warehouse.money}</p></li>
        </ul>
    )
}

export default WarehouseInfo;