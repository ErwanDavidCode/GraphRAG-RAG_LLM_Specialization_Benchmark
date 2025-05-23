# GraphRAG from Microsoft

GraphRAG generates a knowledge graph from unstructured documents by extracting entities and their relationships using large language models. This structured graph enables more accurate and explainable retrieval-augmented question answering.

The Microsoft GraphRAG implementation used in this project is available at : [GraphRAG Microsoft](https://github.com/microsoft/graphrag) 

To use it:

1. Follow Microsoft’s official setup guide:  
   Link : [Get Started with GraphRAG](https://microsoft.github.io/graphrag/get_started/)
2. To visualize the knowledge graph using **Gephi**, do the following:
   - First, run the script in the GraphRAG_Microsoft folder after the graphRAG generation:
     ```bash
     python generate_graphml_with_relationships.py
     ```
     It aims at formating the data so the links are visible on Gephi.
   - Then, follow Microsoft’s visualization guide:  
     Link : [GraphRAG Visualization Guide](https://microsoft.github.io/graphrag/visualization_guide/)
    
Once you have set up your workspace variables (follow the Microsoft tutorial I linked in point 1.), you will have access to `ragtest/settings.yaml`. Feel free to modify it as you want for your applications.