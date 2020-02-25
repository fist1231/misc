/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
class Regex {

    isMatch(s, p) {
        const result = this.findMatch(s, p, 0);
        console.log(`Result of '${p}' matching '${s}': ${result.result}; number of iterations: ${result.count}`);
        return result.result;
    };

    findMatch(s, p, count) {
        let res = true;
        const wild = '*'.charCodeAt(0);
        const any = '.'.charCodeAt(0);
        while (p) {
            count++;
            const pChar = p.charCodeAt(0);
            p = p.substr(1);
            // if(pArr.length > 0) {
            if (p.charCodeAt(0) === wild) {
                //pArr.shift(); // remove wild
                p = p.substr(1);
                if (pChar === any || pChar === s.charCodeAt(0)) {
                    // return this.splitFlow(s, p, pChar, count);
                    const r = this.splitFlow(s, p, pChar, count);
                    return { "result": r.result, "count": r.count }
                } else {
                    // return this.isMatch(s, p, count);
                    const r = this.findMatch(s, p, count);
                    return { "result": r.result, "count": r.count }
                }
            } else {
                if (pChar === any && !s) {
                    // string is empty, but pattern still left with no wildcards
                    return { "result": false, "count": count };
                }
                if (pChar !== any && pChar !== s.charCodeAt(0)) {
                    // non-match found
                    return { "result": false, "count": count };
                }
                // sArr.shift();
                s = s.substr(1);
            }
            // }
        }
        if (s) {
            console.log(`== s: ${s}; result: ${JSON.stringify({"result":false, "count": count})}`);
            return { "result": false, "count": count };
        }
        console.log(`~~= s: ${s}; result: ${JSON.stringify({"result":res, "count": count})}`);
        return { "result": res, "count": count };
    }


    splitFlow(s, p, char, count) {
        let result = false;
        let strs = [];
        let r = null;
        strs.push(s);
        // const r = this.isMatch(s.substr(s.length - cnt), p, count);
        // let result = r.result;
        // count = r.count;
        // if(r.result) {
        //     return r;
        // }

        // s.map()
        const notAny = char !== '.'.charCodeAt(0);
        while (s.length > 0) {
            if (notAny && char !== s.charCodeAt(0)) {
                break;
            }
            s = s.substr(1);
            strs.push(s);
        }
        let str = null;
        while (strs.length > 0) {
            console.log(`strs: ${JSON.stringify(strs)}; p: ${p}`);
            count++;
            str = strs.pop();
            console.log(`after pop strs: ${JSON.stringify(strs)}; p: ${p}; str: ${str}`);
            r = this.findMatch(str, p, count);
            count = r.count;
            result = result || r.result;
            if (result) {
                break;
            }
        }
        strs = null;
        str = null;
        r = null;
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
            const r = this.isMatch(s, p, count);
            count = r.count;
            result = result || r.result;
            if (result) {
                break;
            }
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
    const result = new Regex().isMatch(s, p);
    // console.log(`Result of '${p}' matching '${s}': ${result.result}; number of iterations: ${result.count}`);
}

run();

export default Regex;

// splice -> Shift: 4800 -> 450
// arrays -> string, splice vs substr(1): 450 -> 180
// string.length -> s != null: 180 -> 172