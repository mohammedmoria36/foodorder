import { createSlice } from '@reduxjs/toolkit';
import data from '../../data';

const productSlice = createSlice({
    name: 'prods',
    initialState: { data: data, cart: [], isCheckout: false },
    reducers: {
        setData: function (state, action) {
            console.log(state, action, 'state, action')

            return {
                ...state,
                data: action.payload
            }
        },
        setCart: function (state, action) {
            let cartArr = [];
            Object.keys(state.data).map((key) => {
                for (let index = 0; index < state.data[key]['list'].length; index++) {
                    const element = state.data[key]['list'][index];
                    if (element['isCart']) {
                        cartArr.push(element);
                    }
                }
            })
            console.log(cartArr, 'cartArr')
            console.log(state, 'state, action')
            return {
                ...state,
                cart: cartArr
            };
        },
        setCheckoutAvailable: function (state, action) {
            console.log(state, 'CHECKOUT FUN')
            return {
                ...state,
                isCheckout: action.payload
            }
        }
    },
})

export const { setCart, setData, setCheckoutAvailable } = productSlice.actions;
export default productSlice.reducer;