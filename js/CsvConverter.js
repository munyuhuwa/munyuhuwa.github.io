export class CsvConverter {
	static NEWLINE = /\r?\n/;
	static SEPARATOR = ',';
	static csvToArray(csv) {
		let arr = [];
		const lines = csv.split(this.NEWLINE);
		for (let line of lines) {
			arr.push(line.split(this.SEPARATOR));
		}
		return arr;
	}
	static arrayToCsv(arr) {
		let lines = [];
		for (let row of arr) {
			lines.push(row.join(this.SEPARATOR));
		}
		let csv = lines.join(this.NEWLINE);
		return csv;
	}
}