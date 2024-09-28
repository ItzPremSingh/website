"use strict";

const dict = {
  Table: {
    url: "https://itzpremsingh.github.io/table/",
    description: "Write table for the given number.",
  },
  Mines: {
    url: "https://itzpremsingh.github.io/mines/",
    description: "Game of mines and bomb.",
  },
};

const webpageList = document.getElementById("webpage-list");

for (const [name, { url, description }] of Object.entries(dict)) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
        <h3>${name}</h3>
        <p>${description}</p>
        <a href="${url}" target="_blank">View Project</a>
    `;
  webpageList.appendChild(card);
}
