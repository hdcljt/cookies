const cookies = {
    getItem(key) {
        return key ? decodeURIComponent((`; ${document.cookie}`.split(`; ${key}=`)[1] || '').split(';')[0]) : '';
    },
    setItem(key, value, expires, path, domain, secure, sameSite) {
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
    },
    removeItem(key) {
        key && this.setItem(key, '', -1);
    },
    clear() {
        this.keys.forEach(this.removeItem.bind(this));
    },
    hasItem(key) {
        return key ? `; ${document.cookie}`.includes(`; ${key}=`) : false;
    },
    get keys() {
        const str = document.cookie.replace(/(?:=[^;]*)/g, '');
        return str ? str.split('; ') : [];
    },
    get length() {
        return document.cookie ? document.cookie.split(';').length : 0;
    }
};
export default cookies;
