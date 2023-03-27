// 📦 Import the required hooks, components, and services 📦
import { useState, useEffect } from "react";
import { PostQustionToChatGPT } from "../../services/chatGPTAPI";

import "./main.css";
import styled from "styled-components";
import { Footer } from "../Footer/Footer";
import { RightMenu } from "../RightMenu/RightMenu";

// 🎨 Define a styled textarea component using the styled-components library
// This component will have custom CSS styles applied to it 🎨
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
  @media (min-width: 768px) {
    max-width: 350px;
  }
`;

const Main = () => {
  // 📚 Declare state variables for managing the active listen button and storing the GPT-3.5-turbo response 📚
  const [activeListenButton, SetActiveListenButton] = useState(true);
  // 🎙 Initialize speech recognition functionality 🎙
  let SpeechRecognition =
    window.webkitSpeechRecognition || window.SpeechRecognition;
  let recognition = new SpeechRecognition();
  // 🌐 Set various properties for speech recognition, such as language and result type 🌐
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  // 🚀 Define the renderSpeech function to handle starting speech recognition and processing results 🚀
  const renderSpeech = () => {
    // ▶️ Start speech recognition ▶️
    recognition.start();
    // 🔄 Update the activeListenButton state when speech recognition begins 🔄
    recognition.onstart = () => {
      SetActiveListenButton(true);
    };
    // 🔍 Process the speech recognition result and store the recognized text 🔍
    recognition.onresult = (event) => {
      //handle result in here
      let word = event.results[0][0].transcript;
      console.log(word, "this word");
      // ⏹ Update the activeListenButton state when speech recognition ends ⏹
      recognition.onend = () => {
        SetActiveListenButton(false);
      };
      // 💾 Store the recognized text in the getVoice state 💾
      SetVoice(word);
    };
  };

  // 🎓 Initialize state variables for storing the GPT-3.5-turbo response and the textarea value 🎓
  const [resultChatGPT, SetResultChatGPT] = useState();
  const [textareaValue, SetTextareaValue] = useState(false);
  const [showRightMenu, SetshowRightMenu] = useState(false);
  // 🗣 Initialize speech synthesis functionality 🗣
  let Speech = new SpeechSynthesisUtterance();
  // ✍️ Declare a state variable for storing the recognized text from speech recognition ✍️
  const [getVoice, SetVoice] = useState("");
  // 🧠 Process the GPT-3.5-turbo model result and set the text for speech synthesis 🧠
  let data;
  if (resultChatGPT) {
    // console.log(resultChatGPT.choices[0].text, "this result");
    // Speech.text = resultChatGPT.choices[0].text;
    // console.log(data, "this reuslt");
    //?trubo model
    console.log(resultChatGPT.choices[0].message.content, "result in if");

    //?trubo model
    data = resultChatGPT.choices[0].message.content;

    //?trubo model
    Speech.text = data;
  }
  // 🎣 Use the useEffect hook to handle GPT-3.5-turbo model API calls and update the textareaValue state 🎣
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
  // 🖼 Render the Main component, including buttons for speech recognition and speech synthesis, and the textarea for displaying recognized text 🖼
  return (
    <div className="main">
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
          readOnly
          onChange={(event) => {
            SetVoice(event.target.value);
          }}
        ></Textarea>

        {/* Create a "Listen" button that triggers the speech synthesis functionality */}
        <button
          onClick={() => {
            speechSynthesis.speak(Speech);
          }}
          disabled={activeListenButton}
        >
          Listen 🔊
        </button>
      </div>
    </div>
  );
};

export default Main;
