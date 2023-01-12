import styled from "styled-components";

const ChatIntro = styled.div`
  height: 80%;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 6px solid #b22222;
  img {
    width: 250px;
    height: auto;
    background: #e8eaec;
    border-radius: 50%;
  }
  h1 {
    font-size: 32px;
    color: #525252;
    font-weight: normal;
    margin-top: 30px;
  }
  h2 {
    font-size: 16px;
    color: #777;
    font-weight: normal;
    margin-top: 20px;
    line-height: 20px;
    text-align: center;
  }
`;

export default ChatIntro;
