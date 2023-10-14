export function generateDiscount() {
    const discount = Math.random() * .30;
    const discountPercentage = Math.ceil(discount * 100);
    return {discountPercentage, discount}
  }