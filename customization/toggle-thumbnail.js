// ==================================================
// Function to remove or add thumbnails to themes
function toggleThumbnail(DOMOfTheme, selectedOptions) {
  // DAFTARCHE
  if (selectedOptions.theme === themes.Daftarche) {
    // The Daftarche theme uses thumbnails by default, so there is no need to do anything when the thumbnail option is checked.
    if (!selectedOptions.thumbnail) {
      const allThumbnailTags = DOMOfTheme.querySelectorAll("[post_image]");

      for (let eachTag of allThumbnailTags) {
        eachTag.parentNode.removeChild(eachTag);
      }
    }

    // AFKAR
  } else if (selectedOptions.theme === themes.Afkar) {
    // Afkar theme does not use thumbnails by default, so there is no need to do anything when the thumbnail option is unchecked.
    if (selectedOptions.thumbnail) {
      // -------------------------
      // Creating Thumbnail related HTML elements

      // Create a tag specific to Blog.IR to check if the post has an image or not
      const checkIfPostImageTag = document.createElement("check:if");
      checkIfPostImageTag.setAttribute("post_image", "");

      // Create a parent tag for the thumbnail
      const divThumbnailTag = document.createElement("div");
      divThumbnailTag.classList.add("thumbnail");

      // Create an <img> tag for the actual thumbnail
      const imgThumbnailTag = document.createElement("img");
      imgThumbnailTag.src = "(*post_image*)";

      // Add the <img> tag to the created parent tag
      divThumbnailTag.append(imgThumbnailTag);

      // Adding the parent tag containing the thumbnail image to the conditional tag specific to Blog.IR
      checkIfPostImageTag.append(divThumbnailTag);
      // -------------------------

      const bayanPostDetail = DOMOfTheme.getElementsByTagName("box:post_detail")[0];
      bayanPostDetail.insertBefore(checkIfPostImageTag, bayanPostDetail.children[1]);
    }
  }
}
// ==================================================
