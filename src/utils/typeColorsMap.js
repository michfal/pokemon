import { typeColors } from "./typeColors"

export const getTypeColor = (type) => {
  if (!type || typeof type !== "string") return "#777777"

  const key = type.toLowerCase()

  return typeColors[key] ?? "#777777"
}