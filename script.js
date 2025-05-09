function displayTrack(data) {
  //const text = data.name + " - " + data.popularity;
  //document.getElementById("track").innerHTML = text;

  const tr = document.createElement("tr");
  const tdTitle = document.createElement("td");
  const tdPopularity = document.createElement("td");
  tdTitle.innerHTML = data.name;
  tdPopularity.innerHTML = data.popularity;
  tr.appendChild(tdTitle);
  tr.appendChild(tdPopularity);
  document.getElementById("songs").appendChild(tr);
}

async function callGetTracks(data) {
  //console.log(data);
  //https://open.spotify.com/track/0b0Dz0Gi86SVdBxYeiQcCP
  const url = 'https://api.spotify.com/v1/tracks/0b0Dz0Gi86SVdBxYeiQcCP';
  const headers = {
    'Authorization': 'Bearer ' + data.access_token
  };

  fetch(url, {
    method: 'GET',
    headers: headers
  })
    .then(response => response.json())
    .then(data => displayTrack(data))
    .catch(error => console.error('Error:', error));
}

async function callAPI() {
  // get access token
  const url = 'https://accounts.spotify.com/api/token';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: '',
    client_secret: ''
  });
  
  fetch(url, {
    method: 'POST',
    headers: headers,
    body: body.toString()
  })
    .then(response => response.json())
    .then(data => callGetTracks(data)) // then, call /tracks
    .catch(error => console.error('Error:', error));
}

callAPI()