# AskPdf.Ai
### *Revolutionizing PDF Interaction with LLaMA 3.2 and LangChain*

This application allows users to upload PDF files, extract text from them, and ask questions about their content. The backend processes the uploaded PDF files, handles text extraction, chunking, and question answering using **offline large language models (LLMs)** via **Ollama**. The frontend provides a responsive and interactive UI for seamless querying.

---

## 🧱 Architecture Overview

### 🔧 Backend Architecture

The backend is built with **FastAPI (Python 3.10)** and manages all document processing and question answering operations.

#### Key Backend Components

##### `main.py` (FastAPI Application)
**Role:** Main entry point for the backend service  
**Responsibilities:**
- Initializes and configures the FastAPI app
- Sets up CORS for secure frontend-backend interaction
- Defines API endpoints:
  - `/upload_pdf`
  - `/create_vector_store`
  - `/ask_question`
- Stores active PDF processing sessions

##### `pdf_processor.py` (PDF Processor)
**Role:** Handles all PDF processing logic  
**Responsibilities:**
- **Text Extraction:** Uses `PyMuPDF (fitz)` to extract text
- **Chunking:** Splits text into manageable chunks
- **Vectorization:** Embeds chunks and stores them in **FAISS**
- **Question Answering:** Uses **LangChain** + **Ollama** to generate answers

---

### 📡 Backend Interaction Flow

#### 📤 PDF Upload Flow:
User → /upload_pdf → Extract Text → Chunk → Embed → Store in FAISS → Response

shell
Copy
Edit

#### ❓ Question Answer Flow:
User → /ask_question → Vector Search (FAISS) → Context to LLM (Ollama) → Answer → Response

markdown
Copy
Edit

---

## 💻 Frontend Architecture

The frontend is built using **React (Vite + Material UI)** and handles user interaction, API communication, and display.

#### Key Frontend Components

##### `App.jsx` (Root App Component)
**Role:** Container for the entire application  
**Responsibilities:**
- Manages global state (upload status, questions, answers)
- Organizes layout and routing

##### `FileUpload.jsx`
**Role:** Handles PDF upload interaction  
**Responsibilities:**
- Allows users to choose and upload a PDF
- Sends PDF to backend `/upload_pdf`
- Waits for vector store creation via `/create_vector_store`
- Displays upload status

##### `QuestionSection.jsx`
**Role:** Q&A interface for user interaction  
**Responsibilities:**
- Takes user questions
- Sends them to `/ask_question`
- Displays LLM-generated answers in a chat-like view

---

## 🔁 Data Flow Summary

### PDF Upload Flow:
User → FileUpload Component → /upload_pdf API → PDFProcessor Init → /create_vector_store → UI Update

shell
Copy
Edit

### Question-Answer Flow:
User → QuestionSection Component → /ask_question API → FAISS Search → LangChain + Ollama → Answer → UI Update

yaml
Copy
Edit

---

## 🧰 Key Technologies Used

### 🔙 Backend
- **FastAPI:** High-performance API framework
- **LangChain:** LLM workflow & retrieval-augmented generation
- **Ollama:** Offline LLM engine (e.g., LLaMA 3.2)
- **FAISS:** Efficient vector similarity search
- **PyMuPDF (fitz):** PDF text extraction
- **Uvicorn:** ASGI server for FastAPI

### 🌐 Frontend
- **ReactJS (Vite):** Fast modern web development
- **Tailwindcss:** Modern Ui Experience
- **Axios:** Promise-based HTTP client
- **React Hooks (useState, useEffect):** Local state management

---

## 🧠 Usage Guide

### 1. Upload a PDF
- Go to the app's homepage.
- Select and upload a PDF file.
- Wait a few seconds while the model processes the content (especially when using an **offline Ollama model**).

### 2. Ask Questions
- Once processing is done, the question section will become available.
- Enter your question in natural language (e.g., “What is the name of Pm of India?”).
- Get an instant AI-generated answer!

---

## ⚙️ Setup Instructions

### 📦 Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Start Ollama with your model
ollama run llama3  # or any supported model

# Run FastAPI server
uvicorn main:app --reload
💻 Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
Make sure both frontend and backend are running and communicating correctly (check CORS settings and port numbers).

🗂️ Folder Structure Overview
css
Copy
Edit
AskPdf.ai/
├── backend/
│   ├── main.py

├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   └── vite.config.js
└── README.md
