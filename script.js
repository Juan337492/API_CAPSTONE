var tracksId;
var stream;
var i;
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
       i = 0;
        let html = '';
        data.forEach(function(tracks){
          if (i < 10){
            i++;
             html += `
            <li class="white fontRaleWay" value="hasTrack">
            <p>User : ${tracks.user.username}</p>
            <p>Title : ${tracks.title}</p>
            <img src='${tracks.artwork_url}'>
            <p>Description : ${tracks.description}</p> 
            <p>Minutes : ${(tracks.duration / 60000).toFixed(2)}</p>
            <button class="audioBox white active" id="pauseButton" onclick="pauseButton()">Pause and Resume</button>
            <button class="audioBox white active" id="${i}" value='${(tracks.id)}' onclick="playButton(this.id)">Play Song</button>
            `
          };
        
        });     
        document.getElementById('results').innerHTML = html;
        Clickreset();
        noTrack();
    })
    .catch(error => {
        console.log(error);
    })
    };

// when no valid track name or artist is entered run this function
function noTrack() {
var input = $('li').attr("value");
let html = '';
if (input != 'hasTrack'){
  html += `
            <li class="white fontRaleWay ">
            <p class="white fontRaleWay " id="noTrack"> Try something else </p>
            </li>
            `
 document.getElementById('results').innerHTML = html;
}

};

function selectTrack (clicked_id) {
  console.log(clicked_id);
    tracksId = $('#'+clicked_id).attr("value");
  console.log('track selected');
};

//plays music by clicking play button
   function playButton(clicked_id){
     selectTrack(clicked_id);
    SC.initialize({
      client_id: '827d90477e86eb01e3dc6345c6272228'
    });
    // stream track id 
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
    $(selectTrack()).click(function() {
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
$(watchForm);
