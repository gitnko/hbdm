document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-music");
  const book = document.getElementById("book");
  const pages = document.querySelectorAll(".page");
  let currentPage = 0;
  let isFlipping = false;

  // Play audio on first interaction, with a retry for mobile
  document.body.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(error => {
        console.log("Playback failed, trying again...");
        setTimeout(() => audio.play(), 500); // Retry after 500ms
      });
    }
  }, { once: true });

  // Set initial z-index order of pages
  setTimeout(() => {
    pages.forEach((page, index) => {
      page.style.zIndex = pages.length - index;
    });
    pages[0].style.zIndex = pages.length + 1; // front cover on top
  }, 100);

  // Flip Page Function
  function flipPage() {
    if (isFlipping) return;
    isFlipping = true;

    if (currentPage < pages.length - 1) {
      let current = pages[currentPage];
      current.style.transform = "rotateY(-180deg)";
      current.style.transition = "transform 1s ease-in-out";

      // Optional wrapEffect animation on the second page
      if (currentPage === 1) {
        current.style.animation = "wrapEffect 1s ease-in-out";
      }

      setTimeout(() => {
        current.style.zIndex = -1;
        isFlipping = false;
      }, 1000);

      currentPage++;
    } else {
      // If last page is reached, reset
      pages.forEach((page, index) => {
        page.style.transform = "rotateY(0)";
        page.style.transition = "transform 1s ease-in-out";
        page.style.zIndex = pages.length - index;
      });
      pages[0].style.zIndex = pages.length + 1; // reset front cover to top
      currentPage = 0;
      setTimeout(() => { isFlipping = false; }, 1000);
    }
  }

  book.addEventListener("click", flipPage);

  // Create Floating Elements
  function createFloatingElements() {
    const container = document.querySelector(".floating-elements");
    const emojis = ["❤️", "🎈", "🎉", "🌸"];

    // Decide how many elements based on screen size (fewer for mobile)
    const isMobile = window.innerWidth < 600;
    const elementCount = isMobile ? 15 : 50;

    for (let i = 0; i < elementCount; i++) {
      let element = document.createElement("div");
      element.classList.add("floating");

      // Random horizontal position
      element.style.left = `${Math.random() * 100}%`;

      // Slightly vary animation duration
      element.style.animationDuration = `${8 + Math.random() * 4}s`;

      // Set moderate opacity for a nice effect
      element.style.opacity = "0.8";

      // Assign random emoji from the array
      element.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      container.appendChild(element);
    }
  }

  createFloatingElements();
});
