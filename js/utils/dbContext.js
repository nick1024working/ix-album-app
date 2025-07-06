const DB_NAME = "ImageStorageDB";
const DB_VERSION = 1;
const STORE_NAME = "images";

let _db = null;

// 一載入就預先初始化（但不阻塞模組載入）
// getDB().catch(console.error);

/**
 * 手動初始化函式，提供明確呼叫名稱。
 */
async function init() {
    return await getDB();
}

/**
 * 只做 "事件綁定 + 等待 IndexedDB 開啟完成"，沒有真正資料操作。
 * 使用需呼叫，已確保只開啟一次資料庫（singleton pattern）。
 * @returns {Promise<IDBDatabase>}
 */
async function getDB() {
    if (_db) return _db;

    _db = await new Promise((resolve, reject) => {

        // 立即回傳一個 IDBOpenDBRequest 物件
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        // 設定事件
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        };
        // 官方提供的唯一機制：等到 onsuccess 被觸發時，request.result 才代表一個有效的 IDBDatabase 物件
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });

    return _db;
}

/**
 * 取得資料筆數
 */
async function count() {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
        const request = store.count();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}


/**
 * 新增一筆資料
 * @param {Object} data - 包含 name、blob 等欄位
 */
async function addItem(data) {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.add(data);
    return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
}

/**
 * 取得所有資料
 * @returns {Promise<Array<{ key: IDBValidKey, value: any }>>}
 * 回傳一個陣列，每個元素包含：
 * - key：該筆資料在 object store 中的主鍵
 * - value：該筆資料的內容（完整物件）
 */
async function getAllItems() {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);

    const keysRequest = store.getAllKeys();
    const valuesRequest = store.getAll();

    return new Promise((resolve, reject) => {
        let keys, values;

        keysRequest.onsuccess = () => {
            keys = keysRequest.result;
            if (values !== undefined) resolve(zipKeysAndValues(keys, values));
        };
        valuesRequest.onsuccess = () => {
            values = valuesRequest.result;
            if (keys !== undefined) resolve(zipKeysAndValues(keys, values));
        };

        keysRequest.onerror = valuesRequest.onerror = (e) => reject(e.target.error);
    });

    function zipKeysAndValues(keys, values) {
        return keys.map((key, i) => ({ key, value: values[i] }));
    }
}

/**
 * 刪除資料
 * @param {number} id - 主鍵
 */
async function deleteItem(id) {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.delete(id);

    return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
}

/**
 * 刪除所有資料
 * @returns {Promise<Object[]>}
 */
async function deleteAllItems() {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.clear();

    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

export default {
    init,
    count,
    addItem,
    getAllItems,
    deleteItem,
    deleteAllItems
};
