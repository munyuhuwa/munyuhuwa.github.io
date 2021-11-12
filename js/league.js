const UnitVariance = 43.8;
const N_MC_LOOP = 1000000;

function readCurrentPts() {
    const text = document.getElementById('current-pts').value;
    const rows = text.split('\n');
    // console.log(rows);
    let pts = [];
    for (let row of rows) {
        let pt = parseFloat(row);
        if (! Number.isFinite(pt)) {
            continue;
        }
        pts.push(pt);
    }
    return pts;
}

/* ==== https://www.marketechlabo.com/normal-distribution-javascript/ */
function rnorm(){
    return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
}
/* ==== */

function simulateFinalPts(nGamesLeft, currentPts) {
    const nTeams = currentPts.length;
    const yokoidouCoefficient = UnitVariance * Math.sqrt(nGamesLeft) / Math.sqrt((nTeams - 1));
    let pts = currentPts.map(x => (x + 0.0));
    for (let i = 0; i < (nTeams - 1); ++i) {
        for (let j = (i + 1); j < nTeams; ++j) {
            let delta = rnorm() * yokoidouCoefficient;
            pts[i] += delta;
            pts[j] -= delta;
        }
    }
    return pts;
}

function getRanks(arr) {
    /* ==== https://goma.pw/article/2017-01-31-0/ */
    var sorted = arr.slice().sort(function(a, b){return b - a});
    var ranks = arr.slice().map(function(x){return sorted.indexOf(x)});
    /* ==== */
    return ranks;
}

document.getElementById('do-calc').addEventListener('click', function(){
    let nGamesLeft = document.getElementById('n-games-left').value;
    nGamesLeft = parseInt(nGamesLeft);
    if (! Number.isInteger(nGamesLeft)) {
        alert('残りゲーム数が不正です');
        return;
    }
    let currentPts = readCurrentPts();
    let nTeams = currentPts.length;
    if (nTeams < 2 || nTeams > 20) {
        alert('チーム数の対応範囲は2～20チームです。');
        return;
    }

    let rankCounts = [...Array(nTeams)].map(() => Array(nTeams).fill(0));
    for (let i = 0; i < N_MC_LOOP; ++i) {
        let pts = simulateFinalPts(nGamesLeft, currentPts);
        let ranks = getRanks(pts);
        for (let teamId = 0; teamId < nTeams; ++teamId) {
            let rank = ranks[teamId];
            rankCounts[teamId][rank] += 1;
        }
    }

    let text = '';
    for (let teamId = 0; teamId < nTeams; ++teamId) {
        for (let rank = 0; rank < nTeams; ++rank) {
            text += (1.00 * rankCounts[teamId][rank] / N_MC_LOOP).toFixed(3);
            text += '\t';
        }
        text += '\n';
    }

    document.getElementById('output').value = text;
});