export class LocalStorageManager {

    static setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static getItem(key) {
        const item = localStorage.getItem(key);
        return item? item : null;
    }

    static removeItem(key) {
        localStorage.removeItem(key);
    }

}