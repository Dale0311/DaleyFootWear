import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
function ProductCard({
  name,
  img,
  price,
  rating,
  isSale = false,
  discountInfo,
}) {
  return (
    <Link className="col-span-4 md:col-span-2 lg:col-span-1 hover:drop-shadow-lg transition-shadow ease-in-out delay-1000 group">
      <Card>
        <CardHeader>
          <CardTitle>
            <img
              src={img}
              alt={name + " image"}
              className="group-hover:scale-110 transition ease-in-out delay-150"
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <h1 className="text-xl font-bold">{name}</h1>
            <div>
              <div className="text-[#E63746]">
                {isSale ? (
                  <div className="flex space-x-2">
                    <p className="text-lg text-muted-foreground line-through">
                      {`$${price}`}
                    </p>
                    <div className="text-lg font-semibold flex space-x-2">
                      <p>${discountInfo.discountedPrice}</p>
                      <Badge>{`${discountInfo.discountPercentage}% off`}</Badge>
                    </div>
                  </div>
                ) : (
                  <p className="text-lg font-semibold">${price}</p>
                )}
              </div>

              <p>
                Rating: <span className="font-semibold">{rating}</span>/5
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p>Footer here</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
export default ProductCard;
