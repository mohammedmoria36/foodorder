import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Nav() {
    const navigate = useNavigate();
    const cartList = useSelector((state) => state.prods.cart);

    return (
        <nav className="my-nav navbar navbar-expand-lg bg-light w-100 position-fixed">
            <div className="container">
                <a className="navbar-brand" href="#">Foody</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => navigate('/products')} style={{ cursor: 'pointer' }}>Products</a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li> */}
                    </ul>
                    {cartList.length !== 0 &&
                        <span className="navbar-text" onClick={() => navigate('/checkout')} style={{ cursor: 'pointer' }}>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </span>
                    }
                </div>
            </div>
        </nav>
    );
}

export default Nav;