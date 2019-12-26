/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
class Regex {

    findMatch(s, p, count) {
        return new Promise((resolve, reject) => {
            let res = true;
            const wild = '*';
            const any = '.';
            const re = new Regex();
            const splitFn = re.splitFlow;
            const matchFn = re.findMatch;
            while (p) {
                count++;
                const pChar = p[0];
                p = p.substr(1);
                // if(pArr.length > 0) {
                if (p[0] === wild) {
                    //pArr.shift(); // remove wild
                    p = p.substr(1);
                    if (pChar === any || pChar === s[0]) {
                        // return this.splitFlow(s, p, pChar, count);
                        const r = splitFn(s, p, pChar, count);
                        resolve({ "result": r.result, "count": r.count });
                    } else {
                        // return this.isMatch(s, p, count);
                        const prom = matchFn(s, p, count);
                        prom.then(r => {
                            resolve({ "result": r.result, "count": r.count });
                        });
                    }
                } else {
                    if (pChar === any && !s) {
                        resolve({ "result": false, "count": count });
                    }
                    if (pChar !== any && pChar !== s[0]) {
                        resolve({ "result": false, "count": count });
                    }
                    // sArr.shift();
                    s = s.substr(1);
                }
                // }
            }
            if (s) {
                console.log(`== s: ${s}; result: ${JSON.stringify({"result":false, "count": count})}`);
                resolve({ "result": false, "count": count });
            }
            console.log(`~~= s: ${s}; result: ${JSON.stringify({"result":res, "count": count})}`);
            resolve({ "result": res, "count": count });

        });

    }

    isMatch(s, p, count) {
        const prom = new Regex().findMatch(s, p, count);
        let rz = null;
        prom.then(result => {
            console.log(`result: ${result.result}; count: ${result.count}`);
            return result.result;
            // }).then(r => {
            //     console.log(`r: ${r}`);
            //     rz = r;
            //     return r;
        });
        // return rz;
        // const pr = Promise.resolve(prom);
        // console.log(`===> pr: ${pr}`);
        // return pr.then(x => {return x});
        return Promise.resolve({ "result": false });
    };

    splitFlow(s, p, char, count) {
        let result = false;
        let strs = [];
        let r = undefined;
        let matchFn = new Regex().findMatch;
        strs.push(s);
        // const r = this.isMatch(s.substr(s.length - cnt), p, count);
        // let result = r.result;
        // count = r.count;
        // if(r.result) {
        //     return r;
        // }

        // s.map()

        while (s.length > 0) {
            if (char !== '.' && char !== s[0]) {
                break;
            }
            s = s.substr(1);
            strs.push(s);
        }
        let str = undefined;
        while (strs.length > 0) {
            console.log(`strs: ${JSON.stringify(strs)}; p: ${p}`);
            count++;
            str = strs.pop();
            console.log(`after pop strs: ${JSON.stringify(strs)}; p: ${p}; str: ${str}`);
            const prom = matchFn(str, p, count);
            prom.then(r => {
                count = r.count;
                result = result || r.result;
                // if(result) {
                //     break;
                // }
            });
        }
        strs = undefined;
        str = undefined;
        r = undefined;
        matchFn = undefined;
        return { "result": result, "count": count };
    }

    splitFlowLong(s, p, char, count) {

        const r = this.isMatch(s, p, count);
        let result = r.result;
        count = r.count;
        if (r.result) {
            return r;
        }

        // s.map()

        while (s) {
            count++;
            if (char !== '.' && char !== s[0]) {
                break;
            }
            // s.shift();
            s = s.substr(1);
            const prom = this.isMatch(s, p, count);
            prom.then(r => {
                count = r.count;
                result = result || r.result;
                if (result) {
                    // break;
                }

            });
        }
        return { "result": result, "count": count };
    }

}

const run = () => {
    // const s = "aa"; // false
    // const p = "a";
    // const s = "ab"; // true
    // const p = ".*";
    // const s = "aab"; // true
    // const p = "c*a*b";   
    // const s = "mississippi"; // false
    // const p = "mis*is*p*."; 
    // const s = "ab" // false
    // const p = ".*c"; 
    // const s = "aaa"; //true
    // const p = "a*a"; 
    // const s = "mississippi"; // true
    // const p = "mis*is*ip*.";
    // const s = "aaa"; // true
    // const p = "ab*a*c*a";
    // const s = "a"; // false
    // const p = ".*..a*";
    // const s = "ab"; // true
    // const p = ".*";
    // const s = "bbbba"; //true
    // const p = ".*a*a";
    const s = "a"; // false
    const p = ".*..a*";
    const result = new Regex().isMatch(s, p, 0);
    result.then(rez => {
        console.log(`Result of '${p}' matching '${s}': ${rez.result}`);

    });
    console.log(`-- Result of '${p}' matching '${s}': ${result.result}`);
}

run();

export default Regex;

// splice -> Shift: 4800 -> 450
// arrays -> string, splice vs substr(1): 450 -> 180
// string.length -> s != null: 180 -> 172