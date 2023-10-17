export function filterByRating(data, rate){
    if(!rate){
        return data
    }
    return data.filter(element => element.rating.rate >= rate);
}