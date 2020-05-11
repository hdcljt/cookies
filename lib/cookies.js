import { getItem, setItem, removeItem, clear, hasItem, keys, length } from './utils';
const cookies = {
    getItem,
    setItem,
    removeItem,
    clear,
    hasItem,
    get keys() {
        return keys();
    },
    get length() {
        return length();
    }
};
export default cookies;
