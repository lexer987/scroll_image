'use strict';

const formInputs = document.querySelectorAll('input, textarea');
const DOWN_KEYS = ['ArrowDown', 'KeyJ'];
const UP_KEYS = ['ArrowUp', 'KeyK'];
const keymap = {
    [DOWN_KEYS]: nextElement,
    [UP_KEYS]: prevElement
};

function isMainImage(element) {
    if (element.clientWidth * element.clientHeight > 400 * 300) {
        return true;
    }
    return false;
}

function findFirstImage() {
    var firstElement = null;
    document.querySelectorAll('img').forEach(function (element) {
        if (!firstElement && isMainImage(element)) {
            firstElement = element;
        }
    });
    return firstElement;
}

function getAllImages(rootElement) {
    var images = [];
    rootElement.querySelectorAll('img').forEach(function (element) {
        if (isMainImage(element)) {
            images.push(element);
        }
    });
    return images;
}

function searchImages() {
    var firstImage = findFirstImage();
    var images = [];
    var rootElement = firstImage;

    while (images.length < 10) {
        rootElement = rootElement.parentElement;
        if (rootElement == null) {
            console.log('elementがおかしいです');
            console.log(rootElement);
            break;
        }
        console.log(rootElement);
        images = getAllImages(rootElement);

        if (rootElement == document.querySelector('body')) {
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
    // if (inRange(app.images[app.currentIndex])) {
    //     console.log('in element');
    // }
    for (;;) {
        app.currentIndex += 1;
        let element = app.images[app.currentIndex];
        let absoluteY = window.pageYOffset + element.getBoundingClientRect().top;
        if (window.pageYOffset < absoluteY) {
            break;
        }
        if (app.images.length <= app.currentIndex + 1) {
            console.log('限界まで来ました');
            break;
        }
    }

    focusElement(app.images[app.currentIndex]);
}
function prevElement() {
    if (0 > app.currentIndex - 1) {
        console.log('限界まで来ました');
        app.currentIndex = 0;
        return;
    }
    for (;;) {
        app.currentIndex -= 1;
        let element = app.images[app.currentIndex];
        let absoluteY = window.pageYOffset + element.getBoundingClientRect().top;
        if (window.pageYOffset > absoluteY) {
            break;
        }
        if (0 > app.currentIndex - 1) {
            console.log('限界まで来ました');
            break;
        }
    }
    focusElement(app.images[app.currentIndex]);
}

// function inRange(element) {
//     console.log(window.pageYOffset + element.getBoundingClientRect().top);
//     console.log(window.pageYOffset);
//     let absoluteY = window.pageYOffset + element.getBoundingClientRect().top;
//     if ((absoluteY -1 <= window.pageYOffset)
//         && ((absoluteY + element.height) >= window.pageYOffset)) {
//         return true;
//     }
//     return false;
// }

var app = {};
function main() {
    console.log('search start');
    app.images = searchImages();
    app.currentIndex = 0;
    formInputs.forEach(function(el) {
        el.addEventListener('focusin', () => activateNavigation(false));
        el.addEventListener('focusout', () => activateNavigation(true));
    });
    activateNavigation(true);
}

main();

function activateNavigation(isActive) {
    if (isActive) {
        document.addEventListener('keydown', navigateKeyHandler);
    } else {
        document.removeEventListener('keydown', navigateKeyHandler);
    }
}

function navigateKeyHandler(e) {
    const modKeys = [e.shiftKey, e.altKey, e.ctrlKey, e.metaKey];
    if (modKeys.some((hasKey) => hasKey)) return;
    Object.keys(keymap).some((keys) => {
        if (keys.includes(e.code)) {
            if (keymap[keys]()) {
                e.preventDefault();
            }
            return true;
        }
        return false;
    });
}
// window.addEventListener("keydown", function (e) {
//     var downMoveKey = 74;
//     var upMoveKey = 75;
//     if (e.keyCode === downMoveKey) {
//         nextElement();
//     }
//     if (e.keyCode === upMoveKey) {
//         prevElement();
//     }
// });
