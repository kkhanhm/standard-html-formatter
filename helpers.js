const selfClosingTags = [
    "area",
    "base",
    "br",
    "embed",
    "col",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
];

function getIndentSpace(indentCounter, count) {
    let tab = '';
    let unit = '';
    for (let i = 0; i < count; i++) {
        unit += " ";
    }
    if (indentCounter > 0) {
        tab = unit;
        for (let i = 1; i < indentCounter; i++) {
            tab += unit;
        }
    }
    return tab;
}

function isSelfCloseTag(tag) {
    let tagName = getTagElement(tag);
    for (let i = 0; i < selfClosingTags.length; i++) {
        if (tagName.includes(selfClosingTags[i])) return true;
    }
    return false;
}

function getTagElement(tag) {
    if (tag[0] !== "<") {
        return false;
    }
    let tagName = tag.split(" ");
    return tagName[0].replace(/[<>]/g, "");
}

function isStartTag(tag) {
    let trimmedTag = tag.trim();
    // Added prevention for self closing tags 
    if (trimmedTag[0] === "<" && trimmedTag[1] !== "/" && trimmedTag[trimmedTag.length - 2] !== "/" && trimmedTag[trimmedTag.length - 1] === ">") {
        return true;
    }
    return false;
}

function isEndTag(tag) {
    let trimmedTag = tag.trim();
    if (trimmedTag[0] === "<" && trimmedTag[1] === "/" && trimmedTag[trimmedTag.length - 1] === ">") {
        return true;
    }
    return false;
}

function removeExtraSpaces(tag) {
    return tag.replace(/\n/g, " ").replace(/ +(?= )/g, '');
}

module.exports = {
    getIndentSpace,
    isSelfCloseTag,
    isStartTag,
    isEndTag,
    removeExtraSpaces,
};