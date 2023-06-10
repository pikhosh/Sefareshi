// ==================================================
// Adding the name and link of Sefareshi to the footer of the themes
function addFooterCredit(DOMOfTheme) {
  // Find the theme footer element
  const footerSectionElement = DOMOfTheme.querySelector("#footer");

  // Create a delimiter element
  const footerDelimiterElement = document.createElement("span");
  footerDelimiterElement.innerText = "| ";

  // Creating a tag related to the name and link of Sefareshi
  const footerCreditElement = document.createElement("a");

  // It might be a good idea to use the current link that the user uses for Sefareshi instead of a static link (this way, if the Sefareshi domain changes, there will be no problem).
  // footerCreditElement.href = window.location.href;
  footerCreditElement.href = "https://pikhosh.blog.ir/page/Sefareshi";

  footerCreditElement.title = "ساخته شده با ابزار سفارشی!";

  // We want Sefareshi to open in a new tab
  footerCreditElement.target = "_blank";

  footerCreditElement.innerText = "سفارشی!";

  // Adding the created elements to the footer element (the order of adding is important and we add the delimiter first and then the link)
  footerSectionElement.append(footerDelimiterElement);
  footerSectionElement.append(footerCreditElement);
}
// ==================================================
