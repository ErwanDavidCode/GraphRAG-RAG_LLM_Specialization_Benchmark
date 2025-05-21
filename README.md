# 🧠 RAG & GraphRAG Project

This repository contains multiple components related to retrieval-augmented generation (RAG), graph-based document analysis (GraphRAG), and data evaluation.

---

## 📂 Project Structure

### `RAG_OpenAI/`

This folder contains a complete implementation of a classic RAG system using OpenAI embeddings, ChromaDB, and LangChain.

- Loads `.txt`, `.pdf` (and optionally `.md`) documents
- Stores them in a vector database
- Enables conversational retrieval using GPT-4o

➡️ A **detailed README** is included in the folder to guide you step-by-step on usage, configuration, and extensions.

Link for a direct access [detailed README for the RAG module](./RAG_OpenAI/README.md).

---

### `GraphRAG/` (from Microsoft)

This folder contains Microsoft’s implementation:  
   Link : [GraphRAG Microsoft](https://github.com/microsoft/graphrag) 

To use it:

1. Follow Microsoft’s official setup guide:  
   Link : [Get Started with GraphRAG](https://microsoft.github.io/graphrag/get_started/)
2. To visualize the knowledge graph using **Gephi**, do the following:
   - First, run the following script after the graphRAG generation:
     ```bash
     python generate_graphml_with_relationships.py
     ```
     It aims at formating the data so the links are visible on Gephi.
   - Then, follow Microsoft’s visualization guide:  
     Link : [GraphRAG Visualization Guide](https://microsoft.github.io/graphrag/visualization_guide/)

---

### `Results excel/`

This directory contains the **evaluation results** of the system using:

- Human annotations
- LLM-based scoring  
Stored in `.xlsx` format.

---

### `Data location/`

This folder includes `.csv` files listing the URLs of public articles used as data sources for the report, covering:

- The 2016 election of Donald Trump
- The Russia–Ukraine conflict

The data was retrieved using TheGuardian's official API.

---

## ✅ Summary

| Folder                | Description                                                  |
|-----------------------|--------------------------------------------------------------|
| `RAG_OpenAI/`         | Full RAG pipeline with OpenAI + ChromaDB + LangChain         |
| `GraphRAG/`           | Microsoft GraphRAG integration + Gephi visualization support |
| `Results excel/`      | XLSX files of human and LLM-based evaluation results         |
| `Data location/`      | CSV lists of article URLs used as data sources               |


## ✅ Detailed explanation
Just read the `Project_report.pdf` to see the process and the results.

Link for a direct access [Project_report.pdf](./Project_report.pdf).