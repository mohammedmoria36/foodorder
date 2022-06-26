import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Products from './pages/product/products';
import Checkout from './pages/checkout/Checkout';

function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/products' element={<Products />}></Route>
            <Route path='/checkout' element={<Checkout />}></Route>
        </Routes>
    );
}

export default AppRoutes;