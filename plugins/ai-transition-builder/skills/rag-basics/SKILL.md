---
name: rag-basics
description: Use when the user wants an LLM to answer questions over their own documents or data — retrieval-augmented generation, embeddings, vector databases, chunking, "chat with my docs", or when a RAG system gives wrong or unsupported answers. Teaches a baseline-first build and how to diagnose retrieval vs. generation failures.
---

# RAG Basics

## First question: do you need RAG?
- Small corpus that fits comfortably in the model's context window and rarely changes → try putting it in the prompt first (with prompt caching if the provider supports it). Measure before building infrastructure.
- Structured data (tables, records) → often better served by generating/running a query against the database than by embedding rows.
- Large/changing unstructured corpus, need for citations, or access control per document → RAG.

## Baseline pipeline (build this before anything fancy)
1. **Ingest & clean:** extract text, keep metadata (source, title, section, date, permissions).
2. **Chunk:** split on document structure (headings, paragraphs) first; then by size with some overlap. Start with a moderate chunk size and tune with evals — there's no universal best value.
3. **Embed & index:** any reputable embedding model + a vector store that fits scale (a simple local index or Postgres with a vector extension is fine for prototypes).
4. **Retrieve:** top-k by similarity. Add **keyword/BM25 hybrid search** early — exact terms like product codes and names are where pure embeddings miss.
5. **Generate:** prompt with retrieved chunks in tagged blocks with IDs; instruct: answer only from the provided context, cite chunk IDs, say "I don't know" when the context doesn't contain the answer.

## Diagnose failures — always separate the two stages
- **Retrieval failure:** the right chunk wasn't in the top-k. Check by logging retrieved chunks for failing questions. Fixes: chunking, hybrid search, metadata filters, query rewriting, reranking.
- **Generation failure:** the right chunk was retrieved but the answer is wrong/unsupported. Fixes: prompt, fewer/better-ordered chunks, stronger "answer only from context" + citation requirement.

## Evals for RAG (link to `ai-evals`)
Build 30–100 question/answer pairs with the source passage for each. Measure **retrieval hit rate@k** (is the gold passage retrieved?) and **answer faithfulness** (is every claim supported by retrieved text?) and **correctness**. Re-run on every change.

## Security
Retrieved documents are untrusted input — they can contain injected instructions. Enforce document permissions at retrieval time, not in the prompt.
