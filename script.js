window.addEventListener("DOMContentLoaded", (event) => {
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  navbarShrink();

  document.addEventListener("scroll", navbarShrink);

  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }

  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });

  const pages = document.getElementById("pages");
  const pagesContainer = pages.getElementsByClassName("container")[0];
  const pagesItems = pagesContainer.getElementsByClassName("row")[0];

  const createPageItem = (key, page) => {
    const pagesItem = document.createElement("div");
    pagesItem.classList.add("col-md-6", "col-lg-4", "mb-5");

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
    imgElement.src = `assets/img/pages/${page}.png`;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-center");

    const titleElement = document.createElement("h4");
    titleElement.classList.add("card-title", "text-dark", "mb-3");
    titleElement.textContent = key;

    const openButton = document.createElement("a");
    openButton.classList.add("btn", "btn-primary", "mt-2", "w-100");
    openButton.href = `https://itzpremsingh.github.io/${page}`;
    openButton.target = "_blank";
    openButton.textContent = "Open Page";

    cardBody.appendChild(titleElement);
    cardBody.appendChild(openButton);
    cardDiv.appendChild(imgElement);
    cardDiv.appendChild(cardBody);

    pagesItem.appendChild(cardDiv);
    return pagesItem;
  };

  fetch("https://itzpremsingh.github.io/website/pages.json")
    .then((res) => res.text())
    .then((data) => {
      const pagesDictFromJson = JSON.parse(data);
      Object.keys(pagesDictFromJson).forEach((key) => {
        const page = pagesDictFromJson[key];
        pagesItems.appendChild(createPageItem(key, page));
      });
    });
});

document.querySelectorAll("#name, #message").forEach((input) => {
  input.addEventListener("input", () => {
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
    document.getElementById("emailButton").disabled = !(name && message);
  });
});

function sendEmail() {
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  const subject = `Message from ${name}`;
  const body = message;

  const mailtoLink = `mailto:itzpremsingh@duck.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;
}
