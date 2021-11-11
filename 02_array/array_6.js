const myReduce = (arr, callback, initialValue) => {
    // erroe
    if(arr.length == 0 && initialValue == undefined) {
        console.log('TypeError')
        return;
    }

    let startIndex = 0;
    if(initialValue === undefined) {
        // initialValue X
        initialValue = arr[0];
        startIndex = 1;
    }
    for( let index = startIndex; index < arr.length; index++ ){
        initialValue = callback(initialValue, arr[index])
    }
    return initialValue
}

let myArray = [1,2,3,4,5];
const result = myReduce(myArray, (next,prev) => next + prev);
console.log(result)