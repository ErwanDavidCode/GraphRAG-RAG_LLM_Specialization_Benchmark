import os
from openai import OpenAI

# Configuration de l'API
api_key = "YOUR_KEY"
client = OpenAI(api_key=api_key)

# Initialisation de l'historique
messages = []

# Boucle de conversation
question = input("Votre question : ")

while question != "exit":
    # Ajout de la question à l'historique
    messages.append({"role": "user", "content": question})
    
    # Appel à l'API GPT-4
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        temperature=0.7
    )
    
    # Récupération et affichage de la réponse
    answer = response.choices[0].message.content
    print(answer)
    
    # Ajout de la réponse à l'historique
    messages.append({"role": "assistant", "content": answer})
    
    # Nouvelle question
    question = input("\nVotre question : ")