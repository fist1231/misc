class Coutarr {
    main() {
        console.log(`Coutar main`);
        // const arr = [0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1];
        // const arr = [0, 1, 0, 1];
        // const arr = [1, 1, 1, 1, 1, 1, 1, 1];
        // const arr = [0, 1];
        // const arr = [0, 0, 1, 0, 0, 0, 1, 1];
        // const arr = [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1];
        // const arr = [0, 1];
        const arr = [0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1];
        const res = this.findMaxLength(arr);
        console.log(`result: ${res}`);
    }

    findMaxLength(nums) {
        const nlen = nums.length;
        let resMax = 0
        let currLen = 0;
        let cnt = 0;
        while (cnt < nlen - 1) {
            // currSum += nums[cnt];
            // console.log(`-- cnt: ${cnt}`);
            if (cnt === 0) {
                cnt++;
                continue;
            }
            const mLen = this.getNLength(cnt, currLen, nums); // 1, 0
            if (mLen > resMax) {
                resMax = mLen;
                currLen = resMax;
                continue;
            }
            cnt++;
        }
        return resMax;
    }

    getNLength(cnt, currLen, nums) {
        // getSum of cnt-currLen => cnt
        let sum = 0;
        if (cnt - currLen - 1 < 0) {
            return currLen;
        }
        for (let i = cnt - currLen - 1; i <= cnt; i++) {
            sum += nums[i];
        }
        if ((currLen + 2) / sum === 2) {
            return currLen + 2;
        }
        return currLen;
    }

    findMaxL(nums) {
        let resMax = 0;
        let diverse = false;
        console.log(`--------------> `);
        for (let i = 0; i < nums.length; i++) {
            // if (i > 0 && nums[i] !== nums[i - 1]) {
            //     if (resMax === 0) {
            //         resMax = 1;
            //     }
            // }
            if (i > 0 && !diverse && nums[i] !== nums[i - 1]) {
                diverse = true;
            }
            let summ = 0;
            let count = 0;
            for (let j = i; j < nums.length - 1; j += 2) {
                const sliced = nums.slice(i, j + 2);
                const slength = sliced.length;
                // const sliced = nums.filter((x, idx) => idx >= i && idx <= j + 1);
                // const sliced = nums.subarray(i, j + 1);
                // console.log(`sliced: ${JSON.stringify(sliced)}`);
                let summa = 0;
                for (let k = slength; k--;) {
                    summa += sliced[k];
                    // console.log(`${nums[k]}`);
                }
                // const summa = sliced.reduce((acc, val) => acc + val, 0);
                if (slength / summa === 2 && summa > resMax) {
                    resMax = summa;
                }

                // console.log(`88>i: ${i} j: ${j+1}; summa: ${summa}`);
            }
            /*
                        for (let j = i; j < nums.length; j++) {
                            count++;
                            summ = summ + nums[j];
                            if (count % 2 !== 0) {
                                continue;
                            }
                            // console.log(`--> i: ${i}; j: ${j}; resMax: ${resMax}; count: ${count}/summ:${summ}; cond: ${count/ summ}`);
                            if (summ != 0 && count / summ === 2 && summ > resMax) {
                                resMax = summ;
                            }
                        }
            */
            // console.log(`--> summ:${summ}; i: ${i}; resMax: ${resMax}; cond: ${(nums.length - i) / summ}`);
        }

        return diverse ? (resMax * 2) : 0;
    }
}

const run = () => {
    console.log(`run`);
    new Coutarr().main();
}

run();

export default Coutarr;