"use strict";

const fs = require('fs');

const jsonData = fs.readFileSync('pages.json', 'utf8');
const jsonObject = JSON.parse(jsonData);

const webpageList = document.getElementById("webpage-list");

for (const [name, { repository, description }] of Object.entries(dict)) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
        <h3>${name}</h3>
        <p>${description}</p>
        <a href="https://itzpremsingh.github.io/${repository}/" target="_blank">View Project</a>
    `;
  webpageList.appendChild(card);
}
