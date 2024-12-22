"use strict";

/* Global Variables */
let mouseX = 0,
  mouseY = 0;

const messageInputBox = document.getElementById("message");

const customPointer = document.getElementById("customPointer");

const confirmationMessage = {
  Feedback: "Have you sended your feedback?",
  Question: "Have you asked your question?",
  Suggestion: "Have you suggested your suggestion?",
  "Bug report": "Have you reported the bug?",
  Other: "Have you sent your message?",
};

const confirmedMessage = {
  Feedback: "Thanks for your feedback! Your feedback is important to us.",
  Question: "Thanks for your question! We answer your question soon.",
  Suggestion: "Thanks for your suggestion! We implement your suggestion soon.",
  "Bug report": "Thanks for your bug report! We fix your bug soon.",
  Other: "Thanks for your message!",
};

/* End of Global Variables */

/* Functions */

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

  const openButton = document.createElement("div");
  openButton.classList.add("btn", "btn-primary", "mt-2", "w-100");
  openButton.textContent = "Open Page";

  openButton.addEventListener("click", () => {
    window.open(`${repository}/index.html`, "_blank");
  });

  cardBody.appendChild(titleElement);
  cardBody.appendChild(openButton);
  cardDiv.appendChild(imgElement);
  cardDiv.appendChild(cardBody);
  cardContainer.appendChild(cardDiv);

  const customPointer = document.createElement("div");
  customPointer.classList.add("custom-pointer");
  customPointer.id = "custom-pointer";
  cardContainer.appendChild(customPointer);

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

function savePageDetails(names) {
  sessionStorage.setItem("names", JSON.stringify(names));
}

function getPageDetails() {
  return JSON.parse(sessionStorage.getItem("names")) || [];
}
/* End of Functions */

/* Event Listeners */
document.getElementById("logo").addEventListener("click", () => {
  window.location.href = "#page-top";
});

document.querySelectorAll("#avatar, #githubProfileBtn").forEach((el) => {
  el.addEventListener("click", () => {
    window.open("https://github.com/itzpremsingh", "_blank");
  });
});

document.getElementById("sendEmailBtn").addEventListener("click", (event) => {
  document.getElementById("messageError").style.display = "none";
  document.getElementById("reasonError").style.display = "none";
  const reason = document.getElementById("reason").value;
  const message = document.getElementById("message").value;

  var isValid = true;

  if (message.trim() === "") {
    document.getElementById("messageError").style.display = "block";
    isValid = false;
  }
  if (reason === "") {
    document.getElementById("reasonError").style.display = "block";
    isValid = false;
  }

  if (isValid) {
    const subject = encodeURIComponent(`Reason: ${reason}`);
    const body = encodeURIComponent(message);
    window.open(`mailto:itzpremsingh@duck.com?subject=${subject}&body=${body}`);

    const confirmMail = new bootstrap.Modal(
      document.getElementById("confirmMail")
    );

    document.querySelector("#confirmMail .modal-body").textContent =
      confirmationMessage[reason];
    confirmMail.show();

    document
      .getElementById("confirmSendBtn")
      .addEventListener("click", function () {
        confirmMail.hide();
        alert(confirmedMessage[reason]);
      });
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const allPages = getPageDetails();
  if (allPages.length === 0) {
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
          allPages.push(name);
        });

        savePageDetails(allPages);
      })
      .catch((error) => console.error(error));
  } else {
    allPages.forEach((name) => {
      const title = name
        .split("-")
        .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
        .join(" ");
      pagesItems.appendChild(createPageItem(title, name));
    });
  }
});

document
  .querySelectorAll(".social-media")
  .forEach((el) =>
    el.addEventListener("click", () =>
      new bootstrap.Modal(document.getElementById("socialMediaModal")).show()
    )
  );

// document.addEventListener("mousemove", (event) => {
//   mouseX = event.clientX;
//   mouseY = event.clientY;

//   customPointer.style.left = `${mouseX}px`;
//   customPointer.style.top = `${mouseY}px`;

//   customPointer.style.transform = `translate(-50%, -50%) scale(1.1)`;
//   setTimeout(() => {
//     customPointer.style.transform = `translate(-50%, -50%) scale(1)`;
//   }, 50);
// });

// document.addEventListener("scroll", () => {
//   customPointer.style.left = `${mouseX}px`;
//   customPointer.style.top = `${mouseY}px`;
// });

// document.addEventListener("mouseenter", () => {
//   customPointer.style.display = "block";
// });

// document.addEventListener("mouseleave", () => {
//   customPointer.style.display = "none";
// });

/* End of Event Listeners */

const python = document.getElementById("pythonBox");
const html = document.getElementById("htmlBox");

document.querySelectorAll(".btn-check").forEach((el) => {
  el.addEventListener("change", () => {
    if (document.getElementById("python").checked) {
      html.style.display = "none";
      python.style.display = "block";
    } else {
      html.style.display = "block";
      python.style.display = "none";
    }
  });
});
