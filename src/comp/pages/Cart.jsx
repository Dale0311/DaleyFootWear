import { useUserStore } from "@/store/userStore";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import ProductCardCart from "../subcomp/ProductCardCart";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";
function Cart() {
  const cart = useUserStore((state) => state.userCart);
  const { toast } = useToast();
  let total = 0;
  const f = new Intl.NumberFormat(undefined, {
    currency: "USD",
    style: "currency",
  });
  cart.forEach((product) => {
    if (product.isSale) {
      total +=
        (product.price -
          Math.ceil(product.price * product.discountInfo.discount)) *
        product.quantity;
    } else {
      total += product.price * product.quantity;
    }
  });
  const productCart = cart?.map((product) => (
    <ProductCardCart key={product.id} product={product} />
  ));
  return (
    <div className="lg:container space-y-4 p-4">
      {/* header */}
      <p className="text-base md:text-2xl font-bold">My Cart</p>
      <div>
        {cart.length > 0 ? (
          <div className="space-y-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-xs sm:text-sm">
                {productCart}
              </TableBody>
            </Table>
            <div className="flex space-x-8 items-center justify-end">
              <p>Total {f.format(total)}</p>
              <AlertDialog>
                <AlertDialogTrigger
                  className={`${buttonVariants({
                    variant: "default",
                    size: "sm",
                  })} text-xs`}
                >
                  Check out
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      This is the end for this project
                    </AlertDialogTitle>
                    <AlertDialogDescription className="space-y-5">
                      <p>Some information and payment gateway logic here.</p>
                      <p className="text-xs text-red-500 ">
                        Note: pressing continue will logs you out
                      </p>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        await signOut(auth);
                        toast({
                          title: "Successfully logged out",
                          description: "Sayonara ",
                        });
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <p className="text-bold text-lg">No Items in your cart yet</p>
          </div>
        )}
      </div>
      {/* carts */}
    </div>
  );
}

export default Cart;
