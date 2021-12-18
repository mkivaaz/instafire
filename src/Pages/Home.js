import React, { useState } from 'react'
import ImageGrid from '../Component/ImageGrid';
import Modal from '../Component/Modal';
import Title from '../Component/Title';
import UploadForm from '../Component/UploadForm';

function Home() {
    const [selectedImg, setSelectedImg] = useState(null);
    

  return (
    <div className="App">
      <Title/>
      <UploadForm />
      <ImageGrid setSelectedImg = {setSelectedImg}/>
      {selectedImg && <Modal selectedImg ={selectedImg} setSelectedImg = {setSelectedImg}/>}
      
    </div>
  );
}

export default Home
