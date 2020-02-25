import _ from 'lodash'; 

console.log('locks-h');

class Locks {

	main() {
		console.log(`main`);

		const deadends = ['0201', '0101', '0102', '1212', '2002'];
		const target = '0202';

		// const deadends = [];

		// const deadends = ['8888'];
		// const target = '0009';

		// const deadends = ['7888', '9888', '8788', '8988', '8878', '8898', '8887', '8889'];
		// const target = '8888';

		// const deadends = ['0000'];
		// const target = '8888';

		// const result = this.openLock(deadends, target);
		const result = this.turn(0, [], deadends, target);
		// const lngths = result.map(x => x.length);
		// const otherMin = Math.min(...lngths);
		// console.log(`***> lngths: ${JSON.stringify(lngths)}; otherMin: ${otherMin}`);

		if(Array.isArray(result[0])) {

			const flatten = function(arr, result = []) {
			  for (let i = 0, length = arr.length; i < length; i++) {
			    const value = arr[i];
			    if (Array.isArray(value)) {
			      flatten(value, result);
			    } else {
			      result.push(value);
			    }
			  }
			  return result;
			};

			// const flattened = flatten(result);
			const flattened = _.flattenDepth(result, Infinity);

			const minLength = Math.min(...result.map(x => x.length)) - 1;
			// const flattened = result.flat(Infinity);
			// const flattened = result.reduce((a, b) => a.concat(b));
			console.log(`length: ${minLength}; flattened: ${JSON.stringify(flattened)}; total tries: ${flattened.length}`);
		} else {
			const minLength = result.length - 1;
			console.log(`length: ${minLength}; result: ${JSON.stringify(result)}`);
		}

	}



	turn(wheelNum, rzlt, deadends, target) {
		const results = this.cloneArray(rzlt);
		rzlt = null;
		// console.log(`##>> results: ${JSON.stringify(results)}; rzlt: ${JSON.stringify(rzlt)}`);
		if(!results || !results.length) {
			const startCombo = '0000';
			if(this.checkDeadends(startCombo, deadends)) {
				return [];
			}
			results.push(startCombo);
			console.log(`Creating results: ${JSON.stringify(results)}`);
		}

		const combination = this.getLastCombination(results);
		// console.log(`combination: ${JSON.stringify(combination)}; target: ${JSON.stringify(target)};wheelNum: ${wheelNum}`);

		const isDeadend = this.checkDeadends(combination, deadends);
		// if(isVisited  isDeadend) {
		// 	console(``);
		// 	return null;
		// }
		if(isDeadend) {
			// console.log(`~~~~~~>>> deadend reached, discarding: ${JSON.stringify(results)}`);
			results.splice(results.length-1, 1);
			// console.log(`~~~~~~>>> deadend reached, discarded: ${JSON.stringify(results)}. Splitting the flow ...`);
			return this.alternateRoute(wheelNum, results, deadends, target);
			// return results3;
		}

		const isTarget = this.checkTarget(combination, target);
		if(isTarget) {
			console.log(`*** target acquired, results: ${JSON.stringify(results)}`);
			return results;
		}

		const comboWheelVal = this.getWheelValue(wheelNum, combination);
		const targetWheelVal = this.getWheelValue(wheelNum, target);
		// console.log(`comboWheelVal: ${comboWheelVal}; targetWheelVal: ${targetWheelVal}`);

		if(comboWheelVal == targetWheelVal) {
			const nextWheelNum = this.getNextWheel(wheelNum, target);
			// console.log(`nextWheelNum: ${nextWheelNum}`);
			return this.turn(nextWheelNum, results, deadends, target);
		} else {
			const nextCombination = this.turnWheel(wheelNum, combination, comboWheelVal, targetWheelVal);
			// console.log(`nextCombination: ${nextCombination}`);
			const results2 = this.addNextCombination(nextCombination, results);
			// console.log(`added ${nextCombination} to results: ${JSON.stringify(results2)}`);
			return this.turn(wheelNum, results2, deadends, target);
		}

		// return results;
	}

