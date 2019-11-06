
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
        });
        document.getElementById('results').innerHTML = html;
    })
    .catch(error => {
        console.log(error);
    })
    }
    
    window.onload = function() {
        SC.initialize({
          client_id: '10e27db0dacd00954d7160b4c092a6e2' //Demo ID
        });
        
        SC.stream("/tracks/75868018", function(sound){
            $("playButton").attr("src", sound.uri);
        });
        };
   
$(watchForm);
