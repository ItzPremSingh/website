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

  const pagesModalTemplate = document.createElement("div");
  pagesModalTemplate.classList.add("pages-modal", "modal", "fade");
  pagesModalTemplate.id = "pagesModal1";
  pagesModalTemplate.tabIndex = "-1";
  pagesModalTemplate.setAttribute("aria-labelledby", "pagesModal1");
  pagesModalTemplate.setAttribute("aria-hidden", "true");
  const pagesModalDialog = document.createElement("div");
  pagesModalDialog.classList.add("modal-dialog", "modal-xl");
  const pagesModalContent = document.createElement("div");
  pagesModalContent.classList.add("modal-content");
  const pagesModalHeader = document.createElement("div");
  pagesModalHeader.classList.add("modal-header", "border-0");
  const closeButton = document.createElement("button");
  closeButton.classList.add("btn-close");
  closeButton.type = "button";
  closeButton.setAttribute("data-bs-dismiss", "modal");
  closeButton.setAttribute("aria-label", "Close");
  pagesModalHeader.appendChild(closeButton);
  const pagesModalBody = document.createElement("div");
  pagesModalBody.classList.add("modal-body", "text-center", "pb-5");
  const pagesModalContainer = document.createElement("div");
  pagesModalContainer.classList.add("container");
  const pagesModalRow = document.createElement("div");
  pagesModalRow.classList.add("row", "justify-content-center");
  const pagesModalCol = document.createElement("div");
  pagesModalCol.classList.add("col-lg-8");
  const pagesModalTitle = document.createElement("h2");
  pagesModalTitle.classList.add(
    "pages-modal-title",
    "text-secondary",
    "text-uppercase",
    "mb-0"
  );
  const dividerCustom = document.createElement("div");
  dividerCustom.classList.add("divider-custom");
  const dividerCustomLine1 = document.createElement("div");
  dividerCustomLine1.classList.add("divider-custom-line");
  const dividerCustomIcon = document.createElement("div");
  dividerCustomIcon.classList.add("divider-custom-icon");
  const iElement = document.createElement("i");
  iElement.classList.add("fas", "fa-star");
  dividerCustomIcon.appendChild(iElement);
  const dividerCustomLine2 = document.createElement("div");
  dividerCustomLine2.classList.add("divider-custom-line");
  dividerCustom.appendChild(dividerCustomLine1);
  dividerCustom.appendChild(dividerCustomIcon);
  dividerCustom.appendChild(dividerCustomLine2);
  const pagesModalImage = document.createElement("img");
  pagesModalImage.classList.add("img-fluid", "rounded", "mb-5");
  pagesModalImage.alt = "...";
  const pagesModalText = document.createElement("p");
  pagesModalText.classList.add("mb-4");

  pagesModalCol.appendChild(pagesModalTitle);
  pagesModalCol.appendChild(dividerCustom);
  pagesModalCol.appendChild(pagesModalImage);
  pagesModalCol.appendChild(pagesModalText);
  pagesModalRow.appendChild(pagesModalCol);
  pagesModalContainer.appendChild(pagesModalRow);
  pagesModalBody.appendChild(pagesModalContainer);
  pagesModalContent.appendChild(pagesModalHeader);
  pagesModalContent.appendChild(pagesModalBody);
  pagesModalDialog.appendChild(pagesModalContent);
  pagesModalTemplate.appendChild(pagesModalDialog);
  document.body.appendChild(pagesModalTemplate);

  const createPageModal = (key, page) => {
    const pagesModalTemplate2 = pagesModalTemplate.cloneNode(true);
    pagesModalTemplate2.id = `pagesModal${page.repository}`;
    pagesModalTemplate2.querySelector(".pages-modal-title").textContent = key;
    pagesModalTemplate2.querySelector(".img-fluid").src = page.image
      ? `assets/img/pages/${page.image}`
      : "assets/img/pages/game.png";
    const pagesModalText = pagesModalTemplate2.querySelector(".mb-4");
    pagesModalText.textContent = page.description;
    pagesModalText.style.color = "black";

    const newPagesModalCol = document.createElement("div");
    newPagesModalCol.classList.add("col-lg-8");

    const linkButton = document.createElement("a");
    linkButton.classList.add("btn", "btn-primary");
    linkButton.href = `https://itzpremsingh.github.io/${page.repository}`;
    linkButton.target = "_blank";
    linkButton.textContent = "Open Website";

    newPagesModalCol.appendChild(linkButton);

    const pagesModalBody = pagesModalTemplate2.querySelector(".modal-body");
    const pagesModalContainer = pagesModalBody.querySelector(".container");
    const pagesModalRow = pagesModalContainer.querySelector(".row");
    pagesModalRow.appendChild(newPagesModalCol);

    document.body.appendChild(pagesModalTemplate2);
  };

  const createPageItem = (key, page) => {
    const pagesItem = document.createElement("div");
    pagesItem.classList.add("col-md-6", "col-lg-4", "mb-5");
    const pagesItemInner = document.createElement("div");
    pagesItemInner.classList.add("pages-item", "mx-auto");
    pagesItemInner.setAttribute("data-bs-toggle", "modal");
    pagesItemInner.setAttribute(
      "data-bs-target",
      `#pagesModal${page.repository}`
    );

    const pagesItemCaption = document.createElement("div");
    pagesItemCaption.classList.add(
      "pages-item-caption",
      "d-flex",
      "align-items-center",
      "justify-content-center",
      "h-100",
      "w-100"
    );

    const pagesItemCaptionContent = document.createElement("div");
    pagesItemCaptionContent.classList.add(
      "pages-item-caption-content",
      "text-center",
      "text-white"
    );

    const pElement = document.createElement("p");
    pElement.textContent = key;
    pagesItemCaptionContent.appendChild(pElement);
    pagesItemCaption.appendChild(pagesItemCaptionContent);
    pagesItemInner.appendChild(pagesItemCaption);

    const imgElement = document.createElement("img");
    imgElement.classList.add("img-fluid");
    imgElement.src = page.image
      ? `assets/img/pages/${page.image}`
      : "assets/img/pages/game.png";
    pagesItemInner.appendChild(imgElement);

    pagesItem.appendChild(pagesItemInner);
    return pagesItem;
  };

  fetch("https://itzpremsingh.github.io/website/pages.json")
    .then((res) => res.text())
    .then((data) => {
      const pagesDictFromJson = JSON.parse(data);
      Object.keys(pagesDictFromJson).forEach((key) => {
        const page = pagesDictFromJson[key];
        createPageModal(key, page);
        pagesItems.appendChild(createPageItem(key, page));
      });
    });
});
