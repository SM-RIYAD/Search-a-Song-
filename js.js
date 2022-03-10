document.getElementById("search_btn").addEventListener("click", function() {

    const song_name_value = document.getElementById("song_name").value;

    fetch(`https://api.lyrics.ovh/suggest/:${song_name_value}`)

    .then(response => response.json())
        .then(json => {
            console.log("users", json);
            user_container = document.getElementById("user_container");
            user_container.innerHTML = " ";
            display_data_10(json, user_container);

        })


})

function display_data_10(json, user_container) {


    for (let i = 0; i < 10; i++) {

        const song = json.data[i].title;
        const artist = json.data[i].artist.name;
        let count = i;
        user_container = document.getElementById("user_container");
        let htmlString = `  <div class="col-md-9">
                <h3 class="lyrics-name">${song}</h3>
                <p class="author lead">Album by <span>${artist}</span></p>
            </div><div class="col-md-3 text-md-right text-center ">
                <button  class="btn btn-success" id="${count}">Get Lyrics</button>
            </div>`;

        user_container.innerHTML += htmlString;



    }

    for (let i = 0; i < 10; i++) {
        const lyrics_btn = document.getElementById(`${i}`);
        lyrics_btn.addEventListener("click", function() {


            fetch(`https://api.lyrics.ovh/v1/:${json.data[i].artist.name}/:${json.data[i].title}`)

            .then(response => response.json())
                .then(json2 => {

                    display_lyrics(json2, i);
                    // const lyrics = ` ${json2.lyrics}`;
                    // console.log(`${json.data[i].title}`, lyrics);
                    // const song_lyrics = document.getElementById(" song_lyrics");
                    // song_lyrics.innerHTML = `<h2>${json.data[i].artist.name} - ${json.data[i].title}<h2> <br> <pre> ${lyrics} </pre> `;


                })



        })

    }

    function display_lyrics(json2, i) {

        const lyrics = ` ${json2.lyrics}`;
        console.log(`${json.data[i].title}`, lyrics);
        const song_lyrics = document.getElementById(" song_lyrics");
        song_lyrics.innerHTML = `<h2>${json.data[i].artist.name} - ${json.data[i].title}<h2> <br> <pre> ${lyrics} </pre> `;
    }


}