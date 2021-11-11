// n = 진법
// t = 미리 구할 숫자의 갯수
// m = 게임에 참가하는 인원
// p = 길동이의 순서

// 길동이 차례 숫자 맞추기
function solution(n, t, m, p) {
    const totalNum = t * m;
    let numArray = [];
    for (let num = 0; num < totalNum; num++) {
        let convertNum = num.toString(n).split('');
        numArray.push(...convertNum);
    }

    if( p > 0){
        let playerArray = [];
        let playerTurn = p - 1;
        for(let turn = 0; turn < numArray.length; turn++) {
            if(playerTurn === turn){
                playerArray.push(numArray[playerTurn]);
                playerTurn += m;
            }
        }
        return playerArray;
    }

    return numArray;
}