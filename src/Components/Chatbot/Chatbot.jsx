import { useState, useRef, useEffect } from "react";
import { LuSend } from "react-icons/lu";
import { response } from "./Response";
import botGif from "../../assets/bot1.gif";
import botImage from "../../assets/bot.png";
import chatIcon from "../../assets/chatIcon.png";
import { usersResponse } from "./UsersResponse";
import { billing } from "./Billing";
import Navbar from "./Navbar";

export default function Chatbot() {
  const chatContentRef = useRef(null);
  const [botActive, setBotActive] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [tempCart, setTempCart] = useState([]);

  const isButtonDisabled = userInput.trim().length === 0; //to disable button dynamically

  useEffect(() => {
    setMessages([
      {
        type: "response",
        content:
          "Hey buddy this is Tony the virtual Assistant How can I assist you Today..🍽️",
        buttons: ["Order Food", "Update Order", "Cancel Order", "Go to Cart"],
      },
    ]);
    const cart = localStorage.getItem('cart')
    cart == null ? localStorage.setItem('cart', JSON.stringify([])) : ""
  }, []);

  useEffect(() => {
    chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight; // Scroll to the bottom of the chat content when new messages are added
  }, [messages]);

  //chat function
  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(e.target.value, typeof(e.target.value));

    const targValueStr = messages.filter((item) =>
      item.type === "user" ? item.content : ""
    );

    const targValueStrConv = targValueStr.map((item) => item.content);

    const userInputConv = userInput
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .split(/\s+/);

    const getResponse = response(e.target.value, tempCart, setTempCart)
    setMessages([
      ...messages,
      { type: "user", content: userInput || e.target.value },
      getResponse,
    ]);

    e.target.value == "No Thanks" ? setTimeout(() => {setBotActive(false)}, 1000) : ""
    setUserInput("");  
  };

  return (
    <>
      <Navbar />
      <div
        className="chatInterface"
        style={botActive ? { display: "flex" } : { display: "none" }}
      >
        <div className="botInfo">
          <img src={chatIcon} alt="" className="icon" />
          <div>
            <h2>Tony</h2>
            <small>virtual chat Assistant</small>
          </div>
        </div>
        <div className="chatContent" ref={chatContentRef}>
          {messages.map((item, index) => {
            return (
              <div key={index} className={`${item.type}`}>
                <p className="text">{item.content}</p>

                {item.type === "response" && item.buttons.length > 0 && (
                  <div className="responseButtons">
                    {item.buttons.map((options, index) => {
                      return (
                        <button
                          key={index}
                          className="responseDataButtons"
                          onClick={handleSubmit}
                          value={options}
                        >
                          {options}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="chatInput">
          <input
            className="inputChatbot"
            required
            type="text"
            placeholder="Type your Meassage"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            disabled={isButtonDisabled}
            onClick={handleSubmit}
            className="chatButton"
          >
            <LuSend />
          </button>
        </div>
      </div>

      <button onClick={() => setBotActive(!botActive)} className="botPopUp">
        {!botActive && (
          <img src={botGif} alt="image not Found" className="botGif" />
        )}
        {botActive && (
          <img src={botImage} alt="image not Found" className="botGif" />
        )}
      </button>
    </>
  );
}
