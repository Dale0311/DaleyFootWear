import { deleteDoc, updateDoc } from "firebase/firestore";
import { refBuilder } from "@/firebase";
import { useUserStore } from "@/store/userStore";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function ProductCardCart({ product }) {
  // current user id
  const { uid } = useUserStore((state) => state.user);
  // editable
  const [editable, setEditable] = useState(false);
  const [quantity, setQuantity] = useState(product.quantity);
  const [error, setError] = useState("");

  // currency format
  const f = new Intl.NumberFormat(undefined, {
    currency: "USD",
    style: "currency",
  });

  // backtrack
  const oldQuantity = product.quantity;

  // remove fn
  const handleRemove = async () => {
    const docRef = refBuilder(uid, true, product.id);
    try {
      await deleteDoc(docRef);
    } catch (error) {
      setError(error);
    }
  };
  // update fn
  const handleUpdate = async () => {
    if (!quantity) {
      setError("Quantity is required");
      return;
    }
    // happy path
    // if same quantity then dont update the doc
    if (product.quantity == +quantity) {
      setEditable(false);
      return;
    }
    const docRef = refBuilder(uid, true, product.id);
    try {
      await updateDoc(docRef, { quantity });
      setEditable(false);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <TableRow>
      <TableCell>
        <img src={product.image} alt={product.name} />
      </TableCell>
      <TableCell className="text-xs md:text-sm font-medium whitespace-nowrap">
        {product.name}
      </TableCell>
      <TableCell>
        {product.isSale ? (
          <div className="flex text-xs md:text-sm space-x-2 text-[#E63746]">
            <p className="text-sm text-muted-foreground line-through">
              {f.format(product.price)}
            </p>
            <div className="text-xs md:text-sm font-semibold flex space-x-2">
              <p>
                {f.format(
                  product.price -
                    Math.ceil(product.price * product.discountInfo.discount)
                )}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xs md:text-sm font-semibold text-[#E63746]">
            {f.format(product.price)}
          </p>
        )}
      </TableCell>
      <TableCell>
        <p className="uppercase">{product.size}</p>
      </TableCell>
      <TableCell>
        {editable ? (
          <Input
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            className="w-min"
            min="1"
            max="100"
            required
          />
        ) : (
          quantity
        )}
      </TableCell>
      <TableCell>
        {product.isSale ? (
          <div className="flex space-x-2">
            <div className="text-xs md:text-sm font-semibold flex space-x-2">
              <p>
                {f.format(
                  (product.price -
                    Math.ceil(product.price * product.discountInfo.discount)) *
                    product.quantity
                )}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xs md:text-sm font-semibold">
            {f.format(product.price * product.quantity)}
          </p>
        )}
      </TableCell>
      <TableCell className="space-x-2 whitespace-nowrap">
        {editable ? (
          <>
            <Button
              variant="link"
              size="sm"
              className="text-xs"
              onClick={() => {
                setQuantity(oldQuantity);
                setEditable(false);
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="text-xs bg-blue-500 hover:bg-blue-600"
              onClick={() => {
                handleUpdate();
              }}
            >
              Apply
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => {
                setEditable(true);
              }}
            >
              Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger
                className={`${buttonVariants({
                  variant: "destructive",
                  size: "sm",
                })} text-xs`}
              >
                Remove
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleRemove()}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </TableCell>
      {error && <TableCell>{error}</TableCell>}
    </TableRow>
  );
}

export default ProductCardCart;
