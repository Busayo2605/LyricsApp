const form = document.querySelector(".search-form");
const search_btn = document.querySelector(".search-btn");
const search = document.querySelector("#search-input");
const results = document.querySelector(".results");

const Api = "https://api.lyrics.ovh";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let searchValue = search.value;

  if (!searchValue) {
    alert("Nothing to search!!!!");
  } else {
    Search(searchValue);
  }
});

async function Search(searchValue) {
  const s = await fetch(`${Api}/suggest/${searchValue}`);
  const data = await s.json().then();

  console.log(data);
  displayData(data);
}

function displayData(data) {
  results.innerHTML = `

  <ul>
  ${data.data.map(
    (song) => `
  <li>
      <div>
      <strong>${song.artist.name}</strong> - ${song.title}
      </div>
      <span data-artist=${song.artist.name}  data-songtitle=${song.title}>
      Get Lyrics
      </span>
  </li>
  
  `
  )}
  </ul>
  `;
}

results.addEventListener("click", (e) => {
  const clickedEle = e.target;

  if (clickedEle.tagName === "SPAN") {
    const artist = clickedEle.getAttribute("data-artist");
    const songTitle = clickedEle.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});

async function getLyrics(artist, songTitle) {
  const res = await fetch(`${Api}/v1/${artist}/${songTitle}`);

  const data = await res.json();
  console.log(data);
}
