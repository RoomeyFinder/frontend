export type PreviewablePhoto = {
  file: File | null
  preview: string | null
  _id: string
  id: string
  index?: number
}

export type Feature = {
  value: string
  category: string
}
