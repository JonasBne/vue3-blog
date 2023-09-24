export const addItemLocalStorage = (key: string, data: unknown) => {
  return localStorage.setItem(key, JSON.stringify(data))
}
