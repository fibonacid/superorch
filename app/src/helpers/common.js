export function copyToClipboard(node) {
  try {
    const { clipboard } = window.require("electron");
    const text = node.textContent;
    clipboard.writeText(text);
  } catch (err) {
    // Fallback for web targets
    var range = document.createRange();
    range.selectNode(node);
    window.getSelection().addRange(range);

    const success = document.execCommand("copy");
    window.getSelection().removeAllRanges();

    if (!success) {
      throw new Error("Oops, unable to copy");
    }
  }
}
