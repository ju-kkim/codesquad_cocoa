// factorial 함수 만들기
function calculate(m) {
    let result = [];
    let calcNum = 1;
    for(let num = 1; num <= m; num++) {
        calcNum = calcNum * num;
        result.push(calcNum)
    }
    return result;
}