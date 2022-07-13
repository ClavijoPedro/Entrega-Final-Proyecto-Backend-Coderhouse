const socket = io();

const chatContainer = document.getElementById('mensajes');
const message = document.getElementById('userMsg');
const user = document.getElementById('userMail')
const chatTyping = document.getElementById('chatTyping')


//capturo y emito datos del userForm
const messagesForm = document.getElementById('msgsForm');
messagesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userType = user.value == "admin@admin" ? "sistema " : "usuario";
    const userMessage = { 
        email:user.value,
        type:userType,
        body:message.value,    
    };
    socket.emit('newMessage', userMessage);
    messagesForm.reset();
})

// render mensajes en cliente
socket.on('messages', msjs => {
    const messages = msjs.map(m => {
        return(`   
        <div class="uMsj mb-2 rounded text-end bg-light p-2">
        <p class="m-0 msjData">
        <small>
        <b>${m.type}</b>
        <span>${m.email}</span>
        </small>
        </p>
        <p class="m-0 msjText">
        <i>${m.body}</i>
        </p>   
        </div>
        `)
    });
    chatContainer.innerHTML = messages
    chatContainer.scrollTop = chatContainer.scrollHeight;
    chatTyping.innerHTML = ''
});

//status bar
message.addEventListener('keypress', () => {
    socket.emit('userTyping', user.value)
} );

socket.on('userTyping', (userName) => {
    chatTyping.innerHTML = `<p>${userName} está escribiendo...</p>`
})