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
/* 
const searchInput = document.querySelector("#search-input");
const minAlbumRatingInput = document.querySelector("#min-album-rating-input");
const albumSearchForm = document.querySelector("#album-search-form");
const invalidTitle = document.querySelector("#invalid-title");
const invalidRating = document.querySelector("#invalid-rating");

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

    console.table(data);
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
    return albumName;
  }
}

function onHandleMinAlbumRatingInput() {
  const albumRating = minAlbumRatingInput.value.trim();

  if (albumRating < 0) {
    invalidRating.classList.add("d-flex");
  } else {
    invalidRating.classList.remove("d-flex");
    console.log(albumRating);
    return albumRating;
  }
}

function onSearchAlbum(e) {
  e.preventDefault();
  isSuccess();
}

function appinit() {
  renderAlbumsData();
}
appinit();

//search for the album title/artist name with filter function
function searchAlbum(searchCriteria) {
  const query = searchCriteria.toLowerCase();

  const results = albumStore.filter((album) => {
    if (album.album.toLowerCase().includes(query)) {
      return album;
    }
    if (album.artistName.toLowerCase().includes(query)) {
      return album;
    }
  });
  return results;
}

//Search for the rating with filter function
function searchRating(ratingScore) {
  const query = ratingScore.toString();

  const results = albumStore.filter((rating) => {
    if (rating.averageRating.toString().includes(query)) {
      return;
    }
  });
  return results;
}

function renderAlbumSearch(searchCriteria) {
  try {
    albumRows.innerHTML = "";

    if (searchCriteria.length > 0) {
      searchCriteria.forEach((album) => {
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
    } else {
      // Handle case when no albums are found
    }
  } catch (error) {
    console.error(error);
  }
}

function isSuccess() {
  const isValidTitle = onHandleAlbumSearchInput();
  const searchAlbumCriteria = searchAlbum(isValidTitle);

  const isValidRating = onHandleMinAlbumRatingInput();
  const searchRatingCiteria = searchRating(isValidRating);

  if (!isValidTitle && isValidRating) {
    renderAlbumSearch(searchRatingCiteria);
  }
  if (isValidTitle && !isValidRating) {
    renderAlbumSearch(searchAlbumCriteria);
  }
  if (!isValidTitle && !isValidRating) {
    //display error message
  }
  if (isValidTitle && isValidRating) {
    const filterByAlbumAndRating = searchAlbumCriteria.filter((album) => {
      //find out if the album criteria matches the rating criteria
      return searchRatingCiteria.some((rating) => rating.album === album.album);
    });

    renderAlbumSearch(filterByAlbumAndRating);
  }

  return isValidTitle, isValidRating;
}
 */

const searchInput = document.querySelector("#search-input");
const minAlbumRatingInput = document.querySelector("#min-album-rating-input");
const albumSearchForm = document.querySelector("#album-search-form");
const invalidTitle = document.querySelector("#invalid-title");
const invalidRating = document.querySelector("#invalid-rating");

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

    console.table(data);
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
renderAlbumsData();

//validation
/* function validateAlbumInput() {
  const albumTitle = albumInput.value.toLowerCase().trim();
  const albumRating = albumRatingInput.value.trim();

  if (albumTitle === "" && (isNaN(albumRating) || albumRating === "")) {
    invalidTitle.classList.add("d-flex");
    invalidRating.classList.add("d-flex");

    console.log("title: ", albumTitle, "Rating: ", albumRating);
  }
  if (albumTitle === "" && albumRating) {
    invalidRating.classList.remove("d-flex");
    invalidTitle.classList.remove("d-flex");

    console.log("title: ", albumTitle, "Rating: ", albumRating);
    return albumRating;
  }
  if (albumTitle && albumRating === "") {
    invalidRating.classList.remove("d-flex");
    invalidTitle.classList.remove("d-flex");

    console.log("title: ", albumTitle, "Rating: ", albumRating);
    return albumTitle;
  }
}
 */

function onHandleAlbumSearchInput() {
  if (!searchInput.value.trim()) {
    invalidTitle.classList.add("d-flex");
  }
  if (searchInput.value.trim()) {
    invalidTitle.classList.remove("d-flex");
    return searchInput.value.trim();
  }
}

function onHandleMinAlbumRatingInput() {
  const albumRating = minAlbumRatingInput.value.trim();

  if (!albumRating) {
    invalidRating.classList.add("d-flex");
  } else {
    invalidRating.classList.remove("d-flex");
    invalidTitle.classList.remove("d-flex");
    return albumRating;
  }
}

function onSearchAlbum(e) {
  e.preventDefault();
  isSuccess();
}

//search for the album title/artist name with filter function
function searchAlbumOrArtist(searchCriteria) {
  if (!searchCriteria) {
    return [];
  }
  const query = searchCriteria.toLowerCase();

  const results = albumStore.filter((album) => {
    if (album.album.toLowerCase().includes(query)) {
      return album;
    }
    if (album.artistName.toLowerCase().includes(query)) {
      return album;
    }
  });
  return results;
}

//Search for the rating with filter function
function searchAlbumByRating(searchCriteria) {
  const query = searchCriteria.toString();

  const results = albumStore.filter((album) => {
    return album.averageRating.toString().includes(query);
  });

  return results;
}

function renderAlbumSearch(searchedAlbums) {
  try {
    albumRows.innerHTML = "";

    if (searchedAlbums.length > 0) {
      searchedAlbums.forEach((album) => {
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
    } else {
      // Handle case when no albums are found
    }
  } catch (error) {
    console.error(error);
  }
}

function isSuccess() {
  try {
    const isValidTitle = onHandleAlbumSearchInput();
    const searchAlbumCriteria = searchAlbumOrArtist(isValidTitle);

    const isValidRating = onHandleMinAlbumRatingInput();
    //const searchRatingCriteria = searchRating(isValidRating);

    const searchToRender = "";

    if (isValidTitle) {
      renderAlbumSearch(searchAlbumCriteria);
    }

    /*  const searchToRender = isValidTitle
      ? searchAlbumCriteria
      : searchRatingCriteria;
    renderAlbumSearch(searchToRender); */

    /* if (isValidTitle && !isValidRating) {
      renderAlbumSearch(searchAlbumCriteria);
    } */
  } catch (error) {
    console.log(error);
  }
}
