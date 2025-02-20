document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-music");
  const book = document.getElementById("book");
  const pages = document.querySelectorAll(".page");
  let currentPage = 0;
  let isFlipping = false;

  // Play audio on first interaction
  document.body.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(error => console.log("Playback failed: ", error));
    }
  }, { once: true });

  setTimeout(() => {
    pages.forEach((page, index) => {
      page.style.zIndex = pages.length - index;
    });
    pages[0].style.zIndex = pages.length + 1;
  }, 100);

  function flipPage() {
    if (isFlipping) return;
    isFlipping = true;

    if (currentPage < pages.length - 1) {
      let current = pages[currentPage];
      current.style.transform = "rotateY(-180deg)";
      current.style.transition = "transform 1s ease-in-out";

      if (currentPage === 1) {
        current.style.animation = "wrapEffect 1s ease-in-out";
      }

      setTimeout(() => {
        current.style.zIndex = -1;
        isFlipping = false;
      }, 1000);

      currentPage++;
    } else {
      pages.forEach((page, index) => {
        page.style.transform = "rotateY(0)";
        page.style.transition = "transform 1s ease-in-out";
        page.style.zIndex = pages.length - index;
      });
      pages[0].style.zIndex = pages.length + 1;
      currentPage = 0;
      setTimeout(() => { isFlipping = false; }, 1000);
    }
  }

  book.addEventListener("click", flipPage);

  // Revised function for creating more and larger floating elements
  function createFloatingElements() {
    const container = document.querySelector(".floating-elements");
    const emojis = {
      heart: "❤️",
      balloon: "🎈",
      party: "🎉",
      flower: "🌸"
    };

    // Increase the number of floating elements to 50
    for (let i = 0; i < 50; i++) {
      let element = document.createElement("div");
      element.classList.add("floating");

      // Random horizontal position (0% to 100%)
      element.style.left = `${Math.random() * 100}%`;
      // Fixed bottom start position
      element.style.bottom = `-60px`;
      // Animation duration adjusted so they float upward visibly
      element.style.animationDuration = `${8 + Math.random() * 4}s`;
      // Set opacity to ensure they’re visible
      element.style.opacity = `${0.8}`;
      // Directly assign a random emoji
      let emojiKeys = Object.keys(emojis);
      let randomKey = emojiKeys[Math.floor(Math.random() * emojiKeys.length)];
      element.textContent = emojis[randomKey];

      container.appendChild(element);
    }
  }

  createFloatingElements();
});
