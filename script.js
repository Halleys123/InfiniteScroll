let cards = document.querySelectorAll(".card");
let prompt = document.querySelector(".promptBox");
let submit = document.querySelector(".button");
// let name = prompt("Prompt In: ");
let name;
const randomColor = () => {
  const r = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);
  const g = Math.floor(Math.random() * 200);
  return `rgb(${r},${g},${b})`;
};

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

function formatter(name, cursor, backgroundColor, element) {
  element.innerHTML = name;
  element.style.cursor = cursor;
  element.style.backgroundColor = backgroundColor;
  console.log(backgroundColor);
}

function eventlistener(element) {
  element.addEventListener("click", () => {
    prompt.classList.remove("hidden");

    cards = document.querySelectorAll(".card");
    cards.forEach((entry) => {
      // formatter(name, "default", randomColor(), entry);
      observer.observe(entry);
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    // console.log(entries);
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
      formatter(name, "default", randomColor(), card);
    } else {
      formatter("Write here!!!", "pointer", "#fff", card);
      eventlistener(card);
    }
    observer.observe(card);
    document.querySelector(".container").appendChild(card);
  }
}
lastCardObserver.observe(document.querySelector(".card:last-child"));

submit.addEventListener("click", () => {
  name = document.querySelector(".inputText").value;
  cards = document.querySelectorAll(".card");
  cards.forEach((entry) => {
    if (name) {
      formatter(name, "default", randomColor(), entry);
      observer.observe(entry);
    } else {
      eventlistener(entry);
      formatter("Write here!!!", "pointer", "#fff", entry);
    }
  });
  prompt.classList.add("hidden");
  console.log(name);
});

prompt.classList.remove("hidden");

cards.forEach((entry) => {
  if (name !== undefined) {
    formatter(name, "default", randomColor(), entry);
  } else {
    eventlistener(entry);
    formatter("Write here!!!", "pointer", "#fff", entry);
  }
  observer.observe(entry);
});

document.querySelector(".inputText").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    name = document.querySelector(".inputText").value;
    cards = document.querySelectorAll(".card");
    cards.forEach((entry) => {
      if (name) {
        formatter(name, "default", randomColor(), entry);
        observer.observe(entry);
      } else {
        eventlistener(entry);
        formatter("Write here!!!", "pointer", "#fff", entry);
      }
    });
    prompt.classList.add("hidden");
    console.log(name);
  }
});

document.querySelector(".inputText").addEventListener("blur", () => {
  name = document.querySelector(".inputText").value;
  cards = document.querySelectorAll(".card");
  cards.forEach((entry) => {
    if (name) {
      formatter(name, "default", randomColor(), entry);
      observer.observe(entry);
    } else {
      eventlistener(entry);
      formatter("Write here!!!", "pointer", "#fff", entry);
    }
  });
  prompt.classList.add("hidden");
  console.log(name);
});
