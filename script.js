const container = document.querySelector(".scrolling-cards-wrapper");
const cards = document.querySelector(".scrolling-cards");

/* Keep track of mouse interaction */
let isPressedDown = false;
let startX;
let scrollLeft;

/* Mouse down: Initiate dragging */
container.addEventListener("mousedown", (e) => {
  isPressedDown = true;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
});

/* Mouse up: Stop dragging */
container.addEventListener("mouseup", () => {
  isPressedDown = false;
});

/* Mouse leave: Stop dragging if cursor leaves the container */
container.addEventListener("mouseleave", () => {
  isPressedDown = false;
});

/* Mouse move: Drag the cards */
container.addEventListener("mousemove", (e) => {
  if (!isPressedDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX);
  container.scrollLeft = scrollLeft - walk;
});
