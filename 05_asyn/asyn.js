const scores = [ 
    89.23, 82.03, 71.56, 78.82,
    85.05, 84.44, 67.53, 71.7, 
    77.97, 73.77, 84.25, 67.01,
    73.78, 64.19, 89.89, 90.32, 
    73.21, 75.35, 83.22, 74.01 
]

// 평균
function getMean(array) {
    const average = array.reduce((prev,cur) =>  prev + cur) / array.length;
    return average.toFixed(2)
}
// 편차
function getDeviation(array, average) {
    const deviation = array.map(item => {
        return (item - average).toFixed(2)
    })
    return deviation
}
// 표준 편차 구하기
function getStandardDeviation(array) {
    const arrAverage = getMean(array);
    let arrDeviation = getDeviation(array, arrAverage);
    const standardDeviation = Math.sqrt(getMean(arrDeviation.map(item => item * item))).toFixed(2)
    return standardDeviation
}
// 비율 (표준정규분포표)
function ratio(array, min, max) {
    const average = getMean(array);
    const standardDeviation = getStandardDeviation(array);
    const minScore = ((min - average) / standardDeviation).toFixed(2);
    const maxScore = ((max - average) / standardDeviation).toFixed(2);

    return {
        minScore : minScore ,
        maxScore : maxScore
    }
}

console.log('평균' , getMean(scores)) //77.87
console.log('표준편차' , getStandardDeviation(scores)) //7.67
console.log('70 ~ 80점 비율' , ratio(scores, 70, 80))
/*
ratio 실행 결과 
minScore -> -1.03
maxScore -> 0.28

표준정규분포표

minScore 
음수이기 때문에 양수로 변경 1.03 -> 0.8485
1 - 0.8485 = 0.1515

maxScore 0.28 -> 0.6103

max - min -> 0.4588

=> 70~80점 사이의 값을 갖는 비율 = 45.88%
 */