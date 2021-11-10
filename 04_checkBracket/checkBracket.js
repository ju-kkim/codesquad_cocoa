class Stack {
    constructor() {
        this.arr = [];
    }
    push(item) {
        this.arr.push(item)
    }
    pop() {
        return this.arr.pop();
    }
    peek() {
        return this.arr[this.arr.length - 1];
    }
}

const data = "[1,2,[3,4,[5,[6]]]]"
function run(arr) {
    let bracketStack = new Stack;
    let depthCount = 0;
    let eleCount = 0;
    for(let item of arr) {
        switch (item) {
            case '[' :
                depthCount += 1;
                bracketStack.push(item)
                break
            case ']' :
                if(bracketStack.arr.length > 0){
                    bracketStack.pop()
                }else {
                    return '여는 괄호가 부족합니다.'
                }
                break
            case ',' :
                break
            default :
                eleCount += 1;
        }
    }
    const errorMsg = checkError(bracketStack);
    const resultMsg = `배열의 중첩된 깊이 수준은 ${depthCount}이며, 총 ${eleCount}개의 원소가 포함되어 있습니다`;

    return errorMsg === undefined ?  resultMsg : errorMsg
}

function checkError(stack) {
    if(stack.arr.length > 0) {
        return '닫는 괄호가 부족합니다'
    }
}
console.log(run(data))