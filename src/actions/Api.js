import { NoteTwoTone } from "@material-ui/icons";
import firebase from "firebase/app";

import db from "../firebase";

export default {
  // // Need to change this to the already active user
  // fbPopup:async () => {
  //     const provider = new firebase.auth.GoogleAuthProvider();
  //     let result = await auth().signInWithPopup(provider);
  //     return result;
  // },
  addUser: async (u) => {
    await db.collection("users").doc(u.id).set(
      {
        name: u.name,
        avatar: u.avatar,
      },
      { merge: true }
    );
  },
  getContactList: async (userId) => {
    let list = [];
    let result = await db.collection("users").get();
    result.forEach((result) => {
      let data = result.data();
      if (result.id !== userId) {
        list.push({
          id: result.id,
          name: data.name,
          avatar: data.avatar,
        });
      }
    });
    return list;
  },
  addNewChat: async (user, user2) => {
    let newChat = await db.collection("chats").add({
      messages: [],
      users: [user.id, user2.id],
    });
    // missing await
    db.collection("users")
      .doc(user.id)
      .update({
        chats: db.FieldValue.arrayUnion({
          chatId: newChat.id,
          title: user2.name,
          image: user2.avatar,
          with: user2.id,
        }),
      });
    // missing await
    db.collection("users")
      .doc(user2.id)
      .update({
        chats: db.FieldValue.arrayUnion({
          chatId: newChat.id,
          title: user.name,
          image: user.avatar,
          with: user.id,
        }),
      });
  },
  onChatList: (userId, setChatList) => {
    return db
      .collection("users")
      .doc(userId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          let data = doc.data();
          if (data.chats) {
            let chats = [...data.chats];
            chats.sort((a, b) => {
              if (a.lastMessageDate === undefined) {
                return -1;
              }
              if (b.lastMessageDate === undefined) {
                return -1;
              }
              if (a.lastMessageDate.seconds < b.lastMessageDate.seconds) {
                return 1;
              } else {
                return -1;
              }
            });
            setChatList(chats);
          }
        }
      });
  },
  onChatContent: (chatId, SetList, setUsers) => {
    return db
      .collection("chats")
      .doc(chatId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          let data = doc.data();
          SetList(data.messages);
          setUsers(data.users);
        }
      });
  },

  sendMessage: async (chatData, userId, type, body, users) => {
    let now = new Date();
    // missing await
    db.collection("chats")
      .doc(chatData.chatId)
      .update({
        messages: db.FieldValue.arrayUnion({
          type,
          author: userId,
          body,
          date: now,
        }),
      });
    for (let i in users) {
      let u = await db.collection("users").doc(users[i]).get();
      let uData = u.data();
      if (uData.chats) {
        let chats = [...uData.chats];
        for (let e in chats) {
          if (chats[e].chatId === chatData.chatId) {
            chats[e].lastMessage = body;
            chats[e].lastMessageDate = now;
          }
        }
        await db.collection("users").doc(users[i]).update({
          chats,
        });
      }
    }
  },
};
