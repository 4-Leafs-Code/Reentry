import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router";
import { getUserAuth } from '../actions';
import { db } from "../firebase";

import {
  Container,
  Messengers,
  MessengersHeader,
  ActorsList,
  Messages,
  MessagesHeader,
  SelectedAct,
  AllActMessages,
  Reply,
  ReplyText,
} from "../styles/stylesMessaging";

export function Messaging() {
  const [users, setUsers] = useState([]);
  const [receiverData, setReceiverData] = useState(null);
  const [chatMessage, setChatMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const user = getUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          userId: doc.id,
          username: doc.data().username,
        }))
      );
    });
  }, []);

  useEffect(() => {
    if (receiverData) {
      db.collection("users")
        .doc(receiverData.userId)
        .collection("messages")
        .doc(user.uid)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setAllMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [receiverData, user.uid]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(receiverData.userId)
      .collection("messages")
      .doc(user.uid)
      .collection("messages")
      .add({
        message: chatMessage,
        timestamp: db.firestore.FieldValue.serverTimestamp(),
        username: user.displayName,
      });

    db.collection("users")
      .doc(user.uid)
      .collection("messages")
      .doc(receiverData.userId)
      .collection("messages")
      .add({
        message: chatMessage,
        timestamp: db.firestore.FieldValue.serverTimestamp(),
        username: user.displayName,
      });
    setChatMessage("");
  };
  const UsersComponent = (props) => {
    const handleToggle = (username, userId) => {
      props.setReceiverData({
        username: username,
        userId: userId,
      });
      props.navigate(`/messaging/${userId}`);
    };

    return (
      <ActorsList>
        {props.users.map((user) => {
          return (
            <ListItem disablePadding key={user.id}>
              <ListItemButton
                onClick={() => handleToggle(user.username, user.id)}
                selected={props.receiverData.userId === user.id}
              >
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                  />
                </ListItemAvatar>
                <ListItemText primary={user.username} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </ActorsList>
    );
  }

  return (
    <Container>
      <Messengers>
        <MessengersHeader>
          <h1>Messengers</h1>
          <p>Need a search Bar</p>
        </MessengersHeader>
        <UsersComponent
          users={users}
          receiverData={receiverData}
          navigate={navigate}
          setReceiverData={setReceiverData}
        />
      </Messengers>
      <Messages>
        <MessagesHeader>
          <h1>Messages</h1>
        </MessagesHeader>
        <SelectedAct>
          <h3>{receiverData?.username}</h3>
        </SelectedAct>
        <AllActMessages>
          {allMessages.map((message) => {
            return (
              <div key={message.id}>
                <p>
                  <span>{message.data.username}</span> {message.data.message}
                </p>
              </div>
            );
          })}
        </AllActMessages>
        <Reply>
          <ReplyText
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </Reply>
      </Messages>
    </Container>
  );
}


export default Messaging;