let progress = 0;

let progressBar = document.getElementById("progress");
let monkey = document.getElementById("monkey");
let percentText = document.getElementById("percent");

let apple = document.getElementById("endApple");
let sweetPotato = document.getElementById("endSweetPotato");

let totalTime = 20; 
let elapsedTime = 0;


window.addEventListener("load", () => {
    const overlay = document.getElementById("loadingOverlay");
    setTimeout(() => {
        overlay.style.display = "none";
    }, 1000);
});


let queueCount = 50;
let queueElement = document.getElementById("queueCount");

let queueTimer = setInterval(() => {
    if (queueCount > 0) {
        queueCount--;
        queueElement.textContent = queueCount;
    } else {
        clearInterval(queueTimer);
    }
}, 300);


let waitTimeText = document.createElement("div");
waitTimeText.id = "waitTime";
document.getElementById("status").appendChild(waitTimeText);


let startTime = Date.now();

let timer = setInterval(() => {


    elapsedTime = (Date.now() - startTime) / 1000;
    progress = Math.min(100, (elapsedTime / totalTime) * 100);

    progressBar.style.width = progress + "%";
    monkey.style.left = progress + "%";
    percentText.textContent = Math.floor(progress) + "%";


    let remaining = Math.max(0, totalTime - elapsedTime);
    waitTimeText.textContent = "小猴子正在努力中，還需要約 " + remaining.toFixed(1) + " 秒 ⏳";


    if (progress > 50 && queueCount > 0) {
        queueCount = Math.max(0, queueCount - 2);
        queueElement.textContent = queueCount;
    }

    checkCollision();


    if (progress >= 100) {
        clearInterval(timer);

        waitTimeText.textContent = "處理完成，即將重新整理...";

        setTimeout(() => {
            location.reload();
        }, 1000);
    }

}, 100);


function checkCollision() {
    let monkeyRect = monkey.getBoundingClientRect();
    let appleRect = apple.getBoundingClientRect();
    let potatoRect = sweetPotato.getBoundingClientRect();

    if (
        monkeyRect.right > appleRect.left &&
        monkeyRect.left < appleRect.right &&
        monkeyRect.bottom > appleRect.top &&
        monkeyRect.top < appleRect.bottom
    ) {
        apple.style.display = "none";
    }

    if (
        monkeyRect.right > potatoRect.left &&
        monkeyRect.left < potatoRect.right &&
        monkeyRect.bottom > potatoRect.top &&
        monkeyRect.top < potatoRect.bottom
    ) {
        sweetPotato.style.display = "none";
    }
}