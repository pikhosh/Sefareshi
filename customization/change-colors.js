// ==================================================
// The function related to changing the background color of themes
function changeColors(ThemeCodes, selectedOptions, regexList) {
  // -------------------------
  // Splitting the CSS code into two parts for light and dark mode to change the background color code more easily
  const stringSeperator = "@media (prefers-color-scheme: dark) {";
  let [lightModePart, darkModePart] = ThemeCodes.css.split(stringSeperator);
  // -------------------------

  // -------------------------
  // Replace the color code found using regexes with the color code of the user's choice and store the code (because the 'replace()' function does not change the original string)
  switch (selectedOptions.theme) {
    // Daftarche
    case themes.Daftarche:
      // Light
      lightModePart = lightModePart.replace(
        regexList.daftarche.mainBGColor,
        selectedOptions.lightModeColors.mainBG
      );
      lightModePart = lightModePart.replace(
        regexList.daftarche.textColor,
        selectedOptions.lightModeColors.text
      );
      lightModePart = lightModePart.replace(
        regexList.daftarche.secondaryBGColor,
        selectedOptions.daftarcheSpecificColors.lightModeColors.secondaryBGColor
      );
      lightModePart = lightModePart.replace(
        regexList.daftarche.tertiaryBGColor,
        selectedOptions.daftarcheSpecificColors.lightModeColors.tertiaryBGColor
      );
      lightModePart = lightModePart.replace(
        regexList.daftarche.selectedBGColor,
        selectedOptions.daftarcheSpecificColors.lightModeColors.selectedBGColor
      );

      // Dark
      darkModePart = darkModePart.replace(
        regexList.daftarche.mainBGColor,
        selectedOptions.darkModeColors.mainBG
      );
      darkModePart = darkModePart.replace(
        regexList.daftarche.textColor,
        selectedOptions.darkModeColors.text
      );
      darkModePart = darkModePart.replace(
        regexList.daftarche.secondaryBGColor,
        selectedOptions.daftarcheSpecificColors.darkModeColors.secondaryBGColor
      );
      darkModePart = darkModePart.replace(
        regexList.daftarche.tertiaryBGColor,
        selectedOptions.daftarcheSpecificColors.darkModeColors.tertiaryBGColor
      );
      darkModePart = darkModePart.replace(
        regexList.daftarche.selectedBGColor,
        selectedOptions.daftarcheSpecificColors.darkModeColors.selectedBGColor
      );

      break;
    // Afkar
    case themes.Afkar:
      // Light
      lightModePart = lightModePart.replace(
        regexList.afkar.mainBGColor,
        selectedOptions.lightModeColors.mainBG
      );
      lightModePart = lightModePart.replace(
        regexList.afkar.textColor,
        selectedOptions.lightModeColors.text
      );
      // Dark
      darkModePart = darkModePart.replace(
        regexList.afkar.mainBGColor,
        selectedOptions.darkModeColors.mainBG
      );
      darkModePart = darkModePart.replace(
        regexList.afkar.textColor,
        selectedOptions.darkModeColors.text
      );
      break;
  }
  // -------------------------

  // Putting together the previously separated parts of the CSS code as the final code of the theme
  ThemeCodes.css = lightModePart + stringSeperator + darkModePart;
}
// ==================================================
