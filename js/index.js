/* Album Template
<tr>
  <td>ALBUM NAME HERE</td>
  <td>RELEASE DATE HERE</td>
  <td>ARTIST NAME HERE</td>
  <td>GENRE HERE</td>
  <td>AVERAGE RATING HERE</td>
  <td>NUMBER OF RATINGS HERE</td>
</tr> 
*/

const searchInput = document.querySelector("#search-input");
const minAlbumRatingInput = document.querySelector("#min-album-rating-input");
const albumSearchForm = document.querySelector("#album-search-form");
const invalidTitle = document.querySelector("#invalid-title");

searchInput.addEventListener("input", onHandleAlbumSearchInput);
minAlbumRatingInput.addEventListener("change", onHandleMinAlbumRatingInput);
albumSearchForm.addEventListener("submit", onSearchAlbum);

const albumRows = document.querySelector("#album-rows");
const url = "public/data/albums.json";

//fetch album data
async function fetchAlbumData() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("No data found");
    }
    const data = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}
//create data backup
const albumStore = await fetchAlbumData();

async function renderAlbumsData() {
  try {
    albumStore.forEach((album) => {
      const albumtemplate = `
        <tr>
          <td>${album.album}</td>
          <td>${album.releaseDate}</td>
          <td>${album.artistName}</td>
          <td>${album.genres}</td>
          <td>${album.averageRating}</td>
          <td>${album.numberRatings}</td>
        </tr> `;
      albumRows.innerHTML += albumtemplate;
    });
  } catch (error) {
    throw error;
  }
}

function onHandleAlbumSearchInput() {
  const albumName = searchInput.value.trim();

  if (albumName.length === 0) {
    invalidTitle.classList.add("d-flex");
  } else {
    invalidTitle.classList.remove("d-flex");
    console.log(albumName);
    return albumName;
  }
}

function onHandleMinAlbumRatingInput() {}

function onSearchAlbum(e) {
  e.preventDefault();
  isSuccess();
}

function appinit() {
  renderAlbumsData();
}

appinit();

//search for the provided album title
function searchAlbum(albumTitle) {
  const newAlbumStore = { ...albumStore };
  const searchAlbumTitle = albumTitle.toLowerCase();

  //Create an array to store the results
  let foundAlbum = null;

  newAlbumStore.forEach((album) => {
    if (album.album.toLowerCase().includes(searchAlbumTitle)) {
      foundAlbum = album;
      return;
    }
  });
  return foundAlbum;
}

function isSuccess() {
  const isTitleValid = onHandleAlbumSearchInput();
  return isTitleValid;
}
