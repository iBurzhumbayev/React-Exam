import { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { fetchProducts } from '../../slices/productsSlice';
import { fetchWarehouse } from '../../slices/warehouseSlice';
import './AppHeader.scss'

const AppHeader = () => {

    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products.items);
    const warehouse = useSelector((state: RootState) => state.warehouse.items);

    useEffect(() => {
        //@ts-ignore
        dispatch(fetchProducts())
        //@ts-ignore
        dispatch(fetchWarehouse())
    }, [])

    return (
        <header className="header">
            <h1>Контроль товаров в магазине</h1>
            <h2>Всего товаров: {products.length}</h2>
            {/* @ts-ignore */}
            <h2>Деньги склада: {warehouse.money}</h2>
        </header>
    )
}

export default AppHeader;