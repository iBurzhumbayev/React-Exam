import { AppHeader, AppNavigation } from '../components';
import { Outlet, useLocation } from 'react-router-dom'

const GeneralPage = () => {
    const location = useLocation();

    console.log({location});

    return (
        <>
            <AppHeader/>
            <AppNavigation/>
            <div className='container'>
                <Outlet/>
            </div>
        </>
    )
}

export default GeneralPage