let curYPos = 0;
let curDown = false;
let velocity = 0; // Current scroll velocity
let lastYPos = 0; // Last recorded Y position
let dampingFactor = 0.85; // Deceleration factor for inertia
let animationFrameId = null;

/* Mouse move: Calculate velocity for smoother dragging */
document.addEventListener("mousemove", (event) => {
  event.preventDefault(); // Prevent text selection
  if (curDown) {
    velocity = -(event.pageY - lastYPos)*0.3; // Calculate velocity
  }
});

/* Mouse down: Start dragging */
document.addEventListener("mousedown", (event) => {
  event.preventDefault();
  curDown = true;
  lastYPos = event.pageY;
  velocity = 0; // Reset velocity
});

/* Mouse up: Enable smooth inertia scrolling */
window.addEventListener("mouseup", () => {
  curDown = false;

  // Start deceleration animation
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  animateInertia();
});

/* Inertia animation function */
function animateInertia() {
  if (Math.abs(velocity) > 0.5) { // Threshold to stop animation
    window.scrollTo(0, window.scrollY + velocity);
    velocity *= dampingFactor; // Apply damping to reduce velocity
    animationFrameId = requestAnimationFrame(animateInertia);
  } else {
    velocity = 0; // Stop completely
    cancelAnimationFrame(animationFrameId);
  }
}

const scrollLeftButton = document.getElementById('scroll-left');
const scrollRightButton = document.getElementById('scroll-right');
const scrollingCards = document.querySelector('.scrolling-cards-wrapper');

scrollLeftButton.addEventListener('click', () => {
  scrollingCards.scrollBy({
    left: -360,  // Adjust the scroll distance if necessary
    behavior: 'smooth'
  });
});

scrollRightButton.addEventListener('click', () => {
  scrollingCards.scrollBy({
    left: 360,   // Adjust the scroll distance if necessary
    behavior: 'smooth'
  });
});


// Mobile menu dropdown
const menuIcon = document.getElementById('menu-icon');
const dropdown = document.getElementById('dropdown');
const menuIconImg = menuIcon.querySelector('img');

menuIcon.addEventListener('click', () => {
  dropdown.classList.toggle('open');
  console.log("here");

  if (dropdown.classList.contains('open')) {
    console.log("here");
    menuIconImg.src = 'images/icons/cancel_icon.png';
  } else {
    console.log("here2");
    menuIconImg.src = 'images/icons/menu_icon.png';
  }
});
