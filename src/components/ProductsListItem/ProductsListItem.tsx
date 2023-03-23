import './ProductsListItem.scss'
// @ts-ignore
const ProductsListItem = ({name, purchasePrice, sellingPrice, quantity, onDelete}) => {


    return (
        <li className='products__item'>
            <p>{name}</p>
            <div className="products__item-wrapper">
                <p>{quantity}</p>
                <p>{purchasePrice}</p>
                <p>{sellingPrice}</p>
            </div>
            {/* <button onClick={onDelete}>Delete</button> */}
        </li>
    )
}

export default ProductsListItem