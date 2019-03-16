// 计算最长的不包含重复字符的子串
// 问题描述: 给定一个字符串，例如（'ababcdeffck'）,找出不存在重复字符的最长子串(abcdef)


// 使用动态规划思路，按自底向上的方式实现
function getMaxDiffSubstring(str) {
	if (!str) { return false; }
	/*
		分析： 满足条件的子串要么包含第一个元素，要么不包含，最终结果为长度最大的那些字串，
		这样原问题就转换为一个递归求解过程。且每次递归过程中都需要计算从特定位置开始的最长的字符串，这个问题本身也可以递归描述。
		其实如果计算出了每个位置开始的最长字符串，那遍历一次就能都到最大的子串位置了
	*/
	
	
	// 统计字符在字符串中的位置分布
	const map = {};
	let c;
	for (let i = 0; i < str.length; i++) {
		c = str[i];
		if (!(c in map)) {
			map[c] = {
				pos: [i]
			};
		} else {
			map[c].pos.push(i);
		}
	}
	// 为了方便计算下一个相同字符的位置，使用指针指当前正在处理的字符的位置
	for (c in map) {
		map[c].cur = map[c].pos.length - 1;
	}
	
	// 自底向上计算每个位置开始的最长不重复字符串
	const maxLens = new Array(str.length).fill(1); // 存储对应位置上字符开始的最长子串，值表示子串的有边界位置（不含）
	let i = str.length - 1;
	// 处理最后一个字符
	c = str[i];
	maxLens[i] = str.length;
	map[c].cur--;
	let nextChar;
	const MAX_POS = str.length;
	while(--i >= 0) { // 从倒数第二个
		c = str[i];
		let cur = map[c].cur;
		// 下一个相同字符的位置，是最大字串的约束边界
		let nextSameCharPos = cur === map[c].pos.length - 1 ? MAX_POS : map[c].pos[cur + 1];
		// 最大字串不能越过下个相同字符，且不能越过后一个字符开头的最大串的右边边界，最终值为两个边界的在左的边界
		maxLens[i] = Math.min(nextSameCharPos, maxLens[i + 1]);
		map[c].cur--;
	}
	
	
	let pos = [];
	let max = 0;
	maxLens.forEach((end, start) => {
		const len = end - start;
		if (max < len) {
			pos = [start];
			max = len;
		} else if (max === len) {
			pos.push(start);
		}
	})
	
	return pos.map(i => str.slice(i, i + max));
}

// test:
[['ababcdeffck', 'abcdef']].forEach(item => {
	console.log(getMaxDiffSubstring(item[0])[0] === item[1])
})