	alternateRoute(wheelNum, r, deadends, target) {
		const res = this.cloneArray(r); 
		r = null;
		const otherWheels = [0, 1, 2, 3];
		otherWheels.splice(wheelNum, 1);
		// console.log(`>>>>>>> other wheels: ${otherWheels}; target.length: ${target.length}; results=${JSON.stringify(r)}`);
		const mapres =  otherWheels.map(wheelN => {
			const combination = this.getLastCombination(res);
			const comboWheelVal = this.getWheelValue(wheelN, combination);
			const wtf = true;
			console.log(`wtf: ${wtf}`);
			const nextCombination = this.turnWheel(wheelN, combination, comboWheelVal, comboWheelVal, wtf);
			const isVisited = res.includes(nextCombination);
			if(isVisited) {
				// console.log(`xxxxx>>>: Repeating element ${nextCombination}, discarding entire branch: ${JSON.stringify(res)}`);
				return [0];
			}

			// console.log(`+++ my next combination: ${nextCombination}`);
			const newRes = this.addNextCombination(nextCombination, res);

			const nextWh = this.getNextWheel(wheelN, target);
			// out.concat(res.push([this.turn(nextWh, res, deadends, target)]));
			return this.turn(nextWh, newRes, deadends, target);
		});
		console.log(`&&&&& mmapres: ${JSON.stringify(mapres)}`);
		return mapres;
	}

	// returns new array
	addNextCombination(nextCombination, results) {
		const res = this.cloneArray(results);
		results = null;
		res.push(nextCombination)
		return res;
	}

	turnWheel(wheelNum, combination, comboWheelVal, targetWheelVal, isUp) {

			// console.log(`>>> wheelNum: ${wheelNum}; combination: ${combination}; comboWheelVal: ${comboWheelVal}; targetWheelVal: ${targetWheelVal}; `);
			
			// const isInc = this.isIncremental(comboWheelVal, targetWheelVal);
			console.log(`isUp: ${isUp}`);
			if(isUp) {
				comboWheelVal += 1;
			} else {
				comboWheelVal -= 1;
			}
			// console.log(`>>> comboWheelVal: ${comboWheelVal}; (comboWheelVal%10).toString(): ${(comboWheelVal%10).toString()}`);
			const nextComboArr = [...combination]
			nextComboArr.splice(wheelNum, 1, (((comboWheelVal%10)+10)%10).toString());
			// console.log(`>>> wheelNum: ${wheelNum}; nextComboArr: ${nextComboArr}; comboWheelVal: ${comboWheelVal}; targetWheelVal: ${targetWheelVal}; `);
			// console.log(`>>> nextComboArr: ${JSON.stringify(nextComboArr)}; or ${nextComboArr}`);
			// console.log(`>>> nextCombo: ${JSON.stringify(nextCombo)}; or ${nextCombo}`);
			return nextComboArr.join("");
	}

	isIncremental(comboWheelVal, targetWheelVal) {
		let res = null;
		if(targetWheelVal >= comboWheelVal) {
			const inc = targetWheelVal - comboWheelVal;
			const dec = comboWheelVal + 10 - targetWheelVal;
			if(inc <= dec) {
				res = true;
			} else {
				res = false;
			}
		} else {
			const inc = targetWheelVal + 10 - comboWheelVal;
			const dec = comboWheelVal - targetWheelVal;
			if(inc <= dec) {
				res = true;
			} else {
				res = false;
			}
		}
		return res;
	}

	getLastCombination(results) {
		// const resultsArr = results[results.length-1];
		// const lastElement = resultsArr[resultsArr.length-1];
		const resultsArr = this.cloneArray(results);
		results = null;
		const lastElement = resultsArr.pop();
		return lastElement;
	}

	getWheelValue(wheelNum, value) {
		const valueArr = [...value];
		return parseInt(valueArr[wheelNum]);
	}

