import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

function genQrCode(text) {
    const QRCode = require('qrcode')
    const canvas = document.getElementById('canvas')
    QRCode.toCanvas(canvas, text, function (error) {
        if (error) console.error(error)
        console.log('success!');
    })
}

class QRCode extends Component {
    constructor(props) {
        super(props);
        this.state = { confirmToken: '', confirmStatus: false, submitCounter: 0 };
    }

    handleChange = (event) => {
        this.setState({ confirmToken: event.target.value });
    }

    componentDidMount() {
        if (this.props.qrText) {
            genQrCode(this.props.qrText);
        }

    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const data = await axios.post('http://localhost:3002/verify-token', {
            token: '2fa',
            username: 'chuyenpn',
            confirmToken: this.state.confirmToken,
        });

        this.setState({
            submitCounter: this.state.submitCounter + 1,
            confirmStatus: data.data.valid
        })
    }

    componentDidUpdate() {
        if (this.props.qrText) {
            genQrCode(this.props.qrText);
        }
    }

    confirmStatus() {
        if (this.state.submitCounter === 0) {
            return '';
        }
        if (this.state.confirmStatus) {
            return <span style={{ color: 'blue' }}> Valid Token </span>;
        }
        return <span style={{ color: 'red' }}> Invalid Token! </span>;
    }
    render() {
        return (
            <div className="qr">
                <canvas id="canvas"></canvas>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1"> Điền mã xác nhận: </label>
                            <input type="text" className="form-control" placeholder="Điền mã xác nhận:" onChange={this.handleChange} value={this.state.confirmToken} />
                        </div>
                        <button type="submit" className="btn btn-primary">Validate</button>
                        <h2> Result : {this.confirmStatus()} </h2>
                    </div>

                </form>
            </div>
        );
    }
}

export default QRCode;
