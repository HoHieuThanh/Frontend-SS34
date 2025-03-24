const formE = document.querySelector("form");
const emailInputE = document.getElementById("email");
const passwordInputE = document.getElementById("password");
const passwordCheckE = document.getElementById("check-password");
const inputElement = document.querySelectorAll("input")
let infor = {};

formE.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInputE.value.trim();
    const inforLocal = JSON.parse(localStorage.getItem("infor"));    
    if(!email){
        alert("Email không được để trống");
        return;
    } else if(email === inforLocal.email){
        alert("Email đã tồn tại");
        return;
    }

    const password = passwordInputE.value.trim();
    if(!password){
        alert("Mật khẩu không được để trống");
        return;
    }

    const checkPassword = passwordCheckE.value.trim();
    if(checkPassword !== password){
        alert("Mật khẩu không trùng khớp")
    }
    infor = {
        email,
        password
    }
    localStorage.setItem("infor", JSON.stringify(infor))
    inputElement.value="";
})