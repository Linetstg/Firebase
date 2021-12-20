import React, { useState } from 'react';

import './App.css';
import Upload from './images/upload.svg';


function App() {
  
  const [img, setImg] = useState({});
  console.log(img)
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
              onChange={(e) => {setImg(e.target.files[0])}}
            />
        </div>
        <footer className='footer-type'>
          Upload your image file, up to 5mb in size
        </footer>
      </header>
    </div>
  );
}

export default App;
