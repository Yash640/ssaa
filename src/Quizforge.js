import React, { useState } from 'react';
import './style.css';

function Quizforge() {
  const [numQuestions, setNumQuestions] = useState(0);
  const [difficulty, setDifficulty] = useState('');
  const [subject, setSubject] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [pdfFile, setPdfFile] = useState(null); // State to store the dropped PDF file

  const handleNumQuestionsChange = (event) => {
    const value = parseInt(event.target.value);
    if (value >= 2 && value <= 50) {
      setNumQuestions(value);
    } else {
      alert('Number of questions must be between 2 and 50.');
    }
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleFileDrop = (files) => {
    const pdfFile = files[0];
    if (pdfFile.type !== 'application/pdf') {
      alert('Only PDF and txt files are allowed!');
      return;
    }
    setPdfFile(pdfFile);

    // Display PDF preview (example)
    const reader = new FileReader();
    reader.onload = (event) => {
      const preview = document.createElement('img');
      preview.src = event.target.result;
      // Add preview to the UI (replace with your logic for displaying the preview)
      console.log('Preview image:', preview.src);
    };
    reader.readAsDataURL(pdfFile);
  };

  const handleSubmit = async () => {
    var data = new FormData()
    data.append('file',pdfFile)
    let Response = fetch ("http://127.0.0.1:8000/pdf/" , {
      method : 'POST' ,
      headers:{
        'Content-Type' : 'application/json',  
      }, body: data 
          
    })
    const questions = [];
    for (let i = 0; i < numQuestions; i++) {
      questions.push(`Question ${i + 1}`);
    }
    setGeneratedQuestions(questions);
  };

  function DragDropFiles({ onFileDrop }) {
    const handleDrop = (event) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      onFileDrop(files);
    };

    const handleDragOver = (event) => {
      event.preventDefault();
    };

    return (
      <div
        className="drag-drop-box"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p>Drag and drop a PDF file here</p>
      </div>
    );
  }

  return (
    <div className="quizforge-container">
      <h1 style={{ textAlign: 'center' }}>QuizForge</h1>
      <p style={{ textAlign: 'center' }}>Transforming Text into Questions: Your AI-Powered Learning Companion!</p>
      <DragDropFiles onFileDrop={handleFileDrop} />
      {pdfFile && <p>Uploaded PDF: {pdfFile.name}</p>}  {/* Display uploaded PDF name */}
      <div className="button-container">
        <input
          type="number"
          placeholder="Number of Questions (2-50)"
          value={numQuestions}
          onChange={handleNumQuestionsChange}
        />
        <select value={difficulty} onChange={handleDifficultyChange}>
          <option value="">Select Difficulty</option>
          <option value="difficult">Difficult</option>
          <option value="moderate">Moderate</option>
          <option value="easy">Easy</option>
        </select>
        <input
          type="text"
          placeholder="Subject / topic "
          value={subject}
          onChange={handleSubjectChange}
        />
      </div>
      <button onClick={handleSubmit}>Generate Questions</button>
      <div className="generated-questions">
        {generatedQuestions.length > 0 && (
          <ul>
            {generatedQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Quizforge;
