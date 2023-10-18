import { FaStoreAlt, FaSearch } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useProductsStore } from "@/store/productsStore";
import ProductCard from "../subcomp/ProductCard";
import StarGenerator from "@/utils/StarGenerator";
import { useSearchParams } from "react-router-dom";
import { filterByName } from "@/utils/filterByName";
import { filterByRating } from "@/utils/filterByRating";
import { useState } from "react";
import { filterByPriceRange } from "@/utils/filterByPriceRange";
function Products() {
  const [query, setQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [priceRangeError, setPriceRangeError] = useState("");
  const products = useProductsStore((state) => state.products);

  // url params
  const [searchParams, setSearchParams] = useSearchParams();
  const productName = searchParams.get("name");
  const rating = searchParams.get("rating");
  const min = searchParams.get("min");
  const max = searchParams.get("max");

  // filtering
  const filteredByPrice = filterByPriceRange(products, min, max);
  const filteredByRating = filterByRating(filteredByPrice, rating);
  const filteredByNameProducts = filterByName(filteredByRating, productName);
  const filteredProduct = filteredByNameProducts?.map((product) => {
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

  // fns
  function handleClickSearch(param) {
    setSearchParams((state) => {
      if (!param) {
        state.delete("name");
        setQuery("");
      } else {
        state.set("name", param);
      }
      return state;
    });
  }

  function handleClickRating(type, value) {
    setSearchParams((state) => {
      if (!value || value === 1) {
        state.delete(type);
      } else {
        state.set(type, value);
      }
      return state;
    });
  }

  function handleClickPriceRange(min, max) {
    const hasError = priceRangeChecker(min, max);
    // if there's no error
    if (!hasError) {
      // if min or max has val, if both has values,
      setSearchParams((state) => {
        if (!min && !max) {
          state.delete("min");
          state.delete("max");
        } else if (!min && max) {
          state.delete("min");
          state.set("max", max);
        } else if (min && !max) {
          state.set("min", min);
          state.delete("max");
        } else {
          state.set("min", min);
          state.set("max", max);
        }
        return state;
      });
    }
  }

  function priceRangeChecker(min, max) {
    if (min < 0) {
      setPriceRangeError("Minimum price is less than 0");
      setSearchParams((state) => state.delete("min"));
      return true;
    }
    if ((max && max <= min) || max < 0) {
      setPriceRangeError("Maximum price is less than or equal to minimum");
      setSearchParams((state) => state.delete("min"));
      return true;
    }
    setPriceRangeError("");
    return false;
  }

  return (
    <div className="md:my-4 grid grid-cols-5">
      <div className="md:my-4 hidden lg:inline col-span-1 p-4">
        {/* rating */}
        <div className="text-xl">
          <p className="font-semibold">Rating</p>
          <RadioGroup defaultValue="star1">
            <div
              className="flex items-center space-x-2"
              onClick={() => handleClickRating("rating", 1)}
            >
              <RadioGroupItem value="star1" id="star1" />
              <Label className="w-full text-lg" htmlFor="star1">
                <StarGenerator num={1} />
              </Label>
            </div>
            <div
              className="flex items-center space-x-2"
              onClick={() => handleClickRating("rating", 2)}
            >
              <RadioGroupItem value="star2" id="star2" />
              <Label className="w-full text-lg " htmlFor="star2">
                <StarGenerator num={2} />
              </Label>
            </div>
            <div
              className="flex items-center space-x-2"
              onClick={() => handleClickRating("rating", 3)}
            >
              <RadioGroupItem value="star3" id="star3" />
              <Label className="w-full text-lg" htmlFor="star3">
                <StarGenerator num={3} />
              </Label>
            </div>
            <div
              className="flex items-center space-x-2"
              onClick={() => handleClickRating("rating", 4)}
            >
              <RadioGroupItem value="star4" id="star4" />
              <Label className="w-full text-lg" htmlFor="star4">
                <StarGenerator num={4} />
              </Label>
            </div>
            <div
              className="flex items-center space-x-2"
              onClick={() => handleClickRating("rating", 5)}
            >
              <RadioGroupItem value="star5" id="star5" />
              <Label className="w-full text-lg" htmlFor="star5">
                <StarGenerator num={5} />
              </Label>
            </div>
          </RadioGroup>
        </div>
        <Separator className="my-4" />
        {/* price range */}
        <div className="text-xl">
          <p className="font-semibold">Price Range</p>
          <div className="flex items-center gap-2 mt-5">
            <input
              type="number"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={priceRange.min}
              onChange={(e) => {
                setPriceRange((pr) => ({ ...pr, min: e.target.value }));
              }}
              placeholder="min"
              min={0}
            />
            <Separator className="w-2" />
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              type="number"
              value={priceRange.max}
              onChange={(e) => {
                setPriceRange((pr) => ({ ...pr, max: e.target.value }));
              }}
              placeholder="max"
            />
          </div>
          {priceRangeError && (
            <p className="text-red-500 text-xs mb-5">{priceRangeError}</p>
          )}
        </div>
        <div className="flex justify-center mt-2">
          <Button
            className="px-8"
            onClick={() => {
              handleClickPriceRange(priceRange.min || 0, priceRange.max);
            }}
          >
            Apply
          </Button>
        </div>
      </div>
      <div className="col-span-5 lg:col-span-4 p-4">
        <div className="flex flex-row justify-center">
          {/* search */}
          <div className="flex max-w-sm items-center space-x-2 my-4 md:m-0">
            <input
              type="text"
              placeholder="Search by name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 space-x-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              onClick={() => handleClickSearch(query)}
            >
              <FaSearch />
              <p>Search</p>
            </button>
            {productName && (
              <button
                type="submit"
                className="text-primary underline-offset-4 hover:underline h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 space-x-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                onClick={() => handleClickSearch(null)}
              >
                <p>Clear</p>
              </button>
            )}
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-4 lg:grid-cols-3 gap-10 mx-auto place-items-center text-[#0B0033]">
          {filteredProduct.length >= 1 && filteredProduct}
        </div>
        {filteredProduct < 1 && (
          <div class="grid mt-10 px-4 bg-white place-content-center">
            <h1 class="tracking-widest text-gray-800 uppercase">
              No shoes matched your filters
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
