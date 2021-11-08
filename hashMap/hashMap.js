//hash map(hash table)
function playList(){}
playList.prototype = {
    put : function(key, value) {
        this[key] = value;
    },
    remove : function(key) {
        delete this[key];
    },
    containsKey : function(key) {
        return this.hasOwnProperty(key);
    },
    get : function(key) {
        return this[key];
    },
    isEmpty : function() {
        if(Object.keys(this).length === 0){
            return true;
        }else {
            return false;
        }
    },
    keys : function() {
        // for 사용
        // let keyArray = [];
        // for(key in this) {
        //     keyArray.push(key);
        // }
        // return keyArray;
        return Object.keys(this)
    },
    replace : function(key, value) {
        this[key] = value
    },
    size : function() {
        return Object.keys(this).length
    },
    clear : function() {
        for(key in this) {
            delete this[key]
        }
    }
}
const myPlayLust = new playList();

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
