"use strict";

/* Global Variables */
const socialMediaButtons = document.getElementsByClassName("social-media");
const btnCheckElements = document.getElementsByClassName("btn-check");
const messageInputBox = document.getElementById("message");
const quoteElement = document.getElementById("quote");
const python = document.getElementById("pythonBox");
const cursor = document.getElementById("cursor");
const html = document.getElementById("htmlBox");

const quoteText = quoteElement.innerText;
quoteElement.innerText = "";

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

Array.from(socialMediaButtons).forEach((el) =>
  el.addEventListener("click", () =>
    new bootstrap.Modal(document.getElementById("socialMediaModal")).show()
  )
);

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

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

Array.from(document.getElementsByClassName("card-container")).forEach(
  (card) => {
    card.addEventListener("mouseenter", () => {
      cursor.style.visibility = "visible";
      cursor.style.width = "50px";
      cursor.style.height = "50px";
    });

    card.addEventListener("mouseleave", () => {
      cursor.style.visibility = "hidden";
      cursor.style.width = "30px";
      cursor.style.height = "30px";
    });
  }
);

/* End of Event Listeners */

/* GSAP Animations */
gsap.registerPlugin(TextPlugin);

var stl = gsap.timeline();

stl.from("#logo", {
  y: -100,
  opacity: 0,
  duration: 0.7,
  delay: 0.5,
  ease: "back.out(1.7)",
  rotation: 45,
  scale: 0.5,
});

stl.from(".nav-link", {
  y: -100,
  opacity: 0,
  duration: 0.7,
  stagger: 0.2,
});

gsap.from("#menu", {
  opacity: 0,
  duration: 0.5,
  delay: 1,
  x: 100,
});

new IntersectionObserver(
  (entries, observer) => {
    if (entries[0].isIntersecting) {
      gsap.from("#name", {
        duration: 1.5,
        opacity: 0,
        delay: 0.2,
        y: 100,
        ease: "power3.out",
        scale: 0.5,
      });
      observer.unobserve(document.getElementById("name"));
    }
  },
  { rootMargin: "0px 0px 0px 0px", threshold: 1.0 }
).observe(document.getElementById("name"));

new IntersectionObserver(
  (entries, observer) => {
    if (entries[0].isIntersecting) {
      gsap.to("#quote", {
        duration: quoteText.length * 0.1,
        text: quoteText,
        ease: "none",
        onComplete: () => {
          quoteElement.classList.add("typing-complete");
        },
      });

      observer.unobserve(quoteElement);
    }
  },
  { rootMargin: "0px 0px 0px 0px", threshold: 1.0 }
).observe(document.getElementById("quote"));

new IntersectionObserver(
  (entries, observer) => {
    if (entries[0].isIntersecting) {
      gsap.from("#htmlLabel", {
        duration: 1.5,
        opacity: 0,
        delay: 0.2,
        x: -1000,
      });
      gsap.from("#pythonLabel", {
        duration: 1.5,
        opacity: 0,
        delay: 0.2,
        x: 1000,
      });
      observer.unobserve(document.getElementById("options"));
    }
  },
  { rootMargin: "0px 0px 0px 0px", threshold: 1.0 }
).observe(document.getElementById("options"));

/* GSAP Animations End */
