export function generateDiscount() {
    const discount = Math.random();
    const discountPercentage = Math.ceil(discount * 100);
    return {discountPercentage, discount}
  }