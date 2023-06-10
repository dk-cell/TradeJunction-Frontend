import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { cartReducer } from "./reducers/cart";
import { wishlistReducer } from "./reducers/wishlist";
import { orderReducer } from "./reducers/order";
import {adminReducer} from "./reducers/admin"

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products:productReducer,
    events:eventReducer,
    carts:cartReducer,
    wishlists:wishlistReducer,
    orders:orderReducer,
    admin:adminReducer
  },
});

export default Store;
