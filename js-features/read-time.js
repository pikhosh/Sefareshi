const postContentText = document.querySelector(".text-content").innerText;

// We add this element to the themes using Sefareshi and with the default text "نامشخص" (for when the code is not executed and only the document is loaded) and it is not part of the themes.
const readTimeElement = document.querySelector("#read-time");
// Before this element, another element with the text "زمان مطالعه: " should be created by Sefareshi.
// And after this element, based on what theme is chosen; A delimiter character (such as |) may be required outside the element tag.

// Splitting the text based on spaces (which actually specify the separation of words, so it means where each word ends)
const postWordCount = postContentText.split(" ").length;

// Common word per minute rate based on Google results :)
const wordPerMinute = 200;

// Above, we separated the words of the text, and now by dividing the number of words by the rate of words per minute, we can understand how many minutes this article will take based on the number of words.
const estimatedReadTime = Math.round(postWordCount / wordPerMinute);

// Converting the estimated time number from "7" to something like "۷" for better compatibility with Persian font
const estimatedReadTimeLocalNumber = estimatedReadTime.toLocaleString("fa-IR");

// Checking if there is an element to display the estimated reading time on the page or not (the home page does not have this element and causes an error)
if (readTimeElement != null) {
  // We estimate time without decimals, so it doesn't matter to us if the number is less than one or actually zero
  if (estimatedReadTime === 0) {
    readTimeElement.innerText = "کمتر از یک دقیقه";
  } else {
    readTimeElement.innerText = estimatedReadTimeLocalNumber + " دقیقه";
  }
}
