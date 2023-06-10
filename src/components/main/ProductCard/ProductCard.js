import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../style/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { backendUrl } from "../../../constant";
import { addTocart } from "../../../redux/actions/cart";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import Ratings from "../../Product/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { cart } = useSelector((state) => state.carts);
  const { wishlist } = useSelector((state) => state.wishlists);
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const name = data.name;

  useEffect(() => {
    const isItemExist = wishlist && wishlist.find((i) => i._id == data._id);
    if (isItemExist) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [click]);

  const handleAddToCart = (id) => {
    const isItemExist = cart && cart.find((i) => i._id == id);
    if (isItemExist) {
      toast.error("Item is already in Cart!");
    } else {
      if (data.stock >= 1) {
        dispatch(addTocart(data));
        toast.success("Item added successfully!");
      } else {
        toast.error("stocks not available!");
      }
    }
  };

  const handleWishlist = (id) => {
    if (!click) {

      dispatch(addToWishlist(data));
      toast.success("Item added to wishlist successfully!");
    } else {
      dispatch(removeFromWishlist(data));
      toast.success("Item removed from wishlist successfully!");
      // setClick(!click);
    }
    setClick(!click);
  };
  // const productName = name.replace(/\s+/g, "-");
  return (
    <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer ">
      <div className="flex justify-end"></div>
      <Link
        to={`${
          isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`
        }`}
      >
        <img
          src={`${backendUrl}${data.images && data.images[0]}`}
          alt=""
          className="w-full h-[170px] object-contain"
        />
      </Link>
      <Link to={`/shop/preview/${data?.shop._id}`}>
        <h5 className={`${styles.shop_name}`}>{data?.shop.name}</h5>
      </Link>
      <Link
        to={`${
          isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`
        }`}
      >
        <h4 className="pb-3 font-[500]">
          {data.name.length > 35 ? data.name.slice(0, 35) + "..." : data.name}
        </h4>
        <div className="flex">
          <Ratings rating={data?.ratings} />
        </div>

        <div className=" py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              {data.originalPrice === 0
                ? data.originalPrice
                : data.discountPrice}
              $
            </h5>
            <h4 className={`${styles.price}`}>
              {data.originalPrice ? data.originalPrice + " $" : null}
            </h4>
          </div>

          <span className="font-[400] text-[17px] text-[#68d284]">
            {data?.sold_out} sold
          </span>
        </div>
      </Link>
      {/* side icon */}
      <div>
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => handleWishlist(data)}
            color={click ? "red" : "#333"}
            title="Remove form wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => handleWishlist(data)}
            color={click ? "red" : "#333"}
            title="Add to wishlist"
          />
        )}

        <AiOutlineEye
          size={22}
          className="cursor-pointer absolute right-2 top-14"
          onClick={() => setOpen(!open)}
          color="#333"
          title="view"
        />
        <AiOutlineShoppingCart
          size={25}
          className="cursor-pointer absolute right-2 top-24"
          onClick={() => handleAddToCart(data._id)}
          color="#444"
          title="add to cart"
        />
        {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
      </div>
    </div>
  );
};

export default ProductCard;
