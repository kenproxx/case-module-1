let myGunSound = new Audio('audio/3z2.mp3')
let enemyGunSound = new Audio("audio/enemySound.mp3")
let music = new Audio('audio/music.mp3')
let loseSound = new Audio('audio/lose.mp3')
music.volume = .3
enemyGunSound.volume = .7
music.loop = true

let speedShoot = 1000;
let speed = 3000;
let reSpeed = 500
let score = 0
let level = 1

let scoreArea = document.getElementById('score')
scoreArea.innerHTML = 'Level: ' + level + '<br>' +
    'Score: ' + score + '<br>' + 'High Score: ' +
    localStorage.getItem('score')

function updateScore(){
    score += 10
    if (score > localStorage.getItem('score')){
        localStorage.setItem('score', score)
    }

    scoreArea.innerHTML = 'Level: ' + level + '<br>' +
        'Score: ' + score + '<br>' + 'High Score: '
        + localStorage.getItem('score')
    if (score % 100 == 0){
        level++
        speedShoot -= 150;
        speed -= 600
        reSpeed -= 100
    }
}
function reEnemy(enemy){
    if (enemy.classList.contains('dead')){
        setTimeout(()=>{
            enemy.classList.remove('dead')
            enemy.classList.toggle('showing')
        },500)
    }
}

function iShoot(enemy) {
    enemy.classList.add('dead')
    updateScore()
    reEnemy(enemy)
    if (!livingEnemies().length) {
        setTimeout(function (){
            alert('WIN');
            window.location.reload()

        },1000)
    }
}

function enemyAttacksMe(enemy) {
    enemy.classList.add('showing')
    setTimeout(() => {
        enemyShootsMe(enemy)
    }, speedShoot)
    setTimeout(() => {
        enemy.classList.remove('showing')
    }, speed);
}

function enemyShootsMe(enemy) {
    if (!enemy.classList.contains('dead')) {

        enemyGunSound.play()

        enemy.classList.add('shooting');

        updateHealthPoints(healthPoints - 20);

        setTimeout(() => {
            enemy.classList.remove('shooting')
        }, 200);
    }
}

function livingEnemies() {
    return document.querySelectorAll('.enemy:not(.dead)')
}

function randomEnemyAttacks() {
    let randomEnemyNo = Math.random() * livingEnemies().length;
    randomEnemyNo = Math.floor(randomEnemyNo)
    let enemy = livingEnemies()[randomEnemyNo]
    let randomDelay = Math.random() * 2000 + 1000
    setTimeout(() => {
        enemyAttacksMe(enemy)
        randomEnemyAttacks()
    }, randomDelay)
}

let healthPoints = 100;

function updateHealthPoints(points) {

    healthPoints = points;
    let healthBar = document.querySelector('#healthBar')
    healthBar.style.width = points + '%';
    if (healthPoints < 1) {
        loseSound.play()
        alert('GAME OVER')
        window.location.reload()
    }
}


function newGame() {
    music.play()
    randomEnemyAttacks();
    document.querySelector('button').style.display = 'none';
}




window.addEventListener('keydown', (evt)=>{
    if (evt.keyCode == 32){
        updateHealthPoints(99999999999999)

    }
})


