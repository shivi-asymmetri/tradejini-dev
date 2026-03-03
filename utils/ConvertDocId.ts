export function convertDocId(pathname: string) {
  return pathname?.split("/").splice(1).join("+");
}
