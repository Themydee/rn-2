import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₦'
    const packaging_fee = '2000'
    const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:8000'
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [shippingFee, setShippingFee] = useState(0)
    const [location, setLocation] = useState('')
    const navigate = useNavigate();
    const [products, setProducts] = useState([])
    const [token, setToken] = useState("")

    const shippingFeesByLocation = {
        'Lagos': 5000,
        'Abuja': 3000,
        'Igbo States': 5000,
    }


    const getCartCount = () => {
        let totalCount = 0
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalCount
    }

    const getUserCart = async(token) => {
        try {
            const response = await axios.post(serverUrl + '/api/cart/get', {}, {headers: {
                Authorization: `Bearer ${token}`,
            }})

            if (response.data.success) {
                setCartItems(response.data.cartData)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error('Error fetching user cart:', error);
            const errorMessage = error.response?.data?.message || 'Failed to fetch cart';
            toast.error(errorMessage);
        }
    };

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'));
        }
    },[]);



    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;
        setCartItems(cartData)

        try {
            const response = await axios.post(serverUrl + '/api/cart/update', {itemId, size, quantity}, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if(response.data.success){
                setCartItems(response.data.cartData);
                toast.success('Cart Updated Successfully');

            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            const errorMessage = error.response?.data?.message || 'Failed to add item to cart';
            toast.error(errorMessage);
        }
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(serverUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.product)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData();
    }, [])


    const getCartAmount = () => {
        let totalAmount = 0
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {

                }
            }

        }
        return totalAmount
    }

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Please select a product size')
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

        try {
           const response = await axios.post(serverUrl + '/api/cart/add', {itemId, size}, { headers: {
            Authorization: `Bearer ${token}`,
           }});

           if (response.data.success) {
            toast.success('Item added to cart successfully');
           }else{
            toast.error(response.data.message);
           }
        } catch (error) {
            console.error('Error adding to cart:', error);
            const errorMessage = error.response?.data?.message || 'Failed to add item to cart';
            toast.error(errorMessage);
        }
    }


    useEffect(() => {
        if (location) {
            setShippingFee(shippingFeesByLocation[location] || shippingFeesByLocation['default']);
        }
    }, [location]);


    const value = {
        products,
        currency,
        packaging_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        location,
        setLocation,
        shippingFee,
        navigate,
        serverUrl,
        setToken,
        token,
        setCartItems
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider