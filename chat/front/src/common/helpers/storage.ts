import { StorageEnum } from "@/common/types/storage";

class LocalStorageCustom {
  get(key: StorageEnum) {
    return localStorage.getItem(key) || "";
  }
  set(key: StorageEnum, value: string) {
    localStorage.setItem(key, value);
  }
  clear() {
    Object.values(StorageEnum).forEach((el) => localStorage.removeItem(el));
  }
}

const localStorageCustom = new LocalStorageCustom();

export { localStorageCustom };
