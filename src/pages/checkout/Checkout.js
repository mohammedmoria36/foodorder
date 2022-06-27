import { useSelector, useDispatch } from 'react-redux';
import { setCart, setData, setCheckoutAvailable } from '../../features/products/produtsSlice';
import { useNavigate } from 'react-router-dom';
import Nav from "../nav/Nav";
import sucIcon from '../../shared/images/success_tick_icon.png';
import { useState } from 'react';


function Checkout() {
    const cartList = useSelector((state) => state.prods.cart);
    const data = useSelector((state) => state.prods.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPayed, setShowPayed] = useState(false);

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

    let payAmount = () => {
        let innerdata = JSON.parse(JSON.stringify(data));
        Object.keys(innerdata).map((key) => {
            for (let index = 0; index < innerdata[key]['list'].length; index++) {
                const element = innerdata[key]['list'][index];
                element['isCart'] = false;
            }
        })
        console.log(innerdata, 'INERR')
        setShowPayed(true);
        dispatch(setCheckoutAvailable(false));
        dispatch(setData(innerdata));
        dispatch(setCart(innerdata));
    }

    return (
        <div className="main-container">
            <Nav />
            {cartList?.length === 0 &&
                <div className="d-flex text-center chk-container chk1-button justify-content-center align-item-center">
                    {/* <div className='suc-icon'><img src={sucIcon} alt="..."/></div> */}
                    {showPayed === true && <h1 className='mb-5'>Your Order is Successfully Placed</h1>}
                    <button onClick={() => navigate('/products')}>Back to products</button>
                </div>
            }

            {cartList?.length !== 0 && <div className="container chk-container">
                <h2>Checkout</h2>
                {/* <div className='row mt-5 chk-header-row'>
                    <div className='col-6'>Dish</div>
                    <div className='col-1'>Amount</div>
                    <div className='col-3'>No of Dish</div>
                    <div className='col-1'>Amount per Dish</div>
                </div> */}
                <div className='table-responsive-xl'>
                    <table className="mt-5 table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Dish</th>
                                <th scope="col">Amount</th>
                                <th scope="col">No of Dish</th>
                                <th scope="col">Amount per Dish</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartList.map((v, i) => {
                                return (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>
                                            <div className='d-flex'>
                                                <div className='cat-img'><img src={v['imgUrl']}></img></div>
                                                <div className='d-flex flex-column'>
                                                    <h3 className='cat-title'>{v['name']}</h3>
                                                    {v['discription'] && <p className='cat-descri'>{v['discription']}</p>}
                                                </div>
                                            </div>
                                        </td>
                                        <td>{v['price']} {' X '} {v['count']}</td>
                                        <td>
                                            <div className="d-flex add-prod-btn">
                                                <button className="" onClick={() => setQuantity(v, 'decri')} >-</button>{' '}<span className="count-sp">{v['count']}</span>{' '}<button className="" onClick={() => setQuantity(v, 'incre')}>+</button>
                                            </div>
                                        </td>
                                        <td>{v['price'] * v['count']}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {/* {cartList.map((v, i) => {
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
                })} */}
                <div className='my-5 d-flex justify-content-end'>
                    <h1>Total:- {showFinalAmount()}</h1>
                    <button className='cs-btn-primary ms-3' style={{
                        width: '100px',
                        height: '45px'
                    }} onClick={() => payAmount()}>Pay</button>
                </div>
            </div>}
            <div className='container'>
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <p className="col-md-4 mb-0 text-muted">Foody © 2022 Company, Inc</p>

                    <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">

                    </a>

                    <ul className="nav col-md-4 justify-content-end">
                        <li className="nav-item"><a style={{ cursor: 'pointer' }} onClick={() => navigate('/')} className="nav-link px-2 text-muted">Home</a></li>
                        <li className="nav-item"><a style={{ cursor: 'pointer' }} onClick={() => navigate('/products')} className="nav-link px-2 text-muted">Products</a></li>
                    </ul>
                </footer>
            </div>
        </div >
    );
}

export default Checkout;