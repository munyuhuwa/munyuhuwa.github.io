import { CsvConverter, } from './CsvConverter.js';

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
		})
		.catch((error) => {
			alert(error);
		})
		.then(updateSlogan);
}

function drawGacha(len) {
	if (!sloganParts[len] || sloganParts[len].length < 1) {
		return '';
	}
	let index = Math.floor(Math.random() * sloganParts[len].length);
	return sloganParts[len][index];
}

function updateSlogan() {
	let $slogan = document.querySelectorAll('.slogan');
	let $protectSwitch = document.querySelectorAll('.protect-switch');
	let ku = '';
	const lens = { 0: 5, 1: 7, 2: 5, };
	for (let i = 0; i < Object.keys(lens).length; ++i) {
		let part;
		if ($protectSwitch[i].checked) {
			part = $slogan[i].textContent;
		} else {
			part = drawGacha(lens[i]);
		}
		ku += part + ' ';
		$slogan[i].textContent = part;
	}
	console.log(ku);
	ku += '\n【麻雀標語ガチャ】';
	const $tweetContainer = document.getElementById('tweet-container');
	while ($tweetContainer.firstChild) {
		$tweetContainer.removeChild($tweetContainer.firstChild);
	}
	twttr.widgets.createShareButton(
		"",
		$tweetContainer,
		{
			size: "large",
			text: ku,
			via: "munyuhuwa",
		}
	);	
}

function loadFinished() {
	// 標語パーツを読み込む
	prepareSloganParts();
	// イベントをバインド
	document.querySelectorAll('.gacha').forEach(target => {
		target.addEventListener('click', updateSlogan);
	});
};

window.addEventListener('load', loadFinished);
