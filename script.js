"use strict";

/* Global Variables */
const messageInputBox = document.getElementById("message");
const python = document.getElementById("pythonBox");
const html = document.getElementById("htmlBox");

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
/* End of Functions */

/* Event Listeners */
document.getElementById("logo").addEventListener("click", () => {
  window.location.href = "#page-top";
});

const avatarBtn = document.getElementById("avatar");
const githubProfileBtn = document.getElementById("githubProfileBtn");

[avatarBtn, githubProfileBtn].forEach((el) => {
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

    document
      .getElementById("confirmMail")
      .querySelector(".modal-body").textContent = confirmationMessage[reason];
    confirmMail.show();

    document
      .getElementById("confirmSendBtn")
      .addEventListener("click", function () {
        confirmMail.hide();
        alert(confirmedMessage[reason]);
      });
  }
});

const socialMediaButtons = document.getElementsByClassName("social-media");
Array.from(socialMediaButtons).forEach((el) =>
  el.addEventListener("click", () =>
    new bootstrap.Modal(document.getElementById("socialMediaModal")).show()
  )
);

const btnCheckElements = document.getElementsByClassName("btn-check");
Array.from(btnCheckElements).forEach((el) => {
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

window.addEventListener("DOMContentLoaded", () => {
  const pythonItems = document.getElementById("pythonItems");
  const htmlItems = document.getElementById("pagesItems");

  // Convert HTMLCollection to an array and then use forEach
  Array.from(pythonItems.getElementsByClassName("card-container")).forEach(
    (el) => addCardAnimation(el, el.getElementsByClassName("card")[0])
  );

  Array.from(htmlItems.getElementsByClassName("card-container")).forEach((el) =>
    addCardAnimation(el, el.getElementsByClassName("card")[0])
  );
});
/* End of Event Listeners */
