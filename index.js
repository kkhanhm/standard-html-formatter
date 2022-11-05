const helpers = require("./helpers.js");

/**
 * 
 * @param {number} count ( This should be the space count which you want as unit for formatting )
 * @param {string} data ( string of html which need to be formatted )
 * @returns formattedString {string}
 */

function formatHTML(count, data) {
  let arrayData = [], tag = [], content = [];
  let tagFlag = false, quoteFlag = false, isCommentFlag = false;
  let trimmedData = data.trim();

  for (let dataInstance = 0; dataInstance < trimmedData.length; dataInstance++) {
    // Checking for end tags and pushing the accumulated content in arrayData
    if (trimmedData[dataInstance] === "<" && trimmedData[dataInstance + 1] === "/") {
      arrayData.push(helpers.removeExtraSpaces(content.join("")));
      content = [];
    }

    // Checking for start tag and setting the tagflag to true
    if (trimmedData[dataInstance] === "<") tagFlag = true;

    if (!tagFlag) {
      // Checking for the comment end part of HTML and setting the flag to true 
      // to accumulate it in the tag.
      if (`${trimmedData[dataInstance].trim()}${trimmedData[dataInstance + 1]?.trim()}${trimmedData[dataInstance + 2]?.trim()}` === "-->") tagFlag = true;
      else content.push(trimmedData[dataInstance]);
    }

    if (tagFlag) {
      tag.push(trimmedData[dataInstance]);
      if (quoteFlag && (trimmedData[dataInstance] === "'" || trimmedData[dataInstance] === '"')) quoteFlag = false;
      else if (trimmedData[dataInstance] === "'" || trimmedData[dataInstance] === '"') quoteFlag = true;
    }

    if (trimmedData[dataInstance] === ">" && !quoteFlag && tagFlag) {
      const ele = tag.join("");
      if (ele.split("<").length > 2 && ele.includes("</")) {
        let lostTag = ele.substr(ele.lastIndexOf("</"));
        let content = ele.split("</")[0];
        arrayData.push(helpers.removeExtraSpaces(content));
        arrayData.push(helpers.removeExtraSpaces(lostTag));
      }
      else arrayData.push(helpers.removeExtraSpaces(ele));
      tag = [];
      tagFlag = false;
    }
  }

  let formattedString = "";

  let indentCounter = 0;

  for (let instance = 0; instance < arrayData.length; instance++) {
    if (arrayData[instance].trim() !== "") {

      if (arrayData[instance].includes("<!--")) isCommentFlag = true;

      if (arrayData[instance].includes("-->")) isCommentFlag = false;

      if (!isCommentFlag && helpers.isEndTag(arrayData[instance])) indentCounter--;

      let tab = helpers.getIndentSpace(indentCounter, count);

      formattedString = formattedString + `${tab}${arrayData[instance]}\n`;

      if (!isCommentFlag && helpers.isStartTag(arrayData[instance]) && !helpers.isSelfCloseTag(arrayData[instance])) indentCounter++;
    }
  }

  return formattedString;
}

module.exports = formatHTML;