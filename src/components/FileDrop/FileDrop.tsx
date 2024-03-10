/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 09/03/2024 19:03:38
*/
import React, { FC, useState } from 'react';
import './FileDrop.css';


interface FileDropProps {
  onFileDrop:(files:Array<File>)=>void

}


const FileDrop: FC<FileDropProps> = ({onFileDrop}) => {
  const [dragging, setDragging] = useState<boolean>(false)

  const handleDragEnter = (event: any) => {
    event.preventDefault()
    setDragging(true)

  }

  const handleDrop = (event: any) => {
    event.preventDefault()
    setDragging(false)
    const files:File[] = Array.from(event.dataTransfer.files)
    onFileDrop(files)
    console.log(files);

  }

  const handleDragLeave = (event: any) => {
    event.preventDefault()
    setDragging(false)

  }

  const handleDragOver = (event: any) => {
    event.preventDefault()
    setDragging(true)

  }

  return (
    <div className="FileDrop">
      <div className={"upload-zone "+(dragging ? "dragging": "")}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}

      >
        <p>Glissez et deposez vos fichiers videos !</p>
      </div>
    </div>
  );
}

export default FileDrop;