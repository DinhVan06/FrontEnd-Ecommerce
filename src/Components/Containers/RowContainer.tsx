import React from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { json } from "react-router-dom";
import { useCarts } from "../../hooks/UseCart";
interface Props {
  flag: boolean;
  scrollValue: number;
  data: Array<object>;
}
interface CartItems {
  product: Array<object>;
  quantity: number;
}
function RowContainer({ flag, scrollValue, data }: Props) {
  const rowContainer = React.useRef<HTMLDivElement>(null);

  // add to cart
  // const [items, setItems] = React.useState<any>([]);
  // const [{ cartItems }, dispatch] = useStateValue();
  // const addToCart = () => {
  //   dispatch({ type: actionType.SET_CARTITEMS });
  //   cartItems: items;
  //   localStorage.setItem("cartItems", JSON.stringify(items));
  // };
  // React.useEffect(() => {
  //   addToCart();
  // }, [items]);
  const { add } = useCarts((state) => state);

  React.useEffect(() => {
    if (rowContainer.current) {
      rowContainer.current.scrollLeft += scrollValue;
    }
  }, [scrollValue]);
  return (
    <div
      ref={rowContainer}
      className={`w-full my-12 flex items-center gap-3 scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data &&
        data.map((item: any) => {
          const Cart: CartItems = { product: item, quantity: 1 };
          return (
            <div
              key={item?._id}
              className="w-300 md:w-330 min-w-[300px] md:min-w-[340px] h-auto my-12 bg-cardOverlay shadow-lg p-2 
                backdrop-blur-lg hover:drop-shadow-lg rounded-lg"
            >
              <div className="w-full h-8 flex items-center justify-start text-red-500 rounded-lg text-lg">
                {item.discount ? `-${item.discount}%` : ""}
              </div>
              <div className="w-full flex items-center justify-between">
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  src={"http://localhost:9000" + item?.imageUrl}
                  alt="image"
                  className="w-40 lg:h-40 h-[100px] -mt-8 cursor-pointer 
                  drop-shadow-2xl object-contain"
                />

                <motion.div
                  whileTap={{ scale: 0.75 }}
                  className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center
            cursor-pointer hover:shadow-lg"
                  onClick={() => {
                    add(Cart);
                  }}
                >
                  <MdShoppingBasket className="text-white" />
                </motion.div>
              </div>
              <div className="w-full flex flex-col items-end justify-end">
                <p className="text-textColor font-semibold text-base md:text-lg">
                  {item?.name}
                </p>
                <p className="mt-1 text-sm text-gray-500">{item?.unit}</p>
                <div className="flex items-center gap-8">
                  <p className="text-ls text-headingColor font-semibold">
                    {item?.price}
                    <span className="ml-1 text-sm text-red-500">VNĐ</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default RowContainer;
