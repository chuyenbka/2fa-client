import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import QRCode from './QRCode';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrText: ''
    }
  }

  generateQRCode = async () => {
    const data = await axios.post('http://localhost:3002/generate-token', {
      token: '2fa',
      username: 'chuyenpn'
    });
    const qrUrl = data.data.token;
    this.setState({
      qrText: qrUrl,
    })
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       qrText: '11111'
  //     })
  //   }, 3000)
    
  // }

  render() {
    return (
      <div className="App container">
        <button type="button" className="btn btn-primary" onClick={this.generateQRCode}> Bật xác thực 2 bước </button>
        {this.state.qrText && 
          <QRCode qrText={this.state.qrText} />
        }
      </div>
    );
  }
}

export default App;
