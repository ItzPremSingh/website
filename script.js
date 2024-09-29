"use strict";

const webpageList = document.getElementById("webpage-list");

async function fetchJsonObject(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const jsonData = await response.text(); 
        return jsonData; 
    } catch (error) {
        return null; 
    }
}

// (async function() {
//   const dict = await fetchJsonObject("https://itzpremsingh.github.io/website/pages.json");

//     console.log(dict);
  
//   for (const [name, { repository, description }] of Object.entries(dict)) {
//     const card = document.createElement("div");
//     card.className = "card";
//     card.innerHTML = `
//           <h3>${name}</h3>
//           <p>${description}</p>
//           <a href="/${repository}/" target="_blank">View Project</a>
//       `;
//     webpageList.appendChild(card);
//   }
// })();

(async function() {
const dict = await fetchJsonObject("https://itzpremsingh.github.io/website/pages.json");
console.log("Fetched data:", dict);
})();
 //         <a href="https://itzpremsingh.github.io/${repository}/" target="_blank">View Project</a>
