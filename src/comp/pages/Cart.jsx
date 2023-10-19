import { useUserStore } from "@/store/userStore";
function Cart() {
  const cart = useUserStore((state) => state.userCart);
  console.log(cart);
  return <div>Cart</div>;
}

export default Cart;
