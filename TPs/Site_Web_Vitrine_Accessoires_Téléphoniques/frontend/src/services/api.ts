// src/services/api.ts
const API_BASE = 'http://localhost:8082/api'

async function parseResponse(res: Response, defaultMessage: string) {
  if (res.ok) return res.json()
  let message = defaultMessage
  try {
    const payload = await res.json()
    if (payload?.message) message = payload.message
  } catch (_err) {
    const text = await res.text()
    if (text) message = text
  }
  throw new Error(`${defaultMessage} (${res.status}): ${message}`)
}

// --- ACCESSOIRES ---
export async function fetchAccessoires() {
  const res = await fetch(`${API_BASE}/accessoires`)
  return parseResponse(res, 'Erreur lors de la récupération des accessoires')
}

export async function fetchAccessoire(id: number) {
  const res = await fetch(`${API_BASE}/accessoires/${id}`)
  return parseResponse(res, 'Accessoire non trouvé')
}

export async function createAccessoire(data: any) {
  const res = await fetch(`${API_BASE}/accessoires`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return parseResponse(res, 'Erreur lors de la création de l\'accessoire')
}

export async function updateAccessoire(id: number, data: any) {
  const res = await fetch(`${API_BASE}/accessoires/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return parseResponse(res, 'Erreur lors de la mise à jour de l\'accessoire')
}

export async function deleteAccessoire(id: number) {
  const res = await fetch(`${API_BASE}/accessoires/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Erreur lors de la suppression de l\'accessoire')
}

// --- CATEGORIES ---
export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`)
  return parseResponse(res, 'Erreur lors de la récupération des catégories')
}

export async function fetchCategorie(id: number) {
  const res = await fetch(`${API_BASE}/categories/${id}`)
  return parseResponse(res, 'Catégorie non trouvée')
}

export async function createCategorie(data: any) {
  const res = await fetch(`${API_BASE}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return parseResponse(res, 'Erreur lors de la création de la catégorie')
}

export async function updateCategorie(id: number, data: any) {
  const res = await fetch(`${API_BASE}/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return parseResponse(res, 'Erreur lors de la mise à jour de la catégorie')
}

export async function deleteCategorie(id: number) {
  const res = await fetch(`${API_BASE}/categories/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Erreur lors de la suppression de la catégorie')
}

// --- MARQUES ---
export async function fetchMarques() {
  const res = await fetch(`${API_BASE}/marques`)
  return parseResponse(res, 'Erreur lors de la récupération des marques')
}

export async function fetchMarque(id: number) {
  const res = await fetch(`${API_BASE}/marques/${id}`)
  return parseResponse(res, 'Marque non trouvée')
}

export async function createMarque(data: any) {
  const res = await fetch(`${API_BASE}/marques`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return parseResponse(res, 'Erreur lors de la création de la marque')
}

export async function updateMarque(id: number, data: any) {
  const res = await fetch(`${API_BASE}/marques/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return parseResponse(res, 'Erreur lors de la mise à jour de la marque')
}

export async function deleteMarque(id: number) {
  const res = await fetch(`${API_BASE}/marques/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Erreur lors de la suppression de la marque')
}