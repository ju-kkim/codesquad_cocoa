function menuList(key, value) {
    this.hashBuckets = [];
}

function hashFunc(string) {
    let hash = 0;
    for(let spelling = 0; spelling < string.length; spelling++) {
        hash += string.charCodeAt(spelling)
    }
    const ascii = hash % 5
    return ascii
}

menuList.prototype = {
    put : function(key, value) {
        const hashCode = hashFunc(key);

        if(this.hashBuckets[hashCode] === undefined){
            this.hashBuckets[hashCode] = [];
        }
        this.hashBuckets[hashCode].push({key,value});
    },
    remove : function(key) {
        const hashCode = hashFunc(key);
        const targetBuckets = this.hashBuckets[hashCode];

        if(targetBuckets.length > 1) {
            targetBuckets.forEach((item, index) => {
                if(item.key === key){
                    targetBuckets.splice(index,1)
                }
            });
        }else {
            delete this.hashBuckets[hashCode]
        }
    },
    containsKey : function(key) {
        const hashCode = hashFunc(key);
        if(this.hashBuckets[hashCode]){
            return true;
        }else {
            return false;
        }
    },
    get : function(key) {
        const hashCode = hashFunc(key);
        const targetHash = this.hashBuckets[hashCode];
        let findValue;
        targetHash.forEach(item => {
            if(item.key === key){
                findValue = item.value
            }
        })
        return findValue
    },
    isEmpty : function() {
        if(this.hashBuckets.length === 0) {
            return true
        }else {
            return false
        }
    }
}

const myMenu = new menuList();

myMenu.put("아메리카노", "3200원");
myMenu.put("카페라떼", "3400원");
myMenu.put("바닐라라떼", "3700원");
myMenu.put("카페모카", "3800원");
myMenu.put("아인슈페너", "4000원");
console.log(myMenu)
console.log(myMenu.containsKey("아메리카노"))
console.log(myMenu.containsKey("레몬에이드"))
console.log(myMenu.get("아인슈페너"))
console.log(myMenu.isEmpty())
