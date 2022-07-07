const socket = io();

const chatScroll = document.getElementById('mensajes');
chatScroll.scrollTop = chatScroll.scrollHeight;


//traigo los datos del userForm y los emito
const messagesForm = document.getElementById('msgsForm');
messagesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userMessage = { 
        email:document.getElementById('userMail').value,
        type:'usuario',
        body:document.getElementById('userMsg').value,    
    };
    socket.emit('newMessage', userMessage);
    messagesForm.reset();
})

// capturo el evento messages y lo renderizo
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
    document.getElementById('mensajes').innerHTML = messages
});