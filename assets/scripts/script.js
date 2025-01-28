// window.addEventListener("wheel", function (event) {
//     const marqueeElements = document.querySelectorAll(".marquee");
//     const marqueeImages = document.querySelectorAll(".marquee img");

//     const direction = event.deltaY > 0 ? -200 : 0;
//     const rotateValue = event.deltaY > 0 ? 180 : 0;

//     // Animating Marquee
//     gsap.to(marqueeElements, {
//         transform: `translateX(${direction}%)`,
//         duration: 4,
//         repeat: -1,
//         ease: "none"
//     });

//     gsap.to(marqueeImages, {
//         rotate: rotateValue
//     });
// });
// document.addEventListener('DOMContentLoaded', () => {
//     const scrollContainer = document.getElementById('galleryScroll');
//     let scrollInterval;

//     function startAutoScroll() {
//         scrollInterval = setInterval(() => {
//             // Check if we are at the end of the scroll
//             if (
//                 scrollContainer.scrollLeft + scrollContainer.offsetWidth >=
//                 scrollContainer.scrollWidth - 1 // Adjusted for smoother looping
//             ) {
//                 // Reset to the first image without smooth behavior for seamless looping
//                 scrollContainer.scrollTo({ left: 0, behavior: 'auto' });
//             } else {
//                 // Continue scrolling
//                 scrollContainer.scrollBy({
//                     left: 2, // Slow down scrolling speed by reducing this value
//                     behavior: 'smooth'
//                 });
//             }
//         }, 20); // Increase interval time to slow down overall speed
//     }

//     function stopAutoScroll() {
//         clearInterval(scrollInterval);
//     }

//     // Start auto-scroll on load
//     startAutoScroll();

//     // Pause scrolling on hover
//     scrollContainer.addEventListener('mouseenter', stopAutoScroll);
//     scrollContainer.addEventListener('mouseleave', startAutoScroll);
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const scrollContainer = document.getElementById('galleryScroll');
//     const scrollLeftButton = document.getElementById('scrollLeft');
//     const scrollRightButton = document.getElementById('scrollRight');

//     const scrollAmount = 300; 

    
//     scrollLeftButton.addEventListener('click', () => {
//         scrollContainer.scrollBy({
//             left: -scrollAmount,
//             behavior: 'smooth',
//         });
//     });

 
//     scrollRightButton.addEventListener('click', () => {
//         scrollContainer.scrollBy({
//             left: scrollAmount,
//             behavior: 'smooth',
//         });
//     });
// });
document.addEventListener('DOMContentLoaded', () => {
  const scrollContainer = document.getElementById('galleryScroll');
  const scrollLeftButton = document.getElementById('scrollLeft');
  const scrollRightButton = document.getElementById('scrollRight');
  const images = scrollContainer.getElementsByClassName('gallery-item');

  // Function to handle manual scroll
  function scrollGallery(direction) {
    const imageWidth = images[0].offsetWidth;
    const currentScrollPosition = scrollContainer.scrollLeft;
    const newScrollPosition = direction === 'left' ? currentScrollPosition - imageWidth : currentScrollPosition + imageWidth;
    
    scrollContainer.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
  }

  // Scroll left button event
  scrollLeftButton.addEventListener('click', () => {
    scrollGallery('left');
  });

  // Scroll right button event
  scrollRightButton.addEventListener('click', () => {
    scrollGallery('right');
  });

  // Scroll event listener to trigger the form after scrolling 2 images
  let formTriggered = false;
  scrollContainer.addEventListener('scroll', () => {
    const imageWidth = images[0].offsetWidth;
    const scrolled = scrollContainer.scrollLeft;
    const imagesScrolled = Math.floor(scrolled / imageWidth);

    if (imagesScrolled >= 2 && !formTriggered) {
      formTriggered = true;
      showContactForm(); // Trigger the contact form after 2 images have been scrolled
    }
  });

  // Function to show contact form
  function showContactForm() {
    document.getElementById('popupOverlay').style.display = 'flex';
  }

  // Close the form when the user clicks on the close button
  function closeForm() {
    document.getElementById('popupOverlay').style.display = 'none';
  }

  // Automatically trigger form on page load
  window.onload = function() {
    document.getElementById('popupOverlay').style.display = 'flex';
  }
});


