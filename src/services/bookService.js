// 📄 bookService.js → api-vue/src/services/bookService.js
// Centraliza todas as chamadas à Open Library API.

const BASE = 'https://openlibrary.org'
const COVERS = 'https://covers.openlibrary.org/b/id'

export const PER_PAGE = 20

// ── Listagem / busca ──────────────────────────────────────────
export async function searchBooks(query, page = 1) {
  const offset = (page - 1) * PER_PAGE
  const res = await fetch(
    `${BASE}/search.json?q=${query}&limit=${PER_PAGE}&offset=${offset}`
  )
  const data = await res.json()

  return {
    books: data.docs || [],
    // Limita a 200 resultados para evitar paginação excessiva com a API pública
    totalPages: Math.ceil(Math.min(data.numFound, 200) / PER_PAGE)
  }
}

// ── Detalhes de um livro ──────────────────────────────────────
export async function getBook(key) {
  const res = await fetch(`${BASE}/works/${key}.json`)
  const data = await res.json()

  // Buscar nomes dos autores (até 3)
  const authors = await Promise.all(
    (data.authors || [])
      .slice(0, 3)
      .map((a) =>
        fetch(`${BASE}${a.author?.key}.json`)
          .then((r) => r.json())
          .then((x) => x.name)
      )
  )

  return {
    title: data.title,
    authors,
    // A API retorna description como string simples ou como objeto { value: '...' }
    desc:
      typeof data.description === 'string'
        ? data.description
        : data.description?.value,
    cover: data.covers?.[0]
      ? `${COVERS}/${data.covers[0]}-L.jpg`
      : null
  }
}

// ── Helpers ───────────────────────────────────────────────────
export function getCoverUrl(coverId, size = 'M') {
  return coverId ? `${COVERS}/${coverId}-${size}.jpg` : null
}