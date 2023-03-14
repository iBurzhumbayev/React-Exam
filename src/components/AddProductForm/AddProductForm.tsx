import { useHttp } from "../../hooks/http.hook";
import { useDispatch } from "react-redux";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import { productCreated } from "../ProductList/productsSlice";

const AddProductForm = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [purchasePrice, setPurchasePrice] = useState("");
	const [sellingPrice, setSellingPrice] = useState("");

	const {request} = useHttp();

	const handleClick = (e: FormEvent) => {
		e.preventDefault();
		const newProduct = {
            id: uuidv4(),
            name,
            purchasePrice: parseInt(purchasePrice),
            sellingPrice: parseInt(sellingPrice),
        }

		//@ts-ignore
		request("http://localhost:3001/items", "POST", JSON.stringify(newProduct))
            .then(res => console.log(res, 'Отправка успешна'))
			//@ts-ignore
            .then(dispatch(productCreated(newProduct)))
            .catch(err => console.log(err));
	};

  	console.log(name)

	return (
		<div>
			<form onSubmit={handleClick}>
				<input
					required
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					required
					type='number'
					placeholder="Purchase price"
					value={purchasePrice}
					onChange={(e) => setPurchasePrice(e.target.value)}
				/>
				<input
					required
					type='number'
					placeholder="Selling price"
					value={sellingPrice}
					onChange={(e) => setSellingPrice(e.target.value)}
				/>
				<button>Add</button>
			</form>
		</div>
	);
};

export default AddProductForm;