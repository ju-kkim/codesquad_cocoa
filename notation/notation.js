function solution(n, t, m) {
    const totalNum = t * m;
    let numArray = [];
    for (let num = 0; num < totalNum; num++) {
        let convertNum = num.toString(n);
        let saveConvertNum = convertNum.split('');
        numArray.push(...saveConvertNum);
    }
    return numArray

}
console.log(solution(8,10,2))