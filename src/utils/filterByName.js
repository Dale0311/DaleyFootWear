export function filterByName(data, name){
    if(!name){
        return data
    }
    const escapedUserName = name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const nameRegex = new RegExp(escapedUserName, 'i');
    const toReturnData = data.filter(element => nameRegex.test(element.name)) 
    return toReturnData   
}