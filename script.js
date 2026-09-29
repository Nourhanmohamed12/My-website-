/* ============================================================
   TYPING EFFECT
   ============================================================ */

const texts = [
  "Data Scientist ",
  "Python Developer ",
  "Data Engineer "
];

let index = 0;
let charIndex = 0;

let currentText = "";

let isDeleting = false;


function typeEffect() {

  const element =
    document.getElementById("typed-text");


  if (!element) {
    return;
  }


  if (index >= texts.length) {
    index = 0;
  }


  currentText = texts[index];


  /* Typing */

  if (!isDeleting) {

    element.textContent =
      currentText.substring(
        0,
        charIndex
      );

    charIndex++;

  }


  /* Deleting */

  else {

    element.textContent =
      currentText.substring(
        0,
        charIndex
      );

    charIndex--;

  }


  /* Finished typing */

  if (
    !isDeleting &&
    charIndex === currentText.length
  ) {

    isDeleting = true;

    setTimeout(
      typeEffect,
      1000
    );

    return;
  }


  /* Finished deleting */

  if (
    isDeleting &&
    charIndex === 0
  ) {

    isDeleting = false;

    index++;

  }


  const speed =
    isDeleting
      ? 50
      : 100;


  setTimeout(
    typeEffect,
    speed
  );

}


typeEffect();



/* ============================================================
   SCROLL REVEAL ANIMATION
   ============================================================ */

const hiddenElements =
  document.querySelectorAll(".hidden");


const observer =
  new IntersectionObserver(

    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "show"
            );

          }

        }
      );

    }

  );


hiddenElements.forEach(
  (el) => {

    observer.observe(el);

  }
);



/* ============================================================
   BUTTON RIPPLE EFFECT
   ============================================================ */

document
  .querySelectorAll(".btn")
  .forEach(

    (button) => {

      button.addEventListener(
        "click",
        function (e) {

          const circle =
            document.createElement(
              "span"
            );


          circle.classList.add(
            "ripple"
          );


          const rect =
            button.getBoundingClientRect();


          circle.style.left =
            `${e.clientX - rect.left}px`;


          circle.style.top =
            `${e.clientY - rect.top}px`;


          this.appendChild(
            circle
          );


          setTimeout(
            () => {

              circle.remove();

            },
            600
          );

        }
      );

    }

  );



/* ============================================================
   NAVBAR ACTIVE SECTION
   ============================================================ */

const navLinks =
  document.querySelectorAll(
    ".nav-links a"
  );


const sections =
  document.querySelectorAll(
    "section[id]"
  );


const spy =
  new IntersectionObserver(

    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            navLinks.forEach(
              (link) => {

                link.classList.toggle(

                  "active",

                  link.getAttribute(
                    "href"
                  ) ===
                  "#" +
                  entry.target.id

                );

              }
            );

          }

        }
      );

    },

    {
      rootMargin:
        "-45% 0px -50% 0px"
    }

  );


sections.forEach(
  (section) => {

    spy.observe(section);

  }
);
