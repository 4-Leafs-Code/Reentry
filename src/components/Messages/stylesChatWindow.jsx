import styled from "styled-components";

const ChatWindow = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
`;

const Header = styled.div`
  height: 60px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 15px;
  margin-right: 15px;
`;

const Name = styled.div`
  font-size: 17px;
  color: #000;
`;

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    overflow: hidden;
    transition: all ease 0.3s;
  }
`;
const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #e5ddd5;
  background-position: center;
  background-image: url("https://web.whatsapp.com/img/bg-chat-tile-light_04fcacde539c58cca6745483d4858c52.png");
  background-size: contain;
  background-blend-mode: overlay;
  background-attachment: fixed;
  padding: 20px 30px;
  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const EmojiArea = styled.div`
  height: 200px;
  overflow-y: hidden;
  transition: all ease 0.3s;
`;

export {
  ChatWindow,
  Header,
  HeaderInfo,
  Avatar,
  Name,
  HeaderButtons,
  ChatBody,
  EmojiArea,
};
