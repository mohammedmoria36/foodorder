import Nav from "../nav/Nav";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setCart, setData, setCheckoutAvailable } from '../../features/products/produtsSlice';
import { useNavigate } from 'react-router-dom';

function Products() {
    const dataList = useSelector((state) => state.prods);
    const data = useSelector((state) => state.prods.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(dataList, 'DATA')
    console.log(data, 'DATA>>>>>>')


    let setDataList = (value) => {
        console.log(value)
        let innerdata = JSON.parse(JSON.stringify(data));
        innerdata[value['category']]['list'].forEach(element => {
            console.log(element, 'EEE')
            if (value.category === element.category) {
                if (value.id === element.id) {
                    element['isCart'] = true;
                    element['count'] = 1;
                }
            }
        });

        isCheckOutBtnPresent(innerdata)
        dispatch(setData(innerdata));
        dispatch(setCart(innerdata));
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


    let callData = () => {
        return Object.keys(data).map((key) => {
            // console.log(key, 'KEY')
            return (
                <div className="prod-row" key={key}>
                    <h2>{data[key]['name']}</h2>
                    <div className="d-flex mb-4 flex-wrap">
                        {data[key]['list'].map((v, i) => {
                            return (
                                <div key={i}>
                                    <div className="card me-2 mb-2" style={{ width: '18rem' }} key={i}>
                                        <img src={v['imgUrl']} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <div className={`type-sym ${v['veg'] === true ? 'veg' : 'nonveg'}`}><div className="sym"></div> </div>
                                            <h5 className="card-title">{v['name']}</h5>
                                            {v['discription'] && <p className="card-text card-discri">{v['discription']}</p>}
                                            <p className="card-text">₹{v['price']}</p>
                                            {!v['isCart'] && <a className="btn btn-primary cs-btn-primary" onClick={() => setDataList(v)}>ADD +</a>}
                                            {v['isCart'] &&
                                                <div className="d-flex add-prod-btn">
                                                    <button className="" onClick={() => setQuantity(v, 'decri')} >-</button>{' '}<span className="count-sp">{v['count']}</span>{' '}<button className="" onClick={() => setQuantity(v, 'incre')}>+</button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="main-container">
            <Nav />
            <div className="container">
                <h2>Products</h2>
                {dataList.isCheckout && <div className="chk-button"><button onClick={() => navigate('/checkout')}>Checkout</button></div>}
                <div className="prod-list mt-5">
                    {callData()}
                </div>
            </div>
        </div>
    );
}

export default Products;