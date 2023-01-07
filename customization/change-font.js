// ==================================================
// The function related to changing the theme font
function changeFont(ThemeCodes, DOMOfTheme, selectedOptions, regexList) {
  // -------------------------
  // Links to style sheets required for fonts
  const sahelFontFaceLink = "https://cdn.jsdelivr.net/gh/rastikerdar/sahel-font@v3.4.0/dist/font-face.css";
  const behdadFontFaceLink = "https://bayanbox.ir/download/5716984447959101916/behdad-font-face.css";
  const mikhakFontFaceLink = "https://bayanbox.ir/download/6910266371077145419/mikhak-font-face.css";
  const vazirmatnFontFaceLink = "https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css";
  // -------------------------

  // Find the <head:style> tag to add the link tag for the style sheet of the selected font
  const bayanHeadStyleTag = DOMOfTheme.getElementsByTagName("head:style")[0];

  // -------------------------
  // Remove the link tag for the theme's default font style sheet
  switch (selectedOptions.theme) {
    // Daftarche
    case themes.Daftarche:
      for (let eachHeadStyleTagChild of bayanHeadStyleTag.children) {
        if (eachHeadStyleTagChild.tagName === "LINK" && eachHeadStyleTagChild.href.includes("sahel")) {
          eachHeadStyleTagChild.parentNode.removeChild(eachHeadStyleTagChild);
        }
      }
      break;

    // Afkar
    case themes.Afkar:
      for (let eachHeadStyleTagChild of bayanHeadStyleTag.children) {
        if (eachHeadStyleTagChild.tagName === "LINK" && eachHeadStyleTagChild.href.includes("behdad")) {
          eachHeadStyleTagChild.parentNode.removeChild(eachHeadStyleTagChild);
        }
      }
      break;
  }
  // -------------------------

  // -------------------------
  // Create a link tag for the selected font style sheet
  const fontLinkTag = document.createElement("link");
  fontLinkTag.rel = "stylesheet";

  switch (selectedOptions.font) {
    // Sahel
    case fonts.Sahel:
      fontLinkTag.href = sahelFontFaceLink;
      break;

    // Behdad
    case fonts.Behdad:
      fontLinkTag.href = behdadFontFaceLink;
      break;

    // Mikhak
    case fonts.Mikhak:
      fontLinkTag.href = mikhakFontFaceLink;
      break;

    // Vazirmatn
    case fonts.Vazirmatn:
      fontLinkTag.href = vazirmatnFontFaceLink;
      break;
  }
  // -------------------------

  // -------------------------
  // Adding the created link tag to HTML and changing the name of the default font to the selected font in the CSS of the themes.
  bayanHeadStyleTag.insertBefore(fontLinkTag, bayanHeadStyleTag.firstChild);

  ThemeCodes.css = ThemeCodes.css.replace(regexList.font, selectedOptions.font);
  // -------------------------
}
// ==================================================
