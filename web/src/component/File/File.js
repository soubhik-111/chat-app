import React from 'react';
import "../Message/Message.css";
import "./File.css";
import fileImg from "../../image/file.png"

const File = ({ user, documentData, classs }) => {

  const handleDownload = () => {
    const blob = new Blob([documentData.selectedFile]);
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobURL;
    link.download = documentData.fileName;
    link.click();
    URL.revokeObjectURL(blobURL);
  }

  if (user) {
    return (
      <div className={`MessageBox ${classs} file-box`} >
        <span>{user}: </span><span className='file-details' title={documentData && documentData.fileName} onClick={handleDownload}><img src={fileImg} style={{ filter: "invert(1)" }} alt="File" className='file-img' /> <span className='file-name'>{documentData && documentData.fileName}</span></span>
      </div>
    )
  }

  return (
    <div className={`MessageBox ${classs} file-box`}>
      <span>You:</span> <span className='file-details' title={documentData && documentData.fileName} onClick={handleDownload}><img src={fileImg} alt="File" className='file-img' /> <span className='file-name'>{"DOWNLOAD FILE"}</span></span>
    </div>
  )

}

export default File
