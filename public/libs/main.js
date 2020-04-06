
const socket = io.connect();
const today = new Date();

const greetings = [
    "hold my beer!",
    "i can't believe it!",
    "sup dawg!",
    "habba babba",
    "tell him something.",
    "welcome boss"
];

if (localStorage.getItem("chatcord") == null) {
    location.href = "/entre.html";
} else {

    socket.emit("connected", localStorage.getItem("chatcord"));
    const user = localStorage.getItem("chatcord");

    const message = document.getElementById("message");
    const sendButton = document.getElementById("send");
    const chat = document.getElementById("chat");
    const typing = document.getElementById("typing");

    sendButton.addEventListener("click", newMessage);
    message.addEventListener("keypress", broadcastMessage);

    function newMessage() {
        socket.emit("message", {
            message: message.value,
            sender: user
        });
    }

    function broadcastMessage() {
        socket.emit("typing", user);
    }

    socket.on("message", function (data) {
        message.value = "";
        typing.innerHTML = "";
        chat.insertAdjacentHTML("afterbegin", `
        <div class="chat-message px-2 d-flex justify-content-between">
            <p><strong>${data.sender}: </strong>${data.message}</p>
            <p>${today.toLocaleDateString()}</p>
        </div>
        `);
    });

    socket.on("typing", function (user) {
        typing.innerHTML = `<i class="text-light">${user} is typing...</i>`;
    });

    socket.on("connected", function (data) {
        const arrival = document.createElement("i");
        arrival.className = "d-block px-2 text-light py-2";
        arrival.innerText = `${data} joined ${greetings[Math.floor(Math.random() * greetings.length)]}`;
        chat.prepend(arrival);
    });

}