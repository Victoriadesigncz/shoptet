// Get the modal and close button
var modal = document.getElementById("myModal");
var modalImage = document.getElementById("modalImage");
var closeButton = document.getElementById("closeButton");
var prevButton = document.getElementById("prev");
var nextButton = document.getElementById("next");


// Track the current image index in the group
var currentImageIndex = 0;
var currentGroup = ""; // To store the current group name

// Function to navigate between images in the group
function navigateImage(direction) {
    var images = document.querySelectorAll(`[data-group="${currentGroup}"]`);
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }

    modalImage.src = images[currentImageIndex].src;
}

// Track the current image index in the group
var currentImageIndex = 0;
var imageGroup = [];

// Find all images with the data-group attribute and add them to the group
var images = document.querySelectorAll('[data-group="group1"]');
images.forEach(function(image) {
    imageGroup.push(image.src);
});

// Add a click event listener to the close button
closeButton.addEventListener("click", function() {
    closeModal();
});

// Add a click event listener to the previous button
prevButton.addEventListener("click", function() {
    showPrevImage();
});

// Add a click event listener to the next button
nextButton.addEventListener("click", function() {
    showNextImage();
});

// Function to open the modal with a specific image source
function openModal(imageSrc, imageName) {
    // Get the modal image element
    var modalImage = document.getElementById("modalImage");

    // Get the modal image name element
    var modalImageName = document.getElementById("modalImageName");

    // Set the source of the modal image
    modalImage.src = imageSrc;

    // Set the alt text of the modal image to the image name
    modalImage.alt = imageName;

    // Set the text content of the modalImageName element to the image name
    modalImageName.textContent = imageName;

    // Update the currentImageIndex
    currentImageIndex = imageGroup.indexOf(imageSrc);

    // Update the currentImageIndexText
    currentImageIndexText = imageGroup.indexOf(imageName);

    // Display the modal
    modal.style.display = "flex";
}

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
}

// Function to show the previous image
function showPrevImage() {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = imageGroup.length - 1;
    }
    modalImage.src = imageGroup[currentImageIndex]; 
    modalImage.alt = imageName; // Set the alt text to the alt of the current image
    document.getElementById('modalImageName').textContent = imageName; // Update the caption
}

// Function to show the next image
function showNextImage() {
    currentImageIndex++;
    if (currentImageIndex >= imageGroup.length) {
        currentImageIndex = 0;
    }
    modalImage.src = imageGroup[currentImageIndex];
    modalImage.alt = imageName; // Set the alt text to the alt of the current image
    document.getElementById('modalImageName').textContent = imageName; // Update the caption
}

// Close the modal when clicking outside of it
window.addEventListener("click", function(event) {
    if (event.target == modal) {
        closeModal();
    }
});
// Add touch event listeners to detect swipe gestures
var startX, startY;

modalImage.addEventListener("touchstart", function(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
});

modalImage.addEventListener("touchmove", function(event) {
    var endX = event.touches[0].clientX;
    var endY = event.touches[0].clientY;

    // Calculate the distance traveled in the X and Y directions
    var deltaX = endX - startX;
    var deltaY = endY - startY;

    // Determine the swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
            // Right swipe
            showPrevImage();
        } else {
            // Left swipe
            showNextImage();
        }
    }

    // Reset the start position for the next swipe
    startX = endX;
    startY = endY;
});
