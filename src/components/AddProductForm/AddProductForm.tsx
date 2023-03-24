import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import { productCreated } from "../../slices/productsSlice";
import { updateWarehouse, fetchWarehouse } from '../../slices/warehouseSlice'
import './AddProductForm.scss'

const AddProductForm = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [purchasePrice, setPurchasePrice] = useState("");
	const [sellingPrice, setSellingPrice] = useState("");

	const {request} = useHttp();
	// @ts-ignore
	const warehouse = useSelector(state => state.warehouse.items);

	const purchaseProduct = (purchasePrice:number) => {

		const money = warehouse.money - purchasePrice
		// @ts-ignore
		request("http://localhost:3001/warehouse", "PUT", JSON.stringify({money}))
            .then(res => console.log(res, 'Отправка успешна'))
			// @ts-ignore
			.then(dispatch(updateWarehouse(money)))
            .catch(err => console.log(err));

		// @ts-ignore
		dispatch(fetchWarehouse())
	}

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

	const handleClick = (e: FormEvent) => {
		e.preventDefault();
		const newProduct = {
            id: uuidv4(),
            name,
            purchasePrice: parseInt(purchasePrice),
            sellingPrice: parseInt(sellingPrice),
			quantity: 1
        }
		// @ts-ignore
		if (warehouse.money - purchasePrice < 0) {
			alert('Не хватает денег')
		} else {
			//@ts-ignore
			request("http://localhost:3001/items", "POST", JSON.stringify(newProduct))
			.then(res => console.log(res, 'Отправка успешна'))
			//@ts-ignore
			.then(dispatch(productCreated(newProduct)))
			// @ts-ignore
			.then(purchaseProduct(purchasePrice))
			// @ts-ignore
			.then(operation(name, 'Добавление товара'))
			.catch(err => console.log(err));

			setName('');
			setPurchasePrice('');
			setSellingPrice('');
		}
	};

	return (
		<div className="app-add-form">
			<h3>Добавьте новый товар</h3>
			<form className="add-form" onSubmit={handleClick}>
				<input
					required
					placeholder="Название"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					required
					type='number'
					placeholder="Цена покупки"
					value={purchasePrice}
					onChange={(e) => setPurchasePrice(e.target.value)}
				/>
				<input
					required
					type='number'
					placeholder="Цена продажи"
					value={sellingPrice}
					onChange={(e) => setSellingPrice(e.target.value)}
				/>
				<button>Добавить</button>
			</form>
		</div>
	);
};

export default AddProductForm;







// const handleClick = async (e: FormEvent) => {
// 	e.preventDefault();
// 	const item = {
// 	  name,
// 	  purchasePrice: parseInt(purchasePrice),
// 	  sellingPrice: parseInt(sellingPrice),
// 	  quantity: 1
// 	};
  
// 	try {
// 	  const response = await request("http://localhost:3001/items?name=" + name);
// 	  const existingItem = response[0];
// 	  if (existingItem) {
// 		item.quantity = existingItem.quantity + 1;
// 		item.id = existingItem.id;
// 		await request(
// 		  `http://localhost:3001/items/${existingItem.id}`,
// 		  "PUT",
// 		  JSON.stringify(item)
// 		);
// 	  } else {
// 		item.id = uuidv4();
// 		await request("http://localhost:3001/items", "POST", JSON.stringify(item));
// 	  }
// 	  dispatch(productCreated(item));
// 	  setName("");
// 	  setPurchasePrice("");
// 	  setSellingPrice("");
// 	} catch (err) {
// 	  console.log(err);
// 	}
//   };