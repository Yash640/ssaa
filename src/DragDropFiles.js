import React from 'react';

function DragDropFiles({ onFileDrop }) {
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    onFileDrop(event.dataTransfer.files);
  };

  return (
    <div
      className="drag-drop-box"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <p>Drag and drop a file here</p>
    </div>
  );
}

export default DragDropFiles;