// form 
// Function to close the form
let formSubmitted = false;

function closeForm() {
document.getElementById("popupOverlay").style.display = "none";
}

// Function to handle form submission
document.getElementById("contactForm").addEventListener("submit", async function (event) {
event.preventDefault(); // Prevent default form submission

if (formSubmitted) {
  alert("Form already submitted!");
  return;
}

// Get form values
const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const mobile = document.getElementById("mobile").value;

// Additional mandatory fields
const project = "Codename Golden Jejuri"; // Fixed project name
const source = "Website"; // Fixed source value

// Payload to send
const payload = { name, email, mobile, project, source };

try {
  // Step 1: Send data to API
  const apiUrl = "https://glitz.apps.enrichr.co/public/companies/1dc9b9ef-c91a-4f4e-8cde-3020ed6747d2/leads-all"; // Demo API URL
  const apiResponse = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!apiResponse.ok) {
    throw new Error("Failed to submit data to API");
  }
  const apiResult = await apiResponse.json();
  console.log("Data sent to API successfully:", apiResult);

  // Step 2: Send data to email via PHP backend
  const emailHandlerUrl = "/emailHandler.php"; // Update with correct PHP script path
  const emailResponse = await fetch(emailHandlerUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(payload), // Convert JSON to URL-encoded string
  });

  if (!emailResponse.ok) {
    const emailError = await emailResponse.json();
    throw new Error(emailError.message || "Failed to send email");
  }
  const emailResult = await emailResponse.json();
  console.log("Email sent successfully:", emailResult.message);

  // Step 3: Redirect to thank-you page
  formSubmitted = true; // Mark the form as submitted
  window.location.href = "thank-you.html"; // Redirect to thank-you page
} catch (error) {
  console.error("Error during form submission:", error);
  alert(`An error occurred: ${error.message}. Please try again.`);
}
});
let newFormSubmitted = false;

// Function to handle new form submission
document.querySelector(".custom-enquiry-form").addEventListener("submit", async function (event) {
event.preventDefault(); // Prevent default form submission

if (newFormSubmitted) {
  alert("Form already submitted!");
  return;
}

// Get form values
const name = document.querySelector("[name='name']").value;
const email = document.querySelector("[name='email']").value;
const phone = document.querySelector("[name='mobile']").value;

// Additional mandatory fields
const project = "Codename Golden Jejuri"; // Fixed project name
const source = "Website"; // Fixed source value

// Payload to send
const payload = { name, email, phone, project, source };

try {
  // Step 1: Send data to API
  const apiUrl = "https://maestro-realtek.turbo.8ease.co/public/companies/1dc9b9ef-c91a-4f4e-8cde-3020ed6747d2/leads-all"; // Demo API URL
  const apiResponse = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!apiResponse.ok) {
    throw new Error("Failed to submit data to API");
  }
  const apiResult = await apiResponse.json();
  console.log("Data sent to API successfully:", apiResult);

  // Step 2: Send data to email via PHP backend
  const emailHandlerUrl = "/emailHandler.php"; // Update with correct PHP script path
  const emailResponse = await fetch(emailHandlerUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(payload), // Convert JSON to URL-encoded string
  });

  if (!emailResponse.ok) {
    const emailError = await emailResponse.json();
    throw new Error(emailError.message || "Failed to send email");
  }
  const emailResult = await emailResponse.json();
  console.log("Email sent successfully:", emailResult.message);

  // Step 3: Redirect to thank-you page
  newFormSubmitted = true; // Mark the form as submitted
  window.location.href = "thank-you.html"; // Redirect to thank-you page
} catch (error) {
  console.error("Error during new form submission:", error);
  alert(`An error occurred: ${error.message}. Please try again.`);
}
});


// Show the form on page load
window.onload = function () {
document.getElementById("popupOverlay").style.display = "flex"; // Automatically show form on page load
};

// Add event listeners for buttons and links
document.querySelector(".cta-button").addEventListener("click", function (event) {
event.preventDefault();
document.getElementById("popupOverlay").style.display = "flex";
});

