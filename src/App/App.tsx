import { RouterProvider } from 'react-router-dom'
import router from '../router/router';
import '../style/style.scss'

function App() {

    return (
        <RouterProvider router={router}/>
    )

}

export default App;