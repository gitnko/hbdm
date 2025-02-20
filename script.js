document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-music");
  const book = document.getElementById("book");
  const pages = document.querySelectorAll(".page");
  let currentPage = 0;
  let isFlipping = false;
  let floatingCreated = false; // flag to ensure emojis are created only once
  let backgroundChanged = false; // flag to change background only once

  // Play audio on first user interaction
  document.body.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(error => {
        console.log("Audio playback failed, retrying...", error);
        setTimeout(() => audio.play(), 500);
      });
    }
  }, { once: true });

  // Set initial z-index order so the front cover is on top
  setTimeout(() => {
    pages.forEach((page, index) => {
      page.style.zIndex = pages.length - index;
    });
    pages[0].style.zIndex = pages.length + 1;
  }, 100);

  // Flip Page Functionality
  function flipPage() {
    // On first click, change background from white to pink gradient
    if (!backgroundChanged) {
      document.body.style.background = "linear-gradient(to right, #ff7eb3, #ff758c)";
      backgroundChanged = true;
    }

    // On first click, create the floating elements if not already done
    if (!floatingCreated) {
      createFloatingElements();
      floatingCreated = true;
    }

    if (isFlipping) return;
    isFlipping = true;

    if (currentPage < pages.length - 1) {
      let current = pages[currentPage];
      current.style.transform = "rotateY(-180deg)";
      current.style.transition = "transform 2s ease-in-out";

      // Optional: apply wrap effect on second page flip
      if (currentPage === 1) {
        current.style.animation = "wrapEffect 1s ease-in-out";
      }

      setTimeout(() => {
        current.style.zIndex = -1;
        isFlipping = false;
      }, 1000);
      currentPage++;
    } else {
      // Reset pages after the last page
      pages.forEach((page, idx) => {
        page.style.transform = "rotateY(0)";
        page.style.transition = "transform 2s ease-in-out";
        page.style.zIndex = pages.length - idx;
      });
      pages[0].style.zIndex = pages.length + 1;
      currentPage = 0;
      setTimeout(() => { isFlipping = false; }, 1000);
    }
  }

  book.addEventListener("click", flipPage);

  // Create Floating Emoji Elements on click (only once)
  function createFloatingElements() {
    const container = document.querySelector(".floating-elements");
    const emojis = ["❤️", "🎈", "🎉", "🌸"];
    const isMobile = window.innerWidth < 600;
    const elementCount = isMobile ? 15 : 50;

    for (let i = 0; i < elementCount; i++) {
      let element = document.createElement("div");
      element.classList.add("floating");
      element.style.left = `${Math.random() * 100}%`;
      element.style.bottom = `-60px`;
      element.style.animationDuration = `${8 + Math.random() * 4}s`;
      element.style.opacity = "0.8";
      element.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      container.appendChild(element);
    }
  }
});
