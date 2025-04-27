# Welcome to AskPdf.ai
- You can give any pdf and ask what ever question you want to ask to it from the Pdf.
This is a full-stack application that allows users to upload a PDF, generate a vector store from it, and then ask any question related to the content. It uses FastAPI for the backend, ReactJS for the frontend, LangChain for document parsing and LLM interactions, and an offline Ollama model for inference.

🚀 Features
📄 Upload any PDF document

🧬 Automatically generate a vector store

❓ Ask natural language questions based on the PDF

🛡️ Runs completely offline using Ollama LLM

⚡ FastAPI + LangChain backend

🌐 Modern ReactJS frontend

🛠️ Tech Stack
Backend: FastAPI, LangChain

Frontend: ReactJS

LLM: Ollama (offline model) 

Vector Store: (e.g. FAISS, Chroma – update if needed)

PDF Parsing: LangChain Document Loaders

📂 Project Structure
graphql
Copy
Edit
.
├── backend/
│   ├── main.py               # FastAPI app with API routes            
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── App.jsx           
│   │   └── ...
│   └── ...
├── README.md
└── requirements.txt
📦 API Endpoints
1. /upload_pdf
Method: POST

Description: Upload a PDF file to the backend.

Body: multipart/form-data

Returns: File upload confirmation.

2. /create_vector_store
Method: POST

Description: Processes the uploaded PDF and creates a vector store using LangChain.

Returns: Success message when the vector store is ready.

3. /ask_question
Method: POST

Description: Ask a natural language question about the uploaded PDF.


💡 How It Works (Frontend Behavior)
Upload PDF First:
The user must first upload a PDF file using the upload form.

Wait for Processing:
Since the app uses an offline Ollama model, it takes a few seconds to process the file and generate the vector store. A loading indicator or message can be shown during this time.

Then Ask Questions:
Once the vector store is ready, the question input section will automatically appear. The user can then enter natural language questions and get answers based on the content of the uploaded PDF.

⚙️ Setup Instructions
Backend (FastAPI + LangChain + Ollama)
Clone the repo:

bash
Copy
Edit
git clone https://github.com/MOHIT-IITP/AskPDF.AI.git
cd backend
Create a virtual environment and install dependencies:

bash
Copy
Edit
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
Start the Ollama model (make sure Ollama is installed and configured):

bash
Copy
Edit
ollama run <model-name>  # e.g. ollama run llama2
Run the FastAPI server:

bash
Copy
Edit
uvicorn main:app --reload
Frontend (ReactJS)
Go to the frontend folder:

bash
Copy
Edit
cd frontend
Install dependencies:

bash
Copy
Edit
npm install
Start the frontend:

bash
Copy
Edit
npm run dev


