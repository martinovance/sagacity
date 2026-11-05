create extension if not exists vector;

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  pages int not null default 0,
  status text not null default 'indexing' check (status in ('ready', 'indexing', 'failed')),
  progress int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references documents(id) on delete cascade,
  page int,
  content text not null,
  embedding vector({{EMBED_DIM}}) not null
);

create index if not exists chunks_document_idx on chunks (document_id);
create index if not exists chunks_embedding_idx on chunks using hnsw (embedding vector_cosine_ops);
