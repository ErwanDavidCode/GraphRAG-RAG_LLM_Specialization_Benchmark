"""
pip install langchain
pip install openai
pip install "langchain[docarray]"
pip install -U langchain-community
pip install -U langchain-openai
"""

from langchain_community.embeddings import OpenAIEmbeddings
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain_openai import OpenAIEmbeddings
from langchain_openai import ChatOpenAI
import os

# Set the API key as an environment variable
api_key = "YOUR_KEY"
os.environ["OPENAI_API_KEY"] = api_key

# Open existing vector store
from langchain_community.vectorstores import Chroma
embeddings = OpenAIEmbeddings()
vectorstore = Chroma(persist_directory="./chromaDB", embedding_function=embeddings)

# # préciser sur quelle école vont intervenir les questions, pour ne chercher que les données de cette école 
# print("\nles écoles connues : 'Arts et Métiers', 'Mines Paris', 'CentraleSupélec', 'aucune' si pas d'école ciblée par la question.")
# ecole = input("\nSur quelle école porte la question : ")

# Create conversation chain
llm = ChatOpenAI(temperature=0.9, model_name="gpt-4o")
memory = ConversationBufferMemory(
        memory_key='chat_history', return_messages=True)
conversation_chain = ConversationalRetrievalChain.from_llm(     # à remplacer par create_retrieval_chain
        llm=llm,
        chain_type="stuff",
        retriever=vectorstore.as_retriever(),
        memory=memory)

# pose la question à l'utilisateur
question = input("\nVotre question : ")

while question != "exit":
        result = conversation_chain({"question": question})
        answer = result["answer"]
        print(answer)

        question = input("\nVotre question : ")
