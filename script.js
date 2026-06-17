const texts = ["Data Scientist ", "Python Developer ", "Data Engineer "];
let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

function typeEffect() {
  const element = document.getElementById("typed-text");

  if (index >= texts.length) index = 0;

  currentText = texts[index];

  if (isDeleting) {
    element.textContent = currentText.substring(0, charIndex--);
  } else {
    element.textContent = currentText.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1000);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index++;
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();
const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

hiddenElements.forEach((el) => observer.observe(el));
document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", function (e) {
    let circle = document.createElement("span");
    circle.classList.add("ripple");

    const rect = button.getBoundingClientRect();
    circle.style.left = `${e.clientX - rect.left}px`;
    circle.style.top = `${e.clientY - rect.top}px`;

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 600);
  });
});
