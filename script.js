"use strict";

function createPageItem(title, name) {
  const repository = `https://itzpremsingh.github.io/HTML/${name}`;

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container", "col-md-6", "col-lg-4", "mb-5");

  const cardDiv = document.createElement("div");
  cardDiv.classList.add(
    "card",
    "shadow-lg",
    "p-0",
    "bg-body",
    "rounded",
    "border-0"
  );

  const imgElement = document.createElement("img");
  imgElement.classList.add("card-img-top");
  imgElement.src = `${repository}/cover.png`;

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "text-center");

  const titleElement = document.createElement("h4");
  titleElement.classList.add("card-title", "text-dark", "mb-3");
  titleElement.textContent = title;

  const openButton = document.createElement("a");
  openButton.classList.add("btn", "btn-primary", "mt-2", "w-100");
  openButton.href = `${repository}/index.html`;
  openButton.target = "_blank";
  openButton.textContent = "Open Page";

  cardBody.appendChild(titleElement);
  cardBody.appendChild(openButton);
  cardDiv.appendChild(imgElement);
  cardDiv.appendChild(cardBody);
  cardContainer.appendChild(cardDiv);

  addCardAnimation(cardContainer, cardDiv);

  return cardContainer;
}

function loadPages() {
  const loadingDiv = document.createElement("div");
  loadingDiv.classList.add("d-flex", "justify-content-center");
  loadingDiv.id = "loading";
  pagesItems.appendChild(loadingDiv);

  const spinner = document.createElement("div");
  spinner.classList.add(
    "spinner-border",
    "text-primary",
    "mx-auto",
    "my-5",
    "d-block"
  );
  spinner.role = "status";
  loadingDiv.appendChild(spinner);

  const span = document.createElement("span");
  span.classList.add("visually-hidden");
  span.textContent = "Loading...";
  spinner.appendChild(span);
}

function validateForm() {
  const message = document.getElementById("message");
  document.getElementById("messageError").style.display = "none";

  if (message.value.trim() === "") {
    document.getElementById("messageError").innerText =
      "Message cannot be empty.";
    document.getElementById("messageError").style.display = "block";
  } else {
    const subject = encodeURIComponent("Feedback");
    const body = encodeURIComponent(message.value);
    window.open(`mailto:itzpremsingh@duck.com?subject=${subject}&body=${body}`);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadPages();
  fetch("https://api.github.com/repos/itzpremsingh/HTML/contents/")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("loading").remove();
      const directories = data
        .filter((item) => item.type === "dir" && !item.name.startsWith("."))
        .map((item) => item.name);
      directories.forEach((name) => {
        const title = name
          .split("-")
          .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
          .join(" ");
        pagesItems.appendChild(createPageItem(title, name));
      });
    })
    .catch((error) => console.error(error));
});

function addCardAnimation(container, card) {
  container.addEventListener("mousemove", (e) => {
    const { offsetWidth: width, offsetHeight: height } = card;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / height - 0.5) * 30;
    const rotateY = (x / width - 0.5) * -30;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  container.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
  });
}
