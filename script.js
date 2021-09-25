const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const myKey = config.MY_API_KEY;

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: myKey,
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// GET jokes from JokeAPI
async function getJokes() {
    let joke = '';
    const apiUrl = ' https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-speech
        tellMe(joke);
        // Disable the button
        toggleButton();
    }
    catch (error) {
        console.log('Fetch failed!', error);
    }
}

// Event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);