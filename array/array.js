// factorial 함수 만들기

// for 사용
// function calculate(m) {
//     let result = [];
//     let calcNum = 1;
//     for(let num = 1; num <= m; num++) {
//         calcNum = calcNum * num;
//         result.push(calcNum)
//     }
//     return result;
// }

// while 사용
function calculate(m) {
    let result = [];
    let num = 1;
    let calcNum = 1;
    while(num <= m) {
        calcNum *= num++;
        result.push(calcNum);
    }
    return result;
}