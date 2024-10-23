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
  .then((res) => res.json())
  .then((data) => {
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

document.querySelectorAll("#name, #message").forEach((input) => {
  input.addEventListener("input", () => {
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
    document.getElementById("emailButton").disabled = !(name && message);
  });
});
