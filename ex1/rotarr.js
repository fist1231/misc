class Rotarr {

    main(nums, target) {
        console.log(`Rotarr`);
        return this.findTarget(nums, target);
    }

    findTarget(nums, target) {
        return this.find(nums, target, 0);
    }

    find(nums, target, pos) {
        if (nums.length === 1) {
            if (nums[0] === target) {
                console.log(`+++> Found in nums: ${JSON.stringify(nums)}; target: ${target}`);
                return pos;
            } else {
                console.log(`---> NOT found in nums: ${JSON.stringify(nums)}; target: ${target}`);
                return -1;
            }
        }
        const mid = Math.ceil(nums.length / 2);
        const arrLeft = nums.slice(0, mid);
        const arrRight = nums.slice(mid, nums.length);
        console.log(`==> nums: ${JSON.stringify(nums)}; arrLeft: ${JSON.stringify(arrLeft)}; arrRight: ${JSON.stringify(arrRight)};target: ${target}; mid: ${mid}`);


        const condLeft = this.leftTurnCondition(arrLeft, arrRight, target)
        const condRight = this.rightTurnCondition(arrLeft, arrRight, target);
        const aFlow = this.f1(arrLeft, arrRight, condLeft, condRight);

        return aFlow(target, pos, mid);

        // const lFlow = this.f1(target, pos, mid);
        // const rFlow = this.f1(arrRight, arrLeft, pos, mid);


        /*
                arrLeft,  target, pos,     arrRight, pos-mid
                arrRight, target, pos-mid, arrLeft,  pos

                recurseToLeft(larr, tgt, pos)
                recurseToRight(rarr, tgt, pos+mid)

        */

        // if (arrLeft[0] <= arrLeft[arrLeft.length - 1]) {
        //     if (target >= arrLeft[0] && target <= arrLeft[arrLeft.length - 1]) {
        //         return this.find(arrLeft, target, pos);
        //     } else {
        //         return this.find(arrRight, target, pos += mid);
        //     }
        // }
        // if (arrRight[0] <= arrRight[arrRight.length - 1]) {
        //     if (target >= arrRight[0] && target <= arrRight[arrRight.length - 1]) {
        //         return this.find(arrRight, target, pos += mid);
        //     } else {
        //         return this.find(arrLeft, target, pos);
        //     }
        // }

        /*
                if(firstLessThanLast(arrLeft) && targetBetween(arrLeft, target) 
                    || firstLessThanLast(arrRight) && !targetBetween(arrRight, target) {
                    return this.find(arrLeft, target, pos);
                }

                if(firstLessThanLast(arrLeft) && !targetBetween(arrLeft, target) 
                    || firstLessThanLast(arrRight) && targetBetween(arrRight, target)) {
                    return this.find(arrRight, target, pos+=mid);
                }
                
        */


        // return -1;
    }

    leftTurnCondition(arrLeft, arrRight, target) {
        return () => this.firstLessThanLast(arrLeft) && this.targetBetween(arrLeft, target) ||
            this.firstLessThanLast(arrRight) && !this.targetBetween(arrRight, target);
    }

    rightTurnCondition(arrLeft, arrRight, target) {
        return () => this.firstLessThanLast(arrLeft) && !this.targetBetween(arrLeft, target) ||
            this.firstLessThanLast(arrRight) && this.targetBetween(arrRight, target)
    }

    firstLessThanLast(arr) {
        return arr[0] <= arr[arr.length - 1]
    }

    targetBetween(arr, target) {
        return target >= arr[0] && target <= arr[arr.length - 1];
    }



    f1(arrLeft, arrRight, conditionLeft, conditionRight) {
        return (target, pos, mid) => {
            if (conditionLeft()) {
                return this.find(arrLeft, target, pos);
            }
            if (conditionRight()) {
                return this.find(arrRight, target, pos += mid);
            }
            return -1;
        }
    }

    find2(nums, target, pos) {
        if (nums.length === 1) {
            if (nums[0] === target) {
                console.log(`+++> Found in nums: ${JSON.stringify(nums)}; target: ${target}`);
                return pos;
            } else {
                console.log(`---> NOT found in nums: ${JSON.stringify(nums)}; target: ${target}`);
                return -1;
            }
        }
        const mid = Math.ceil(nums.length / 2);
        const arrLeft = nums.slice(0, mid);
        const arrRight = nums.slice(mid, nums.length);
        console.log(`==> nums: ${JSON.stringify(nums)}; arrLeft: ${JSON.stringify(arrLeft)}; arrRight: ${JSON.stringify(arrRight)};target: ${target}; mid: ${mid}`);

        if (arrLeft[0] <= arrLeft[arrLeft.length - 1]) {
            if (target >= arrLeft[0] && target <= arrLeft[arrLeft.length - 1]) {
                return this.find(arrLeft, target, pos);
            } else {
                return this.find(arrRight, target, pos += mid);
            }
        }
        if (arrRight[0] <= arrRight[arrRight.length - 1]) {
            if (target >= arrRight[0] && target <= arrRight[arrRight.length - 1]) {
                return this.find(arrRight, target, pos += mid);
            } else {
                return this.find(arrLeft, target, pos);
            }
        }
        return -1;
    }
}

const run = () => {
    const nums = [5, 6, 7, 0, 1, 2, 3, 4];
    const target = 3;
    // const nums = [];
    // const target = 5;
    const res = new Rotarr().main(nums, target);
    console.log(`res: ${res}`);
}

run();

export default Rotarr;