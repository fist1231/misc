const { performance } = require('perf_hooks');

const fib = n => {
    if (n === 0 || n === 1) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}

const run = () => {
    const t1 = performance.now();
    const rez = fib(29);
    const t2 = performance.now();
    console.log(`rez: ${rez} in ${t2-t1} ms`);
}

const fibdp = (n, mem) => {
    if (n === 0 || n === 1) {
        if (mem[n] === -1) {
            mem[n] = n;
        }
        return mem[n];
    }
    if (mem[n - 1] === -1) {
        mem[n - 1] = fibdp(n - 1, mem);
    }
    if (mem[n - 2] === -1) {
        mem[n - 2] = fibdp(n - 2, mem);
    }
    // if (mem[n] === -1) {
    //     mem[n] = mem[n - 1] + mem[n - 2];
    // }
    // const res = mem[n - 1] + mem[n - 2];
    return mem[n - 1] + mem[n - 2];
}

const rundp = () => {
    const n = 29;
    const mem = new Array(n).fill(-1);
    // mem = Array.fill(-1);
    console.log(`Init mem: ${JSON.stringify(mem)}`)
    const t1 = performance.now();
    const rez = fibdp(n, mem);
    const t2 = performance.now();
    console.log(`rez: ${rez} in ${t2-t1} ms; mem: ${JSON.stringify(mem)}`);
}

run();
rundp();

// 0,1,2,3,4,5,6, 7, 8, 9
// 0,1,1,2,3,5,8,13,21,34