
//find dfMessenger declared in html file
const dfMessenger = document.querySelector('df-messenger');

// To welcome users
dfMessenger.addEventListener('df-messenger-loaded',  function (event) {
    dfMessenger.renderCustomText('Hi, my name is Clera, you personal AI advisor for Miami Dade College! Please press any of the suggested buttons below to start.');
});

//listen for response
dfMessenger.addEventListener('df-response-received', function (event) {
    // set session id to send to qualtrics later
    sessionID = dfMessenger.getAttribute("session-id");

    console.log(sessionID);
    console.log("received");
    console.log(event);

    //displayName is the name you give in Dialog flow to the intent, name is the intent id dialogflow assigns
    var displayName = event.detail.response.queryResult.intent.displayName;

    //make video link
    displayName = displayName.replaceAll(" ", "_");
    displayName = displayName.replaceAll("/", "_");
    console.log(displayName);
    //change this to point to the folder where your videos are, if not in the videos folder
    var video_folder = "videos_9_16/";
    var videoURL = video_folder + displayName + ".mp4";
    changeVid(videoURL);
});

function switchIdle() {
    /* Switch between a preloaded idle video and the newly loaded video to remove white flash*/
    var em = document.getElementById("myVideo");
    var temp = window.getComputedStyle(em).getPropertyValue("opacity");

    if (temp == "1") {
        document.getElementById("idleVideo").style.opacity = "1";
        document.getElementById("myVideo").style.opacity = "0";
    }

    if (temp == "0") {
        document.getElementById("myVideo").style.opacity = "1";
        document.getElementById("idleVideo").style.opacity = "0";
    }
}

//Add Parameter to Change Video Based on Intent Name
function changeVid(URL) {
    var vid = document.getElementById("myVideo");
    vid.src = URL;
    vid.load();
    vid.play();
    document.getElementById("myVideo").style.opacity = "1";
    document.getElementById("idleVideo").style.opacity = "0";
}

function redirectPage() {
    // REPLACE QUALTRICS SURVEY URL HERE
    var url = "https://ufl.qualtrics.com/jfe/form/SV_1S7mgXdRxlo22ay"
    window.open(url);
}

// Sammy Stuff

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
/*
function runSpeechRecognition() {
    
    document.getElementById("myVideo").pause();
    switchIdle();
    // get output div reference
    var button = document.getElementById("SpeechToText");
    // get action element reference
    var action = document.getElementById("MicText");
    // new speech recognition object
    
    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        button.classList.add('pulse');
        action.innerHTML = "Clera is listening! Please speak.";
    };
    
    recognition.onspeechend = function() {
        button.classList.remove('pulse');
        action.innerHTML = "Clera is not listening to you right now.";
        recognition.stop();
    }
  
    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;
        dfMessenger.shadowRoot.querySelector('df-messenger-chat').shadowRoot.querySelector('df-messenger-user-input').shadowRoot.querySelector('input[type="text"]').value = transcript
        console.log(confidence*100 +"%")
        sendIt();
    };

    recognition.onend = function() {
        // Once speech recognition ends, send the message to Dialogflow
        var transcript = dfMessenger.shadowRoot.querySelector('df-messenger-chat').shadowRoot.querySelector('df-messenger-user-input').shadowRoot.querySelector('input[type="text"]').value;
        sendMessageToDialogflow(transcript);
      };
  
     // start recognition
     recognition.start();
    
} */

function runSpeechRecognition() {
    document.getElementById("myVideo").pause();
    switchIdle();
  
    var button = document.getElementById("SpeechToText");
    var action = document.getElementById("MicText");
  
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
  
    recognition.onstart = function() {
      button.classList.add('pulse');
      action.innerHTML = "Clera is listening! Please speak.";
    };
  
    recognition.onspeechend = function() {
      button.classList.remove('pulse');
      action.innerHTML = "Clera is not listening to you right now.";
      recognition.stop();
    };
  
    recognition.onresult = function(event) {
      var transcript = event.results[0][0].transcript;
      var confidence = event.results[0][0].confidence;
      dfMessenger.shadowRoot.querySelector('df-messenger-chat').shadowRoot.querySelector('df-messenger-user-input').shadowRoot.querySelector('input[type="text"]').value = transcript;
      console.log(confidence * 100 + "%");
      sendIt();
    };
  
    recognition.onend = function() {
      // Once speech recognition ends, send the message to Dialogflow
      var transcript = dfMessenger.shadowRoot.querySelector('df-messenger-chat').shadowRoot.querySelector('df-messenger-user-input').shadowRoot.querySelector('input[type="text"]').value;
      sendMessageToDialogflow(transcript);
    };
  
    recognition.start();
  }
  