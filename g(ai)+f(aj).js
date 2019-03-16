// 给定一个数组，从中选则两个元素 ai，aj 使得  g(ai)+f(aj)的值最大，其中g,f 是一元函数。 动态规划实现

function test(fn, opts) {
	const max = opts.max;
	const n = opts.n;
	let times = opts.times;
	
	while (times--) {
		const input = new Array(n).fill(0).map(item => Math.floor(Math.random() * max));
		const value1 = base(input);
		const value2 = fn(input);
		if (value1 !== value2) {
			console.log(value1, value2, input);
			return false;
		}
		console.log(value1, input);
	}
	return true;	
}

function target(x, y) {
	return y - x;
}
function base(arr) {
	let max = - Infinity;
	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			max = Math.max(max, target(arr[i], arr[j]));
		}
	}
	return max;
}

function reduce(arr) {
	if (arr.length < 2) {
		throw new Error('输入参数错误，数组长度不能小于2！');
	} else if (arr.length === 2) {
		return [target(arr[0], arr[1]), Math.min(arr[0], arr[1])];
	} else {
		const reduceResult = reduce(arr.slice(0, arr.length - 1));
		// 组合要么包含最后一个，要么不包含；取最优值
		let subArrMin = reduceResult[1];
		const last = arr[arr.length - 1];
		let max = Math.max(last - subArrMin, reduceResult[0]);
		return [max, Math.min(subArrMin, last)];
	}
}

function downToUp(arr) {
	let subArrMin = Math.min(arr[0], arr[1]);
	let max = target(arr[1], arr[2]);
	let n = 2;
	const len = arr.length;
	while (n < len) {
		max = Math.max(arr[n] - subArrMin, max);
		subArrMin = Math.min(arr[n], subArrMin);
		
		++n;
	}
	return max;
}

test((arr) => {return reduce(arr)[0]}, {max: 20, n: 7, times: 5});

