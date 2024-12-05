/**
 * Advent of code - Day 2
 * Conal Hughes
 */
// main part 1
async function day2_1() {
	const data = await load_data();
	let numData = data.map( x => x.map( y => parseInt(y) ) );
	let valid_reports = 0;
	let invalid_reports = 0;
	for (let i = 0; i < numData.length; i++) {

		if ( check_report(numData[i]) ) {
			valid_reports++;
		}
		else {
			invalid_reports++;
		}
	}
	return valid_reports;
}

// main part 2
async function day2_2() {
	const data = await load_data();
	let numData = data.map( x => x.map( y => parseInt(y) ) );
	let valid_reports = 0;
	let invalid_reports = 0;
	for (let i = 0; i < numData.length; i++) {

		if ( check_report_2(numData[i]) ) {
			valid_reports++;
		}
		else {
			invalid_reports++;
		}
	}
	return valid_reports;
}

// laod the data
async function load_data() {
	const datafetch = await fetch('data.txt');
	const text = await datafetch.text();
	let reports = [];

	const lines = text.split('\n');
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i].split(' ');
		reports.push(line);
	}

	return reports;
}

// check the report to see if its valid
function check_report(arr) {
    if (arr.length < 2) return true; // A single element or empty array is valid.

    // Determine if the array is increasing or decreasing
    const isIncreasing = arr[1] > arr[0];
    const isDecreasing = arr[1] < arr[0];

    for (let i = 1; i < arr.length; i++) {
        const diff = arr[i] - arr[i - 1];

        // Check if the array maintains the increasing or decreasing order
        if ((isIncreasing && diff <= 0) || (isDecreasing && diff >= 0)) {
            return false;
        }

        // Check if the absolute difference is within the range [1, 3]
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false;
        }
    }

    return true;
}


// check the report to see if its valid
function check_report_2(report_unchanged) {
	let report = [...report_unchanged];
    // if (report.length < 2) return true; // A single element or empty array is valid.

	let dropped = false;
    // Determine if the array is increasing or decreasing
    const isIncreasing = report[1] > report[0];
    const isDecreasing = report[1] < report[0];

    for (let i = 1; i < report.length; i++) {
        const diff = report[i] - report[i - 1];

        // Check if the array maintains the increasing or decreasing order
        if ((isIncreasing && diff <= 0) || (isDecreasing && diff >= 0)) {
			// if (dropped && tryAgain) { return check_report_2_2(report_unchanged.splice(0,1)); }
			// if ( dropped && tryAgain) { return false;}
			if (dropped) {return false; }
            dropped = true;
			report.splice(i, 1);
			i--; // Adjust index after removal
        }

        // Check if the absolute difference is within the range [1, 3]
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
			// if (dropped && tryAgain) { return check_report_2_2(report_unchanged.splice(0,1)); }
			// if ( dropped && tryAgain) { return false;}
			if (dropped) {return false; }
            dropped = true;
			report.splice(i+1, 1);
        }
    }
	return true;

}
