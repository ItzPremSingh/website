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

    const createPageItem = (title, name) => {
        const repository = `https://itzpremsingh.github.io/HTML/${name}`;

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

        pagesItem.appendChild(cardDiv);
        return pagesItem;
    };

    fetch("https://api.github.com/repos/itzpremsingh/HTML/contents/")
        .then((res) => res.text())
        .then((data) => {
            const pagesDictFromJson = JSON.parse(data);

            for (const repository in pagesDictFromJson) {
                const { name } = pagesDictFromJson[repository];
                if ([".gitignore", "README.md", "index.html", ".github"].includes(name)) continue;
                const title = name
                    .split("-")
                    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
                    .join(" ");
                pagesItems.appendChild(createPageItem(title, name));
            };
        });
});

document.querySelectorAll("#name, #message").forEach((input) => {
    input.addEventListener("input", () => {
        const name = document.getElementById("name").value.trim();
        const message = document.getElementById("message").value.trim();
        document.getElementById("emailButton").disabled = !(name && message);
    });
});
