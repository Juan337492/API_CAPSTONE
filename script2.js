

function getFromApi(artist, title, callback) 
{
  $.getJSON( `https://api.lyrics.ovh/v1/${ artist }/${ title }`, callback )
}
function displayData(data) 
{
  // Display the song lyrics
  $( '#lyricsResults' ).html(`<li class="white fontRaleWay"><p id="lyrics">${ data.lyrics }</p>
  <button class="alignCenter fontOpenSans white lyricsBtn" id="submitButton" onclick="print('lyricsResults')">Print lyrics</button></li>`);
}
function print(divLyrics){
    var printContents = document.getElementById(divLyrics).innerHTML;
    w=window.open();
    w.document.write(printContents);

    w.close(); // necessary for IE >= 10
    w.focus(); // necessary for IE >= 10*/

    w.print();
    w.close();
}
function watchSubmitForm() 
{
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