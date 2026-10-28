// Removes control and bidi-override characters that enable header injection and spoofing.
const CONTROL = /[\u0000-\u0008\u000B-\u001F\u007F\u202A-\u202E\u2066-\u2069]/g;

/** For single-line fields (name, email, phone, room). */
export function cleanLine(value: string): string {
  return value.replace(/[\r\n\t]+/g, " ").replace(CONTROL, "").replace(/\s{2,}/g, " ").trim();
}

/** For the free-text message: keeps line breaks, limits blank lines. */
export function cleanBlock(value: string): string {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL, "")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
