function getItem(key) {
    return key ? decodeURIComponent((`; ${document.cookie}`.split(`; ${key}=`)[1] || '').split(';')[0]) : '';
}
function setItem(key, value, expires, path, domain, secure, sameSite) {
    if (!key)
        return '';
    const cookie = [];
    cookie.push(`${key}=${encodeURIComponent(value)}`);
    let strExpires = '';
    if (typeof expires === 'number' && expires < 1e9) {
        strExpires = new Date(Date.now() + expires * 1e3).toUTCString();
    }
    else if (expires) {
        const d = new Date(expires);
        strExpires = isNaN(d.getTime()) ? '' : d.toUTCString();
    }
    strExpires && cookie.push(`Expires=${strExpires}`);
    path && cookie.push(`Path=${path}`);
    domain && cookie.push(`Domain=${domain}`);
    secure === true && cookie.push('Secure');
    sameSite && ['None', 'Strict', 'Lax'].includes(sameSite) && cookie.push(`SameSite=${sameSite}`);
    const result = cookie.join('; ');
    document.cookie = result;
    return result;
}
function removeItem(key) {
    key && setItem(key, '', -1);
}
function clear() {
    keys().forEach(removeItem);
}
function hasItem(key) {
    return key ? `; ${document.cookie}`.includes(`; ${key}=`) : false;
}
function keys() {
    const str = document.cookie.replace(/(?:=[^;]*)/g, '');
    return str ? str.split('; ') : [];
}
function length() {
    return document.cookie ? document.cookie.split(';').length : 0;
}

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

function get(target, key) {
    // let value: number | string | string[] = Reflect.get(target, key)
    // if (typeof value === 'string') return value
    let value = '';
    switch (key) {
        case 'length':
            value = length();
            break;
        case 'keys':
            value = keys();
            break;
        default: value = getItem(key);
    }
    Reflect.set(target, key, value);
    return value;
}
function set(target, key, val) {
    if (typeof val === 'string')
        return Reflect.set(target, key, setItem(key, val));
    const { value, expires, path, domain, secure, sameSite } = val;
    return Reflect.set(target, key, setItem(key, value, expires, path, domain, secure, sameSite));
}
function deleteProperty(target, key) {
    removeItem(key);
    return Reflect.deleteProperty(target, key);
}
function has(target, key) {
    return hasItem(key);
}
function ownKeys(target) {
    return keys();
}

const cookie = new Proxy(Object.create(null), {
    get,
    set,
    deleteProperty,
    has,
    ownKeys
});

export default cookies;
export { clear, cookie, getItem, hasItem, keys, length, removeItem, setItem };
