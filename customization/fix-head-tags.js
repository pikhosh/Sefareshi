// ==================================================
// Removing the <head:*> tags specific to Blog.IR from the <body> tag and returning them to the <head> tag (this problem happens after using 'DOMParser.parseFromString()')
function fixHeadTags(DOMOfTheme) {
  // Finding <head:*> tags specific to Blog.IR
  const bayanHeadStyleTag = DOMOfTheme.getElementsByTagName("head:style")[0];
  const bayanHeadMetaTag = DOMOfTheme.getElementsByTagName("head:meta")[0];
  const bayanHeadScriptTag = DOMOfTheme.getElementsByTagName("head:script")[0];

  // Finding the <head> tag
  const headElement = DOMOfTheme.querySelector("head");

  // Return the tags to the <head> tag.
  headElement.append(bayanHeadStyleTag);
  headElement.append(bayanHeadMetaTag);
  headElement.append(bayanHeadScriptTag);
}
// ==================================================
