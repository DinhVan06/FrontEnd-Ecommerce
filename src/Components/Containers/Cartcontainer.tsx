import { useState, useEffect } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { useCarts } from "../../hooks/UseCart";
import EmptyCart from "../../assets/emptyCart.svg";
type Props = {};

function Cartcontainer({}: Props) {
  const { items, increase, decrease, removeAll, remove } = useCarts(
    (state) => state
  );

  const [{ cartShow }, dispatch] = useStateValue();

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  // total cart
  const totalCart = items.reduce((total: any, item: any) => {
    return total + item.product.total * item.quantity;
  }, 0);
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-[400px] h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-black text-3xl" />
        </motion.div>
        <p className="text-black text-xl font-semibold">Giỏ hàng</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-black text-base"
          onClick={() => {
            removeAll();
          }}
        >
          Xóa <RiRefreshFill />
        </motion.p>
      </div>
      {/* bottom section */}
      {items && items.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* Cart items section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cart item */}
            {items &&
              items.map((item: any) => {
                const itemCart = item.product;
                return (
                  <div
                    key={itemCart?._id}
                    className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2"
                  >
                    <img
                      src={"http://localhost:9000" + itemCart?.imageUrl}
                      alt=""
                      className="w-20 h-20 max-x-[60px] rounded-full object-contain"
                    />
                    {/* name section */}
                    <div className="flex flex-col gap-2">
                      <p className="text-base text-gray-50">{itemCart.name}</p>
                      <div className="text-sm block text-gray-300 font-semibold">
                        {itemCart.discount === 0 ? (
                          <div>
                            {itemCart.total * item.quantity}{" "}
                            <span className="text-blue-400">VNĐ</span>
                          </div>
                        ) : (
                          <div className="">
                            <p
                              className={`${
                                itemCart.discount ? "line-through" : ""
                              } `}
                            >
                              {itemCart.price * item.quantity}{" "}
                              <span className="text-blue-400">VNĐ</span>
                            </p>
                            <p>
                              <span className="">
                                {itemCart.total * item.quantity}
                              </span>
                              <span className="text-blue-400 ml-2">VNĐ</span>
                              <span className="text-red-500 ml-2">
                                {itemCart.discount
                                  ? "-" + itemCart.discount + "%"
                                  : ""}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* button section */}
                    <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                      <motion.div
                        whileTap={{ scale: 0.75 }}
                        className=""
                        onClick={() => {
                          decrease(itemCart._id);
                        }}
                      >
                        <BiMinus className="text-gray-50" />
                      </motion.div>

                      <p className="w-5 h-5 rounded-sm bg-cartBg text-orange-500 flex items-center justify-center">
                        {item.quantity}
                      </p>

                      <motion.div
                        whileTap={{ scale: 0.75 }}
                        className=""
                        onClick={() => {
                          increase(itemCart._id);
                        }}
                      >
                        <BiPlus className="text-gray-50" />
                      </motion.div>
                      <div
                        className="text-white cursor-pointer items-stretch"
                        onClick={() => {
                          remove(itemCart._id);
                        }}
                      >
                        Xóa
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* cart total section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Tổng phụ</p>
              <p className="text-gray-400 text-lg">{totalCart} VNĐ</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Vận chuyển</p>
              <p className="text-gray-400 text-lg">20000 VNĐ</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Tổng</p>
              <p className="text-gray-200 text-xl font-semibold">
                {totalCart + 20000} VNĐ
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.8 }}
              type="button"
              className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-in-out"
            >
              Thanh toán
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} alt="image" className="w-300" />
          <p className="text-xl text-black font-semibold">
            Thêm sản phẩm vào giỏ hàng của bạn
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default Cartcontainer;
