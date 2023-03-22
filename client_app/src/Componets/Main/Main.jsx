import { useState, useEffect } from "react";
import { PostQustionToChatGPT } from "../../services/chatGPTAPI";
import { Email } from "../Email/Email";
import { Header } from "../Header/Header";
import { Button } from "../Button/Button";
import "./main.css";
import styled from "styled-components";
import { Footer } from "../Footer/Footer";

const Textarea = styled.textarea`
  border: none;
  resize: none;
  opacity: none;
  visibility: hidden;
  width: 1px;
  height: 1px;
`;

const Main = () => {
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

  const [resultChatGPT, SetResultChatGPT] = useState();
  const [textareaValue, SetTextareaValue] = useState(false);

  let Speech = new SpeechSynthesisUtterance();

  const [getVoice, SetVoice] = useState("");

  let data;
  if (resultChatGPT) {
    console.log(
      resultChatGPT.choices[0].message.content,
      "result in if"
    );
    data = resultChatGPT.choices[0].message.content;
    Speech.text = data;
    console.log(data, "this reuslt");
  }
  useEffect(() => {
    console.log(import.meta.env.VITE_SOME_KEY);
    let raw = JSON.stringify({
      // prompt: getVoice,
      messages: [{ role: "user", content: getVoice }],
      model: "gpt-3.5-turbo",
      // model: "text-davinci-003",
      temperature: 0.5,
    });
    PostQustionToChatGPT(raw, SetResultChatGPT);
    SetTextareaValue(true);
    console.log(textareaValue);
  }, [getVoice]);

  return (
    <div className="main">
      <Header />
      <Email />
      <Textarea
        type="hidden"
        name=""
        id=""
        cols="30"
        rows="10"
        value={getVoice}
        onChange={(event) => {
          SetVoice(event.target.value);
        }}
      ></Textarea>
      <div className="Parent-ListenAndSpeekBtns">
        <button
          className="btn-Speak"
          onClick={() => {
            renderSpeech();
          }}
        >
          Speak 🎤
        </button>
        <button
          className="btn-Listen"
          onClick={() => {
            speechSynthesis.speak(Speech);
          }}
        >
          Listen 🔊
        </button>
      </div>
      <Textarea name="" id="" cols="30" rows="10"></Textarea>
    </div>
  );
};

export default Main;
