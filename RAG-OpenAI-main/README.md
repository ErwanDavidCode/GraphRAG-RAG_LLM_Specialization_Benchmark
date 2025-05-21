# RAG System with OpenAI Embeddings, ChromaDB and OpenAI Chat

This Retrieval Augmented Generation (RAG) system uses OpenAI embeddings and ChatGPT to create a document-based question answering system with vector storage.

## Project Structure

This project consists of several Python scripts that work together:

1. `openAILoad.py` - Loads text files into ChromaDB vector database
2. `openAILoadMarkdown.py` - Loads markdown files into a separate ChromaDB vector database
3. `openAIRetrieve.py` - Chat interface using the vector database for context-aware responses
4. `simple_chat.py` - Standalone chat interface with OpenAI (without RAG)
5. `scrapWebPagesIntoMarkdown.js` - Scraps Websites to fetch content from websites and convert it to markdown format

## Execution Order

### Step 1: Load Documents into Vector Database

First, run either or both of these scripts depending on your document types:

- `openAILoad.py` - Processes .txt and .pdf files into a vector database
  - Loads files from the `./txt` and `./pdf` directories
  - Splits documents into chunks
  - Creates embeddings using OpenAI
  - Stores them in the `./chromaDB` directory

- `openAILoadMarkdown.py` - Processes .md files into a separate vector database
  - Loads files from the `./md` directory
  - Splits markdown documents into appropriate chunks
  - Creates embeddings using OpenAI
  - Stores them in the `./chromaDB_MD` directory

### Step 2: Query the Vector Database

After loading your documents, run:

- `openAIRetrieve.py` - Interactive chat interface that:
  - Connects to the previously created ChromaDB vector store
  - Creates a conversation chain with memory
  - Allows users to ask questions about the loaded documents
  - Uses OpenAI's GPT-4o model to generate contextually relevant answers

### Alternative: Simple Chat without RAG
If you simply want to chat with OpenAI without document retrieval:

- simple_chat.py - Direct chat interface with OpenAI GPT-4o
  - Creates a conversation session with OpenAI
  - Maintains conversation history
  - No connection to vector database or document context

### Web Scraping
Before using the RAG system, you'll need documents to work with. The project includes a JavaScript-based web scraping tool to fetch content from websites and convert it to markdown format if you need it :
`scrapWebPagesIntoMarkdown.js`

This script extracts text from web pages and converts it to clean markdown format using Mozilla's Readability (the same technology used in Firefox's reader view). It can be used to scrape any website, and in this example, it's configured to extract content from engineering school websites.

Setup requirements:
```
npm install node-fetch jsdom @mozilla/readability turndown
```

Usage:
```
node scrapWebPagesIntoMarkdown.js
```

The script:
1. Fetches HTML content from specified URLs
2. Uses Mozilla's Readability to extract the main content
3. Converts the HTML to clean markdown
4. Removes links and images
5. Saves the content to markdown files in the ./md directory

You can modify the URLs in the script to scrape content from any website relevant to your needs.

## Setup Requirements

Before running these scripts:

1. Install required packages:
```
pip install langchain openai "langchain[docarray]" langchain-community langchain-openai "unstructured[md]"
```

2. Set your OpenAI API key by replacing "YOUR_KEY" in each script.

3. Optional: Set your HuggingFace token if needed.

## Usage

1. Run the loading script(s) first to create your vector database.
2. Run the retrieve script to start asking questions about your documents.
3. Type "exit" to end the chat session.

You can also use a simple OpenAI chat interface without RAG by running `simple_chat.py` (the third script shown in your example).

## Note
Note that “schools” are mentioned in several places, but this is just one case where the RAG is based on elements taken from the websites of several engineering schools.