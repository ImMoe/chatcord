const socket = io.connect("localhost:3000");

const chatName = document.getElementById("chatName");
const enter = document.getElementById("enter");

if (localStorage.getItem("chatcord") != null) {
    location.href = "/";
}

enter.addEventListener("click", function () {
    if (localStorage.getItem("chatcord") == null) {
        localStorage.setItem("chatcord", chatName.value);
        localStorage.setItem("chat_id", Math.floor(Math.random() * 9999));
        location.href = "/";
    }
});