import { useSelector, useDispatch } from 'react-redux';
import { setCart, setData,setCheckoutAvailable } from '../../features/products/produtsSlice';
import { useNavigate } from 'react-router-dom';
import Nav from "../nav/Nav";
import sucIcon from '../../shared/images/success_tick_icon.png';


function Checkout() {
    const cartList = useSelector((state) => state.prods.cart);
    const data = useSelector((state) => state.prods.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let showFinalAmount = () => {
        let totalAmount = cartList.reduce((acc, crr) => {
            acc = acc + (crr['price'] * crr['count']);
            console.log(crr, 'CRR', acc)
            return acc;
        }, 0)
        console.log(totalAmount, 'TTT')
        return totalAmount;
    }

    let setQuantity = (value, type) => {
        let obj = Object.assign({}, value);

        if (obj.count > 0) {
            if (type === 'incre') {
                obj['count'] += 1;
            }
            if (type === 'decri') {
                obj['count'] -= 1;
            }
            if (obj['count'] === 0) {
                obj['isCart'] = false;
            }
        }
        let innerdata = JSON.parse(JSON.stringify(data));
        let objIndex = innerdata[obj['category']]['list'].findIndex((val => val.id == obj.id));
        innerdata[obj['category']]['list'][objIndex] = obj;

        isCheckOutBtnPresent(innerdata)
        dispatch(setData(innerdata));
        dispatch(setCart(innerdata));

        console.log(cartList.length, 'Cart')

    }

    let isCheckOutBtnPresent = (innerdata) => {
        let ischeckoutPresent = false;
        Object.keys(innerdata).map((key) => {
            for (let index = 0; index < innerdata[key]['list'].length; index++) {
                const element = innerdata[key]['list'][index];
                if (element['isCart']) {
                    ischeckoutPresent = true;
                    break;
                }
            }
        })
        dispatch(setCheckoutAvailable(ischeckoutPresent))
    }

    return (
        <div className="main-container">
            <Nav />
            {cartList?.length === 0 &&
                <div className="d-flex chk-container chk1-button justify-content-center align-item-center">
                    {/* <div className='suc-icon'><img src={sucIcon} alt="..."/></div> */}
                    <button className='' onClick={() => navigate('/products')}>Back to products</button>
                </div>
            }
            {cartList?.length !== 0 && <div className="container chk-container">
                <h2>Checkout</h2>
                <div className='row mt-5 chk-header-row'>
                    <div className='col-6'>Dish</div>
                    <div className='col-1'>Amount</div>
                    <div className='col-3'>No of Dish</div>
                    <div className='col-1'>Amount per Dish</div>
                </div>
                {cartList.map((v, i) => {
                    return (
                        <div className='row chk-row' key={i}>
                            <div className='col-6'>
                                <div className='d-flex'>
                                    <div className='cat-img'><img src={v['imgUrl']}></img></div>
                                    <div className='d-flex flex-column'>
                                        <h3 className='cat-title'>{v['name']}</h3>
                                        {v['discription'] && <p className='cat-descri'>{v['discription']}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className='col-1'>{v['price']} {' X '} {v['count']}</div>
                            {v['isCart'] &&
                                <div className='col-3'>
                                    <div className="d-flex add-prod-btn">
                                        <button className="" onClick={() => setQuantity(v, 'decri')} >-</button>{' '}<span className="count-sp">{v['count']}</span>{' '}<button className="" onClick={() => setQuantity(v, 'incre')}>+</button>
                                    </div>
                                </div>
                            }

                            <div className='col-1'>{v['price'] * v['count']}</div>
                        </div>
                    )
                })}
                <div className='my-5 d-flex justify-content-end'>
                    <h1>SubTotal:- {showFinalAmount()}</h1>
                </div>
            </div>}
            <div className='container'>
                    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                        <p class="col-md-4 mb-0 text-muted">Foody © 2022 Company, Inc</p>

                        <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">

                        </a>

                        <ul class="nav col-md-4 justify-content-end">
                            <li class="nav-item"><a style={{cursor:'pointer'}} onClick={() => navigate('/')} class="nav-link px-2 text-muted">Home</a></li>
                            <li class="nav-item"><a style={{cursor:'pointer'}} onClick={() => navigate('/products')} class="nav-link px-2 text-muted">Products</a></li>
                        </ul>
                    </footer>
                </div>
        </div>
    );
}

export default Checkout;