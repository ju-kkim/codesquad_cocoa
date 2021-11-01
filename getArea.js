let executionSequence = [];

function getArea(shape, a, b, c) {
    switch(shape) {
        case 'circle' : 
            if(b == undefined) {
                let area = getCircleArea(a);
                executionSequence.push('circle');
                return area
            }else {
                let sum = 0;
                for(let i = 1; i <= b; i++){
                    sum += getCircleArea(i);
                }
                executionSequence.push('circle');
                return sum;
            }
            break;
        case 'rect' :
            return getRectArea(a, b)
            break;
        case 'trapezoid':
            return getTrapezoidArea (a, b, c);
            break;
    }
}

function getCircleArea(r) {
    let circleArea = Math.PI * Math.pow(r,2);
    return circleArea;
}
function getRectArea(width, height) {
    let rectArea = width * height;
    executionSequence.push('rect');
    return rectArea
}
function getTrapezoidArea(upper, lower, height) {
    let trapezoidArea = (upper + lower) * height / 2;
    executionSequence.push('trapezoid');
    return trapezoidArea;
}

function printExecutionSequence() {
    return executionSequence.join()
}