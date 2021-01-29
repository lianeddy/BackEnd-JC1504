import React, { Component } from "react";
import { Button, Input } from "reactstrap";
// import io from "socket.io-client";
import { api_url, socket } from "../helpers";
import Axios from "axios";

class ChatPage extends Component {
  state = {
    count: 0,
    message: "",
    chat: [],
  };
  // npm i socket.io-client@2.3.0
  componentDidMount() {
    window.document.title = "React App";
    this.fetchChat();
    socket.on("JumlahUser", this.updateUserCount);
    socket.on("chat", this.updateChat);
  }

  componentWillUnmount() {
    socket.off("JumlahUser");
    socket.off("chat");
  }

  fetchChat = async () => {
    const { data } = await Axios.get(`${api_url}/socket`);
    this.setState({
      chat: data,
    });
  };

  submitChat = async (e) => {
    e.preventDefault();
    const { message } = this.state;
    await Axios.post(`${api_url}/socket`, { message });
    this.setState({ message: "" });
  };

  updateUserCount = (num) => {
    this.setState({ count: num });
  };

  updateChat = (str) => {
    this.setState({
      chat: [...this.state.chat, str],
    });
  };

  render() {
    const { chat, message } = this.state;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              height: "600px",
              width: "600px",
              border: "1px solid black",
              overflow: "auto",
            }}
          >
            <div>
              {chat.map(({ id, message }) => {
                return <div key={id}>{message}</div>;
              })}
            </div>
          </div>
          <form
            style={{ display: "flex", flexDirection: "row" }}
            onSubmit={this.submitChat}
          >
            <div style={{ flexGrow: 1 }}>
              <Input
                id="message"
                onChange={(e) => this.setState({ message: e.target.value })}
                placeholder="Message Here"
                value={message}
              />
            </div>
            <div>
              <Button onClick={this.submitChat}>Submit Chat</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ChatPage;
