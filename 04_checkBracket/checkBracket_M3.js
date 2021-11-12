/*
배열 분석 정보 출력
문제점
ex) 12 -> 1과 2가 따로 들어감
해결이 필요함
*/

const data = "[1,2,[3,4,[5,[6]]]]"  
function printInfo(arr){
    const eleStack = []
    const infoResult = {
        "type":"root",
        "child": eleStack
    }
    let depth = 0;
    for(let i = 0; i < arr.length; i++){
        const eleType = checkType(arr[i])

        switch(arr[i]){
            case '[' :
                eleStack.push({"type":eleType, "child" :[]})
                depth += 1;
                break
            case ']' :
                if(eleStack.length === 1) {
                    break
                }else {
                    depth -= 1;
                    const temporary = eleStack.pop()
                    eleStack[depth-1]["child"].push(temporary)
                }
                break
            case ',' :
                break
            default :
                eleStack[depth-1]["child"].push({"type":eleType, "value" :arr[i]})
        }
    }
    
    return JSON.stringify(infoResult,null,2)
}

function checkType(ele) {
    const regNum = /\d/;
    const regArr = /\[/gm;    

    if(ele.match(regNum)) return "number"
    if(ele.match(regArr)) return "array"
}
console.log(printInfo(data))