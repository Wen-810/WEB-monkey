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

// ===== Queue 設定 =====
let queueElement = document.getElementById("queueCount");

// 🔥 直接用畫面初始值
let queueCount = parseInt(queueElement.textContent);

// 🔥 記錄原始人數（關鍵）
let initialQueue = queueCount;

// ===== 等待時間顯示 =====
let waitTimeText = document.createElement("div");
waitTimeText.id = "waitTime";
document.getElementById("status").appendChild(waitTimeText);

// ===== Queue 變動（更真實）=====
let queueTimer = setInterval(() => {

    if (queueCount > 0) {

        // 🔥 隨機減少（模擬真實流量）
        let change = Math.random();

        if (change < 0.6) {
            queueCount -= 1;
        } else if (change < 0.9) {
            queueCount -= 2;
        } else {
            queueCount += 1; // 偶爾變多（真實）
        }

        queueCount = Math.max(0, queueCount);
        queueElement.textContent = queueCount;

    } else {
        clearInterval(queueTimer);
    }

}, 400);


// ===== 主動畫（改為 queue 驅動）=====
let timer = setInterval(() => {

    // 🔥 用 queue 算進度（核心）
    let processed = initialQueue - queueCount;
    progress = Math.min(100, (processed / initialQueue) * 100);

    progressBar.style.width = progress + "%";

    // 防止猴子超出
    monkey.style.left = `calc(${progress}% - 15px)`;

    percentText.textContent = Math.floor(progress) + "%";

    // 🔥 等待時間 = queue * 單位時間（更真）
    let estimated = queueCount * 0.3;

    waitTimeText.textContent =
        "前方還有 " + queueCount + " 人，預估等待 " + estimated.toFixed(1) + " 秒 ⏳";

    checkCollision();

    // 完成
    if (queueCount <= 0 || progress >= 100) {

        clearInterval(timer);

        waitTimeText.textContent = "✅ 處理完成，即將進入下一步...";

        setTimeout(() => {
            location.reload();
        }, 1000);
    }

}, 100);


// ===== 碰撞（保留）=====
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

        // 🍎 加速效果
        queueCount = Math.max(0, queueCount - 5);
    }

    if (
        monkeyRect.right > potatoRect.left &&
        monkeyRect.left < potatoRect.right &&
        monkeyRect.bottom > potatoRect.top &&
        monkeyRect.top < potatoRect.bottom
    ) {
        sweetPotato.style.display = "none";

        // 🍠 爆減 queue
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