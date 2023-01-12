import React, { useEffect, useState } from "react";
import "./stylesMessages";
import ChatListitem from "./ChatListItem";
import ChatIntro from "./ChatIntro";
import ChatWindow from "./ChatWindow";
import NewChat from "./NewChat";

import {
  MdDonutLarge,
  MdChat,
  MdMoreVert,
  MdOutlineSearch,
} from "react-icons/md";
import MessagesAPI from "../../actions/Api";

import {
  AppWindow,
  Avatar,
  ChatList,
  ContentArea,
  Search,
  Sidebar,
  SidebarHeader,
  SidebarHeaderButtons,
  TextInput,
} from "./stylesMessages";
import Api from "../../actions/Api";

const Messages = (props) => {
  const [chatlist, setChatlist] = useState([]);
  const [user, setUser] = useState(null);
  const [activeChat, setActiveChat] = useState({});
  const [showNewChat, setshowNewChat] = useState(false);

  useEffect(() => {
    if (user !== null) {
      return MessagesAPI.onChatList(user.id, setChatlist);
    }
  }, [user]);

  const handleNewChat = () => {
    setshowNewChat(true);
  };

  const handleLoginData = async (u) => {
    console.log(u);
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL,
    };
    console.log(newUser);
    await Api.addUser(newUser);
    //
    setUser(newUser);
  };

  if (user === null) {
    return "" + "";
  }

  return (
    <AppWindow>
      <Sidebar>
        <NewChat
          chatlist={chatlist}
          user={user}
          show={showNewChat}
          setShow={setshowNewChat}
        />
        <SidebarHeader>
          <Avatar src={user.avatar} alt="" />
          <SidebarHeaderButtons>
            <button>
              <MdDonutLarge style={{ color: "#919191" }} />
            </button>
            <button onClick={handleNewChat}>
              <MdChat style={{ color: "#919191" }} />
            </button>
            <button>
              <MdMoreVert style={{ color: "#919191" }} />
            </button>
          </SidebarHeaderButtons>
        </SidebarHeader>
        <Search>
          <TextInput>
            <MdOutlineSearch fontSize="small" style={{ color: "#919191" }} />
            <input
              type="search"
              placeholder="search or start a new conversation"
            />
          </TextInput>
        </Search>
        <ChatList>
          {chatlist.map((item, key) => (
            <ChatListitem
              key={key}
              data={item}
              active={activeChat.chatId === chatlist[key].chatId}
              onClick={() => setActiveChat(chatlist[key])}
            />
          ))}
        </ChatList>
      </Sidebar>
      <ContentArea>
        {activeChat.chatId !== undefined && (
          <ChatWindow user={user} data={activeChat} />
        )}
        {activeChat.chatId === undefined && <ChatIntro />}
      </ContentArea>
    </AppWindow>
  );
};
export default Messages;
