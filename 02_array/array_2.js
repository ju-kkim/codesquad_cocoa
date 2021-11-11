const peoples = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];

// function filterId(inputArray) {
//     let resultArray = [];
//     for(const people of inputArray){
//         let changeId = removeSpecialChar(people);
//         changeId = removeNum(changeId)
//         resultArray.push(changeId);
//     }
//     return resultArray;
// }

// // 특수문자 제거
// function removeSpecialChar(text) {
//     let reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
//     let changeText = text.replace(reg, "");
//     return changeText;
// }

// // 숫자제거
// function removeNum(text) {
//     let resultText = '';
//     for(const piece of text){
//         if(isNaN(piece)){
//             resultText += piece
//         }
//     }
//     return resultText
// }

function filterId(inputArray) {
    const changeId = inputArray.map((people) => {
        let reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
        let num = /[0-9]/g;
        people = people.replace(reg, "").replace(num, "");
        return people
    })
    return changeId;
}