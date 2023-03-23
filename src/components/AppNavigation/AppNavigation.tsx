import { NavLink } from 'react-router-dom';
import './AppNavigation.scss'

const AppNavigation = () => {
    return (
        <nav className="navigation">
            <NavLink className='navigation__item' to='/'>Информация о складе</NavLink>
            <NavLink className='navigation__item' to='/products'>Товары</NavLink>
            <NavLink className='navigation__item' to='/product-add'>Добавление товара</NavLink>
            <NavLink className='navigation__item' to='/product-delete'>Удаление товара</NavLink>
        </nav>
    )
}

export default AppNavigation;