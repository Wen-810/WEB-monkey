let progress = 0;

let progressBar = document.getElementById("progress");
let monkey = document.getElementById("monkey");
let percentText = document.getElementById("percent");

// 模擬進度條
setInterval(() => {
    if (progress < 100) {
        progress += 1;
        progressBar.style.width = progress + "%";

        // 小猴子跟著移動
        monkey.style.left = progress + "%";

        percentText.textContent = progress + "%";
    }
}, 200);