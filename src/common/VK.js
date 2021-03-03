import React, { useEffect, Component, Fragment } from "react";
export default class VK extends Component {
  constructor() {
    super();
    this.state = {
      currentval: "",
    };
    this.BtnClick = this.BtnClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleKeyPress = (event) => {
    const returner = event.key;
    const prevstate = this.state.currentval;
    let returndata;
    if (returner.length != 1) {
    } else {
      this.setState({
        currentval: prevstate + returner,
      });
      returndata = prevstate + returner;
    }
    this.props.onResultChange(returndata);
  };
  BtnClick(event) {
    const returner = event.target.getAttribute("datareturn");
    const prevstate = this.state.currentval;
    const btntype = event.target.getAttribute("datatype");
    let returndata;
    if (btntype === "text") {
      this.setState({
        currentval: prevstate + returner,
      });
      returndata = prevstate + returner;
    } else if (btntype === "function") {
      if (returner === "bksp") {
        const newval = prevstate.slice(0, -1);
        this.setState({
          currentval: newval,
        });
        returndata = newval;
      } else if (returner === "clear") {
        this.setState({
          currentval: "",
        });
        returndata = "";
      }
    }
    this.props.onResultChange(returndata);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  render() {
    let Letters1, Letters2, Letters3;
    const numrows = [
      { KeyName: "1", Keytype: "text", KeyValue: "1" },
      { KeyName: "2", Keytype: "text", KeyValue: "2" },
      { KeyName: "3", Keytype: "text", KeyValue: "3" },
      { KeyName: "4", Keytype: "text", KeyValue: "4" },
      { KeyName: "5", Keytype: "text", KeyValue: "5" },
      { KeyName: "6", Keytype: "text", KeyValue: "6" },
      { KeyName: "7", Keytype: "text", KeyValue: "7" },
      { KeyName: "8", Keytype: "text", KeyValue: "8" },
      { KeyName: "9", Keytype: "text", KeyValue: "9" },
      { KeyName: "0", Keytype: "text", KeyValue: "0" },
    ];
    if (this.props.lang === "EN") {
      if (this.props.show === "Letters") {
        Letters1 = [
          { KeyName: "A", Keytype: "text", KeyValue: "a" },
          { KeyName: "B", Keytype: "text", KeyValue: "b" },
          { KeyName: "C", Keytype: "text", KeyValue: "c" },
          { KeyName: "D", Keytype: "text", KeyValue: "d" },
          { KeyName: "E", Keytype: "text", KeyValue: "e" },
          { KeyName: "F", Keytype: "text", KeyValue: "f" },
          { KeyName: "G", Keytype: "text", KeyValue: "g" },
          { KeyName: "H", Keytype: "text", KeyValue: "h" },
          { KeyName: "I", Keytype: "text", KeyValue: "i" },
        ];
        Letters2 = [
          { KeyName: "J", Keytype: "text", KeyValue: "j" },
          { KeyName: "K", Keytype: "text", KeyValue: "k" },
          { KeyName: "L", Keytype: "text", KeyValue: "l" },
          { KeyName: "M", Keytype: "text", KeyValue: "m" },
          { KeyName: "N", Keytype: "text", KeyValue: "n" },
          { KeyName: "O", Keytype: "text", KeyValue: "o" },
          { KeyName: "P", Keytype: "text", KeyValue: "p" },
          { KeyName: "Q", Keytype: "text", KeyValue: "q" },
          { KeyName: "R", Keytype: "text", KeyValue: "r" },
        ];
        Letters3 = [
          { KeyName: "S", Keytype: "text", KeyValue: "s" },
          { KeyName: "T", Keytype: "text", KeyValue: "t" },
          { KeyName: "U", Keytype: "text", KeyValue: "u" },
          { KeyName: "V", Keytype: "text", KeyValue: "v" },
          { KeyName: "W", Keytype: "text", KeyValue: "w" },
          { KeyName: "X", Keytype: "text", KeyValue: "x" },
          { KeyName: "Y", Keytype: "text", KeyValue: "y" },
          { KeyName: "Z", Keytype: "text", KeyValue: "z" },
        ];
      } else {
        Letters1 = [
          { KeyName: "#", Keytype: "text", KeyValue: "#" },
          { KeyName: "$", Keytype: "text", KeyValue: "$" },
          { KeyName: "&", Keytype: "text", KeyValue: "&" },
          { KeyName: "_", Keytype: "text", KeyValue: "_" },
          { KeyName: "-", Keytype: "text", KeyValue: "-" },
          { KeyName: "@", Keytype: "text", KeyValue: "@" },
          { KeyName: "(", Keytype: "text", KeyValue: "(" },
          { KeyName: ")", Keytype: "text", KeyValue: ")" },
          { KeyName: "=", Keytype: "text", KeyValue: "+" },
        ];
        Letters2 = [
          { KeyName: "'", Keytype: "text", KeyValue: "'" },
          { KeyName: ":", Keytype: "text", KeyValue: ":" },
          { KeyName: "%", Keytype: "text", KeyValue: "%" },
          { KeyName: "/", Keytype: "text", KeyValue: "/" },
          { KeyName: '"', Keytype: "text", KeyValue: '"' },
          { KeyName: "*", Keytype: "text", KeyValue: "*" },
          { KeyName: "!", Keytype: "text", KeyValue: "!" },
          { KeyName: ",", Keytype: "text", KeyValue: "," },
          { KeyName: ".", Keytype: "text", KeyValue: "." },
        ];
        Letters3 = [
          { KeyName: "?", Keytype: "text", KeyValue: "?" },
          { KeyName: "{", Keytype: "text", KeyValue: "}" },
          { KeyName: "[", Keytype: "text", KeyValue: "]" },
          { KeyName: "|", Keytype: "text", KeyValue: "|" },
          { KeyName: "<", Keytype: "text", KeyValue: "<" },
          { KeyName: ">", Keytype: "text", KeyValue: ">" },
          { KeyName: ";", Keytype: "text", KeyValue: ";" },
          { KeyName: "^", Keytype: "text", KeyValue: "^" },
          { KeyName: "`", Keytype: "text", KeyValue: "`" },
        ];
      }
    } else {
      if (this.props.show === "Letters") {
        Letters1 = [
          { KeyName: "ا", Keytype: "text", KeyValue: "ا" },
          { KeyName: "ب", Keytype: "text", KeyValue: "ب" },
          { KeyName: "ت", Keytype: "text", KeyValue: "ت" },
          { KeyName: "ث", Keytype: "text", KeyValue: "ث" },
          { KeyName: "ج", Keytype: "text", KeyValue: "ج" },
          { KeyName: "ح", Keytype: "text", KeyValue: "ح" },
          { KeyName: "خ", Keytype: "text", KeyValue: "خ" },
          { KeyName: "د", Keytype: "text", KeyValue: "د" },
          { KeyName: "ذ", Keytype: "text", KeyValue: "ذ" },
          { KeyName: "ر", Keytype: "text", KeyValue: "ر" },
        ];
        Letters2 = [
          { KeyName: "ز", Keytype: "text", KeyValue: "ز" },
          { KeyName: "س", Keytype: "text", KeyValue: "س" },
          { KeyName: "ش", Keytype: "text", KeyValue: "ش" },
          { KeyName: "ص", Keytype: "text", KeyValue: "ص" },
          { KeyName: "ض", Keytype: "text", KeyValue: "ض" },
          { KeyName: "ط", Keytype: "text", KeyValue: "ط" },
          { KeyName: "ظ", Keytype: "text", KeyValue: "ظ" },
          { KeyName: "ع", Keytype: "text", KeyValue: "ع" },
          { KeyName: "غ", Keytype: "text", KeyValue: "غ" },
          { KeyName: "ف", Keytype: "text", KeyValue: "ف" },
        ];
        Letters3 = [
          { KeyName: "ق", Keytype: "text", KeyValue: "ق" },
          { KeyName: "ك", Keytype: "text", KeyValue: "ك" },
          { KeyName: "ل", Keytype: "text", KeyValue: "ل" },
          { KeyName: "م", Keytype: "text", KeyValue: "م" },
          { KeyName: "ن", Keytype: "text", KeyValue: "ن" },
          { KeyName: "ه", Keytype: "text", KeyValue: "ه" },
          { KeyName: "و", Keytype: "text", KeyValue: "و" },
          { KeyName: "ي", Keytype: "text", KeyValue: "ي" },
          { KeyName: "ى", Keytype: "text", KeyValue: "ى" },
          { KeyName: "ء", Keytype: "text", KeyValue: "ء" },
        ];
      } else {
        Letters1 = [
          { KeyName: "#", Keytype: "text", KeyValue: "#" },
          { KeyName: "$", Keytype: "text", KeyValue: "$" },
          { KeyName: "&", Keytype: "text", KeyValue: "&" },
          { KeyName: "_", Keytype: "text", KeyValue: "_" },
          { KeyName: "-", Keytype: "text", KeyValue: "-" },
          { KeyName: "@", Keytype: "text", KeyValue: "@" },
          { KeyName: "(", Keytype: "text", KeyValue: "(" },
          { KeyName: ")", Keytype: "text", KeyValue: ")" },
          { KeyName: "=", Keytype: "text", KeyValue: "+" },
        ];
        Letters2 = [
          { KeyName: "'", Keytype: "text", KeyValue: "'" },
          { KeyName: ":", Keytype: "text", KeyValue: ":" },
          { KeyName: "%", Keytype: "text", KeyValue: "%" },
          { KeyName: "/", Keytype: "text", KeyValue: "/" },
          { KeyName: '"', Keytype: "text", KeyValue: '"' },
          { KeyName: "*", Keytype: "text", KeyValue: "*" },
          { KeyName: "!", Keytype: "text", KeyValue: "!" },
          { KeyName: ",", Keytype: "text", KeyValue: "," },
          { KeyName: ".", Keytype: "text", KeyValue: "." },
        ];
        Letters3 = [
          { KeyName: "?", Keytype: "text", KeyValue: "?" },
          { KeyName: "{", Keytype: "text", KeyValue: "}" },
          { KeyName: "[", Keytype: "text", KeyValue: "]" },
          { KeyName: "|", Keytype: "text", KeyValue: "|" },
          { KeyName: "<", Keytype: "text", KeyValue: "<" },
          { KeyName: ">", Keytype: "text", KeyValue: ">" },
          { KeyName: ";", Keytype: "text", KeyValue: ";" },
          { KeyName: "^", Keytype: "text", KeyValue: "^" },
          { KeyName: "`", Keytype: "text", KeyValue: "`" },
        ];
      }
    }
    const SpaceBar = [
      { KeyName: "Space", Keytype: "text", KeyValue: " " },
      {
        KeyName: "Backspace",
        Keytype: "function",
        KeyValue: "backspace",
        KeyFunction: "bksp",
      },
      {
        KeyName: "Clear",
        Keytype: "function",
        KeyValue: "eraser",
        KeyFunction: "clear",
      },
    ];
    const NumLine = numrows.map((response) => {
      return (
        <div className="col px-1" key={response.KeyName}>
          <button
            className="btn btn-sm btn-keyboard btn-block"
            datareturn={response.KeyValue}
            datatype={response.Keytype}
            onClick={this.BtnClick}
            type="button"
          >
            {response.KeyName}
          </button>
        </div>
      );
    });
    const Letters1Line = Letters1.map((response) => {
      return (
        <div className="col px-1" key={response.KeyName}>
          <button
            className="btn btn-sm btn-keyboard btn-block"
            datareturn={response.KeyValue}
            datatype={response.Keytype}
            onClick={this.BtnClick}
            type="button"
          >
            {response.KeyName}
          </button>
        </div>
      );
    });
    const Letters2Line = Letters2.map((response) => {
      return (
        <div className="col px-1" key={response.KeyName}>
          <button
            className="btn btn-sm btn-keyboard btn-block"
            datareturn={response.KeyValue}
            datatype={response.Keytype}
            onClick={this.BtnClick}
            type="button"
          >
            {response.KeyName}
          </button>
        </div>
      );
    });
    const Letters3Line = Letters3.map((response) => {
      return (
        <div className="col px-1" key={response.KeyName}>
          <button
            className="btn btn-sm btn-keyboard btn-block"
            datareturn={response.KeyValue}
            datatype={response.Keytype}
            onClick={this.BtnClick}
            type="button"
          >
            {response.KeyName}
          </button>
        </div>
      );
    });
    const SpaceBarLine = SpaceBar.map((response) => {
      if (response.Keytype === "text") {
        return (
          <div className="col-8 px-1" key={response.KeyName}>
            <button
              className="btn btn-sm btn-keyboard btn-block"
              datareturn={response.KeyValue}
              datatype={response.Keytype}
              onClick={this.BtnClick}
              type="button"
            >
              {response.KeyName}
            </button>
          </div>
        );
      } else {
        return (
          <div className="col-2 px-1" key={response.KeyName}>
            <button
              className="btn btn-sm btn-keyboard btn-block"
              datareturn={response.KeyFunction}
              datatype={response.Keytype}
              onClick={this.BtnClick}
              type="button"
            >
              <i className={"fas fa-" + response.KeyValue}></i>
            </button>
          </div>
        );
      }
    });
    return (
      <Fragment>
        <div className="keyboardrow my-2 ltr">{NumLine}</div>
        <div
          className={
            this.props.lang === "EN"
              ? "keyboardrow my-2 ltr"
              : "keyboardrow my-2 rtl"
          }
        >
          {Letters1Line}
        </div>
        <div
          className={
            this.props.lang === "EN"
              ? "keyboardrow my-2 ltr"
              : "keyboardrow my-2 rtl"
          }
        >
          {Letters2Line}
        </div>
        <div
          className={
            this.props.lang === "EN"
              ? "keyboardrow my-2 ltr"
              : "keyboardrow my-2 rtl"
          }
        >
          {Letters3Line}
        </div>
        <div className="keyboardrow my-2 ltr">{SpaceBarLine}</div>
      </Fragment>
    );
  }
}
