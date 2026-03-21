let progress = 0;

let progressBar = document.getElementById("progress");
let monkey = document.getElementById("monkey");
let percentText = document.getElementById("percent");

let apple = document.getElementById("endApple");
let sweetPotato = document.getElementById("endSweetPotato");

setInterval(() => {
    if (progress < 100) {
        progress += 1;

        progressBar.style.width = progress + "%";
        monkey.style.left = progress + "%";
        percentText.textContent = progress + "%";

        checkCollision(); 
    }

}, 200);


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