import React from "react";
import axios from "axios";
import "./App.css";

const APP_SERVER = "https://floating-reaches-39084.herokuapp.com/";
const serverRequest = axios.create({
  // baseURL: "http://localhost:4000"
  baseURL: APP_SERVER
});

// const isEmpty = (obj) => {
//   switch(Object.prototype.toString(obj)) {
//     case '[object Object]': return ;
//     case '[object Array]': break;
//     case '[object Boolean]': break;
//     case '[object String]': break;
//     case '[object Number]': break;
//     default: return false;
//   }
// }
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: "",
      data: {}
    };
    this._file = React.createRef();
  }
  uploadAndFetch = e => {
    e.preventDefault();
    const form = document.querySelector("form");
    let body = new FormData(form);
    // axios.post("http://localhost:4000/uploadxml", body).then(res => {
    serverRequest.post("/uploadxml", body).then(res => {
      if (res.data) {
        this.setState({
          data: res.data
        });
      }
    });
  };
  handleSelect = () => {
    console.log("got clicked");
    const input = this._file.current;
    if (input.files.length) {
      let file = input.files[0];
      if (file.type.toLowerCase() === "text/xml") {
        this.setState({
          filename: file.name
        });
      } else {
        alert("Please upload an .XML file only");
      }
    }
  };
  render() {
    const { data, filename } = this.state;
    return (
      <div className="container">
        <div>
          <h1>WELCOME TO PROJECT X </h1>
          <br />
          <div>
            <p>1. Select and Upload an xml file</p>
            <p>2. Click Submit to See Results</p>
          </div>
          <br />
          <form
            encType="multipart/form-data"
            method="POST"
            // action="http://localhost:4000/uploadxml"
            onSubmit={this.uploadAndFetch}
          >
            <fieldset>
              <input
                placeholder="upload file"
                type="file"
                id="fileUpload"
                name="fileUpload"
                ref={this._file}
                onChange={() => this.handleSelect()}
              />
            </fieldset>
            <fieldset>
              {!filename ? (
                <label htmlFor="fileUpload">SELECT A FILE TO UPLOAD</label>
              ) : (
                <p>{filename && filename}</p>
              )}
            </fieldset>
            <fieldset>
              <button type="submit">Submit</button>
              <button
                type="button"
                onClick={() => {
                  this._file.current.value = null;
                  this.setState({ filename: "" });
                }}
              >
                Clear
              </button>
            </fieldset>
          </form>
        </div>
        <div>
          <h4>POI Results</h4>
          <p className="text"></p>
        </div>
        <div>
          <h4>Ethics Results</h4>
          <p className="text"></p>
        </div>
      </div>
    );
  }
}

export default App;
