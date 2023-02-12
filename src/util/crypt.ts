export function encrypt(raw: string) {
  let ret = '';
  raw.split('').map((val) => {
    ret += String.fromCharCode(val.charCodeAt(0) + 3);
  });
  return ret;
}

export function decrypt(raw: string) {
  let ret = '';
  raw.split('').map((val) => {
    ret += String.fromCharCode(val.charCodeAt(0) - 3);
  });
  return ret;
}
