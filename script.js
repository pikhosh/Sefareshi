const themePreviewSectionElement = document.querySelector("#theme-preview-section");
let firstPreviewImage = themePreviewSectionElement.children[0];
let secondPreviewImage = themePreviewSectionElement.children[1];

const fontPreviewSectionElement = document.querySelector("#font-preview-section");

// ==================================================
// Information about themes (file links, images, etc.)

// Daftarche theme
const daftarcheLinks = {
  html: "https://raw.githubusercontent.com/pikhosh/Daftarche/main/index.html",
  css: "https://raw.githubusercontent.com/pikhosh/Daftarche/main/style.css",
  images: {
    light: "https://user-images.githubusercontent.com/73311467/154791394-ade77cf7-81c1-4103-95ae-3aa3922062d4.png",
    dark: "https://user-images.githubusercontent.com/73311467/154791399-ff89d206-149f-47c4-b868-02425ddcd28b.png",
  },
};

// Afkar theme
const afkarLinks = {
  html: "https://raw.githubusercontent.com/pikhosh/Afkar/main/index.html",
  css: "https://raw.githubusercontent.com/pikhosh/Afkar/main/style.css",
  images: {
    light: "https://user-images.githubusercontent.com/73311467/154895089-638b539a-a912-4924-b7e6-989eb0e506f9.png",
    dark: "https://user-images.githubusercontent.com/73311467/154895116-13b86329-68b7-479e-a3a4-5404b17a5585.png",
  },
};
// ==================================================

// ==================================================
// Links to files related to JavaScript features
const jsScriptLinks = {
  readTime: "https://bayanbox.ir/download/6815175655832720904/read-time.js",
  colorMode: "https://bayanbox.ir/download/5935133845113091398/color-mode.js",
};
// ==================================================

const themes = {
  Daftarche: "daftarche",
  Afkar: "afkar",
};

const fonts = {
  Sahel: "sahel",
  Behdad: "behdad",
  Mikhak: "mikhak",
  Vazirmatn: "vazirmatn",
};

// TODO: Using a proxy and getter to change the value of a variable called 'isSomethingChanged' to 'true' and use it to check whether the generate() function needs to be executed or not (the variable is changed to 'false' at the end of the generate() function execution)
let selectedOptions = {
  theme: undefined,

  font: undefined,

  lightModeColors: {
    mainBG: "",
    text: "",
  },
  darkModeColors: {
    mainBG: "",
    text: "",
  },

  daftarcheSpecificColors: {
    lightModeColors: {
      secondaryBGColor: "",
      tertiaryBGColor: "",
    },
    darkModeColors: {
      secondaryBGColor: "",
      tertiaryBGColor: "",
    },
  },

  thumbnail: false,

  js: false,
  jsFeatures: {
    readTime: false,
    colorMode: false,
  },
};

