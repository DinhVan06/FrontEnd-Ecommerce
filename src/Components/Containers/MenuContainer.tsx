import { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { axiosClient } from "../../libraries/axiosClient";
import { motion } from "framer-motion";
import { RowContainer } from "..";
interface IData {
  flag: boolean;
  scrollValue: number;
  data: Array<object>;
}
function MenuContainer() {
  const [categories, setCategories] = useState<any>([]);
  const [filter, setFilter] = useState<any>("Món ăn");
  const [products, setProducts] = useState<Array<IData>>([]);
  // get data products
  useEffect(() => {
    axiosClient.get("/products").then((response: any) => {
      setProducts(response);
    });
  }, []);

  // get data categories
  useEffect(() => {
    axiosClient.get("/categories").then((response) => {
      setCategories(response);
    });
  }, []);
  return (
    <section className="w-full my-6" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p
          className="md:text-2xl text-xl font-semibold capitalize text-headingColor 
            relative before:absolute before:rounded-lg before:content before:w-24 md:before:w-28
            before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out 
            duration-100 mr-auto"
        >
          Danh mục
        </p>
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((category: any) => {
              return (
                <motion.div
                  whileTap={{ scale: 0.4 }}
                  key={category?._id}
                  className={`group ${
                    filter === category?.categoryType ? "bg-red-600" : "bg-card"
                  } w-28 min-w-[94px] h-32 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center 
                  justify-center duration-100 transition-all ease-in-out hover:bg-red-600`}
                  onClick={() => {
                    setFilter(category?.categoryType);
                  }}
                >
                  <div
                    className={`w-10 h-10 rounded-full ${
                      filter === category?.categoryType
                        ? "bg-white"
                        : "bg-red-600"
                    } group-hover:bg-white 
                  flex items-center justify-center`}
                  >
                    <IoFastFood
                      className={`${
                        filter === category?.categoryType
                          ? "text-black"
                          : "text-white"
                      } group-hover:text-black text-lg`}
                    />
                  </div>
                  <p
                    className={`md:text-sm text-xs ${
                      filter === category?.categoryType
                        ? "text-white"
                        : "text-black"
                    } group-hover:text-white`}
                  >
                    {category?.categoryType}
                  </p>
                </motion.div>
              );
            })}
        </div>
        <div className="w-full">
          <RowContainer
            flag={false}
            scrollValue={0}
            data={products?.filter(
              (n: any) => n?.category.categoryType == filter
            )}
          />
        </div>
      </div>
    </section>
  );
}

export default MenuContainer;
