import React, { Component } from "react";
import { Button, Input } from "reactstrap";
import io from "socket.io-client";
import { api_url } from "../helpers";

const socket = io(api_url);

class ChatPage extends Component {
  state = {
    count: 0,
    message: "",
    chat: [],
  };
  // npm i socket.io-client@2.3.0
  componentDidMount() {
    socket.on("JumlahUser", this.updateUserCount);
    socket.on("chat", this.updateChat);
  }

  updateUserCount = (num) => {
    this.setState({ count: num });
  };

  updateChat = (str) => {
    this.setState({
      chat: [...this.state.chat, str],
    });
  };

  render() {
    return (
      <div>
        <div>{this.state.count}</div>
        <div>
          <Input
            id="message"
            onChange={(e) => this.setState({ message: e.target.value })}
          />
        </div>
        <div>
          {this.state.chat.map((val) => (
            <div>{val}</div>
          ))}
        </div>
        <div>
          <Button onClick={() => socket.emit("chat", this.state.message)}>
            Click Me
          </Button>
        </div>
      </div>
    );
  }
}

export default ChatPage;
