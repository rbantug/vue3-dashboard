export function getImgUrl(imgsrc) {
    return new URL(`/src/${imgsrc}`, import.meta.url).href
}