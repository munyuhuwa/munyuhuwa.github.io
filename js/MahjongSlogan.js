let sloganParts = {
	5: [],
	7: [],
};

function prepareSloganParts() {
	fetch('../asset/slogan-parts.csv')
		.then((response) => response.text())
		.then((result) => {
			let arr = CsvConverter.csvToArray(result);
			for (let row of arr) {
				if (row[0] == '5') {
					sloganParts[5].push(row[1]);
				} else if (row[0] == '7') {
					sloganParts[7].push(row[1]);
				}
			}
		});
}

function drawGacha(len) {
	if (!sloganParts[len] || sloganParts[len].length < 1) {
		return '';
	}
	let index = Math.floor(Math.random() * sloganParts[len].length);
	return sloganParts[len][index];
}

function loadFinished() {
	// 標語パーツを読み込む
	prepareSloganParts();
	// イベントをバインド
	document.querySelectorAll('.gacha').forEach(target => {
		target.addEventListener('click', () => {
			let $slogan = document.querySelectorAll('.slogan');
			const lens = { 0: 5, 1: 7, 2: 5, };
			for (let i = 0; i < Object.keys(lens).length; ++i) {
				$slogan[i].textContent = drawGacha(lens[i]);
			}
		});
	});
};

window.addEventListener('load', loadFinished);
