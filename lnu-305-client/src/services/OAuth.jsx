import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import { API_URL } from "../api";

export default class OAuth extends Component {
  state = {
    disabled: "",
  };

  componentDidMount() {
    const { socket, provider } = this.props;

    socket.on(provider, (payload) => {
      if (this.popup) {
        this.popup.close();
      }
      const { token, user } = payload;

      window.dispatchEvent(
        new CustomEvent("auth", {
          detail: { type: "signin", payload: { token, user } },
        })
      );
    });
  }

  componentWillUnmount() {
    this.closeCard();
  }

  checkPopup = () => {
    this.check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(this.check);
        this.setState({ disabled: "" });
      }
    }, 1000);
  };

  openPopup = () => {
    const { provider, socket } = this.props;
    const width = 600,
      height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `${API_URL}/${provider}?socketId=${socket.id}`;

    return window.open(
      url,
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    );
  };

  startAuth = () => {
    if (!this.state.disabled) {
      this.popup = this.openPopup();
      this.checkPopup();
      this.setState({ disabled: "disabled" });
    }
  };

  closeCard = () => {
    this.setState({ disabled: "" });
    clearInterval(this.check);
  };

  render() {
    const { disabled } = this.state;
    const { provider } = this.props;

    return (
      <div>
        <div className="button-wrapper fadein-fast">
          <button
            disabled={disabled.length > 0}
            onClick={this.startAuth}
            className={`${provider} ${disabled} button`}
          >
            <FontAwesome name={provider} />
          </button>
        </div>
      </div>
    );
  }
}

OAuth.propTypes = {
  provider: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired,
};
