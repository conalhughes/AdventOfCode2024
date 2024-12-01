// Version: 1.0
let col1 = [];
let col2 = [];

async function day1_part1() {
	const data = await load_data();
	col1 = data[0];
	col2 = data[1];
	// sort the columns
	col1.sort((a, b) => a - b);
	col2.sort((a, b) => a - b);
	let distance = getDistance(col1, col2, col1.length);
	console.log(distance);
	return distance;
}

async function day1_part2() {
	const data = await load_data();
	col1 = data[0];
	col2 = data[1];
	// sort the columns
	col1.sort((a, b) => a - b);
	col2.sort((a, b) => a - b);
	
	let similarity = getSimilarityScore(col1, col2, col1.length);
	// console.log(col1);
	// console.log(col2);
	console.log(similarity);
	return similarity;
}

// load data from data.txt
async function load_data() {
	const datafetch = await fetch('data.txt');
	const text = await datafetch.text();

	const lines = text.split('\n');

	col1 = [];
	col2 = [];

	for (let i = 0; i < lines.length; i++) {
		// split the line into two columns
		const line = lines[i].split('   ');
		// append the values to each column
		col1.push(parseInt(line[0]));
		col2.push(parseInt(line[1]));
	}

	return [col1, col2];
}

function getDistance(array1, array2, length) {
	let distance = 0;
	for (let i = 0; i < length; i++) {
		distance += Math.abs(array1[i] - array2[i]);
	}
	return distance;
}

function getSimilarityScore(array1, array2, length) {
	let score = 0;
	// create a list of the values in each column
	// each key is a value in the column and the value is the number of times that value appears
	let list1 = {};
	let list2 = {};
	// list of keys in both lists
	let keys = [];
	for (let i = 0; i < length; i++) {
		// if the value is not in the list, add it
		if (list1[array1[i]] == undefined) {
			list1[array1[i]] = 1;
			// add the key to the list of keys
			if(!keys.includes(array1[i])) {
				keys.push(array1[i]);
			}
		}
		// if the value is in the list, increment the value
		else {
			list1[array1[i]]++;
		}
		// repeat for the second column
		if (list2[array2[i]] == undefined) {
			list2[array2[i]] = 1;
			if(!keys.includes(array2[i])) {
				keys.push(array2[i]);
			}
		} 
		else {
			list2[array2[i]]++;
		}
	}
	console.log(keys.length);
	// calculate the similarity score
	for (let i = 0; i <= keys.length; i++) {
		let key = keys[i];
		if (key in list1 && key in list2) {
			score += key * list2[key];
		}
	}

	return score;
}