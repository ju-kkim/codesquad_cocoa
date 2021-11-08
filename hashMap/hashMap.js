//hash map(hash table)
function playList(){}
// put(String key, String value) 키-값을 추가한다.
playList.prototype.put = function(key, value) {
    this[key] = value;
}
// remove(String key) 해당 키에 있는 값을 삭제한다.
playList.prototype.remove = function(key) {
    delete this[key];
}
// containsKey(String) 해당 키가 존재하는지 판단해서 Bool 결과를 리턴한다.
playList.prototype.containsKey = function(key) {
    return this.hasOwnProperty(key);
}
// get(String) 해당 키와 매치되는 값을 찾아서 리턴한다.
playList.prototype.get = function(key) {
    return this[key];
}
// isEmpty() 비어있는 맵인지 Bool 결과를 리턴한다.
playList.prototype.isEmpty = function() {
    if(Object.keys(this).length === 0){
        return true;
    }else {
        return false;
    }
}
// keys() 전체 키 목록을 [String] 배열로 리턴한다.
playList.prototype.keys = function() {
    // for 사용
    // let keyArray = [];
    // for(key in this) {
    //     keyArray.push(key);
    // }
    // return keyArray;
    
    return Object.keys(this)
}
// replace(String key, String value) 키-값으로 기존 값을 대체한다.
playList.prototype.replace = function(key, value) {
    this[key] = value
}
// size() 전체 아이템 개수를 리턴한다.
playList.prototype.size = function() {
    return Object.keys(this).length
}
// clear() 전체 맵을 초기화한다.
playList.prototype.clear = function() {
    for(key in this) {
        delete this[key]
    }
}
const myPlayLust = new playList();
const myPlayLust2 = new playList();

// Test
myPlayLust.put("BE'O(비오)","문득");
myPlayLust.put("아이유","strawberry moon");
myPlayLust.put("aespa","Savage");
myPlayLust.put("이무진","신호등");
myPlayLust.put("Coldplay&방탄소년단","My Universe");
console.log(myPlayLust);

console.log("remove BE'O(비오)");
myPlayLust.remove("BE'O(비오)");
console.log(myPlayLust);

console.log("containsKey('아이유')");
console.log(myPlayLust.containsKey("아이유"));

console.log("get('aespa')");
console.log(myPlayLust.get("aespa"));

console.log("isEmpty()");
console.log(myPlayLust.isEmpty());

console.log("keys()");
console.log(myPlayLust.keys());

console.log("replace('이무진', '과제곡')");
myPlayLust.replace('이무진', '과제곡');
console.log(myPlayLust);

console.log("size()");
console.log(myPlayLust.size());

console.log("clear()");
myPlayLust.clear();
console.log(myPlayLust)
console.log(myPlayLust.size())
console.log(myPlayLust.isEmpty())
