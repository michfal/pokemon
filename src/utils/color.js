export const hexToRgba = (hex, alpha = 1) => {
  if (!hex) return `rgba(120,120,120,${alpha})`

  const h = hex.replace("#", "")
  const n = parseInt(h, 16)
  if (Number.isNaN(n)) return `rgba(120,120,120,${alpha})`

  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
}

export const isLightHex = (hex) => {
  if (!hex) return false

  const h = hex.replace("#", "")
  const n = parseInt(h, 16)
  if (Number.isNaN(n)) return false

  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) > 160
}

