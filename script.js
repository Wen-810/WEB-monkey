let progress = 0;

let progressBar = document.getElementById("progress");
let monkey = document.getElementById("monkey");
let percentText = document.getElementById("percent");


setInterval(() => {
    if (progress < 100) {
        progress += 1;
        progressBar.style.width = progress + "%";
        monkey.style.left = progress + "%";
        percentText.textContent = progress + "%";
    }
}, 200);