import { useEffect } from "react";
import {
  Cartcontainer,
  FruitContainer,
  HomeContainer,
  HotProductsContainer,
  MenuContainer,
} from "..";
import { useStateValue } from "../../context/StateProvider";

function MainContainer() {
  const [{ cartShow }, dispatch] = useStateValue();

  useEffect(() => {}, [cartShow]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      <section className="w-full my-6">
        <HotProductsContainer />
        <FruitContainer />
      </section>
      <MenuContainer />
      {cartShow && <Cartcontainer />}
    </div>
  );
}

export default MainContainer;
