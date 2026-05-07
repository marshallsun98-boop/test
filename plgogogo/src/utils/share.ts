import pako from 'pako'
import type { ClimbRecord, SharePayload } from '@/types'

export const encodeShareData = (records: ClimbRecord[], from: string): string => {
  const payload: SharePayload = { v: 1, records, from }
  const json = JSON.stringify(payload)
  const compressed = pako.deflate(json, { level: 9 })
  const base64 = btoa(String.fromCharCode(...compressed))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
  return base64
}

export const decodeShareData = (data: string): SharePayload | null => {
  try {
    const base64 = data.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
    const binary = atob(padded)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    const decompressed = pako.inflate(bytes, { to: 'string' })
    return JSON.parse(decompressed)
  } catch {
    return null
  }
}

export const buildShareUrl = (records: ClimbRecord[], from: string): string => {
  const encoded = encodeShareData(records, from)
  return `${window.location.origin}${window.location.pathname}#/import?d=${encoded}`
}
