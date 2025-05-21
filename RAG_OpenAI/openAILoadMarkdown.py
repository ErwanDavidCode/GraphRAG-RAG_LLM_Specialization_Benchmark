"""
    charge tous les fichiers markdown .MD dans la base Chroma
    avec l'embedding OpenAI

    %pip install "unstructured[md]"
"""

from langchain_community.document_loaders import UnstructuredMarkdownLoader
from langchain.text_splitter import MarkdownTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
import re
import glob
import os

# Set the API key for OpenAI as an environment variable
api_key = "YOUR_KEY"
os.environ["OPENAI_API_KEY"] = api_key

# pour le tokenizer de HuggingFace appelé par langchain_community : utile ?
import os
os.environ["HF_TOKEN"] = "YOUR_TOKEN"

# Configuration initiale
repertoire_md = "./md/*.md"
fichiers_md = glob.glob(repertoire_md)    # tous les fichiers du répertoire /md

# Initialisation des composants nécessaires
markdown_splitter = MarkdownTextSplitter(chunk_size=1000, chunk_overlap=200)
embeddings = OpenAIEmbeddings()
vectorstore = Chroma(persist_directory="./chromaDB_MD", embedding_function=embeddings)

# Boucle unique pour charger, découper et stocker chaque fichier
for fichier_md in fichiers_md:
    try:
        # Chargement du fichier Markdown
#        loader = UnstructuredMarkdownLoader(fichier_md, mode="elements")
        loader = UnstructuredMarkdownLoader(fichier_md)
        md = loader.load()
        print(f"Loaded data from {fichier_md}")

        # Découpage en chunks
        splits = markdown_splitter.create_documents([doc.page_content for doc in md])

        # Extraction des métadonnées
        filename = fichier_md.replace('./md/', '')
        pattern = r"(.*?) - (.*?)\.(md)"
        match = re.match(pattern, filename)
        if match:
            ecole = match.group(1)
            fichier = match.group(2)
            extension = match.group(3)

            for split in splits:
                split.metadata = {
                    "ecole": ecole,
                    "fichier": fichier,
                    "type": extension
                }
        
        # Stockage dans la base de données de vecteurs
        vectorstore.add_documents(documents=splits)

    except Exception as e:
        print(f"Error loading data from {fichier_md}: {e}")

print("Processing complete.")
