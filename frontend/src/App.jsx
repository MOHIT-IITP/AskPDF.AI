import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

const uploadFile = async () => {
  if (!file) {
    alert("Please select a PDF file to upload.");
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post('http://localhost:8000/upload_pdf/', formData);

    // Send file_name as query parameter
    await axios.post(`http://localhost:8000/create_vector_store/?file_name=${file.name}`);
    
    setIsFileUploaded(true);
    alert("File uploaded and vector store created successfully!");
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Error uploading file. Please try again.");
  }
};

const askQuestion = async () => {
  if (!question) {
    alert("Please enter a question.");
    return;
  }

  try {
    // Send file_name as query parameter
    const response = await axios.post(`http://localhost:8000/ask_question/?question=${question}&file_name=${file.name}`);
    
    setAnswer(response.data.answer);
  } catch (error) {
    console.error("Error asking question:", error);
    alert("Error asking question. Please try again.");
  }
};

  return (
    <div style={{ padding: '20px' }}>
      <h1>Chat with PDFs</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload PDF</button>

      {isFileUploaded && (
        <div>
          <h2>Ask a Question</h2>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here"
          />
          <button onClick={askQuestion}>Ask</button>
        </div>
      )}

      {answer && (
        <div>
          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;
