let progress = 0;

let progressBar = document.getElementById("progress");
let monkey = document.getElementById("monkey");
let percentText = document.getElementById("percent");

let apple = document.getElementById("endApple");
let sweetPotato = document.getElementById("endSweetPotato");

window.addEventListener("load", () => {
    const overlay = document.getElementById("loadingOverlay");
    setTimeout(() => {
        overlay.style.display = "none";
    }, 1000);
});


let queueElement = document.getElementById("queueCount");
let queueCount = parseInt(queueElement.textContent);
let initialQueue = queueCount;
let waitTimeText = document.createElement("div");
waitTimeText.id = "waitTime";
document.getElementById("status").appendChild(waitTimeText);


let queueTimer = setInterval(() => {
    if (queueCount > 0) {
        let change = Math.random();
        if (change < 0.6) {
            queueCount -= 1;
        } else if (change < 0.9) {
            queueCount -= 2;
        } else {
            queueCount += 1; 
        }
        queueCount = Math.max(0, queueCount);
        queueElement.textContent = queueCount;

    } else {
        clearInterval(queueTimer);
    }

}, 400);



let timer = setInterval(() => {

    let processed = initialQueue - queueCount;
    progress = Math.min(100, (processed / initialQueue) * 100);
    progressBar.style.width = progress + "%";
    monkey.style.left = `calc(${progress}% - 15px)`;
    percentText.textContent = Math.floor(progress) + "%";
    let estimated = queueCount * 0.3;

    waitTimeText.textContent =
        "前方還有 " + queueCount + " 人，預估等待 " + estimated.toFixed(1) + " 秒 ⏳";

    checkCollision();

    if (queueCount <= 0 || progress >= 100) {
        clearInterval(timer);
        waitTimeText.textContent = "✅ 處理完成，即將進入下一步...";

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

        queueCount = Math.max(0, queueCount - 5);
    }

    if (
        monkeyRect.right > potatoRect.left &&
        monkeyRect.left < potatoRect.right &&
        monkeyRect.bottom > potatoRect.top &&
        monkeyRect.top < potatoRect.bottom
    ) {
        sweetPotato.style.display = "none";


        queueCount = Math.max(0, queueCount - 10);
    }
    let chatToggle = document.getElementById("chatToggle");
    let chatBox = document.getElementById("chatBox");

    chatToggle.addEventListener("click", () => {
        if (chatBox.style.display === "block") {
            chatBox.style.display = "none";
        } else {
            chatBox.style.display = "block";
        }
    });
}