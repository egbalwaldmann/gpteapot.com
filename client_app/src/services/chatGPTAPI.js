let myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  import.meta.env.VITE_VERCEL_ENV_API_KEY
);
myHeaders.append("Content-Type", "application/json");

//?old
// const url = "https://api.openai.com/v1/completions";
//?trubo
const url = "https://api.openai.com/v1/chat/completions";
export const PostQustionToChatGPT = async (
  raw,
  SetResultChatGPT,
  SetTextareaValue
) => {
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  await SetResultChatGPT(data);
};



// PRIME VOICE API (not activated or worked on yet)

// This is a JavaScript code that makes a POST request to an API endpoint that converts text to speech. The code first creates a new Headers object and appends two headers to it: xi-api-key and Content-Type. It then creates a JSON payload that includes the text to be converted to speech and some voice settings. The payload is then passed to the fetch() function as the request body. The fetch function returns a Promise that resolves with the response from the API endpoint. The response is then logged to the console.


// var myHeaders = new Headers();
// myHeaders.append("xi-api-key", "41edf3197c146c7ae3604d75a118db04");
// myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//   "text": "string",
//   "voice_settings": {
//     "stability": 0,
//     "similarity_boost": 0
//   }
// });

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch("https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));