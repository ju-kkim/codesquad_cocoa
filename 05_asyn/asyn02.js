class GradeProgram {
    constructor(scores, subject) {
        this.scores = scores;
        this.subject = subject;
    }
    getMean() {
        const changeNumArray = this.scores.map(item => + item)
        return changeNumArray.reduce((prev,cur) =>  prev + cur) / this.scores.length;
    }
    getDeviation() {
        const deviation = this.scores.map(item => {
            return (item - this.getMean())
        })
        return deviation
    }
    getStandardDeviation() {
        const arrDeviation = this.getDeviation();
        const variance = arrDeviation.map(item => item * item)
        const standardDeviation = variance.reduce((prev,cur) =>  prev + cur) / variance.length
        return Math.sqrt(standardDeviation).toFixed(2)
    }
    getPercentage(min, max) {
        const average = this.getMean();
        const standardDeviation = this.getStandardDeviation();
        const minScore = ((min - average) / standardDeviation).toFixed(2);
        const maxScore = ((max - average) / standardDeviation).toFixed(2);
        const minPercent = this.changePercentage(minScore);
        const maxPercent = this.changePercentage(maxScore);
        return `${(maxPercent - minPercent) * 100}%`
    }
    changePercentage(num) {
        const data = require('./data');
        const decimalLastPoint = String(num).split('').pop();
        let targetData = String(num).substr(0,3);
        
        if(num < 0){
            num = Math.abs(num);
            targetData = String(num).substr(0,3);
            return 1 - data[targetData][decimalLastPoint];
        }
        
        return data[targetData][decimalLastPoint];
    }
}

function getUserInput(){
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    let userInput = []
    rl.on('line', function (line) {
            userInput.push(line);
        })
        .on('close', function () {
            const userSubject = userInput.shift();
            const userScore = new GradeProgram(userInput, userSubject);
            console.log('userScore' , userScore);
            console.log('과목 : ' , userScore.subject);
            console.log('평균 : ' , userScore.getMean());
            console.log('표준편차 : ' , userScore.getStandardDeviation());
            console.log('70 ~ 80점 비율' , userScore.getPercentage(70, 80));
            process.exit();
        });
}

getUserInput();