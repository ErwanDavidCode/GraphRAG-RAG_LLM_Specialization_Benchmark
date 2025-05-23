# 🧠 RAG & GraphRAG Project

This repository contains implementation and benchmark of retrieval-augmented generation (RAG), graph-based document analysis (GraphRAG).

---

## Project Structure

### `RAG_OpenAI/`

This folder contains a complete implementation of a classic RAG system using OpenAI embeddings, ChromaDB, and LangChain.

- Loads `.txt`, `.pdf` (and optionally `.md`) documents
- Stores them in a vector database
- Enables conversational retrieval using GPT-4o

A **detailed README** is included in the folder to guide you step-by-step on usage, configuration, and extensions.

Link for a direct access [detailed README for the RAG module](./RAG_OpenAI/README.md).

---

### `GraphRAG_Microsoft/` (from Microsoft)

This folder contains :
- The full instructions to implement your graphRAG
- A custom code to help visualize the Graph.

A **detailed README** is included in the folder to guide you step-by-step on usage, configuration, and extensions.

Link for a direct access [detailed README for the GraphRAH module](./GraphRAG_Microsoft/README.md).

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

## Summary

| Folder                | Description                                                  |
|-----------------------|--------------------------------------------------------------|
| `RAG_OpenAI/`         | Full RAG pipeline with OpenAI + ChromaDB + LangChain         |
| `GraphRAG/`           | Microsoft GraphRAG integration + Gephi visualization support |
| `Results excel/`      | XLSX files of human and LLM-based evaluation results         |
| `Data location/`      | CSV lists of article URLs used as data sources               |


## Detailed explanation
Just read the `Project_report.pdf` to see the process and the results.

Link for a direct access [Project_report.pdf](./Project_report.pdf).
