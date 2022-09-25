const getChromeExtension = (): boolean => {
  const itonabuDom = document.getElementById("particles-js");
  const isChrome = itonabuDom ? true : false;
  return isChrome;
};

export const getFilePath = (filePath: string) => {
  if (getChromeExtension()) {
    return filePath;
  } else {
    return filePath;
  }
};

export default getChromeExtension;
