from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain_ollama import OllamaEmbeddings
from langchain_ollama.llms import OllamaLLM
from fastapi.middleware.cors import CORSMiddleware
from langchain.embeddings import OpenAIEmbeddings
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (or specify your frontend URL)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory to save uploaded PDFs
pdfs_directory = 'pdfs/'
os.makedirs(pdfs_directory, exist_ok=True)

# Initialize Ollama Embeddings and Model
embeddings = OllamaEmbeddings(model="llama3.2")
model = OllamaLLM(model="llama3.2")

# In-memory storage for vector stores
vector_store_map = {}

# Endpoint to upload PDF
@app.post("/upload_pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    file_location = os.path.join(pdfs_directory, file.filename)
    with open(file_location, "wb") as f:
        f.write(await file.read())
    return {"filename": file.filename}

# Endpoint to create a vector store from PDF
@app.post("/create_vector_store/")
async def create_vector_store(file_name: str):
    file_path = os.path.join(pdfs_directory, file_name)
    
    # Load and split the PDF document
    loader = PyPDFLoader(file_path)
    documents = loader.load()
    
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=300, add_start_index=True)
    chunked_docs = text_splitter.split_documents(documents)

    # Create FAISS vector store
    db = FAISS.from_documents(chunked_docs, embeddings)
    
    # Store vector store in-memory using file_name as the key
    vector_store_map[file_name] = db

    return {"message": "Vector store created successfully"}

# Endpoint to ask a question from the PDF
@app.post("/ask_question/")
async def ask_question(question: str, file_name: str):
    if file_name not in vector_store_map:
        return {"error": "Vector store not found. Please upload and create the vector store first."}

    db = vector_store_map[file_name]

    # Retrieve relevant documents
    docs = db.similarity_search(question, k=5)
    context = "\n\n".join([doc.page_content for doc in docs])

    # Create a single prompt string
    prompt = f"Context:\n{context}\n\nQuestion: {question}\nAnswer:"

    # Pass string prompt to the model
    answer = model.invoke(prompt)

    return {"answer": answer}


