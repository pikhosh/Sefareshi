// Function to add color mode change button to theme
function addColorModeButton(DOMOfTheme, selectedOptions) {
  const darkModeCheckBoxId = "dark-mode-checkbox";

  // Create a dark mode checkbox <input> tag that calls the 'toggleColorMode()' function onChange
  const darkModeCheckBoxElement = document.createElement("input");
  darkModeCheckBoxElement.type = "checkbox";
  darkModeCheckBoxElement.id = darkModeCheckBoxId;
  darkModeCheckBoxElement.setAttribute("onchange", "toggleColorMode()");
  darkModeCheckBoxElement.style.display = "none";

  // Create a <label> tag for the dark mode checkbox that should contain the color mode icon
  const darkModeIconElement = document.createElement("label");
  darkModeIconElement.htmlFor = darkModeCheckBoxId;
  darkModeIconElement.id = "dark-mode-icon";
  darkModeIconElement.style.cursor = "pointer";
  darkModeIconElement.title = "حالت تاریک/روشن";

  // Add the created tags to the themes, based on what place is appropriate in each of the themes
  switch (selectedOptions.theme) {
    case themes.Daftarche:
      const headerElement = DOMOfTheme.querySelector("#header");
      headerElement.append(darkModeCheckBoxElement);
      headerElement.append(darkModeIconElement);
      break;
    case themes.Afkar:
      const rssAndTitleElement = DOMOfTheme.querySelector("#rss-and-title");
      rssAndTitleElement.append(darkModeCheckBoxElement);
      rssAndTitleElement.append(darkModeIconElement);
      break;
  }
}

// The function to add the script tag containing the code to change the color mode to the theme
async function addColorModeScriptTag(DOMOfTheme, colorModeScriptLink) {
  const htmlElement = DOMOfTheme.querySelector("html");

  const colorModeScriptTag = document.createElement("script");

  const colorModeScriptLinkResponse = await fetch(colorModeScriptLink);

  colorModeScriptTag.innerHTML = await colorModeScriptLinkResponse.text();

  htmlElement.append(colorModeScriptTag);
}

// Function related to changing the style of themes in preparation for using the button to change the color mode
function addColorModeStyle(ThemeCodes, regexList) {
  const stringSeperator = "@media (prefers-color-scheme: dark) {";
  let [lightModePart, darkModePart] = ThemeCodes.css.split(stringSeperator);

  // Find the style related to ':root' in the section related to "@media (prefers-color-scheme: dark)".
  let rootStyle = darkModePart.match(regexList.root)[0];

  // Delete that section
  darkModePart = darkModePart.replace(rootStyle, "");

  // Adding the desired attribute for dark mode to the ":root" selector we found
  rootStyle = rootStyle.replace(regexList.rootAttribute, "[color-mode='dark']");

  // Adding the root styles we found to the top of the file
  lightModePart = rootStyle.concat(lightModePart);

  // Putting together the previously separated parts of the CSS code as the final code of the theme
  ThemeCodes.css = lightModePart + stringSeperator + darkModePart;
}
