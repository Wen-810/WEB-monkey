const toggle = document.getElementById("toggle");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

toggle.addEventListener("click", () => {
  if(password.type === "password"){
    password.type = "text";
    toggle.innerText = "隱藏";
  } else {
    password.type = "password";
    toggle.innerText = "顯示";
  }
});

loginBtn.addEventListener("click", login);

// Enter 登入
document.addEventListener("keydown", (e)=>{
  if(e.key === "Enter"){
    login();
  }
});

function fakeAPI(account, password){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      if(account === "test" && password === "1234"){
        resolve("success");
      } else {
        reject("error");
      }
    }, 1200);
  });
}

function login(){
  const account = document.getElementById("account").value;
  const pwd = password.value;
  const error = document.getElementById("error");
  const loading = document.getElementById("loading");

  error.innerText = "";

  if(account === "" || pwd === ""){
    error.innerText = "請輸入帳號與密碼";
    return;
  }

  loading.classList.remove("hidden");

  fakeAPI(account, pwd)
    .then(()=>{
      loading.classList.add("hidden");
      alert("登入成功（模擬）");
    })
    .catch(()=>{
      loading.classList.add("hidden");
      error.innerText = "帳號或密碼錯誤";
    });
}

// 第三方登入
document.querySelector(".google-btn").addEventListener("click", ()=>{
  alert("Google 登入（模擬）");
});

document.querySelector(".fb-btn").addEventListener("click", ()=>{
  alert("Facebook 登入（模擬）");
});

// 下方忘記密碼提示
document.querySelector(".extra-forgot").addEventListener("click", ()=>{
  alert("下方忘記密碼（模擬點擊事件）");
});