	checkDeadends(combination, deadends) {
		return deadends.includes(combination);
	}

	checkTarget(combination, target) {
		return target == combination;
	}

	getNextWheel(wheelNum, target) {
		let nextWheel = wheelNum + 1;
		if(nextWheel > target.length - 1) {
			nextWheel = 0;
		}
		return nextWheel;
	}

	cloneArray(arr) {
		const ret = _.cloneDeep(arr);
		arr = null; 
		return ret;
	}




	openLock(deadends, target) {

		const variants = [['0000']];
		const res = this.pickLock(deadends, target, variants, 0);

		return res;
	}

	pickLock(deadends, target, variants, wheelNum) {
		const result = variants;
		console.log(`variants: ${JSON.stringify(variants)}; `);
		result.map(current => {
			let curr = current.slice(current.length - 1).pop();
			console.log(`>>> curr: ${JSON.stringify(curr)}`);

			if(curr == target) {
				console.log(`****************************** BINGO`);
				return result;
			}
			const charCurr = [...curr];
			const curWheelVal = [...curr][wheelNum];
			const targWheelVal = target[wheelNum];
			console.log(`curr: ${JSON.stringify(curr)}; charCurr: ${JSON.stringify(charCurr)}; wheelNum: ${wheelNum}; curWheelVal: ${curWheelVal}; targWheelVal: ${targWheelVal}`);
			if(curWheelVal == targWheelVal) {

				let nextWheel = wheelNum+1;
				if(nextWheel > 3) {
					nextWheel = 0;
				}

				result.concat(this.pickLock(deadends, target, result, nextWheel));
			} else {
				// 0001
				let tspl = [...curr];
				let nextWheelValue = (parseInt(curWheelVal)+1);
				if(parseInt(curWheelVal) > parseInt(targWheelVal)) {
					nextWheelValue = (parseInt(curWheelVal)-1);
				}
				if(nextWheelValue > 9) {
					nextWheelValue = 0;
				}
				if(nextWheelValue < 0) {
					nextWheelValue = 9;
				}
				tspl.splice(wheelNum, 1, nextWheelValue.toString());
				console.log(`currSpliced: ${tspl.join("")}; wheelNum: ${wheelNum}; curWheelVal: ${curWheelVal}`);
				if(deadends.includes(tspl.join(""))) {
					
					// remove current branch
					// variants = variants.filter(x => x !== current);
					console.log(`==> cleaned variants: ${JSON.stringify(variants)}; current: ${JSON.stringify(current)}; curr: ${JSON.stringify(curr)}`);
					// Do other three then
					const otherWheels = [0,1,2,3];
					otherWheels.splice(wheelNum, 1);
					otherWheels.forEach(whn => {
						const cWVal = [...curr][whn];
						tspl = [...curr];


						let nextWheelVal = (parseInt(cWVal)+1);
						if(parseInt(cWVal) > parseInt(targWheelVal)) {
							nextWheelVal = (parseInt(cWVal)-1);
						}

						if(nextWheelVal > 9) {
							nextWheelVal = 0;
						}
						if(nextWheelVal < 0) {
							nextWheelVal = 9;
						}

						tspl.splice(whn, 1, nextWheelVal.toString());

						const deadEnd = current;
						result.push(deadEnd);
						deadEnd.push(tspl.join(""));
						console.log(`==> pushed deadEnd: ${JSON.stringify(deadEnd)} to variants: ${JSON.stringify(variants)} for wheelNum: ${whn}`);
						
						let nextWh = whn+1;
						if(nextWh > 3) {
							nextWh = 0;
						}
						result.concat(this.pickLock(deadends, target, result, nextWh));
					});

				} else {
					current.push(tspl.join(""));
					result.concat(this.pickLock(deadends, target, result, wheelNum));
				}
			}
		});
		return result;
	}

}

const run = () => {
	const locks = new Locks();
	locks.main();
}

run();