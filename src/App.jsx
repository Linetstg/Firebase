import React, { Component } from 'react';
import { stor } from './firebase';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './App.css';
import Upload from './images/upload.svg';
import Group from './images/group.svg';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0,
      drag: false,
      src: '',
    }
    this.handleChange = this.handleChange.bind(this);

  }

  dragStartHandler = e => {
    e.preventDefault()
    this.setState({
      drag: true
    })
  }

  dragLeaveHandler = e => {
    e.preventDefault()
    this.setState({
      drag: false,
    })
  }

  onDropHandler = e => {
    e.preventDefault()
    if (e.dataTransfer.files[0]) {
      const image = e.dataTransfer.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          src: e.target.result,
        });
      };
      reader.readAsDataURL(image);

      this.setState(() => ({ image }))
      const uploadTask = stor.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_change',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.setState({ progress })
        },
        (error) => {
          console.log(error)
        },
        () => {
          stor.ref('images').child(image.name).getDownloadURL().then(url => {
            this.setState({ url })
          })
        });
    }
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          src: e.target.result,
        });
      };
      reader.readAsDataURL(image);

      this.setState(() => ({ image }))
      const uploadTask = stor.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_change',
        (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.setState({ progress })
          
          
        },
        (error) => {
          console.log(error)
        },
        () => {
          stor.ref('images').child(image.name).getDownloadURL().then(url => {
            this.setState({ url })
          })
        });
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className='container'>

            <h2 className='main-title'>
              {this.state.url
              ? <>
                  <img src={Group}></img> Success
                </>
              : `Upload Image`
              }
              </h2>
            <div
              className='block-type'
              onDragStart={e => this.dragStartHandler(e)}
              onDragLeave={e => this.dragLeaveHandler(e)}
              onDragOver={e => this.dragStartHandler(e)}
              onDrop={e => this.onDropHandler(e)}
            >
              {this.state.progress > 0
                ? <>
                  <img
                    className={this.state.url ? 'image-upload' : 'image-not-upload'}
                    src={this.state.src}
                    alt="uloade image"
                  ></img>

                  {(!this.state.url && this.state.progress > 0)
                    && <>
                      <img
                        className='demo-image'
                        src={this.state.src}
                        alt="uloade image"
                      >
                      </img>
                      <div className='circlde-progress' style={{ width: 60, height: 60 }}>
                        <CircularProgressbar
                          value={this.state.progress}
                          maxValue={100}
                          text={`${this.state.progress}%`}
                          styles={buildStyles({
                            textSize: '0px',
                            strokeWidth: 100,
                            pathColor: '#FBFBFB',
                            textColor: '#000000',
                            trailColor: '#000000',
                          })}
                        />
                      </div>
                      <p className='percent'>{this.state.progress}%</p>
                    </>}
                </>

                : <>
                  <img
                    src={Upload}
                    className='image'
                    alt="upload image"
                  />
                  <p className='input-text'>
                    Drag & Drop image file to upload or
                    <br />
                    <label
                      className='button-select'
                      htmlFor='upload-image'
                    >
                      select
                    </label>
                    &nbsp;it manually
                  </p>
                </>
              }
            </div>

            <input
              type="file"
              id="upload-image"
              className='input-type'
              onChange={this.handleChange}

            />
            <p className='footer-type'>
              {this.state.progress === 0
                ? `Upload your image file, up to 5mb in size`
                : this.state.url 
                  ? `Image uploaded successfully`
                  : `Don't close this window while the image uploading`
              }
            </p>

          </div>

        </header>
      </div>
    )
  }
}


export default App;
