export const getItemLocalStorage = (key: string) => {
  if (!localStorage.getItem(key)) return null

  return JSON.parse(localStorage.getItem(key) || '')
}
