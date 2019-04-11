'use strict';

function isMainImage(element) {
    if (element.clientWidth * element.clientHeight > 400 * 300 ) {
        return true;
    }
    return false;
}

function findFirstImage() {
    let firstElement = null;
    document.querySelectorAll('img').forEach(function(element){
        if (!firstElement && isMainImage(element)) {
            firstElement = element;
        }
    });
    return firstElement;
}

function getAllImages(rootElement) {
    const images = [];
    rootElement.querySelectorAll('img').forEach(function(element){
        if (isMainImage(element)) {
            images.push(element);
        }
    });
    return images;
}

function searchImages() {
    const firstImage = findFirstImage();
    let images = [];
    let rootElement = firstImage;

    while(images.length < 10 ) {
        rootElement = rootElement.parentElement;
        if (rootElement == null) {
            console.log('elementがおかしいです');
            console.log(rootElement);
            break;
        }
        console.log(rootElement);
        images = getAllImages(rootElement);

        if (rootElement == document.querySelector('body')){
            console.log('bodyまで探しましたがimagesは見つかりませんでした');
            break;
        }

    }
    return images;
}

function focusElement(element) {
    element.scrollIntoView(true);
}

function nextElement() {
    if (app.images.length <= app.currentIndex + 1) {
        console.log('限界まで来ました');
        return;
    }
    app.currentIndex += 1;
    focusElement(app.images[app.currentIndex]);
}
function prevElement() {
    if (0 > app.currentIndex - 1) {
        console.log('限界まで来ました');
        app.currentIndex = 0;
        return;
    }
    app.currentIndex -= 1;
    focusElement(app.images[app.currentIndex]);
}

let app = {};
function main() {
    console.log('search start');
    app.images = searchImages();
    app.currentIndex = 0;
}

main();

window.addEventListener("keydown", function(e){
    const downMoveKey = 74;
    const upMoveKey = 75;
    if(e.keyCode === downMoveKey){
        nextElement();
    }
    if(e.keyCode === upMoveKey){
        prevElement();
    }
});
