
import heroImg from "../../assets/imgs/HeroImg/hero.png";
import { useProductsStore } from "../../store/productsStore";
import { useUserStore } from "@/store/userStore";
import { Link } from "react-router-dom";
import ProductCard from "../subcomp/ProductCard";


function Home() {
  const products = useProductsStore((state) => state.products);
  const featureProducts = products
    ?.filter((product) => product.rating.rate >= 4.2)
    .map((product) => (
      <ProductCard
        key={product.id}
        id={product.id}
        name={product.name}
        img={product.image}
        price={product.price}
        rating={product.rating.rate}
      />
    ));
  const salesProducts = products
    ?.filter((product) => product.isSale)
    .map((product) => (
      <ProductCard
        key={product.id}
        id={product.id}
        name={product.name}
        img={product.image}
        price={product.price}
        discountInfo={product.discountInfo}
        isSale={product.isSale}
        rating={product.rating.rate}
      />
    ));
  return (
    <div>
      {/* hero section */}
      <div className="my-32 md:my-4 py-4 flex flex-col lg:flex-row items-center text-[#0B0033]">
        <div className="flex flex-col items-center space-y-6 max-w-xl">
          <h1 className="scroll-m-20 text-center text-3xl font-extrabold tracking-tight md:text-5xl">
            Discover lit shoes online with a premier shoe sanctuary's digital
            debut.
          </h1>
          <div>
            <p className="text-center text-gray-500">
              Step into a world where every pair is crafted with a perfect blend
              of comfort and style, transforming your daily stride into a
              statement
            </p>
          </div>
          <Link
            to="products"
            className="py-2 px-4 sm:px-8 bg-[#e63946] hover:bg-[#DA1B2B] text-white rounded"
          >
            See Products
          </Link>
        </div>
        <div className="hidden lg:flex justify-center w-2/4">
          <img src={heroImg} className="w-4/5" />
        </div>
      </div>
      <div className="space-y-8">
        {/* Features section */}
        <section className="my-4 space-y-2 p-4 md:p-0">
          <h1 className="scroll-m-20 border-b pb-2 text-xl md:text-4xl font-bold tracking-tight transition-colors first:mt-0">
            Feature Products
          </h1>
          <div className="grid grid-cols-4 lg:grid-cols-3 gap-10 mx-auto place-items-center text-[#0B0033]">
            {featureProducts}
          </div>
        </section>

        {/* Sales section */}
        <section className="my-4 space-y-2 p-4 md:p-0">
          <h1 className="scroll-m-20 border-b pb-2 text-xl sm:text-4xl font-bold tracking-tight transition-colors first:mt-0">
            Sale <span className="text-[#E63746]">Sale</span> Sale !!
          </h1>
          <div className="grid grid-cols-4 lg:grid-cols-3 gap-10 mx-auto place-items-center text-[#0B0033]">
            {salesProducts}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
