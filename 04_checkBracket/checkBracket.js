const data = "[1,2,[3,4,[5,[6]]]]"
function parsing(string) {
    let startArray = [];
    let finishArray = [];
    let parsingResult = [];
    for(let ele of string){
        switch (ele) {
            case '[' :
                startArray.push(ele);
                break
            case ']' :
                finishArray.push(ele);
                break
            case ',' :
                break
            default :
                parsingResult.push(ele)
        }
    }
    if(startArray.length === finishArray.length){
        return `배열의 중첩된 깊이 수준은 ${startArray.length}이며, 총 ${parsingResult.length}개의 원소가 포함되어 있습니다`
    }else {
        return '오류가 있습니다'
    }
}
console.log(parsing(data))