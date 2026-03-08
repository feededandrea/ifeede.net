

function send(){

let msg=document.getElementById("msg").value
let chat=document.getElementById("chat")

if(msg!=""){

chat.innerHTML+="<br><b>Feede:</b> "+msg
document.getElementById("msg").value=""

}

}

/* DRAG */

let msn=document.getElementById("msnWrapper")

let offsetX=0
let offsetY=0
let isDown=false

msn.addEventListener("mousedown",function(e){

isDown=true

offsetX=msn.offsetLeft-e.clientX
offsetY=msn.offsetTop-e.clientY

})

document.addEventListener("mouseup",function(){
isDown=false
})

document.addEventListener("mousemove",function(e){

if(!isDown)return

msn.style.left=(e.clientX+offsetX)+"px"
msn.style.top=(e.clientY+offsetY)+"px"

msn.style.bottom="auto"
msn.style.right="auto"

})



// === LISTADO DE ICONOS ===
var iconMap = {
  "<3": "<span class='heartSmall'> </span>",
  ":)": "<span class='smileSmall'> </span>",
  ":(": "😢",
  ":D": "😄",
  ":cd": "<span class='discoSmall'> </span>",
  ":eyes": "<span class='eyesSmall'> </span>",
  ":circle": "<span class='circleSmall'> </span>"
};

