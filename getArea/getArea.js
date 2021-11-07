let executionSequence = [];

function getArea(shape, a, b, c) {
    let area = 0;
    switch(shape) {
        case 'circle' : 
            area = getCircleArea(a,b)
            break;
        case 'rect' :
            area = getRectArea(a, b);
            break;
        case 'trapezoid':
            area = getTrapezoidArea (a, b, c);
            break;
    }
    executionSequence.push(`${shape} ${area}`);
    return area
}

function getCircle(radius){
    return Math.PI * Math.pow(radius,2);
}
function getCircleArea(r, r2) {
    let circleArea = 0;
    if(r2 === undefined) {
        circleArea = getCircle(r)
    }else {
        for(let i = 1; i <= r2; i++){
        circleArea += getCircle(i)
        }
    }
    return circleArea;
}

function getRectArea(width, height) {
    let rectArea = width * height;
    return rectArea
}

function getTrapezoidArea(upper, lower, height) {
    let trapezoidArea = (upper + lower) * height / 2;
    return trapezoidArea;
}

function printExecutionSequence() {
    return executionSequence.join(', ')
}
