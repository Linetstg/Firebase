import React, { Component } from 'react';
import {stor} from './firebase';

import './App.css';
import Upload from './images/upload.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0
    }
    this.handleChange = this.handleChange.bind(this);

    this.handleUpload = this.handleUpload.bind(this);
  }

  handleChange = e => {
    if(e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}))
    }
  }

  handleUpload = () => {
    const {image} = this.state;
    const uploadTask = stor.ref(`images/${image.name}`).put(image);
    uploadTask.on('state_change', 
    (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.setState({progress})
    }, 
    (error) => {
      console.log(error)
    }, 
    () => {
      stor.ref('images').child(image.name).getDownloadURL().then(url => {
          console.log(url);
          this.setState({url})
      })
    });
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
        <div className='container'>

          <h2 className='main-title'>Upload Image</h2>
          <div
            className='block-type'
            >
            <img
              src={Upload}
              className='image'
              alt="upload image"
            />
            <p className='input-text'>
              Drag & Drop image file to upload or
              <br/>
              <label
                htmlFor='upload-image'
                >
                select
              </label>
              &nbsp;it manually
            </p>
            
           
          </div>

          <input
              type="file"
              id="upload-image"
              className='input-type'
              onChange={this.handleChange}
              
            />
            <button 
            onClick={this.handleUpload}
            >Upload</button>
            <img
              src={this.state.url || Upload}
              alt="uloade image"
              height="300"
              width="400"
              ></img>
              <progress value={this.state.progress} max="100" />
              <div>{this.state.progress}</div>

        </div>
        <footer className='footer-type'>
          Upload your image file, up to 5mb in size
        </footer>
      </header>
    </div>
    )
  }
}


export default App;
