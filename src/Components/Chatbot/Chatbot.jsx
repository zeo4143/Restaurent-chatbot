import { useState, useRef, useEffect } from "react";
import { LuSend } from "react-icons/lu";
import { response } from "./Response";
import botGif from "../../assets/bot1.gif";
import botImage from "../../assets/bot.png";
import chatIcon from "../../assets/chatIcon.png";
import { usersResponse } from "./UsersResponse";
// import { data } from "../rawData/data";
import { billing } from "./Billing";
import Navbar from "./Navbar";

export default function Chatbot() {
  const chatContentRef = useRef(null);
  const [botActive, setBotActive] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [tempCart, setTempCart] = useState([]);

  const isButtonDisabled = userInput.trim().length === 0; //to disable button dynamically

  useEffect(() => {
    setMessages([
      {
        type: "response",
        content:
          "Hey buddy this is Tony the virtual Assistant How can I assist you Today..🍽️",
        buttons: ["Order Food", "Cancel Order", "Update Order"],
      },
    ]);
  }, []);

  useEffect(() => {
    chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight; // Scroll to the bottom of the chat content when new messages are added
  }, [messages]);


  //chat function
  const handleSubmit = (e) => {
    e.preventDefault();

    const targValueStr = messages.filter((item) =>
      item.type === "user" ? item.content : ""
    );
    

    const targValueStrConv =  targValueStr.map(item => item.content)

    const userInputConv = userInput.replace(/[^\w\s]/gi, "").split(/\s+/)
    const getResponse = e.target.value
      ? e.target.value === "Review my order" ||
        e.target.value === "Add More items to Cart"
        ? billing(targValueStrConv, tempCart, setTempCart)
        : response(e.target.value, tempCart, setTempCart)
      : usersResponse(userInputConv);
    setCartItem(getResponse.CartItem);
  
    console.log(tempCart);
    setMessages([
      ...messages,
      { type: "user", content: userInput || e.target.value },
      getResponse.botResponse,
    ]);
    setUserInput("");
  };

  return (
    <>
      <Navbar/>
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
                <div className="text">
                  <p>{item.content}</p>
                  {item.type === "response" &&
                    cartItem.length > 0 &&
                    cartItem.map((details, index) => (
                      <div key={index}>
                        <p>Item Name - {details.itemName}</p>
                        <p>Item Price - {details.itemPrice}</p>
                        <p>Add ONs - {details.addONs} </p>
                      </div>
                    ))}
                </div>

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
