"use strict";

const webpageList = document.getElementById("webpage-list");

async function fetchJsonObject(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    const jsonData = await response.text();
    return JSON.parse(jsonData);
  } catch (error) {
    return {};
  }
}

(async function () {
  const dict = await fetchJsonObject(
    "https://itzpremsingh.github.io/website/pages.json"
  );

  for (const key in dict) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
          <h3>${key}</h3>
          <p>${dict[key]["description"]}</p>
          <a href="https://itzpremsingh.github.io/${dict[key]["repository"]}/" target="_blank">View Project</a>
      `;
    webpageList.appendChild(card);
  }
})();
