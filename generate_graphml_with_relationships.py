import pandas as pd
import networkx as nx

# Charger le fichier des relations
df_relationships = pd.read_parquet('./graphrag/ragtest/output/create_final_relationships.parquet')

# Créer un graphe orienté
graph = nx.DiGraph()

# Ajouter les liens avec leurs attributs
for _, row in df_relationships.iterrows():
    source = row['source']  # Nom de la colonne pour le noeud source
    target = row['target']  # Nom de la colonne pour le noeud cible
    weight = row.get('weight', 1.0)  # Poids de la relation
    label = row.get('description', 'Unknown')  # Label de la relation

    graph.add_edge(source, target, weight=weight, label=label)


# # ✅ Post-traitement : Fusionner "TRUMP" dans "DONALD TRUMP"
# if "TRUMP" in graph and "DONALD TRUMP" in graph:
#     # Parcourir les voisins de "TRUMP"
#     for neighbor in list(graph.neighbors("TRUMP")):
#         weight = graph["TRUMP"][neighbor].get("weight", 1.0)
#         label = graph["TRUMP"][neighbor].get("label", "Merged")  # Conserver le label d'origine

#         # Ajouter un lien de "DONALD TRUMP" vers les mêmes voisins
#         if not graph.has_edge("DONALD TRUMP", neighbor):  # Éviter les doublons
#             graph.add_edge("DONALD TRUMP", neighbor, weight=weight, label=label)

#     # Parcourir les arêtes entrantes vers "TRUMP"
#     for neighbor in list(graph.predecessors("TRUMP")):
#         weight = graph[neighbor]["TRUMP"].get("weight", 1.0)
#         label = graph[neighbor]["TRUMP"].get("label", "Merged")

#         # Ajouter un lien vers "DONALD TRUMP"
#         if not graph.has_edge(neighbor, "DONALD TRUMP"):
#             graph.add_edge(neighbor, "DONALD TRUMP", weight=weight, label=label)

#     # Supprimer l'ancien nœud "TRUMP"
#     graph.remove_node("TRUMP")


# Exporter le graphe fusionné en GraphML
nx.write_graphml(graph, './graphrag/ragtest/output/graph_fusionné_with_weights_and_labels.graphml')