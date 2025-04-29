// Get the scroll-to-top button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Show the button when scrolling down 200px from the top of the document
window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollToTopBtn.style.display = 'block'; // Show button
  } else {
    scrollToTopBtn.style.display = 'none'; // Hide button
  }
};

// When the button is clicked, scroll the page to the top
scrollToTopBtn.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent the default anchor behavior
  window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll smoothly to the top
});




// Wait for the DOM content to be loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const popup = document.getElementById('confirmationPopup');
    

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      
      popup.style.display = 'block';
      
      form.reset();
    });
    
    // Close popup function when user clicks the Close button//
    window.closePopup = function () {
      popup.style.display = 'none';
    };
  });

  // Slide Show //
  document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const slideWidth = slides[0].offsetWidth;
    let index = 0;
    let interval;
  
    // Clone the slides to create the infinite loop effect
    for (let i = 0; i < slides.length; i++) {
      const clone = slides[i].cloneNode(true);
      track.appendChild(clone); // Add the clone to the end of the track
    }
  
    // Function to auto-scroll the carousel
    function autoScrollCarousel() {
      index++;
      track.style.transition = 'transform 0.1s linear'; // Apply smooth transition
      track.style.transform = `translateX(-${index * slideWidth}px)`; // Move the carousel
  
      // Once we reach the last slide (after cloning), reset the position back to the start
      if (index === slides.length) {
        setTimeout(() => {
          track.style.transition = 'none'; // Disable transition for instant jump
          track.style.transform = 'translateX(0)'; // Reset to the first position
          index = 0; // Reset the index to start over
        }, 500); // Small delay to allow for the transition reset
      }
    }
  
    // Set an interval to scroll the carousel every 3 seconds
    interval = setInterval(autoScrollCarousel, 3000);
  
    // Pause the carousel when hovering over any image
    slides.forEach(slide => {
      slide.addEventListener('mouseover', () => {
        clearInterval(interval); // Stop auto-scrolling when hovering
      });
  
      slide.addEventListener('mouseout', () => {
        interval = setInterval(autoScrollCarousel, 3000); // Restart auto-scrolling when not hovering
      });
  
      // Click event to open modal with the clicked image
      const img = slide.querySelector('img');
      img.addEventListener('click', () => {
        // Open the modal
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const captionText = document.getElementById('caption');
        
        modal.style.display = 'block';
        modalImg.src = img.src; // Set the modal image source to the clicked image
        captionText.innerHTML = img.alt || 'Image'; // Optionally set a caption
  
        // Close the modal when the user clicks on the close button
        const closeBtn = document.querySelector('.close');
        closeBtn.onclick = () => {
          modal.style.display = 'none'; // Hide the modal
        }
      });
    });
  
    // Function to change image when arrows are clicked
    window.changeImage = (direction) => {
      const modalImg = document.getElementById('modalImage');
      const slidesArray = Array.from(slides);
      let currentIndex = slidesArray.findIndex(slide => slide.querySelector('img').src === modalImg.src);
      
      currentIndex += direction; // Increment or decrement the index based on direction
      if (currentIndex >= slidesArray.length) currentIndex = 0; // Loop back to the first image
      if (currentIndex < 0) currentIndex = slidesArray.length - 1; // Loop back to the last image
  
      // Set the new image in the modal
      modalImg.src = slidesArray[currentIndex].querySelector('img').src;
      const captionText = document.getElementById('caption');
      captionText.innerHTML = slidesArray[currentIndex].querySelector('img').alt || 'Image';
    };
  });

  document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar-links li a'); // Select all navigation links
  
    // Function to set the active link based on the current page URL
    function setActiveLink() {
      const currentURL = window.location.pathname; // This will return just the path like '/about-us.html'
      navLinks.forEach(link => {
        // Check if the link's href matches the current page URL
        if (link.pathname === currentURL) {
          link.classList.add('active'); // Add the 'active' class to the matching link
        } else {
          link.classList.remove('active'); // Remove 'active' from other links
        }
      });
    }
  
    // Call the setActiveLink function on page load to highlight the current link
    setActiveLink();
  
    // Add event listeners to all the navigation links for the click effect
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Remove the 'active' class from all links
        navLinks.forEach(link => link.classList.remove('active'));
  
        // Add the 'active' class to the clicked link
        link.classList.add('active');
      });
    });
  });


  //Contact Section

// Function to navigate between steps
function nextStep(stepNumber) {
  const steps = document.querySelectorAll('.form-step');

  steps.forEach(step => {
    step.style.display = 'none'; // Hide all steps
    step.classList.remove('active'); // Remove the 'active' class
  });
  
  // Show the current step
  const currentStep = document.getElementById(`step${stepNumber}`);
  currentStep.style.display = 'flex'; // Show with flex layout
  currentStep.classList.add('active'); // Mark as active to apply flex styles
}

// Function to submit the form and display the confirmation message
function submitForm() {
  // Hide the form and show the confirmation message
  document.getElementById('interactiveForm').style.display = 'none';
  document.getElementById('confirmationMessage').style.display = 'block';
  
  // Optionally, you can add logic here to send form data to your server
  // Example: sendFormData();
}

// Function to reset the form after the confirmation message is closed
function resetForm() {
  // Reset all form fields
  const form = document.getElementById('interactiveForm');
  form.reset();  // Resets form fields
  
  // Reset all the steps (if you are using multi-step forms)
  nextStep(1);  // Bring the user back to the first step
  
  // Hide the confirmation message
  document.getElementById('confirmationMessage').style.display = 'none';
  
  // Show the form again
  document.getElementById('interactiveForm').style.display = 'block';
}

// Contact Us Location Seciton
function initMap() {
  const ronnieLocation = { lat: 35.8582, lng: -83.4943 };  // Coordinates for Ronnies Q
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,  // Adjust the zoom level
    center: ronnieLocation,
  });

  const marker = new google.maps.Marker({
    position: ronnieLocation,
    map: map,
    title: "Ronnie's Q",
  });
}
