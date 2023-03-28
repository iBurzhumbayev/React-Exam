import { NavLink } from 'react-router-dom';
import './AppNavigation.scss'

const AppNavigation = () => {
    return (
        <nav className="navigation">
            <NavLink className='navigation__item' to='/'>Информация о складе</NavLink>
            <NavLink className='navigation__item' to='/products'>Товары</NavLink>
            <NavLink className='navigation__item' to='/product-add'>Добавление</NavLink>
            <NavLink className='navigation__item' to='/product-delete'>Удаление</NavLink>
            <NavLink className='navigation__item' to='/sale'>Продажа</NavLink>
            <NavLink className='navigation__item' to='/operation'>Операции</NavLink>
        </nav>
    )
}

export default AppNavigation;