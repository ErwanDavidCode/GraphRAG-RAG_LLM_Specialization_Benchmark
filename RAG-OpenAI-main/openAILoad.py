from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
import re
from langchain_openai import OpenAIEmbeddings
import os

# pour le tokenizer de HuggingFace appelé par langchain_community : est-ce utile ?
# import os
# os.environ["HF_TOKEN"] = "YOUR_KEY"

# chargement de tous les fichiers texte du répertoire
from langchain_community.document_loaders import DirectoryLoader
loader = DirectoryLoader('./txt', glob="**/*.txt", show_progress=True)
text_docs = loader.load()

# # chargement de tous les fichiers pdf du répertoire
# from langchain.document_loaders import PyPDFLoader
# loader = DirectoryLoader('./pdf', glob="**/*.pdf", loader_cls=PyPDFLoader, show_progress=True)
# pdf_docs = loader.load()

# chargement de tous les fichiers pdf du répertoire
pdf_docs = []
# import glob
# from langchain_community.document_loaders import PyMuPDFLoader
# repertoire_pdf = "./pdf/*.pdf"
# fichiers_pdf = glob.glob(repertoire_pdf)    # tous les fichiers du répertoire /pdf
# pdf_docs = []
# for fichier_pdf in fichiers_pdf:
#     try:
#         loader = PyMuPDFLoader(fichier_pdf)
#         pdf = loader.load()
#         pdf_docs.extend(pdf)
#         print(f"Loaded data from {fichier_pdf}")
#     except Exception as e:
#         print(f"Error loading data from {fichier_pdf}: {e}")

# Concaténation des deux listes de documents
docs = text_docs + pdf_docs
print(f"Nombre total de documents chargés: {len(docs)}")

##### 1.2 preprocessing des données en entrée

# suppression des caractères spéciaux : espace insécable \xa0 , thin space \u2009 et retour à la ligne \n
# et séparation des mots qui sont collés (une majuscule au mileu d'un mot)
# for doc in docs:
#     doc.page_content = doc.page_content.replace(u'\xa0', u' ')
#     doc.page_content = doc.page_content.replace(u'\u2009', u'')
#     doc.page_content = re.sub(r"(\w)([A-Z])", r"\1 \2", doc.page_content)

##### 1.3 découpage en chunks

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
splits = text_splitter.split_documents(docs)

#### 1.4 ajout des méta données école, fichier et extension
# for split in splits:
#     filename = split.metadata['source']
#     # Extraction du nom de l'école, du nom du document et du type de fichier
#     # par exemple 'txt/Arts et Métiers - 3e année.txt' devient 'Arts et Métiers' , '3e année' et 'txt'
#     filename = filename.replace('txt/', '')
#     filename = filename.replace('./pdf/', '')
#     pattern = r"(.*?) - (.*?)\.(txt|pdf)"
#     match = re.match(pattern, filename)
#     if match:
#         ecole = match.group(1)
#         fichier = match.group(2)
#         extension = match.group(3)
        
#     split.metadata = {
#         "ecole": ecole,
#         "fichier": fichier,
#         "type": extension
#     }
print(f"Total splits: {len(splits)}")

for j in range (len(splits)):
    print(splits[j])
    print("********")

##### 2. store to ChromaDB the chunks

# Set the API key as an environment variable
api_key = "YOUR_KEY"
os.environ["OPENAI_API_KEY"] = api_key

embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(documents=splits, embedding=embeddings, persist_directory="./chromaDB")
