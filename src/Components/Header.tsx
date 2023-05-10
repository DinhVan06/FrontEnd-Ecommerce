import React from "react";
import Logo from "../assets/Logo.png";
import Avatar from "../assets/Avatar.png";
import { MdShoppingBasket, MdLogout, MdDensityMedium } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useCarts } from "../hooks/UseCart";
function Header() {
  const [isMenu, setIsMenu] = React.useState<any>(false);

  // redux
  const [{ cartShow }, dispatch] = useStateValue();

  // zustand
  const { items } = useCarts((state) => state);

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  return (
    <div className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-10 object-cover" />
          <p className="text-headingColor text-xl font-bold">Fruit</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li
              className="text-base text-black hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => {
                setIsMenu(false);
              }}
            >
              Trang chủ
            </li>
            <li
              className="text-base text-black hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => {
                setIsMenu(false);
              }}
            >
              Sản phẩm
            </li>
            <li
              className="text-base text-black hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => {
                setIsMenu(false);
              }}
            >
              Về chúng tôi
            </li>
          </motion.ul>

          {/* logo giỏ hàng */}
          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
            {items && items.length > 0 && (
              <div className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {items.length}
                </p>
              </div>
            )}
          </div>

          {/* avatar */}
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={Avatar}
              alt="avatar"
              className="w-10 min-ư-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer"
              onClick={() => {
                setIsMenu(!isMenu);
              }}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 "
              >
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={() => {
                    setIsMenu(false);
                  }}
                >
                  Đăng xuất <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-10 object-cover" />
          <p className="text-headingColor text-xl font-bold">Fruit</p>
        </Link>

        {/* logo giỏ hàng */}
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}
        >
          <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
          {items && items.length > 0 && (
            <div className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">{items.length}</p>
            </div>
          )}
        </div>

        {/* avatar */}
        <div className="relative ml-7">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={Avatar}
            alt="avatar"
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer"
            onClick={() => {
              setIsMenu(!isMenu);
            }}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 "
            >
              <ul className="flex flex-col">
                <li
                  className="text-base text-black hover:text-headingColor hover:bg-slate-200 px-4 py-2 duration-100 transition-all ease-in-out cursor-pointer"
                  onClick={() => {
                    setIsMenu(false);
                  }}
                >
                  Trang chủ
                </li>
                <li
                  className="text-base text-black hover:text-headingColor hover:bg-slate-200 px-4 py-2 duration-100 transition-all ease-in-out cursor-pointer"
                  onClick={() => {
                    setIsMenu(false);
                  }}
                >
                  Sản phẩm
                </li>
                <li
                  className="text-base text-black hover:text-headingColor hover:bg-slate-200 px-4 py-2 duration-100 transition-all ease-in-out cursor-pointer"
                  onClick={() => {
                    setIsMenu(false);
                  }}
                >
                  Về chúng tôi
                </li>
              </ul>
              <p
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-blue-600 text-base font-bold bg-gray-200"
                onClick={() => {
                  setIsMenu(false);
                }}
              >
                Đăng xuất <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
