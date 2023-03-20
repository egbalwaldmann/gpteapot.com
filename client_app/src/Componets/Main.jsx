import { useState, useEffect } from "react";
import { PostQustionToChatGPT } from "../services/chatGPTAPI";
import { getEmails, deleteEmail } from "../services/emailAPI";
const Main = () => {
  const [getEmail, SetGetEmail] = useState([]);
  //*
  let SpeechRecognition =
    window.webkitSpeechRecognition || window.SpeechRecognition;
  let SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;

  let recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  const renderSpeech = () => {
    recognition.start();
    recognition.onresult = (event) => {
      //handle result in here
      let word = event.results[0][0].transcript;
      console.log(word);
      SetVoice(word);
    };
  };
  //*
  const [resultChatGPT, SetResultChatGPT] = useState();
  const [textareaValue, SetTextareaValue] = useState(false);

  let Speech = new SpeechSynthesisUtterance();

  //get react-speech-kit codes
  const [getVoice, SetVoice] = useState("");

  let data;
  if (resultChatGPT) {
    console.log(resultChatGPT);
    data = resultChatGPT;
    Speech.text = data.choices[0].text;
    console.log(data.choices[0].text);
  }
  useEffect(() => {
    console.log(import.meta.env.VITE_SOME_KEY);
    let raw = JSON.stringify({
      prompt: getVoice,
      model: "text-davinci-003",
      temperature: 0.5,
    });
    PostQustionToChatGPT(raw, SetResultChatGPT);
    SetTextareaValue(true);
    console.log(textareaValue);
  }, [getVoice]);

  //* handel Emails
  useEffect(() => {
    getEmails(SetGetEmail);
  }, []);
  const [showUpdateInput, SetShowUpdateInput] = useState(false);
  const [getValueUpdateInput, SetValueUpdateInput] = useState("");
  console.log(getEmail);
  const UpdateEmail = () => {
    SetShowUpdateInput(!showUpdateInput);
  };
  console.log(showUpdateInput);
  console.log(getValueUpdateInput);

  const HandelereSubmit = (event) => {
    event.preventDefault();
    console.log("hi");
    //send input value to api
  };
  return (
    <div>
      <h1>gpteapot.com</h1>
      {getEmail.length > 0 ? (
        getEmail.map((items) => {
          return (
            <div key={items._id}>
              {items.email}
              <button
                onClick={() => {
                  deleteEmail(items._id, SetGetEmail);
                }}
              >
                Delete Email
              </button>
              <button
                onClick={() => {
                  UpdateEmail(items._id, SetGetEmail);
                }}
              >
                Update Email
              </button>
            </div>
          );
        })
      ) : (
        <h3>There is no email</h3>
      )}

      {/* <h1>{import.meta.env.MY_SECRET_KEY}</h1> */}
      {/* this textarea for taking voice */}
      {showUpdateInput && (
        <>
          <form action="" method="post" onSubmit={HandelereSubmit}>
            <input
              type="text"
              onChange={(event) => {
                SetValueUpdateInput(event.target.value);
              }}
            />
            <button type="submit">submit</button>
          </form>
        </>
      )}
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        value={getVoice}
        onChange={(event) => {
          SetVoice(event.target.value);
        }}
      ></textarea>

      <button
        onClick={() => {
          renderSpeech();
        }}
      >
        Speak 🎤
      </button>

      {/* this textarea reads the result with voice */}
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        // onChange={(textValue) => {
        //   SetTextareaValue(textValue.target.value);
        // }}
        // readOnly
      ></textarea>
      <button
        onClick={() => {
          // console.log("hi");
          speechSynthesis.speak(Speech);
        }}
      >
        Listen 🔊
      </button>
    </div>
  );
};

export default Main;
