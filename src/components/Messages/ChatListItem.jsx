import React, { useState, useEffect } from "react";
import { ChatListItem, Lines, Name, Date, LastMsg } from "./stylesChatListItem";

export default ({ onClick, active, data }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    if (data.lastMessageDate > 0) {
      let d = new Date(data.lastMessageDate.seconds * 1000);
      let hours = d.getHours();
      let minutes = d.getMinutes();
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      setTime(`${hours}:${minutes}`);
    }
  }, [data]);
  return (
    <ChatListItem className={`${active ? "active" : ""}`} onClick={onClick}>
      <avatar src={data.image} alt="" />
      <Lines>
        <line>
          <Name>{data.title}</Name>
          <Date>{time}</Date>
        </line>
        <line>
          <LastMsg>
            <p>{data.lastMessage}</p>
          </LastMsg>
        </line>
      </Lines>
    </ChatListItem>
  );
};
