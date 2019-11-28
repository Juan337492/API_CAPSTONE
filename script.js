var tracksId;
var stream;
var i = 0;
var e;
var btn;
var clickCounter = 0;
//gets user input from text box 
function watchForm(){
    $('.searchForm').on('submit', function() {
        event.preventDefault();
        const baseUrl = 'https://api.soundcloud.com';
        const userInput = $('.userInput').val();
        const clientId = '827d90477e86eb01e3dc6345c6272228';
        console.log(clientId);
        console.log(userInput);
        console.log(baseUrl);
        getTracks(baseUrl, clientId, userInput);
    })
};

//gets and displays music tracks as list
function getTracks(baseUrl, clientId, userInput){
    const url = baseUrl + '/tracks?' + '&client_id=' + clientId + '&q=' + userInput + '&limit=10';
    console.log(url);
    fetch(url)
    .then((data) => data.json())
    .then(function(data){
      let i=0; 
        let html = '';
        data.forEach(function(tracks){
          e = 300;
          if (e > 200){     
            e--;
          if (i < 100){
            i++;
             html += `
            <li class="resultsBorder" id="${i}">
            <p>User : ${tracks.user.username}</p>
            <p>Title : ${tracks.title}</p>
            <img src='${tracks.artwork_url}'>
            <p>Description : ${tracks.description}</p> 
            <p>Minutes : ${(tracks.duration / 60000).toFixed(2)}</p>
            <button class="audioBox" id="replayButton">Replay song</button>
            <button class="audioBox" id="pauseButton">Pause and Resume</button>
            <button class="audioBox" id="playButton">Play Song</button>
            <button class="selectBtn" id="${e}" value='${(tracks.id)}' onclick="selectTrack()">Select track</button>
            `
          };
        };
        });     
        document.getElementById('results').innerHTML = html;
        document.getElementById("playButton").addEventListener("click", playButton);
        document.getElementById("replayButton").addEventListener("click", replayButton);
        document.getElementById("pauseButton").addEventListener("click", pauseButton);
        document.getElementById(e).addEventListener("click",selectTrack);
        Clickreset();
        selectTrack();
    })
    .catch(error => {
        console.log(error);
    })
    };

function selectTrack () {
  console.log(e);
  $(`#${e}`).click(function() {
    tracksId = $(this).attr("value");
});
console.log(tracksId);
console.log('track selected');
};

//plays music by clicking play button
   function playButton(){
    SC.initialize({
      client_id: '827d90477e86eb01e3dc6345c6272228'
    });
    // stream track id 
    console.log(tracksId);
    selectTrack();
    SC.stream('/tracks/'+tracksId).then(function(player){
       stream = player; 
      player.play().then(function(){
          console.log('Playback started!');
        }).catch(function(e){
          console.error('Playback rejected. Try calling play() from a user interaction.', e);
        });
      });
   };

  function pauseButton(){
    pause();
    clickCounter += 1;
    if (clickCounter % 2===0){
        play();
    }
  };

  var Clickreset = function () {
    $(`#${e}`).click(function() {
      clickCounter = 0;
      console.log('click counter reset');
    });
  }

function pause(){
  console.log('pause function running');
  return stream.pause();
}
function play(){
  console.log('play function running');
  return stream.play();
}
  //replay song button
  function replayButton(){
    console.log('song rewinded');
    stream.pause().then(function(){
      console.log('replaying song');
    return playButton();
    });
  };

$(watchForm);
