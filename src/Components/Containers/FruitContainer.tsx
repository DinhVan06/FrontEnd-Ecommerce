import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { axiosClient } from "../../libraries/axiosClient";
import { useStateValue } from "../../context/StateProvider";
import { RowContainer } from "..";
interface IData {
  flag: boolean;
  scrollValue: number;
  data: [product: Array<object>, quantity: 1];
}

function FruitContainer() {
  const [products, setProducts] = useState<Array<IData>>([]);
  const [scrollValue, setScrollValue] = useState<any>(0);

  const [{ cartShow }, dispatch] = useStateValue();

  useEffect(() => {}, [scrollValue, cartShow]);
  // get data products
  useEffect(() => {
    axiosClient.get("/products").then((response: any) => {
      setProducts(response);
    });
  }, []);
  return (
    <div className="fruit">
      <div className="w-full flex items-center justify-between">
        <p
          className="md:text-2xl text-xl font-semibold capitalize text-headingColor 
    relative before:absolute before:rounded-lg before:content before:w-[305px] lg:before:w-[368px]
    before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out 
    duration-100"
        >
          Trái cây tươi & tốt cho sức khỏe
        </p>
        <div className="hidden md:flex gap-3 items-center ">
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer 
      transition-all duration-100 ease-in-out hover:shadow-lg flex
      items-center justify-center"
            onClick={() => setScrollValue(-200)}
          >
            <MdChevronLeft className="text-lg text-white" />
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer 
      transition-all duration-100 ease-in-out hover:shadow-lg flex
      items-center justify-center"
            onClick={() => setScrollValue(200)}
          >
            <MdChevronRight className="text-lg text-white" />
          </motion.div>
        </div>
      </div>
      <RowContainer
        scrollValue={scrollValue}
        flag={true}
        data={products?.filter(
          (n: any) => n?.category.categoryType === "Trái cây"
        )}
      />
    </div>
  );
}

export default FruitContainer;
