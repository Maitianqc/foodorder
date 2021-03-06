import React from "react";

const ChatListItem = ({ messageObj, userId }) => {
  const isMine = messageObj.get("from") === userId;
  return (
    <div className={isMine ? "chat-list-item reverse" : "chat-list-item"}>
      <div className="circle">{isMine ? "me" : "deliveryman"}</div>
      <p className="message">{messageObj.get("message")}</p>
    </div>
  );
};

export default ChatListItem;
