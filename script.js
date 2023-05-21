let cards = document.querySelectorAll(".card");
let name = prompt("Prompt In: ");

const randomColor = () => {
  const r = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);
  const g = Math.floor(Math.random() * 200);
  return `rgb(${r},${g},${b})`;
};

const observer = new IntersectionObserver(
  (entries) => {
    console.log(entries);
    entries.forEach((entry) => {
      entry.isIntersecting
        ? entry.target.classList.add("active")
        : entry.target.classList.remove("active");
      //   if (entry.isIntersecting) observer.unobserve(entry.target);
    });
  },
  { threshold: 0.3, rootMargin: "0px 0px -50px 0px", root: null }
);
function loadNewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div");
    card.style.backgroundColor = randomColor();
    card.classList.add("card");
    if (name) {
      card.innerHTML = name;
      card.style.backgroundColor = randomColor();
    } else {
      card.innerHTML = "Write here!!!";
      card.style.fontFamily = "sans-serif";
      card.addEventListener("click", () => {
        name = prompt("Prompt In: ");
        cards = document.querySelectorAll(".card");
        cards.forEach((entry) => {
          if (name) {
            entry.innerHTML = name;
            entry.style.backgroundColor = randomColor();
          } else {
            entry.innerHTML = "Write here!!!";
            entry.style.fontFamily = "sans-serif";
            entry.style.backgroundColor = "#fff";
          }
          observer.observe(entry);
        });

        // name = entry.innerHTML;
      });
      card.style.backgroundColor = "#fff";
    }
    observer.observe(card);
    document.querySelector(".container").appendChild(card);
  }
}
const lastCardObserver = new IntersectionObserver(
  (entries) => {
    const lastCard = entries[0];
    if (!lastCard.isIntersecting) return;
    loadNewCards();
    lastCardObserver.unobserve(lastCard.target);
    lastCardObserver.observe(document.querySelector(".card:last-child"));
  },
  { rootMargin: "0px 0px 100px 0px" }
);

lastCardObserver.observe(document.querySelector(".card:last-child"));

cards.forEach((entry) => {
  if (name) {
    entry.innerHTML = name;
    entry.style.backgroundColor = randomColor();
  } else {
    card.addEventListener("click", () => {
      name = prompt("Prompt In: ");
      cards = document.querySelectorAll(".card");
      cards.forEach((entry) => {
        entry.innerHTML = name;
        entry.style.backgroundColor = randomColor();
        observer.observe(entry);
      });
    });
    entry.innerHTML = "Write here!!!";
    entry.style.fontFamily = "sans-serif";
    entry.style.backgroundColor = "#fff";
  }
  observer.observe(entry);
});
