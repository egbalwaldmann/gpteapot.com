import { useState, useEffect } from "react";
import { PostQustionToChatGPT } from "../services/chatGPTAPI";
import { Email } from "./Email";

const Main = () => {
  //*
  let SpeechRecognition =
    window.webkitSpeechRecognition || window.SpeechRecognition;

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

  return (
    <div>
      <h1>gpteapot.com</h1>
      <Email />
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
