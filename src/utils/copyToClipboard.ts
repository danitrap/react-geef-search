export function copyToClipboard(text: string): void {
  const listener = function (ev: ClipboardEvent) {
    ev.preventDefault();
    ev.clipboardData!.setData("text/plain", text);
  };

  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);
}
