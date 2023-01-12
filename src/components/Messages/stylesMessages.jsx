import styled from "styled-components";

const AppWindow = styled.div`
  display: flex;
  height: 100vh;
  background-color: #ededed;
`;
const Sidebar = styled.div`
  width: 35%;
  max-width: 415px;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
`;
const SidebarHeader = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
`;
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;
const SidebarHeaderButtons = styled.div`
  display: flex;
  button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;
const Search = styled.div`
  background-color: #f6f6f6;
  border-bottom: 1px solid #eee;
  padding: 5px 15px;
`;

const TextInput = styled.div`
  background-color: #fff;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  input {
    flex: 1;
    border: 0;
    outline: 0;
    background-color: transparent;
    margin-left: 10px;
  }
`;
const ChatList = styled.div`
  flex: 1;
  background-color: #fff;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const ContentArea = styled.div`
  flex: 1;
`;

export {
  AppWindow,
  Sidebar,
  SidebarHeader,
  Avatar,
  SidebarHeaderButtons,
  Search,
  TextInput,
  ChatList,
  ContentArea,
};
