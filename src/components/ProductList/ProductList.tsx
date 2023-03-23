import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { IProduct } from '../../types';
import { fetchProducts, productDeleted } from '../../slices/productsSlice';
import { ProductsListItem } from '../'
import Spinner from '../Spinner/Spiner';
import './ProductList.scss'

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


    // if (productsLoadingStatus === "loading") {
    //     return <Spinner/>;
    // } else if (productsLoadingStatus === "error") {
    //     return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    // }

    if (products.length === 0) {
        return (
            <ul className='products'>
                <li className='products__item'>
                    <p>Товаров пока нет...</p>
                </li>
            </ul>
        )
    }

    const elements = products.map(({id, ...props}: IProduct) => {
        return (
            <ProductsListItem 
                key={id} 
                {...props}
                onDelete={() => onDelete(id)}
            />
        )
    })

    return (

        <ul className='products'>
            <li className='products__item'>
                <p className='products__item-title'>Название товара</p>
                <div className="products__item-wrapper">
                    <p className='products__item-title'>Кол-во</p>
                    <p className='products__item-title'>Цена покупки</p>
                    <p className='products__item-title'>Цена продажи</p>
                </div>
                {/* <button>Delete</button> */}
            </li>
            {elements}
        </ul>

    )
};

export default ProductList;



// return (
//     <div>
//         <ul>
//             {products.map((product: IProduct) => (
//                 <li key={product.id}>
//                     {product.name} - {product.purchasePrice} - {product.sellingPrice} - {product.quantity}
//                     <button onClick={() => onDelete(product.id)}>Delete</button>
//                 </li>
//             ))}
//         </ul>
//     </div>
// );
