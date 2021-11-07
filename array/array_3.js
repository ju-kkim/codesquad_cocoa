// 아래 예시는 네 명의 학생에 대한 과목 점수이다.
// 각 학생은 3가지 과목에 대한 점수를 가지고 있다.
// 각 학생의 평균점수(1)와 모든 학생의 최고점수의 평균점수(2)를 출력하라.

const grades = [[88,76,77], [33,44,44], [90,100,94], [30,44,98]];
function calculateAverage(group) {
    let totalScore;
    let average;
    let studentsAverage = calculateStudentAverage(group);
    let groupAverage = calculateGroupAverage(group);

    return {
        studentsAverage,
        groupAverage
    };

}
// 학생 평균
function calculateStudentAverage(list) {
    let averageArray = [];
    list.forEach((student,index) => {
        let subjectNum = student.length;
        totalScore = student.reduce((score, scorePlus) => (score + scorePlus));
        average = totalScore / subjectNum;
        averageArray.push(`${index} 번 평균 ${average}`)
    });
    return averageArray
}

// 최고점수 평균
function calculateGroupAverage(list) {
    let hightScore = [];
    list.forEach((student,index) => {
        hightScore.push(Math.max(...student));
    });
    totalScore = hightScore.reduce((score, scorePlus) => (score + scorePlus))
    average = totalScore / list.length ;
    return average;
}

console.log(calculateAverage(grades))