// -------------------------
// Regexes needed to find different values in CSS code
const regexList = {
  font: /(?<=--Font: )(.+?)(?=,)(?!\n)/,
  root: /(:root \{\n)[^]*?(  \}\n)/,
  rootAttribute: /(?<=:root).*(?=\{\n)/,
  daftarche: {
    mainBGColor: /(?<=--Primary-Color: )[^].*(?!\n)/,
    textColor: /(?<=--TextColor: )[^].*(?!\n)/,
    secondaryBGColor: /(?<=--Secondary-Color: )[^].*(?!\n)/,
    tertiaryBGColor: /(?<=--Tertiary-Color: )[^].*(?!\n)/,
  },
  afkar: {
    mainBGColor: /(?<=--BackgroundColor: )[^].*(?!\n)/,
    textColor: /(?<=--FontColor: )[^].*(?!\n)/,
  },
};
// -------------------------

const elementList = {
  allFieldSets: document.querySelectorAll("fieldset"),

  themeOptions: {
    daftarche: document.querySelector("#daftarche"),
    afkar: document.querySelector("#afkar"),
  },

  fontOptions: {
    mikhak: document.querySelector("#mikhak"),
    sahel: document.querySelector("#sahel"),
    behdad: document.querySelector("#behdad"),
    vazirmatn: document.querySelector("#vazirmatn"),
  },

  lightBGColorInput: document.querySelector("#light-mode-bg"),
  darkBGColorInput: document.querySelector("#dark-mode-bg"),

  lightTextInput: document.querySelector("#light-mode-text"),
  darkTextInput: document.querySelector("#dark-mode-text"),

  root: document.documentElement,

  thumbnailCheckBox: document.querySelector("#thumbnail"),

  loading: document.querySelector("#loading"),

  daftarcheColors: {
    lightMode: {
      secondaryBGInput: document.querySelector("#light-mode-secondary-bg"),
      tertiaryBGInput: document.querySelector("#light-mode-tertiary-bg"),
    },
    darkMode: {
      secondaryBGInput: document.querySelector("#dark-mode-secondary-bg"),
      tertiaryBGInput: document.querySelector("#dark-mode-tertiary-bg"),
    },
  },
};

const initialCodes = {
  html: "والا چیزی انتخاب نکردی که ما چیزی بپزیم...",
  css: "والا چیزی انتخاب نکردی که ما چیزی بپزیم...",
};

let finalCodes;

// ==================================================
// Get theme files data
async function getThemeData(themeLinks) {
  // -------------------------
  // Unsetting the style of the loading section that was applied due to the error, to the default appearance every time a theme is selected (to prepare for displaying the loading points).

  elementList.loading.innerText = "";
  elementList.loading.style.color = "unset";
  elementList.loading.style.fontSize = "unset";
  elementList.loading.style.fontStyle = "unset";
  elementList.loading.style.fontWeight = "unset";
  // -------------------------

  // -------------------------
  // When receiving the data of the themes, the loading element is displayed

  elementList.root.style.setProperty("--loading-dots-display", "block");
  // -------------------------

  try {
    htmlResponse = await fetch(themeLinks.html);
    cssResponse = await fetch(themeLinks.css);
  } catch (error) {
    // If there is an error in receiving the data, the loading element will be hidden and the style and text of its section will be changed according to the error.
    elementList.root.style.setProperty("--loading-dots-display", "none");
    elementList.loading.innerText = "(ناموفق در دریافت اطلاعات)";
    elementList.loading.style.color = "#ff4d4d";
    elementList.loading.style.fontSize = "1rem";
    elementList.loading.style.fontStyle = "italic";
    elementList.loading.style.fontWeight = "300";
  }

  htmlData = await htmlResponse.text();
  initialCodes.html = htmlData;

  cssData = await cssResponse.text();
  initialCodes.css = cssData;

  // After successfully receiving the themes data, we hide the loading element
  elementList.root.style.setProperty("--loading-dots-display", "none");

  // -------------------------
  // Once the themes data is successfully fetched, customization options will become available
  for (const eachFieldSet of elementList.allFieldSets) {
    eachFieldSet.disabled = false;
  }
  // -------------------------
}
// ==================================================

// ==================================================
// The function related to the theme selection section
async function themePreview() {
  const isDaftarcheSelected = elementList.themeOptions.daftarche.checked;
  const isAfkarSelected = elementList.themeOptions.afkar.checked;

  // Checking which theme is selected and changing the preview images link accordingly
  if (isDaftarcheSelected) {
    firstPreviewImage.src = daftarcheLinks.images.light;
    secondPreviewImage.src = daftarcheLinks.images.dark;
    selectedOptions.theme = themes.Daftarche;

    await getThemeData(daftarcheLinks);
  } else if (isAfkarSelected) {
    firstPreviewImage.src = afkarLinks.images.light;
    secondPreviewImage.src = afkarLinks.images.dark;
    selectedOptions.theme = themes.Afkar;

    await getThemeData(afkarLinks);
  }

  // Changing the display mode of the preview images section after the first selection of the radio buttons from "None" to "Flex"
  themePreviewSectionElement.style.display = "flex";

  getDefaults(initialCodes);
}
// ==================================================

// ==================================================
// The function related to the font selection section
function fontPreview() {
  const isSahelSelected = elementList.fontOptions.sahel.checked;
  const isBehdadSelected = elementList.fontOptions.behdad.checked;
  const isMikhakSelected = elementList.fontOptions.mikhak.checked;
  const isVazirmatnSelected = elementList.fontOptions.vazirmatn.checked;

  // -------------------------
  // Checking which font is selected and changing the preview text font accordingly
  // Sahel
  if (isSahelSelected) {
    fontPreviewSectionElement.style.fontFamily = fonts.Sahel;
    selectedOptions.font = fonts.Sahel;

    // Behdad
  } else if (isBehdadSelected) {
    fontPreviewSectionElement.style.fontFamily = fonts.Behdad;
    selectedOptions.font = fonts.Behdad;

    // Mikhak
  } else if (isMikhakSelected) {
    fontPreviewSectionElement.style.fontFamily = fonts.Mikhak;
    selectedOptions.font = fonts.Mikhak;

    // Vazirmatn
  } else if (isVazirmatnSelected) {
    fontPreviewSectionElement.style.fontFamily = fonts.Vazirmatn;
    selectedOptions.font = fonts.Vazirmatn;
  }
  // -------------------------

  // Changing the display mode of the preview font section after the first selection of the radio buttons from "None" to "Flex"
  fontPreviewSectionElement.style.display = "block";
}
// ==================================================

// ==================================================
// // The function related to the color selection section

// -------------------------
// LIGHT MODE

// Main BG
function lightBGColorChange() {
  const lightBGColorInputValue = elementList.lightBGColorInput.value;

  selectedOptions.lightModeColors.mainBG = lightBGColorInputValue;
}

// Text
function lightTextColorChange() {
  const lightTextColorInputValue = elementList.lightTextInput.value;

  selectedOptions.lightModeColors.text = lightTextColorInputValue;
}

// Secondary BG
function lightSecondaryBGColorChange() {
  const lightSecondaryBGColorInputValue = elementList.daftarcheColors.lightMode.secondaryBGInput.value;

  selectedOptions.daftarcheSpecificColors.lightModeColors.secondaryBGColor = lightSecondaryBGColorInputValue;
}

// Tertiary BG
function lightTertiaryBGColorChange() {
  const lightTertiaryBGColorInputValue = elementList.daftarcheColors.lightMode.tertiaryBGInput.value;

  selectedOptions.daftarcheSpecificColors.lightModeColors.tertiaryBGColor = lightTertiaryBGColorInputValue;
}
// -------------------------

// -------------------------
// DARK MODE

// Main BG
function darkBGColorChange() {
  const darkBGColorInputValue = elementList.darkBGColorInput.value;

  selectedOptions.darkModeColors.mainBG = darkBGColorInputValue;
}

// Text
function darkTextColorChange() {
  const darkTextColorInputValue = elementList.darkTextInput.value;

  selectedOptions.darkModeColors.text = darkTextColorInputValue;
}

// Secondary BG
function darkSecondaryBGColorChange() {
  const darkSecondaryBGColorInputValue = elementList.daftarcheColors.darkMode.secondaryBGInput.value;

  selectedOptions.daftarcheSpecificColors.darkModeColors.secondaryBGColor = darkSecondaryBGColorInputValue;
}

// Tertiary BG
function darkTertiaryBGColorChange() {
  const darkTertiaryBGColorInputValue = elementList.daftarcheColors.darkMode.tertiaryBGInput.value;

  selectedOptions.daftarcheSpecificColors.darkModeColors.tertiaryBGColor = darkTertiaryBGColorInputValue;
}
// ==================================================

// ==================================================
// The function related to the thumbnail section
function thumbnailCheck() {
  const isThumbnailChecked = elementList.thumbnailCheckBox.checked;

  // Checking if having a thumbnail is checked or not
  if (isThumbnailChecked) {
    selectedOptions.thumbnail = true;
  } else {
    selectedOptions.thumbnail = false;
  }
}
// ==================================================

// ==================================================
// The function related to the js features selection section
function jsFeaturesToggle() {
  const isJSChecked = document.querySelector("#js").checked;
  const jsFeaturesSectionElement = document.querySelector("#js-features-section");

  // Changing the display mode of the options between "None" and "Block"
  if (isJSChecked) {
    jsFeaturesSectionElement.style.display = "block";
    selectedOptions.js = true;
  } else {
    jsFeaturesSectionElement.style.display = "none";
    selectedOptions.js = false;

    // Disable options related to JavaScript checkbox if it is not checked

    // Unchecking elements related to checkboxes (because this doesn't happen automatically based on javascript variables)
    document.querySelector("#read-time").checked = false;
    document.querySelector("#color-mode").checked = false;

    // Disabling all JavaScript features in the list of user choices that we keep (i.e. 'selectedOptions')
    for (const eachFeature in selectedOptions.jsFeatures) {
      selectedOptions.jsFeatures[eachFeature] = false;
    }
  }
}
// ==================================================

// ==================================================
// The function related to the js read time feature selection section
function readTimeChecked() {
  const isReadTimeChecked = document.querySelector("#read-time").checked;

  // Check if have read time is checked or not
  if (isReadTimeChecked) {
    selectedOptions.jsFeatures.readTime = true;
  } else {
    selectedOptions.jsFeatures.readTime = false;
  }
}
// ==================================================

// ==================================================
// The function related to the js read time feature selection section
function colorModeChecked() {
  const isColorModeChecked = document.querySelector("#color-mode").checked;

  // Check if have read time is checked or not
  if (isColorModeChecked) {
    selectedOptions.jsFeatures.colorMode = true;
  } else {
    selectedOptions.jsFeatures.colorMode = false;
  }
}
// ==================================================

// ==================================================
// Function related to generating the final code of the customized theme
async function generate() {
  // With each execution of the function, we use the initial and unmodified code of the themes again, so that if a change was made to the theme code in the previous execution, it does not cause the code to be repeated and changed again.
  finalCodes = { ...initialCodes };

  console.log("👇 The user asked us for these 👇");
  console.table(selectedOptions);

  // Converting the theme code from "String" to "DOM" for better use and applying changes
  const htmlParser = new DOMParser();
  const parsedHTML = htmlParser.parseFromString(finalCodes.html, "text/html");

  // -------------------------
  // Calling the functions related to applying the actual changes to the initial and unmodified codes of the themes
  // TODO: We can use a class called "Theme" which accepts a parameter called "DOM" and includes all the methods mentioned below related to applying changes. In this way, after creating an instance of that class, we can call the methods of that class instead of calling separate functions.
  fixHeadTags(parsedHTML);
  toggleThumbnail(parsedHTML, selectedOptions);

  // Instead of using 'finalCodes.css' directly, we use 'finalCodes' to receive the changes
  changeColors(finalCodes, selectedOptions, regexList);

  changeFont(finalCodes, parsedHTML, selectedOptions, regexList);

  if (selectedOptions.jsFeatures.readTime) {
    addReadTimeElements(parsedHTML, selectedOptions);
    await addReadTimeScriptTag(parsedHTML, jsScriptLinks.readTime);
  }

  if (selectedOptions.jsFeatures.colorMode) {
    addColorModeButton(parsedHTML, selectedOptions);
    await addColorModeScriptTag(parsedHTML, jsScriptLinks.colorMode);
    addColorModeStyle(finalCodes, regexList);
  }

  addFooterCredit(parsedHTML);
  // -------------------------

  // Store the theme's DOM after all changes as a string (via '.documentElement.outerHTML') as the final code
  finalCodes.html = parsedHTML.documentElement.outerHTML;

  outputCodesToDisplay();
}
// ==================================================

// ==================================================
// The function related to displaying the final codes
function outputCodesToDisplay() {
  const resultSectionElement = document.querySelector("#result-section");
  resultSectionElement.style.display = "block";

  const generatedHTMLSectionElement = document.querySelector("#generated-html");
  const generatedCSSSectionElement = document.querySelector("#generated-css");

  generatedHTMLSectionElement.innerText = finalCodes.html;
  generatedCSSSectionElement.innerText = finalCodes.css;
}
// ==================================================

// ==================================================
// Function related to copying the final html code of the customized theme
function finalHTMLCopy() {
  navigator.clipboard.writeText(finalCodes.html);
  alert("✨ کد HTML شما کپی شد :)");
}
// ==================================================

// ==================================================
// Function related to copying the final css code of the customized theme
function finalCSSCopy() {
  navigator.clipboard.writeText(finalCodes.css);
  alert("✨ اینم از کد CSS شما :)");
}
// ==================================================

// ==================================================
// The function related to the detection of default values of themes
function getDefaults(ThemeCodes) {
  // -------------------------
  // Detecting the default font of the theme and changing the state of the corresponding element
  selectedOptions.font = ThemeCodes.css.match(regexList.font)[0].toLowerCase();

  switch (selectedOptions.font) {
    case fonts.Sahel:
      elementList.fontOptions.sahel.checked = true;
      break;
    case fonts.Behdad:
      elementList.fontOptions.behdad.checked = true;
      break;
  }

  fontPreview();
  // -------------------------

  // -------------------------
  // Detecting the use of thumbnail images and changing the status of the corresponding element
  selectedOptions.thumbnail = ThemeCodes.html.includes("(*post_image*)");
  elementList.thumbnailCheckBox.checked = selectedOptions.thumbnail;
  // -------------------------

  // -------------------------
  // Find the default colors of different sections and store them in the user's selection
  const stringSeperator = "@media (prefers-color-scheme: dark) {";
  let [lightModePart, darkModePart] = ThemeCodes.css.split(stringSeperator);

  switch (selectedOptions.theme) {
    // Daftarche
    case themes.Daftarche:
      elementList.root.style.setProperty("--daftarche-specific-options-display", "flex");
      // Light
      selectedOptions.lightModeColors.mainBG = lightModePart.match(regexList.daftarche.mainBGColor)[0];
      selectedOptions.lightModeColors.text = lightModePart.match(regexList.daftarche.textColor)[0];
      selectedOptions.daftarcheSpecificColors.lightModeColors.secondaryBGColor = lightModePart.match(regexList.daftarche.secondaryBGColor)[0];
      selectedOptions.daftarcheSpecificColors.lightModeColors.tertiaryBGColor = lightModePart.match(regexList.daftarche.tertiaryBGColor)[0];

      // Dark
      selectedOptions.darkModeColors.mainBG = darkModePart.match(regexList.daftarche.mainBGColor)[0];
      selectedOptions.darkModeColors.text = darkModePart.match(regexList.daftarche.textColor)[0];
      selectedOptions.daftarcheSpecificColors.darkModeColors.secondaryBGColor = darkModePart.match(regexList.daftarche.secondaryBGColor)[0];
      selectedOptions.daftarcheSpecificColors.darkModeColors.tertiaryBGColor = darkModePart.match(regexList.daftarche.tertiaryBGColor)[0];

      break;

    // Afkar
    case themes.Afkar:
      elementList.root.style.setProperty("--daftarche-specific-options-display", "none");
      // Light
      selectedOptions.lightModeColors.mainBG = lightModePart.match(regexList.afkar.mainBGColor)[0];
      selectedOptions.lightModeColors.text = lightModePart.match(regexList.afkar.textColor)[0];

      // Dark
      selectedOptions.darkModeColors.mainBG = darkModePart.match(regexList.afkar.mainBGColor)[0];
      selectedOptions.darkModeColors.text = darkModePart.match(regexList.afkar.textColor)[0];

      // -------------------------
      // If another theme is selected after selecting the Daftarche theme (which stores the colors specific to it); Each and every color specific to Daftarche will be deleted
      Object.entries(selectedOptions.daftarcheSpecificColors.lightModeColors).forEach(([key]) => {
        selectedOptions.daftarcheSpecificColors.lightModeColors[key] = "";
      });
      Object.entries(selectedOptions.daftarcheSpecificColors.darkModeColors).forEach(([key]) => {
        selectedOptions.daftarcheSpecificColors.darkModeColors[key] = "";
      });
      // -------------------------

      break;
  }
  // -------------------------

  // -------------------------
  // Checking each color stored in the user's selections and storing the validated/corrected version
  Object.entries(selectedOptions.darkModeColors).forEach(([key, value]) => {
    selectedOptions.darkModeColors[key] = validateColorForInputElement(value);
  });

  Object.entries(selectedOptions.lightModeColors).forEach(([key, value]) => {
    selectedOptions.lightModeColors[key] = validateColorForInputElement(value);
  });
  // -------------------------

  // -------------------------
  // Some test...
  /* validateColorForInputElement('#ff0000')
  validateColorForInputElement('#ff000085')
  validateColorForInputElement('rgb(255 0 0)')
  validateColorForInputElement('rgb(255 0 0 / 52%)')
  validateColorForInputElement('hwb(0deg 0% 0%)')
  validateColorForInputElement('hwb(0deg 0% 0% / 52%)') */
  // -------------------------

  console.log(selectedOptions);

  // -------------------------
  // Display default colors in color input elements
  elementList.lightBGColorInput.value = selectedOptions.lightModeColors.mainBG;
  elementList.lightTextInput.value = selectedOptions.lightModeColors.text;

  elementList.darkBGColorInput.value = selectedOptions.darkModeColors.mainBG;
  elementList.darkTextInput.value = selectedOptions.darkModeColors.text;

  if (selectedOptions.theme === themes.Daftarche) {
    elementList.daftarcheColors.lightMode.secondaryBGInput.value = selectedOptions.daftarcheSpecificColors.lightModeColors.secondaryBGColor;
    elementList.daftarcheColors.lightMode.tertiaryBGInput.value = selectedOptions.daftarcheSpecificColors.lightModeColors.tertiaryBGColor;

    elementList.daftarcheColors.darkMode.secondaryBGInput.value = selectedOptions.daftarcheSpecificColors.darkModeColors.secondaryBGColor;
    elementList.daftarcheColors.darkMode.tertiaryBGInput.value = selectedOptions.daftarcheSpecificColors.darkModeColors.tertiaryBGColor;
  }
  // -------------------------

  // console.log("🚀 ~ file: script.js:501 ~ stringSeperator ~ selectedOptions", selectedOptions);
}
// ==================================================

// ==================================================
// The function related to checking the type of color code and making the necessary corrections for use in color input elements that only accept hex codes without alpha (i.e. #rrggbb)
function validateColorForInputElement(color) {
  /* 
  The situation is as follows:

    1- Color input elements only accept hex color codes and no alpha value (i.e. "#rrggbb").

    2- It is possible in themes instead of hex code without alpha; Hex code with alpha, non-hex color codes, or even color names are used

    3- To convert non-hex values to hex, we use a 2D Canvas; But this method does not work for alpha values, and the output is not a hex code, but an RGBA code, which is not useful for us.
  
  So we need to process the received color like this to finally have a **hex code**:

    1- If the hex code was 6 digits (7 characters with a hashtag), it means that it does not have an alpha value and we can use it directly in the color element. We will pass.

    2- If the hex code had an alpha value (two extra characters at the end), since the canvas method is not suitable for alpha values, we remove the alpha value, which means we return 7 characters out of 9 characters.

    3- If we were with a non-hex color code that did not have an alpha value; We can directly convert it to hex code from the canvas method

    4- If we were with a non-hex color code that had an alpha value; We remove the part related to the alpha value and in this way we can directly convert it to hex code from the canvas method.

    5- If we are dealing with a color code that does not have a hashtag, is not a hex, and does not contain numbers, we are actually dealing with a color name that we can directly convert into a hex code using the canvas method.
  */

  // -------------------------
  // Regexes

  // To check the presence of digits in the color code
  const digitRegex = /\d/;

  // To check for alpha value in non-hex color codes ( i.e. "/ 85%" in "hsl(223deg 24% 32% / 85%)" )
  const alphaSectionRegex = /\/(.*)(?=\))/;
  // -------------------------

  // -------------------------
  // If the color code starts with a hashtag, we know we have a hex color code that works for us.
  if (color.startsWith("#")) {
    // Now we have to check if the hex code is more than seven characters (6 characters and a hashtag) or not; This is a sign of having an alpha value
    if (color.length > 7) {
      // If the hex code is more than 7 characters (which means it has an alpha value), we remove the last two alpha digits and return 7 characters of the hex code.
      color = color.slice(0, 7);
    }
    // If the color code did not start with a hashtag and was not actually a hex code; We check whether it contains numbers at all or not? If it does not contain numbers, we are dealing with a color name
  } else if (color.match(digitRegex)) {
    // The color code contains numbers, so it is considered a non-hex color code; Now we need to check if there is a part of the color code that corresponds to the alpha value or not
    if (color.includes("/")) {
      // The color code contains the alpha value, and we replace the alpha value part with blank space to prepare for conversion to hex.
      color = color.replace(alphaSectionRegex, "");
    }
    // We convert the non-hex color into hex code and store it
    color = convertColorNameToHex(color);
    // The color code did not start with a hashtag and did not include numbers either; So we are dealing with a color name
  } else {
    // The color code was actually the name of a color, so we can use it directly to convert to hex code
    color = convertColorNameToHex(color);
  }
  // -------------------------

  return color;
}

// ==================================================
// Convert non-hex colors to hex code using a 2D canvas
function convertColorNameToHex(color) {
  // We create a temporary canvas just as a way to convert color names into usable hex codes for HTML color input (to support possible color names in theme codes).
  const tempCanvasForColorConverting = document.createElement("canvas").getContext("2d");

  tempCanvasForColorConverting.fillStyle = color;
  console.log("🚀 ~ file: script.js:487 ~ convertColorNameToHex ~  tempCanvasForColorConverting.fillStyle", tempCanvasForColorConverting.fillStyle);

  return tempCanvasForColorConverting.fillStyle;
}
// ==================================================

// TODO: Maybe we can use literall strings for delimiter elements instead of <span> tags?
// TODO: Maybe write some test?
