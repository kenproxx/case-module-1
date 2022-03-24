let myGunSound = new Audio('audio/myGun.m4a')
let enemyGunSound = new Audio("audio/enemySound.mp3")
let music = new Audio('audio/music.mp3')
music.volume = .3
music.loop = true




function iShoot(enemy) {
    enemy.classList.add('dead')


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
    }, 1000)
    setTimeout(() => {
        enemy.classList.remove('showing')
    }, 3000);
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
        alert('GAME OVER')
        window.location.reload()
    }
}


function newGame() {
    randomEnemyAttacks();
    document.querySelector('button').style.display = 'none';
}




