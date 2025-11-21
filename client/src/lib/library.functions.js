export function getLanguageDir(lang) {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

export async function copyToClipboard(text) {
  // new browser web api
  if (window.ClipboardItem) {
    const clipboardItem = new ClipboardItem({ 'text/plain': text });
    await navigator.clipboard.write([clipboardItem]);
    return true;
  }

  // Older browsers.
  if (!navigator.clipboard) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  } else {
    navigator.clipboard.writeText(text);
  }
}
