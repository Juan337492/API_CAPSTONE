
var trackId;
var stream;
var timesClicked = 0;
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
    const url = baseUrl + '/tracks?' + '&client_id=' + clientId + '&q=' + userInput;
    console.log(url);
    fetch(url)
    .then((data) => data.json())
    .then(function(data){
        let html = '';
        data.forEach(function(tracks){
             html += `
            <li><p>User : ${tracks.user.username}<p><p>Title : ${tracks.title}</p><p>Description : ${tracks.description}</p> 
            <p>Minutes : ${(tracks.duration / 60000).toFixed(2)}</p></li>
            `;
            var trackId = tracks.id;
            
        });
        document.getElementById('results').innerHTML = html;
    })
    .catch(error => {
        console.log(error);
    })
    }
    
window.onload = function() {
  document.getElementById("playButton").addEventListener("click", playButton);
  document.getElementById("nextButton").addEventListener("click", nextButton);
  document.getElementById("replayButton").addEventListener("click", replayButton);
  document.getElementById("pauseButton").addEventListener("click", pauseButton);
  
};

//plays music by clicking play button
   function playButton(){
    SC.initialize({
      client_id: '1SoBYKkeYLyQsSAiFMTGD0dc0ShJDKUf'
    });
    // stream track id 293
    SC.stream('/tracks/293').then(function(player){
       stream = player; 
      player.play().then(function(){
          console.log('Playback started!');
        }).catch(function(e){
          console.error('Playback rejected. Try calling play() from a user interaction.', e);
        });
      });
   };
   
  //plays next song button
  function nextButton(){
  
  };

  //pauses song and resumes song on click
  function pauseButton(){
stream.pause().then(player =()=>{
  console.log('paused song');
});
};

  //replay song button
  function replayButton(){
    console.log('song rewinded');
    stream.pause().then(function(){
      console.log('replaying song');
    return playButton();
    });
  };
  

$(watchForm);
