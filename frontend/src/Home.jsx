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
      const response = await axios.post(`http://localhost:8000/ask_question/?question=${question}&file_name=${file.name}`);
      setAnswer(response.data.answer);
    } catch (error) {
      console.error("Error asking question:", error);
      alert("Error asking question. Please try again.");
    }
  };

  return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-700 to-gray-400 p-4">
            <div className="w-full max-w-2xl backdrop-blur-md bg-white/30 border border-white/50 shadow-xl rounded-3xl p-8 transition-all duration-300">
                <h1 className="text-4xl font-bold text-center text-gray-300 mb-8">
                    <div className='flex justify-center items-center gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='size-15'  fill="currentColor"><path d="M16 2L21 7V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918C3 2.44405 3.44495 2 3.9934 2H16ZM13.529 14.4464L15.7395 16.6569L17.1537 15.2426L14.9432 13.0322C15.8492 11.4983 15.6432 9.48951 14.3252 8.17157C12.7631 6.60948 10.2305 6.60948 8.66839 8.17157C7.1063 9.73367 7.1063 12.2663 8.66839 13.8284C9.98633 15.1464 11.9951 15.3524 13.529 14.4464ZM12.911 12.4142C12.13 13.1953 10.8637 13.1953 10.0826 12.4142C9.30156 11.6332 9.30156 10.3668 10.0826 9.58579C10.8637 8.80474 12.13 8.80474 12.911 9.58579C13.6921 10.3668 13.6921 11.6332 12.911 12.4142Z"></path></svg>
                        AskPDF.ai
                    </div>
                </h1>
                <div className='mb-10 justify-center flex flex-col text-gray-300'>
                    <ol>
                        <li>1.First Select you Desire Pdf</li>
                        <li>2.Click Upload and wait for sometime then Question input will show up</li>
                        <li>3.Then ask question</li>
                    </ol>
                </div>

                <div className="flex flex-col gap-4 mb-8">
                    <label className="text-sm font-medium text-gray-300">Upload a PDF</label>
                    <input
                        type="file"
                        accept="application/pdf"
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition-all"
          />
          <button
            onClick={uploadFile}
            className="w-full bg-black/40 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300"
          >
            Upload PDF
          </button>
        </div>

        {isFileUploaded && (
          <div className="flex flex-col gap-4 mb-8">
            <label htmlFor="question" className="text-sm font-medium text-gray-700">Ask a Question</label>
            <input
              id="question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here"
              className="w-full p-3 rounded-xl bg-white/50 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
            />
            <button
              onClick={askQuestion}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300"
            >
              Ask Question
            </button>
          </div>
        )}

        {answer && (
          <div className="mt-6 p-6 rounded-xl bg-white/60 border border-indigo-200 shadow-inner backdrop-blur-lg">
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Answer:</h3>
            <p className="text-gray-900">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
