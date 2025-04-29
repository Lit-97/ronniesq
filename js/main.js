
const scrollToTopBtn = document.getElementById('scrollToTopBtn');


window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
};


scrollToTopBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});





document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const popup = document.getElementById('confirmationPopup');
    

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      
      popup.style.display = 'block';
      
      form.reset();
    });
    

    window.closePopup = function () {
      popup.style.display = 'none';
    };
  });


  document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const slideWidth = slides[0].offsetWidth;
    let index = 0;
    let interval;
  

    for (let i = 0; i < slides.length; i++) {
      const clone = slides[i].cloneNode(true);
      track.appendChild(clone);
    }
  

    function autoScrollCarousel() {
      index++;
      track.style.transition = 'transform 0.1s linear';
      track.style.transform = `translateX(-${index * slideWidth}px)`;
  

      if (index === slides.length) {
        setTimeout(() => {
          track.style.transition = 'none';
          track.style.transform = 'translateX(0)';
          index = 0;
        }, 500);
      }
    }
  

    interval = setInterval(autoScrollCarousel, 3000);
  

    slides.forEach(slide => {
      slide.addEventListener('mouseover', () => {
        clearInterval(interval);
      });
  
      slide.addEventListener('mouseout', () => {
        interval = setInterval(autoScrollCarousel, 3000);
      });
  

      const img = slide.querySelector('img');
      img.addEventListener('click', () => {

        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const captionText = document.getElementById('caption');
        
        modal.style.display = 'block';
        modalImg.src = img.src;
        captionText.innerHTML = img.alt || 'Image';
  
    
        const closeBtn = document.querySelector('.close');
        closeBtn.onclick = () => {
          modal.style.display = 'none';
        }
      });
    });
  
   
    window.changeImage = (direction) => {
      const modalImg = document.getElementById('modalImage');
      const slidesArray = Array.from(slides);
      let currentIndex = slidesArray.findIndex(slide => slide.querySelector('img').src === modalImg.src);
      
      currentIndex += direction;
      if (currentIndex >= slidesArray.length) currentIndex = 0;
      if (currentIndex < 0) currentIndex = slidesArray.length - 1;
  
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
      const currentURL = window.location.pathname;
      navLinks.forEach(link => {
        if (link.pathname === currentURL) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  
    setActiveLink();
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.forEach(link => link.classList.remove('active'));
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
}

// Function to reset the form after the confirmation message is closed
function resetForm() {
  const form = document.getElementById('interactiveForm');
  form.reset();
  nextStep(1);
  
  document.getElementById('confirmationMessage').style.display = 'none';
  
  document.getElementById('interactiveForm').style.display = 'block';
}

// Contact Us Location Seciton
function initMap() {
  const ronnieLocation = { lat: 36.077709, lng: -87.376185 };
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
