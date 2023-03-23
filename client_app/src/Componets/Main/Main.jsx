import { useState, useEffect } from "react";
import { PostQustionToChatGPT } from "../../services/chatGPTAPI";

import "./main.css";
import styled from "styled-components";
import { Footer } from "../Footer/Footer";
import { RightMenu } from "../RightMenu/RightMenu";

const Textarea = styled.textarea`
  resize: none;
  margin: 10px;
  padding: 15px;
  font-size: 1.5rem;
  border: 1px solid rgba(128, 128, 128, 0.511);
  border-radius: 5px;
  width: 100%;
  height: 100px;
  max-width: 250px;
`;

const Main = () => {
  const [activeListenButton, SetActiveListenButton] = useState(true);
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
      console.log(word, "this word");
      recognition.onend = () => {
        SetActiveListenButton(false);
      };
      SetVoice(word);
    };
  };

  const [resultChatGPT, SetResultChatGPT] = useState();
  const [textareaValue, SetTextareaValue] = useState(false);
  const [showRightMenu, SetshowRightMenu] = useState(false);
  let Speech = new SpeechSynthesisUtterance();

  const [getVoice, SetVoice] = useState("");

  let data;
  if (resultChatGPT) {
    // console.log(resultChatGPT.choices[0].text, "this result");
    // Speech.text = resultChatGPT.choices[0].text;
    // console.log(data, "this reuslt");
    //?trubo model
    console.log(
      resultChatGPT.choices[0].message.content,
      "result in if"
    );

    //?trubo model
    data = resultChatGPT.choices[0].message.content;

    //?trubo model
    Speech.text = data;
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
      <RightMenu
        active={showRightMenu}
        setActive={SetshowRightMenu}
      />

      <div className="Parent-ListenAndSpeekBtns ">
        <button
          className="btn-Speak"
          onClick={() => {
            renderSpeech();
          }}
        >
          Speak 🎤
        </button>
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
        <button
          onClick={() => {
            speechSynthesis.speak(Speech);
          }}
          disabled={activeListenButton}
        >
          Listen 🔊
        </button>
      </div>
      <Footer active={showRightMenu} setActive={SetshowRightMenu} />
    </div>
  );
};

export default Main;