// === ENVIAR MENSAJE ===
function sendMessage(name){
  var input = document.getElementById("msg_"+name);
  var msg = input.value.replace(/^\s+|\s+$/g,''); // trim
  if(msg==="") return;

  // Reemplazar iconos en el mensaje del usuario
  for(var key in iconMap){
    var re = new RegExp(key.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g');
    msg = msg.replace(re, iconMap[key]);
  }

  chats[name].push("<b>Feede:</b> "+msg);
  input.value = "";
  updateChatWindow(name);

  // Respuesta automática con iconos
  setTimeout(function(){
    var pair = botReplies[Math.floor(Math.random()*botReplies.length)];
    var reply = pair[Math.floor(Math.random()*pair.length)];

    for(var key in iconMap){
      var re = new RegExp(key.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g');
      reply = reply.replace(re, iconMap[key]);
    }

    chats[name].push("<b>"+name+":</b> "+reply);
    updateChatWindow(name);
  }, 3000);
}



// === VARIABLES GLOBALES ===
var users = document.getElementById("msnUsers").getElementsByClassName("user");
var chatContainer = document.getElementById("chatContainer");
var chats = {};
var activeUser = null;

// FICHA SUPERIOR
var chatProfilePhoto = document.getElementById("chatProfilePhoto");
var chatProfileName = document.getElementById("chatProfileName");
var chatProfileStatus = document.getElementById("chatProfileStatus");
var chatProfileText = document.getElementById("chatProfileText");

// DATOS DE CADA USUARIO
var contactData = {
  "Agu": {name:"Agu", photo:"msnIcons/contact-agu.png", status:"Disponible", text:"Escuchando música y probando MSN retro."},
  "Santi": {name:"Santi", photo:"msnIcons/contact-santi.png", status:"Disponible", text:"Viendo cosas de tecnología."},
  "Axel": {name:"Axel", photo:"axel.jpg", status:"Ausente", text:"No me molestes."},
  "Caami M": {name:"Caami M", photo:"cami.jpg", status:"Disponible", text:"Los hombres van y vienen pero el pop es para siempre. <span class='heartSmall'> </span>"},
  "Denu": {name:"Denu", photo:"denu.JPG", status:"Ausente", text:"A veces si puedo ser un poco racista."},
  "Chechu": {name:"Chechu", photo:"chechu.JPG", status:"Disponible", text:"Comer Chocolate"},
  "Celular": {name:"Celes", photo:"celes.JPG", status:"En espera", text:"Conectado desde el teléfono."}
};

// MENSAJES INICIALES
var initialMsgs = {
  "Agu":["<b>Agu:</b> hola fede","<b>Feede:</b> probando msn retro 😄"],
  "Santi":["<b>Santi:</b> Hey, como va?","<b>Feede:</b> todo bien!"],
  "Axel":["<b>Axel:</b> que onda","<b>Feede:</b> todo tranqui"],
  "Caami M":["<b>Caami:</b> hola!","<b>Feede:</b> hola Caami"],
  "Denu":["<b>Denu:</b> estás online?","<b>Feede:</b> si!"],
  "Chechu":["<b>Chechu:</b> fede!","<b>Feede:</b> chechu!!"],
  "Celular":["<b>Celular:</b> llamame","<b>Feede:</b> dale"]
};

// RESPUESTAS AUTOMÁTICAS
var botReplies = [
  ["Holaa!", "Todo bien amigo??"],
  ["jajajajajjaaj te amoo", "que hacias?"],
  ["aca ando", "vos?"],
  ["jajaja mal", "me hiciste reir"],
  ["estaba escuchando musica", "alto tema sonaba"],
  ["despues te paso eso", "lo tengo guardado"],
  ["sii obvio", "de una"],
  ["ni idea jajaj", "habria que probar"],
  ["buenisimo", "me encanta esa idea"],
  ["que nostalgia este msn", "quedo re bueno"],
  ["ahora vuelvo", "no te vayas"],
  ["dale despues hablamos", "te escribo en un rato"],
  ["uh que bueno eso", "contame mas"],
  ["mal ahi", "igual se puede arreglar"],
  ["estoy desde la compu", "anda bastante bien"],
  ["re da para viciar algo hoy", "tenes tiempo despues?"]
];

// === CREAR CHATS INICIALES ===
for(var i=0;i<users.length;i++){
  var name = users[i].getAttribute("data-name");
  chats[name] = initialMsgs[name] || [];

  var div = document.createElement("div");
  div.className = "chatWindow";
  div.setAttribute("data-name", name);
  div.style.display = "none";

  // Mensajes en un div interno .messages
  var messagesDiv = document.createElement("div");
  messagesDiv.className = "messages";
  messagesDiv.innerHTML = chats[name].join("<br>");
  div.appendChild(messagesDiv);

  // Input y botón
  var inputDiv = document.createElement("div");
  inputDiv.className = "chatInput";
  inputDiv.innerHTML = '<input id="msg_'+name+'" placeholder="Escribir mensaje"><button class="sendButton" type="button">Enviar</button>';
  div.appendChild(inputDiv);

  chatContainer.appendChild(div);
}

// === FUNCIONES PRINCIPALES ===
function updateProfile(name){
  var data = contactData[name];
  if(!data) return;
  chatProfilePhoto.src = data.photo;
  chatProfileName.innerHTML = data.name;
  chatProfileStatus.innerHTML = "Estado: " + data.status;
  chatProfileText.innerHTML = data.text;
}

function setActiveUser(name){
  activeUser = name;
  var allChats = chatContainer.getElementsByClassName("chatWindow");
  for(var i=0;i<allChats.length;i++){
    if(allChats[i].getAttribute("data-name")===name){
      allChats[i].style.display="block";
      allChats[i].className="chatWindow activo";
    } else {
      allChats[i].style.display="none";
      allChats[i].className="chatWindow";
    }
  }
  updateProfile(name);
}

function setActiveList(name){
  for(var i=0;i<users.length;i++){
    users[i].className = (users[i].getAttribute("data-name")===name) ? "user activo" : "user";
  }
}

// === CLICK EN USUARIO ===
for(var i=0;i<users.length;i++){
  users[i].onclick = function(){
    var name = this.getAttribute("data-name");
    setActiveUser(name);
    setActiveList(name);
  };
}



// === ACTUALIZAR CHAT VISUALMENTE ===
function updateChatWindow(name){
  var chatDivs = chatContainer.getElementsByClassName("chatWindow");
  for(var i=0;i<chatDivs.length;i++){
    if(chatDivs[i].getAttribute("data-name")===name){
      var chatDiv = chatDivs[i];
      // Actualizar solo el .messages
      var messagesDiv = null;
      // Safari 6 no soporta getElementsByClassName en el elemento, pero sí en document
      var childNodes = chatDiv.childNodes;
      for(var j=0;j<childNodes.length;j++){
        if(childNodes[j].className && childNodes[j].className.indexOf('messages')!==-1){
          messagesDiv = childNodes[j];
          break;
        }
      }
      if(messagesDiv){
        messagesDiv.innerHTML = chats[name].join("<br>");
        // Scroll al final
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
      }

      // Listeners de enter y botón
      (function(n, chatDivRef){
        var inputDiv = null, input = null, button = null;
        var childNodes = chatDivRef.childNodes;
        for(var k=0;k<childNodes.length;k++){
          if(childNodes[k].className && childNodes[k].className.indexOf('chatInput')!==-1){
            inputDiv = childNodes[k];
            break;
          }
        }
        if(inputDiv){
          // Para Safari 6, no usar querySelector
          var inputs = inputDiv.getElementsByTagName('input');
          var buttons = inputDiv.getElementsByTagName('button');
          if(inputs.length>0) input = inputs[0];
          if(buttons.length>0) button = buttons[0];
        }
        // Remover listeners previos: no necesario, porque input y button se mantienen.
        if(input && !input._enterListener){
          input._enterListener = true;
          input.onkeydown = function(e){
            e = e || window.event;
            var key = e.keyCode || e.which;
            if(key===13){
              // efecto pressed
              if(button){
                if(button.classList && button.classList.add){
                  button.classList.add('pressed');
                } else {
                  button.className += ' pressed';
                }
                setTimeout(function(){
                  if(button.classList && button.classList.remove){
                    button.classList.remove('pressed');
                  } else {
                    button.className = button.className.replace(' pressed','');
                  }
                }, 100);
              }
              sendMessage(n);
              if(e.preventDefault) e.preventDefault();
              return false;
            }
          };
        }
        if(button && !button._clickListener){
          button._clickListener = true;
          button.onclick = function(){
            // efecto pressed
            if(button.classList && button.classList.add){
              button.classList.add('pressed');
            } else {
              button.className += ' pressed';
            }
            setTimeout(function(){
              if(button.classList && button.classList.remove){
                button.classList.remove('pressed');
              } else {
                button.className = button.className.replace(' pressed','');
              }
            }, 100);
            sendMessage(n);
            return false;
          };
        }
      })(name, chatDiv);
    }
  }
}




// === INICIAR CHAT POR DEFECTO Y listeners iniciales ===
setActiveUser("Agu");
setActiveList("Agu");
// Inicializar listeners Enter y botón para todos los chats
(function(){
  var chatDivs = chatContainer.getElementsByClassName("chatWindow");
  for(var i=0;i<chatDivs.length;i++){
    var name = chatDivs[i].getAttribute("data-name");
    updateChatWindow(name);
  }
})();


