export const getStorageLanguage = () =>  localStorage.getItem('i18nextLng') || 'ru';
export const setStorageLanguage = (lang: string) =>  localStorage.setItem('i18nextLng', lang);