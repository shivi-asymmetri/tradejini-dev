export function IDfy(string: string) {
  return string
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .toLowerCase()
    .replaceAll(" ", "-");
}
