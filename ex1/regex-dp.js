const { performance } = require('perf_hooks');

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
class Regex {

    isMatch(s, p) {
        const i = 0;
        const j = 0;
        const t1 = performance.now();
        const result = this.findMatch(i, j, s, p, 0);
        const t2 = performance.now();
        console.log(`Result of '${p}' matching '${s}': ${result.result}; iterations: ${result.count} in ${t2-t1} ms`);


        const mem = new Array(s.length + 1).fill(null).map(() => new Array(p.length + 1).fill(null));
        console.log(`mem: ${JSON.stringify(mem)}`);

        const t3 = performance.now();
        const result2 = this.findMatchDP(i, j, s, p, 0, mem);
        const t4 = performance.now();
        console.log(`DPResult of '${p}' matching '${s}': ${result.result}; iterations: ${result.count} in ${t4-t3} ms`);
        console.log(`mem: ${JSON.stringify(mem)}`);


        return result.result;
    };

    findMatch(i, j, s, p, count) {
        // console.log(`i: ${i}; j: ${j}; s: ${s}; p: ${p}; count: ${count}`);
        const wild = '*';
        const any = '.';
        let res = true;
        if (i > s.length - 1 && j > p.length - 1) {
            //both s and p are done and no mistmatches found
            // console.log(`==> both s and p are done and no mistmatches found`);
            return { "result": true, "count": count };
        }

        if (j > p.length - 1 && i <= s.length - 1) {
            // p is done, but s still on, so bad math
            // console.log(`==> p is done, but s still on, so bad math`);
            return { "result": false, "count": count };
        }

        count++;
        if (p[j + 1] !== wild) {
            if (p[j] !== any && s[i] !== p[j]) {
                // first non-match found;
                // console.log(`==> first non-match found; i: ${i}; j: ${j}; p[j]: ${p[j]}; s[i]: ${s[i]}`);
                return { "result": false, "count": count };
            }
            i++;
            j++;
            return this.findMatch(i, j, s, p, count);
        } else {
            const ch = p[j];
            if (ch !== any && s[i] !== ch) {
                // discard p pair, continue
                // i++;
                j++;
                j++;
                // console.log(`-- call findMatch for i: ${i}; j: ${j}`);
                return this.findMatch(i, j, s, p, count);

            } else {
                //split flow
                // i++;
                j++;
                j++;
                // console.log(`-- call splitFlow for i: ${i}; j: ${j}; ch: ${ch}`);
                return this.splitFlow(i, j, s, p, ch, count);
            }
        }


    }


    splitFlow(i, j, s, p, char, count) {
        let result = false;
        // let strs = [];
        let r = null;

        // s.map()
        count++;
        // console.log(`split first, i: ${i}, j: ${j}`);
        r = this.findMatch(i, j, s, p, count);
        count = r.count;
        result = r.result;
        const notAny = char !== '.';
        while (i <= s.length - 1) {
            // console.log(`split while, i: ${i}; s.length - 1: ${s.length - 1}`);
            if (notAny && char !== s.charAt(i)) {
                break;
            }

            i++;
            r = this.findMatch(i, j, s, p, count);
            count = r.count;
            result = result || r.result;
        }
        return { "result": result, "count": count };
    }



    findMatchDP(i, j, s, p, count, mem) {
        // console.log(`i: ${i}; j: ${j}; s: ${s}; p: ${p}; count: ${count}`);
        if (mem[i][j] != null) {
            console.log(`**** cashed result found ...`);
            return mem[i][j];
        } else {
            const wild = '*';
            const any = '.';
            let res = true;
            if (i > s.length - 1 && j > p.length - 1) {
                //both s and p are done and no mistmatches found
                // console.log(`==> both s and p are done and no mistmatches found`);
                mem[i][j] = { "result": true, "count": count };
                return mem[i][j];
            }

            if (j > p.length - 1 && i <= s.length - 1) {
                // p is done, but s still on, so bad math
                // console.log(`==> p is done, but s still on, so bad math`);
                mem[i][j] = { "result": false, "count": count };
                return mem[i][j];
            }

            count++;
            if (p[j + 1] !== wild) {
                if (p[j] !== any && s[i] !== p[j]) {
                    // first non-match found;
                    // console.log(`==> first non-match found; i: ${i}; j: ${j}; p[j]: ${p[j]}; s[i]: ${s[i]}`);
                    mem[i][j] = { "result": false, "count": count };
                    return mem[i][j];
                }
                i++;
                j++;
                return this.findMatchDP(i, j, s, p, count, mem);
            } else {
                const ch = p[j];
                if (ch !== any && s[i] !== ch) {
                    // discard p pair, continue
                    // i++;
                    j++;
                    j++;
                    // console.log(`-- call findMatch for i: ${i}; j: ${j}`);
                    mem[i][j] = this.findMatchDP(i, j, s, p, count, mem);
                    return mem[i][j];

                } else {
                    //split flow
                    // i++;
                    j++;
                    j++;
                    // console.log(`-- call splitFlow for i: ${i}; j: ${j}; ch: ${ch}`);
                    mem[i][j] = this.splitFlowDP(i, j, s, p, ch, count, mem);
                    return mem[i][j];
                }
            }

        }


    }


    splitFlowDP(i, j, s, p, char, count, mem) {
        let result = false;
        // let strs = [];
        let r = null;
        count++;
        r = this.findMatchDP(i, j, s, p, count, mem);
        count = r.count;
        result = r.result;
        const notAny = char !== '.';
        while (i <= s.length - 1) {
            // console.log(`split while, i: ${i}; s.length - 1: ${s.length - 1}`);
            if (notAny && char !== s.charAt(i)) {
                break;
            }

            i++;
            r = this.findMatchDP(i, j, s, p, count, mem);
            count = r.count;
            result = result || r.result;
        }
        return { "result": result, "count": count };
    }



}

const run = () => {
    // const s = "aabb"; // false
    // const p = "aa..";
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
    const s = "mississippi"; // true
    const p = "mis*is*ip*.";
    // const s = "aaa"; // true
    // const p = "ab*a*c*a";
    // const s = "a"; // false
    // const p = ".*..a*";
    // const s = "ab"; // true
    // const p = ".*";
    // const s = "bbbba"; //true
    // const p = ".*a*a";
    // const s = "a"; // false
    // const p = ".*..a*";
    const result = new Regex().isMatch(s, p);
    // console.log(`Result of '${p}' matching '${s}': ${result.result}; number of iterations: ${result.count}`);
}

run();

export default Regex;

// splice -> Shift: 4800 -> 450
// arrays -> string, splice vs substr(1): 450 -> 180
// string.length -> s != null: 180 -> 172