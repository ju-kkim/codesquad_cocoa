# 다각형의 넓이 구하기

## getArea 함수 만들기
```js
getArea('circle', 10)
// 원의 넓이 값 출력

getArea('rect', 10,15);
//사각형 넓이 값 출력

getArea('trapezoid', 10,15,12);
// 사다리꼴의 넓이 값 출력

getArea('circle', 1, n);
// 반지름이 1부터 n까지 1씩 증가하면서, n개까지의 원의 넓이의 모든 합을 출력. 
```

## printExecutionSequence 함수 만들기
지금까지 호출된 함수가 무엇인지 알려주는 함수.
1. 도형 이름 나오기 (circle, circle, rect)
1. 함수의 결과 까지 순서대로 같이 출력
