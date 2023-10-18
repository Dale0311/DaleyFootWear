import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
function ProductCard({ id, name, img, price, rating, isSale, discountInfo }) {
  return (
    <Link
      className="col-span-4 sm:col-span-2 lg:col-span-1 hover:drop-shadow-lg transition-shadow ease-in-out delay-1000 group"
      to={`/products/${id}`}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            <img
              src={img}
              alt={name + " image"}
              className={`group-hover:scale-110 transition ease-in-out delay-150 ${
                id == 31 ? "w-4/6" : ""
              }`}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <h1 className="sm:text-xl font-bold">{name}</h1>
            <div>
              <div className="text-[#E63746]">
                {isSale ? (
                  <div className="flex space-x-2">
                    <p className="text-sm sm:text-lg text-muted-foreground line-through">
                      {`$${price}`}
                    </p>
                    <div className="text-sm sm:text-lg font-semibold flex space-x-2">
                      <p>${price - Math.ceil(price * discountInfo.discount)}</p>
                      <Badge>{`${discountInfo.discountPercent}% off`}</Badge>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm sm:text-lg font-semibold">${price}</p>
                )}
              </div>

              <p className="text-sm sm:text-base">
                Rating: <span className="font-semibold">{rating}</span>/5
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
export default ProductCard;
