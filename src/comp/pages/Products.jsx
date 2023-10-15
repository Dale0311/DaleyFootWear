import { FaStoreAlt, FaSearch } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useProductsStore } from "@/store/productsStore";
import ProductCard from "../subcomp/ProductCard";
import StarGenerator from "@/utils/StarGenerator";
function Products() {
  const products = useProductsStore((state) => state.products);
  const filteredProduct = products.map((product) => {
    return (
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
    );
  });
  return (
    <div className="my-20 flex p-4">
      <div className="my-20 mx-4 w-8/12 hidden lg:inline">
        {/* rating */}
        <div className="text-xl">
          <p className="font-semibold">Rating</p>
          <RadioGroup defaultValue="star3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="star1" id="star1" />
              <Label className="w-full text-lg" htmlFor="star1">
                <StarGenerator num={1} />
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="star2" id="star2" />
              <Label className="w-full text-lg " htmlFor="star2">
                <StarGenerator num={2} />
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="star3" id="star3" />
              <Label className="w-full text-lg" htmlFor="star3">
                <StarGenerator num={3} />
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="star4" id="star4" />
              <Label className="w-full text-lg" htmlFor="star4">
                <StarGenerator num={4} />
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="star5" id="star5" />
              <Label className="w-full text-lg" htmlFor="star5">
                <StarGenerator num={5} />
              </Label>
            </div>
          </RadioGroup>
        </div>
        <Separator className="my-4" />
        {/* price range */}
        <div className="text-xl ">
          <p className="font-semibold">Price Range</p>
          <div className="grid grid-cols-5 place-items-center gap-2 my-5">
            <Input type="number" className="col-span-2" placeholder="min" />
            <Separator />
            <Input type="number" className="col-span-2" placeholder="max" />
          </div>
        </div>
        <Button>Apply</Button>
      </div>

      <div>
        <div className="flex justify-between space-x-8">
          <div className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 flex space-x-2">
            <p>Products</p> <FaStoreAlt />
          </div>
          {/* search */}
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Search by name..." />
            <Button type="submit" className="space-x-2">
              <FaSearch />
              <p>Search</p>
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-4 lg:grid-cols-3 gap-10 mx-auto place-items-center text-[#0B0033]">
          {filteredProduct}
        </div>
      </div>
    </div>
  );
}

export default Products;
