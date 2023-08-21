function chr(n) {
    return String.fromCharCode(n);
}

function ord(c) {
    return c.charCodeAt(0);
}

function ascii_mod(n) {
    var period = 126 - 32 + 1;
    while (n > 126) {
        n -= period;
    }
    while (n < 32) {
        n += period;
    }
    return n;
}

function vigenere(plain, key, dir) {
    var out = "";
    var i = 0;
    for (var j = 0; j < plain.length; j++) {
        out += chr(ascii_mod(ord(plain[j]) + ord(key[i]) * dir));
        i += 1;
        if (i == key.length) {
            i = 0;
        }
    }
    return out;
}

function encode(obj, key) {
    return code(obj, key, 1);
}

function decode(obj, key) {
    return code(obj, key, -1);
}

function code(obj, key, dir) {
    var encoded_obj = JSON.parse(JSON.stringify(obj));
    for (var i = 0; i < encoded_obj.accounts.length; i++) {
        if (encoded_obj.accounts[i].password) {
            encoded_obj.accounts[i].password = vigenere(
                encoded_obj.accounts[i].password,
                key,
                dir
            );
        }
    }
    return encoded_obj;
}
export { encode, decode };
