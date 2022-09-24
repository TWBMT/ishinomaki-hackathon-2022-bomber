const getChromeExtension = (): boolean => {
    const itonabuDom = document.getElementById('particles-js');
    const isChrome = itonabuDom ? true : false;
    return isChrome;
}

export default getChromeExtension;