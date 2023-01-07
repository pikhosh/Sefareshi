// Find the 'root' element and elements related to the color mode icon
const colorModeElementList = {
  darkModeCheckBox: document.querySelector("#dark-mode-checkbox"),
  darkModeIcon: document.querySelector("#dark-mode-icon"),
  root: document.documentElement,
};

const colorModes = {
  light: "light",
  dark: "dark",
};

// These are from the Remix icon set, which are supported and used in both Daftarche and Afkar themes.
const colorModeIcons = {
  lightMode: '<i class="ri-sun-line"></i>',
  darkMode: '<i class="ri-moon-line"></i>',
};

const colorModeAttributeName = "color-mode";

// Get the last saved color mode from local storage
const colorModeState = localStorage.getItem(colorModeAttributeName);

// The function related to checking the user's selection and applying the relevant changes
function toggleColorMode() {
  // If the user had checked the dark mode checkbox
  if (colorModeElementList.darkModeCheckBox.checked) {
    // Setting the color mode attribute for the 'root' element, which changes the colors through the styles added by Sefareshi.
    colorModeElementList.root.setAttribute(colorModeAttributeName, colorModes.dark);

    // Change the color mode icon
    colorModeElementList.darkModeIcon.innerHTML = colorModeIcons.darkMode;

    // If the user checked the dark mode checkbox, we store this selection in local storage
    localStorage.setItem(colorModeAttributeName, colorModes.dark);

    // If the user did not check the dark mode checkbox
  } else {
    // Setting the color mode attribute for the 'root' element, which changes the colors through the styles added by Sefareshi.
    colorModeElementList.root.setAttribute(colorModeAttributeName, colorModes.light);

    // Change the color mode icon
    colorModeElementList.darkModeIcon.innerHTML = colorModeIcons.lightMode;

    // If the user did not check the dark mode checkbox, we store this choice in local storage
    localStorage.setItem(colorModeAttributeName, colorModes.light);
  }
}

// Checking the last saved color mode from local storage on every page load
if (colorModeState === colorModes.light) {
  // Change the dark mode checkbox based on the last saved color mode
  colorModeElementList.darkModeCheckBox.checked = false;
} else if (colorModeState === colorModes.dark) {
  // Change the dark mode checkbox based on the last saved color mode
  colorModeElementList.darkModeCheckBox.checked = true;
}
// Calling the 'toggleColorMode()' function after changing the dark mode checkbox based on the last saved value (which will change the color mode to the user's last choice)
toggleColorMode();