document.querySelector(".btn").addEventListener("click", function (event) {
event.preventDefault();
document.getElementById("popupOverlay").style.display = "flex";
});

document.querySelector(".investment-appointment-button").addEventListener("click", function (event) {
event.preventDefault();
document.getElementById("popupOverlay").style.display = "flex";
});

document.getElementById("contactUsLink").addEventListener("click", function (event) {
event.preventDefault();
document.getElementById("popupOverlay").style.display = "flex";
});






// Show button after scrolling 100px
// Show or hide the button based on scroll position
window.addEventListener("scroll", function() {
  const btn = document.getElementById("backToTopBtn");
  if (window.pageYOffset > 100) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
});

// Scroll to top when the button is clicked
document.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById("backToTopBtn");
  btn.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const whatsappBtn = document.getElementById("whatsappBtn");
  whatsappBtn.addEventListener("click", function() {
    window.open("https://wa.me/+919742069669", "_blank");
  });
});
//   document.addEventListener("DOMContentLoaded", function() {
//     const whatsappBtn = document.getElementById("foot-btn");
//     whatsappBtn.addEventListener("click", function() {
//       window.open("https://wa.me/+919742069669", "_blank");
//     });
//   });

// Initial Page Animation
// function page1Animation() {
//     const tl = gsap.timeline();
//     tl.from("nav h1, nav h4, nav button", {
//         y: -30,
//         duration: 0.7,
//         delay: 1,
//         opacity: 0,
//         stagger: 0.15
//     });
//     tl.from(".center-part1 h1", {
//         x: -200,
//         opacity: 0,
//         duration: 0.6
//     });
//     tl.from(".center-part1 p", {
//         x: -100,
//         opacity: 0,
//         duration: 0.4
//     });
//     tl.from(".center-part1 button", {
//         opacity: 0,
//         duration: 0.4
//     });
//     tl.from(".center-part2 img", {
//         opacity: 0,
//         duration: 0.5
//     }, "-=1");
//     tl.from(".logos i", {
//         opacity: 0,
//         y: 30,
//         stagger: 0.15,
//         duration: 0.4
//     });
// }

// page1Animation();

// Scroll-triggered Animation for Services
// const tl2 = gsap.timeline({
//     scrollTrigger: {
//         trigger: ".section2",
//         scroller: "body",
//         start: "top 50%",
//         end: "top -200%",
//         scrub: 1
//     }
// });

// tl2.from(".services", { y: 30, opacity: 0, duration: 0.4 })
//    .from(".elem.line-1.left", { x: -300, opacity: 0, duration: 0.4 }, "first")
//    .from(".elem.line-1.right", { x: 300, opacity: 0, duration: 0.4 }, "first")
//    .from(".elem.line-2.left", { x: -300, opacity: 0, duration: 0.4 }, "last")
//    .from(".elem.line-2.right", { x: 300, opacity: 0, duration: 0.4 }, "last")
//    .from(".elem.line-3.left", { x: -300, opacity: 0, duration: 0.4 }, "first1")
//    .from(".elem.line-3.right", { x: 300, opacity: 0, duration: 0.4 }, "first1")
//    .from(".elem.line-4.left", { x: -300, opacity: 0, duration: 0.4 }, "last2")
//    .from(".elem.line-4.right", { x: 300, opacity: 0, duration: 1 }, "last2");
//    const carousel = document.querySelector('.carousel');
//    const slides = document.querySelectorAll('.carousel-slide');
//    let currentIndex = 0;
 
// Auto-carousel functionality
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');
let currentIndex = 0;

function moveCarousel() {
  currentIndex++;
  if (currentIndex >= slides.length) {
      currentIndex = 0; // Reset to the first slide
  }
  const offset = currentIndex * -100; // Calculate the offset
  carousel.style.transform = `translateX(${offset}%)`;
}

// Start the auto-carousel
setInterval(moveCarousel, 3000);



//    const tl3 = gsap.timeline();
//    //Image Gallery Animation

//    function galleryAnimate(){

//    tl3.to(".image-content .slide" , {
//         x: "-200%",
//         duration:30,
//         stagger: 0.15,
//         ease:"none",
//         repeat:-1,

//    })
// }

// galleryAnimate();
