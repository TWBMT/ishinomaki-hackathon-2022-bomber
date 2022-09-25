const getChromeExtension = (): boolean => {
  const itonabuDom = document.getElementById("particles-js");
  const isChrome = itonabuDom ? true : false;
  return isChrome;
};

export const getFilePath = (filePath: string) => {
  if (getChromeExtension()) {
    return chrome.runtime.getURL(filePath);
  } else {
    return filePath;
  }
};

export default getChromeExtension;
