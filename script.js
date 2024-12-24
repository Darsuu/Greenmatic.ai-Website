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

// Horizontal dragging logic for the cards
const container = document.querySelector(".scrolling-cards-wrapper");
const cards = document.querySelector(".scrolling-cards");

let isPressedDown = false;
let startX;
let scrollLeft;

/* Mouse down: Initiate horizontal dragging */
container.addEventListener("mousedown", (e) => {
  isPressedDown = true;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
  e.preventDefault(); // Prevent default behavior
});

/* Mouse up: Stop horizontal dragging */
container.addEventListener("mouseup", () => {
  isPressedDown = false;
});

/* Mouse leave: Stop dragging if cursor leaves the container */
container.addEventListener("mouseleave", () => {
  isPressedDown = false;
});

/* Mouse move: Drag the cards horizontally */
container.addEventListener("mousemove", (e) => {
  if (!isPressedDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = x - startX;
  container.scrollLeft = scrollLeft - walk;
});

const menuIcon = document.getElementById('menu-icon');
  const dropdown = document.getElementById('dropdown');
  const menuIconImg = menuIcon.querySelector('img');

  menuIcon.addEventListener('click', () => {
    // Toggle dropdown visibility
    dropdown.classList.toggle('open');
    console.log("here");

    // Toggle icon between menu and cancel
    if (dropdown.classList.contains('open')) {
      console.log("here");
      menuIconImg.src = 'images/icons/cancel_icon.png'; // Change to cancel icon
    } else {
      console.log("here2");
      menuIconImg.src = 'images/icons/menu_icon.png'; // Change back to menu icon
    }
  });
