// Vertical dragging logic for the entire page
let curYPos = 0;
let curDown = false;

/* Mouse move: Handle vertical dragging for the page */
document.addEventListener("mousemove", (event) => {
  if (curDown) {
    window.scrollTo(0, window.scrollY + (curYPos - event.pageY));
  }
});

/* Mouse down: Initiate vertical dragging */
document.addEventListener("mousedown", (event) => {
  // Prevent vertical dragging if inside the horizontal container
  // if (event.target.closest(".scrolling-cards-wrapper")) return;

  curDown = true;
  curYPos = event.pageY;
  event.preventDefault(); // Prevent text selection while dragging
});

/* Mouse up: Stop vertical dragging */
window.addEventListener("mouseup", () => {
  curDown = false;
});

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
