// ==================================================
// Functions related to the estimated reading time feature

// -------------------------
// Creating HTML elements
function addReadTimeElements(DOMOfTheme, selectedOptions) {
  // Find the tag related to displaying the content of a single post (we can only estimate the reading time when we have the entire text of the post)
  const postSectionOfTheme = DOMOfTheme.getElementsByTagName("box:post_detail")[0];

  // DAFTARCHE
  if (selectedOptions.theme === themes.Daftarche) {
    // Create an element before reading time for the title
    const readTimeTitleElement = document.createElement("span");
    readTimeTitleElement.innerText = "زمان مطالعه: ";

    // Create an element to display the estimated reading time
    const readTimeElement = document.createElement("span");
    readTimeElement.innerText = "نامشخص";
    readTimeElement.id = "read-time";

    // Create an delimiter element for daftarche
    const delimiterElement = document.createElement("span");
    delimiterElement.innerText = " |";

    // Find the post details section
    const postDetailSection = postSectionOfTheme.querySelector(".detail");

    // Add read-time elements before the first child of the section (order is important because the title needs to be the first child)
    postDetailSection.insertBefore(delimiterElement, postDetailSection.firstChild);
    postDetailSection.insertBefore(readTimeElement, postDetailSection.firstChild);
    postDetailSection.insertBefore(readTimeTitleElement, postDetailSection.firstChild);
  }

  // AFKAR
  else if (selectedOptions.theme === themes.Afkar) {
    // Create an element for the reading time section
    const readTimeElement = document.createElement("h3");
    readTimeElement.innerText = "زمان مطالعه: ";

    // Create an element for the read time number
    const readTimeNumberElement = document.createElement("span");
    readTimeNumberElement.innerText = "نامشخص";
    readTimeNumberElement.id = "read-time";

    // Adding the reading time number element to the reading time section as a child
    readTimeElement.append(readTimeNumberElement);

    // Find the post details section
    const postDetailSection = postSectionOfTheme.querySelector("#post-detail");

    // Adding the read time element before the second (actually the 1 if we start from 0) child of the post details section
    postDetailSection.insertBefore(readTimeElement, postDetailSection.children[1]);
  }
}

// -------------------------
// Add the corresponding script to the end of the theme code
// TODO: Instead of putting the real code in the theme, we can just put the link of the relevant file in the code (using the real code directly allows the user to make changes, but using the file link makes it possible to easily and universally update code by us)
async function addReadTimeScriptTag(DOMOfTheme, readTimeScriptLink) {
  // Create a <script> tag to put the read-time script inside
  const readTimeScriptTag = document.createElement("script");

  // Getting data from the script file link (we use 'await' instead of '.then' so that we can more easily return the final theme code changes to the generate() function)
  const readtimeScriptLinkResponse = await fetch(readTimeScriptLink);

  // Placing the received data (which is the actual script code) inside the created <script> tag
  readTimeScriptTag.innerHTML = await readtimeScriptLinkResponse.text();

  // Find the theme's <html> tag
  const htmlElement = DOMOfTheme.querySelector("html");

  // Adding the <script> tag containing the read-time code to the end of the <html> tag
  htmlElement.append(readTimeScriptTag);
}
// ==================================================
