import React from "react";
import Delivary from "../../assets/delivery.png";
import Herobg from "../../assets/heroBg.png";
import { axiosClient } from "../../libraries/axiosClient";
import { motion } from "framer-motion";
function HomeContainer() {
  const [categories, setCategories] = React.useState<any>([]);
  React.useEffect(() => {
    axiosClient.get("/categories").then((response) => {
      setCategories(response);
    });
  }, []);
  const filteredCategories = categories && categories.slice(0, 4);
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
      id="home"
    >
      <div className="py-4 flex-1 flex flex-col items-start justify-center gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-100 p-2 rounded-full">
          <p className="text-base text-orange-500 font-semibold">Giao hàng</p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={Delivary}
              alt="delivery"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          Giao hàng nhanh hơn trong{" "}
          <span className="text-orange-600 text-[3rem] lg:text-[5rem]">
            Thành phố của bạn
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto
          aliquam corporis iure culpa praesentium accusamus facilis molestiae
          corrupti, sint fugiat beatae aspernatur rerum natus delectus ratione?
          Velit eaque quisquam asperiores.
        </p>
        <button
          type="button"
          className="text-white font-bold bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          ĐẶT HÀNG NGAY BAY GIỜ
        </button>
      </div>
      <div className="p-4 flex-1 flex items-center relative">
        <img
          src={Herobg}
          alt="hero-bg"
          className="ml-auto h-420 w-full lg:w-auto lg:h-650"
        />
        <div className="w-full h-full absolute gap-4 flex-wrap top-0 left-0 flex items-center justify-center lg:px-32 py-4">
          {filteredCategories &&
            filteredCategories.map((category: any) => (
              <div
                key={category?._id}
                className="lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  src={"http://localhost:9000" + category?.imageUrl}
                  alt="image"
                  className="w-20 -mt-10 lg:w-40 lg:-mt-20 cursor-pointer lg:h-[120px] h-[100px] object-contain"
                />
                <p className="text-base lg:text-xl font-semibold text-black lg:mt-4 mt-2">
                  {category?.categoryType}
                </p>
                <p className="text-[12px] lg:text-sm text-black font-semibold lg:my-3 my-2">
                  {category?.calories}{" "}
                  <span className="text-red-400">Calo</span>
                </p>
                <p className="text-sm  text-red-500 font-bold">Nổi bật</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default HomeContainer;
