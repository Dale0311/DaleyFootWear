import { generateDiscount } from "./generateDiscount"
// filteredData = [25, 1, 3] -> the data of each filteredData
export function addKeyValToSpecificElements(data, filteredData){
    return data.map(product => {
        if(filteredData.includes(product.id)){
            const {discount, discountPercentage} = generateDiscount();
            const discountedPrice = product.price - Math.ceil(product.price * discount);
            const discountInfo = {discountedPrice, discountPercentage}
            return {...product, isSale: true, discountInfo}
        }
        return {...product, isSale: false}
    })
}