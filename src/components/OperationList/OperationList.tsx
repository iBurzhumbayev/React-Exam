import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { IProduct } from '../../types';
import { fetchOperation } from '../../slices/operationSlice';


const OperationList = () => {
    const dispatch = useDispatch();
    const operation = useSelector((state: RootState) => state.operation.items);

    console.log(operation)
    useEffect(() => {
        //@ts-ignore
        dispatch(fetchOperation())
    }, [])
   
    if (operation.length === 0) {
        return (
            <ul className='products'>
                <li className='products__item'>
                    <p>Товаров пока нет...</p>
                </li>
            </ul>
        )
    }

    const convertTime = (dateTime:string) => {
                
        let date = new Date(dateTime);
        let day = date.getDate();
        let month = date.getMonth();
        let months = ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"];
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        //@ts-ignore
        minutes = (minutes < 10 ? '0' : '') + minutes;
        //@ts-ignore
        seconds = (seconds < 10 ? '0' : '') + seconds;


        return `${day} ${months[month]} ${year} в ${hours}:${minutes}:${seconds}`;
    }

    return (

        <ul className='products'>
            <li className='products__item'>
                <p style={{textAlign: 'center'}} className='products__item-title'>Название товара</p>
                <p style={{textAlign: 'center'}} className='products__item-title'>Операция</p>
                <p style={{textAlign: 'center'}} className='products__item-title'>Время</p>
            </li>
            {operation.map((operation: any) => (
                <li className='products__item'>
                    <p style={{textAlign: 'center'}}>{operation.nameProduct}</p>
                    <p style={{textAlign: 'center'}}>{operation.name}</p>
                    <p style={{textAlign: 'center'}}>{convertTime(operation.date)}</p>
                </li>
             ))}
        </ul>

    )
   
};

export default OperationList;
