import { useParams, useNavigate } from "react-router-dom";
import { useProductsStore } from "@/store/productsStore";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
function ProductDetails() {
  const { id } = useParams();
  const products = useProductsStore((state) => state.products);
  const [size, setSize] = useState("us9");
  const [quantityError, setQuantityError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const product = products.find((p) => p.id == id);
  const redir = useNavigate();
  if (!product)
    return (
      <div class="grid px-4 bg-white place-content-center">
        <div class="text-center">
          <h1 class="font-black text-gray-400 text-9xl">404</h1>

          <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oh!
          </p>

          <p class="mt-4 text-gray-500">No product with that particular id</p>

          <a
            href="#"
            class="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            Go Back Home
          </a>
        </div>
      </div>
    );
  return (
    <div className="md:grid md:grid-cols-4">
      <div className="md:col-span-2">
        <img
          src={product.image}
          alt={`picture of ${product.name}`}
          className={`${product.id == 31 ? "w-4/6" : ""}`}
        />
      </div>
      <div className=" md:col-span-2 space-y-6 md:space-y-4 p-2">
        <h1 className="sm:text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        {/* price */}
        {product.isSale ? (
          <div className="flex space-x-2 text-[#E63746]">
            <p className="text-sm sm:text-lg text-muted-foreground line-through">
              {`$${product.price}`}
            </p>
            <div className="text-sm sm:text-lg font-semibold flex space-x-2">
              <p>
                $
                {product.price -
                  Math.ceil(product.price * product.discountInfo.discount)}
              </p>
              <Badge>{`${product.discountInfo.discountPercent}% off`}</Badge>
            </div>
          </div>
        ) : (
          <p className="text-sm sm:text-lg font-semibold text-[#E63746]">
            ${product.price}
          </p>
        )}

        {/* sizes */}
        <p>Sizes:</p>
        <RadioGroup
          defaultValue={size}
          className="flex items-center"
          onValueChange={(name) => {
            setSize(name);
          }}
        >
          <div className=" flex items-center space-x-2">
            <RadioGroupItem value="us7" id="r1" />
            <Label htmlFor="r1">US 7</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="us8" id="r2" />
            <Label htmlFor="r2">US 8</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="us9" id="r3" />
            <Label htmlFor="r3">US 9</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="us10" id="r4" />
            <Label htmlFor="r4">US 10</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="us11" id="r5" />
            <Label htmlFor="r5">US 11</Label>
          </div>
        </RadioGroup>
        {/* quantity */}
        <div>
          <Input
            placeholder="Number of items"
            type="number"
            min="1"
            max="100"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="xl:w-1/2 "
          />
          {quantityError && <p>{quantityError}</p>}
        </div>

        {/* buttons */}
        <div className="space-x-4 flex justify-end xl:w-1/2">
          <Button
            variant="link"
            onClick={() => {
              redir(-1);
            }}
          >
            {" "}
            Cancel / Go back
          </Button>
          <Button
            disabled={quantity <= 0 || quantity > 100}
            onClick={() => {
              // sad path
              if (quantity <= 0) {
                setQuantityError("quantity must be atleast 1");
                return;
              } else if (quantity > 100) {
                setQuantityError("quantity must below 100");
                return;
              }

              // happy path
              setQuantityError("");
              // user na here
              console.log({ ...product, size, quantity });
            }}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
