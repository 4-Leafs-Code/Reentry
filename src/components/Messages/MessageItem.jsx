import React, { useState, useEffect } from "react";
import "./styles.css";

export default ({ data, user }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    if (data.date > 0) {
      let d = new Date(data.date.seconds * 1000);
      let hours = d.getHours();
      let minutes = d.getMinutes();
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      setTime(`${hours}:${minutes}`);
    }
  }, [data]);

  return (
    <div
      className="menssageLine"
      style={{
        justifyContent: user.id === data.author ? "flex-end" : "flex-start",
      }}
    >
      <div
        className="menssageItem"
        style={{
          backgroundColor: user.id === data.author ? "#dcf8c6" : "#fff",
        }}
      >
        {data.body !== "" && <div className="menssageText">{data.body}</div>}
        {data.body === "" && <div className="menssageImage">{data.body}</div>}
        <div className="menssageDate">{time}</div>
      </div>
    </div>
  );
};
