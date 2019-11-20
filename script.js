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
        const clientId = '1SoBYKkeYLyQsSAiFMTGD0dc0ShJDKUf'
        console.log(clientId);
        console.log(userInput);
        console.log(baseUrl);
        getTracks(baseUrl, clientId, userInput);
    })
}

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
          if (i < 100){
            i++;
             html += `
            <li id='${i}' value='${(tracks.id)}' class="resultsBorder">
            <p>User : ${tracks.user.username}</p>
            <p>Title : ${tracks.title}</p>
            <img src='${tracks.artwork_url}'>
            <p>Description : ${tracks.description}</p> 
            <p>Minutes : ${(tracks.duration / 60000).toFixed(2)}</p></li>
            `
          };

        });      
        document.getElementById('results').innerHTML = html;
        document.getElementById("1").addEventListener("click", selectTrack);
        document.getElementById("2").addEventListener("click", selectTrack);
        document.getElementById("3").addEventListener("click", selectTrack);
        document.getElementById("4").addEventListener("click", selectTrack);
        document.getElementById("5").addEventListener("click", selectTrack);
        document.getElementById("6").addEventListener("click", selectTrack);
        document.getElementById("7").addEventListener("click", selectTrack);
        document.getElementById("8").addEventListener("click", selectTrack);
        document.getElementById("9").addEventListener("click", selectTrack);
        document.getElementById("10").addEventListener("click", selectTrack);
        selectTrack();
        scrollTop();
        Clickreset();
    })
    .catch(error => {
        console.log(error);
    })
    };
    
window.onload = function() {
  document.getElementById("playButton").addEventListener("click", playButton);
  document.getElementById("replayButton").addEventListener("click", replayButton);
  document.getElementById("pauseButton").addEventListener("click", pauseButton);
};

function selectTrack () {
  $('ul li').click(function() {
    tracksId = $(this).attr("value");
    console.log('list element clicked')
  });
};

//plays music by clicking play button
   function playButton(){
    SC.initialize({
      client_id: '1SoBYKkeYLyQsSAiFMTGD0dc0ShJDKUf'
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
    clickCounter = 0;
    $('ul li').click(function() {
      clickCounter = 1;
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
  
function scrollTop(){
  $('ul li').click(function() {
    window.scrollTo(0,0);
  });
};

$(watchForm);
