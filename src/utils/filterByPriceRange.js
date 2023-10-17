export function filterByPriceRange(products, min, max){
    if(min && max){
        const toReturnProducts = products.filter(product => product.price >= min && product.price <= max)
        return toReturnProducts
    }
    else if(min && !max){
        const toReturnProducts = products.filter(product => product.price >= min)
        return toReturnProducts
    }
    else if(!min && max){
        const toReturnProducts = products.filter(product => product.price <= max)
        return toReturnProducts
    }
    return products;
}