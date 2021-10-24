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
        getTracks(baseUrl, clientId, userInput);
    })
};

//gets and displays music tracks as list
function getTracks(baseUrl, clientId, userInput){
    const url = baseUrl + '/tracks?' + '&client_id=' + clientId + '&q=' + userInput + '&limit=10';
    fetch(url)
    .then((data) => data.json())
    .then(function(data){
       i = 0;
        let html = '';
        data.forEach(function(tracks){
          if (i < 10){
            i++;
             html += `
            <li class="white fontRaleWay">
            <p>User : ${tracks.user.username}</p>
            <p>Title : ${tracks.title}</p>
            <img src='${tracks.artwork_url}' alt=" track image">
            <p>Description : ${tracks.description}</p> 
            <p>Minutes : ${(tracks.duration / 60000).toFixed(2)}</p>
            <button class="audioBox white active" id="${i}" value='${(tracks.id)}' onclick="playButton(this.id)">Play Song</button>
            <button class="audioBox white active pauseButton" onclick="pauseButton()">Pause and Resume</button>
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
var input = $('li').attr("class");
let html = '';
if (input != 'white fontRaleWay'){
  html += `
            <li class="white fontRaleWay ">
            <p class="white fontRaleWay " id="noTrack"> Try something else </p>
            </li>
            `
 document.getElementById('results').innerHTML = html;
}
};

function selectTrack (clicked_id) {
    tracksId = $('#'+clicked_id).attr("value");
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
    });
  }

function pause(){
  return stream.pause();
}
function play(){
  return stream.play();
}

function getFromApi(artist, title, callback) {
  $.getJSON( `https://api.lyrics.ovh/v1/${ artist }/${ title }`, callback )
}

function displayData(data) {
  // Display the song lyrics
  $( '#lyricsResults' ).html(`<li class="white fontRaleWay"><p id="lyrics">${ data.lyrics }</p>
  <button class="alignCenter fontOpenSans white lyricsBtn" id="submitButton" onclick="print('lyricsResults')">Print lyrics</button></li>`);
  noLyrics();
}

// when no valid track name or artist is entered run this function
function noLyrics() {
    var input = $('li').attr("class");
    let html = '';
    if (input != 'white fontRaleWay'){
      html += `
                <li class="white fontRaleWay ">
                <p class="white fontRaleWay " id="noTrack"> Try something else </p>
                </li>
                `
     document.getElementById('lyricsResults').innerHTML = html;
    }
};

function print(divLyrics) {
    var printContents = document.getElementById(divLyrics).innerHTML;
    w=window.open();
    w.document.write(printContents);

    w.close(); // necessary for IE >= 10
    w.focus(); // necessary for IE >= 10*/

    w.print();
    w.close();
}

function watchSubmitForm() {
  // Watch for click on search button
  $( '.lyricsForm' ).on( 'submit', function( event )
  {
      // Prevent Default
      event.preventDefault();
      
      // Get artist entry from input box
      let artistName = $( '.artistInput' ).val();
      $( '.artistInput' ).val("");

      // Get song entry from input box
      let songName = $( '.trackInput' ).val();
      $( '.trackInput' ).val("");

      // Call getDataFromApi
      getFromApi( artistName, songName, displayData );
  });
  
}

$(watchSubmitForm);
$(watchForm);
