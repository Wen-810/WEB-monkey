let progress = 0;

let progressBar = document.getElementById("progress");
let monkey = document.getElementById("monkey");
let percentText = document.getElementById("percent");

let apple = document.getElementById("endApple");
let sweetPotato = document.getElementById("endSweetPotato");

// ⭐ 總等待時間（可自行調整）
let totalTime = 20; // 秒
let elapsedTime = 0;

// 顯示倒數時間
let waitTimeText = document.createElement("div");
waitTimeText.id = "waitTime";
document.getElementById("status").appendChild(waitTimeText);

let timer = setInterval(() => {

    if (progress < 100) {
        progress += 1;

        progressBar.style.width = progress + "%";
        monkey.style.left = progress + "%";
        percentText.textContent = progress + "%";

        // ⭐ 更新經過時間
        elapsedTime += totalTime / 100;

        // ⭐ 計算剩餘時間（倒數）
        let remaining = Math.max(0, totalTime - elapsedTime);

        waitTimeText.textContent = "剩餘時間：約 " + remaining.toFixed(1) + " 秒";

        checkCollision();
    }

    // ⭐ 進度完成自動重新整理
    if (progress >= 100) {
        clearInterval(timer);

        waitTimeText.textContent = "處理完成，即將跳轉...";

        setTimeout(() => {
            location.reload();
        }, 1000);
    }

}, totalTime * 10); 
// 👉 每次間隔依照總時間動態分配（讓整體剛好跑完 totalTime）

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