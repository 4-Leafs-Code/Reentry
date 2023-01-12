import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  Avatar,
  ChatBody,
  ChatWindow,
  EmojiArea,
  Header,
  HeaderButtons,
  HeaderInfo,
  Name,
} from "./stylesChatWindow";
import "./styles.css";

import MessageItem from "./MessageItem";

import Api from "../../actions/Api";

import {
  MdOutlineSearch,
  MdAttachFile,
  MdMoreVert,
  MdOutlineInsertEmoticon,
  MdClose,
  MdSend,
  MdMicNone,
} from "react-icons/md";
export default ({ user, data }) => {
  const body = useRef();
  let recognition = null;
  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition !== undefined) {
    recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
  }
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState("");
  const [listening, SetListening] = useState(false);
  const [list, SetList] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    SetList([]);
    return Api.onChatContent(data.chatId, SetList, setUsers);
  }, [data.chatId]);

  useEffect(() => {
    if (body.current.scrollHeight > body.current.offsetHeight) {
      body.current.scrollTop =
        body.current.scrollHeight - body.current.offsetHeight;
    }
  }, [list]);

  const handleOpenEmoji = () => {
    setEmojiOpen(true);
  };
  const handleCloseEmoji = () => {
    setEmojiOpen(false);
  };
  const handEmojiClick = (e, emojiObject) => {
    setText(text + emojiObject.emoji);
  };
  const handleInputKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleSendClick();
    }
  };
  const handleSendClick = () => {
    if (text !== "") {
      Api.sendMessage(data, user.id, "text", text, users);
      setText("");
      setEmojiOpen(false);
    }
  };
  const handleMicClick = () => {
    if (recognition !== null) {
      recognition.onstart = () => {
        SetListening(true);
      };
      recognition.onend = () => {
        SetListening(false);
      };
      recognition.onresult = (e) => {
        setText(e.results[0][0].transcript);
      };
      recognition.start();
    }
  };
  return (
    <ChatWindow>
      <Header>
        <HeaderInfo>
          <Avatar src={data.image} alt="" />
          <Name>{data.title}</Name>
        </HeaderInfo>
        <HeaderButtons>
          <button>
            <MdOutlineSearch style={{ color: "#919191" }} />
          </button>
          <button className="chatWindow--btn">
            <MdAttachFile style={{ color: "#919191" }} />
          </button>
          <button>
            <MdMoreVert style={{ color: "#919191" }} />
          </button>
        </HeaderButtons>
      </Header>
      <ChatBody ref={body}>
        {list.map((item, key) => (
          <MessageItem key={key} data={item} user={user} />
        ))}
      </ChatBody>
      <EmojiArea style={{ height: emojiOpen ? "330px" : "0px" }}>
        <EmojiPicker
          onEmojiClick={handEmojiClick}
          disableSkinTonePicker
          groupNames={{
            smileys_people: "Smileys & People",
            animals_nature: "Animals & Nature",
            food_drink: "Food & Drink",
            travel_places: "Travel & Places",
            activities: "Activities",
            objects: "Objects",
            symbols: "Symbols",
            flags: "Flags",
            recently_used: "Recently Used",
          }}
        />
      </EmojiArea>
      <div className="chatWindow--footer">
        <div className="chatWindow--pre">
          <div
            className="chatWindow--btn"
            onClick={handleCloseEmoji}
            style={{ width: emojiOpen ? 40 : 0 }}
          >
            <MdClose style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow--btn" onClick={handleOpenEmoji}>
            <MdOutlineInsertEmoticon
              style={{ color: emojiOpen ? "#b22222" : "#919191" }}
            />
          </div>
        </div>
        <div className="chatWindow--inputarea">
          <input
            className="chatWindow--input"
            type="text"
            placeholder="Digite uma mensagem"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyUp={handleInputKeyUp}
          />
        </div>
        <div className="chatWindow--pos">
          {text === "" && (
            <div onClick={handleMicClick} className="chatWindow--btn">
              <MdMicNone style={{ color: listening ? "#126ece" : "#919191" }} />
            </div>
          )}
          {text !== "" && (
            <div onClick={handleSendClick} className="chatWindow--btn">
              <MdSend style={{ color: "#919191" }} />
            </div>
          )}
        </div>
      </div>
    </ChatWindow>
  );
};
