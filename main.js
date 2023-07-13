let startTime = 0;
let combo = 0;
let isPer = false;

window.addEventListener('keydown', e => {
    let track = e.key.toUpperCase();
    if (document.getElementById(`trackBtn${track}`)) {
        document.getElementById(`trackBtn${track}`).style.backgroundColor = 'rgba(148, 179, 226, .800)';
        isJudge(track);
    }
});

window.addEventListener('keyup', e => {
    let track = e.key.toUpperCase();
    if (document.getElementById(`trackBtn${track}`)) {
        document.getElementById(`trackBtn${track}`).style.backgroundColor = 'rgba(255, 255, 255, .253)';
    }
});

function start() {
    document.getElementById('start').style.display = 'none';
    setTimeout(() => {
        var audio = new Audio('songs/EARTH.mp3');
        audio.play();
    }, 1300);
    startTime = new Date().getTime();
    setInterval(() => {
        var nowTime = Math.floor(new Date().getTime() / 10);
        for (let i = 0; i < song.note.length; i++) {
            if (Math.floor((startTime + song.note[i].time) / 10) == nowTime && !song.note[i].noted) {
                song.note[i].noted = true;
                var test = document.createElement('div');
                test.classList.add('tile');
                test.classList.add(`t${i}`);
                document.getElementById(`track${song.note[i].track}`).appendChild(test);
                setTimeout(() => {
                    if (document.getElementsByClassName(`t${i}`)[0]) {   
                        document.getElementsByClassName(`t${i}`)[0].style.display = 'none';
                    }
                    setTimeout(() => {
                        if (!isPer) {
                            console.log(1);

                            combo = 0;
                            document.getElementById('combo').innerHTML = `COMBO: ${combo}`;

                            document.getElementById(`track${song.note[i].track}`).style.background = 'linear-gradient(to top, red, rgba(255, 255, 255, .253))';
                            setTimeout(() => {
                                document.getElementById(`track${song.note[i].track}`).style.background = 'rgba(255, 255, 255, .253)';
                            }, 100);
                        }

                        document.getElementsByClassName(`t${i}`)[0]?.remove();
                        isPer = false;
                    }, 100);
                }, 3000);
            }
        }
    }, 1);
}

function isJudge(track) {
    var nowTime = Math.floor(new Date().getTime() / 10);


    for (let i = 0; i < song.note.length; i++) {
        if (song.note[i].track == track) {
            if (nowTime + 40 >= Math.floor((startTime + song.note[i].time) / 10) + 300 && Math.floor((startTime + song.note[i].time) / 10) + 300 >= nowTime && !song.note[i].played) {
                isPer = true;
                song.note[i].played = true;
                if (nowTime + 10 >= Math.floor((startTime + song.note[i].time) / 10) + 300 && Math.floor((startTime + song.note[i].time) / 10) + 300 >= nowTime) {
                    combo += 1;
                    document.getElementById('combo').innerHTML = `COMBO: ${combo}`;
                    document.getElementsByClassName(`t${i}`)[0]?.remove();
                    document.getElementById(`track${track}`).style.background = 'linear-gradient(to top, rgb(200, 200, 200), rgba(255, 255, 255, .253))';
                    setTimeout(() => {
                        document.getElementById(`track${track}`).style.background = 'rgba(255, 255, 255, .253)';
                        setTimeout(() => {
                            isPer = false;
                        }, 500);
                    }, 100);
                } else {
                    combo = 0;
                    document.getElementById('combo').innerHTML = `COMBO: ${combo}`;
                    document.getElementsByClassName(`t${i}`)[0].remove();
                    document.getElementById(`track${track}`).style.background = 'linear-gradient(to top, red, rgba(255, 255, 255, .253))';
                    setTimeout(() => {
                        document.getElementById(`track${track}`).style.background = 'rgba(255, 255, 255, .253)';
                    }, 100);
                }
            }
        }
    }
}