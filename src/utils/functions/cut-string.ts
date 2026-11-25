export function cutString(string: string, cutLength = 32) {
  if (string.length > 35) {
    return `${string.slice(0, cutLength)}...`;
  }

  return string;
}
