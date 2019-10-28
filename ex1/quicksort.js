console.log("quick sort");

const main = () => {
	const arr = [9, -3, 5, 2, 6, 8, -6, 0, 13, 77, -50, 24, -12];
	console.log(`Input array: ${arr}`);
	let res = quickSort(arr, rearrange);
	console.log(`Sorted array: ${res}`);

	console.log(`Input array: ${arr}`);
	res = quickSort(arr, rearrangeInplace);
	console.log(`Sorted in=place array: ${res}`);
	console.log(`Input array: ${arr}`);
}

const quickSort = (arr, method) => {
	return method(arr, arr.length-1, 0, arr.length -1);
}

const rearrange = arr => {
	let left = [];
	let right = [];
	const pivot = arr[arr.length - 1];
	if(arr.length < 2) {
		return arr;
	} else {
		arr.map(x => {
			if(x < pivot) {
				left.push(x);
			} else if (x > pivot) {
				right.push(x);
			}
		});
		// left.push(pivot);
		// console.log(`left=${left}`);
		// console.log(`right=${right}`);
		return rearrange(left).concat([pivot]).concat(rearrange(right));
	}
}

const rearrangeInplace = (arr, start, end) => {

	console.log(`start=${start}; end=${end}; arr[${start}]=${arr[start]}; arr[${end}]=${arr[end]}`);

	if(start >= end) {
		return arr;
	}
	let idx = partition(arr, start, end);
	rearrangeInplace(arr, 0, idx-1);
	rearrangeInplace(arr, idx + 1, end);
}


const partition = (arr, start, end) => {
	let pivot = arr[end];
	let pIndex = start;
	for(let i=start; i<end; i++) {
		if(arr[i] <= pivot) {
			arr = swap(arr, i, pIndex);
			pIndex++;
		}
	}
}

const swap = (arr, idx1, idx2) => {
	console.log(`~~~~~> arr=${arr}; idx1=${idx1}; idx2=${idx2}`);
	const temp = arr[idx1];
	arr[idx1] = arr[idx2];
	arr[idx2] = temp;
	return arr;
}

main();