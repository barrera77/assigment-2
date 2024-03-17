const albumInput = document.querySelector("#search-input");
const albumRatingInput = document.querySelector("#min-album-rating-input");
const albumSearchForm = document.querySelector("#album-search-form");
const invalidTitle = document.querySelector("#invalid-title");
const invalidRating = document.querySelector("#invalid-rating");
const messageContainer = document.querySelector("#message-container");

/* #region Bonus TASK 1*/
const averageRating = document.querySelector("#average-rating");
averageRating.addEventListener("click", onHandleAverageRatingFilter);

function onHandleAverageRatingFilter() {
  filterAlbums(averageRating.cellIndex, "number");
}

const minimumReviews = document.querySelector("#minimum-reviews");
minimumReviews.addEventListener("click", onHandleMinimumReviewsFilter);

function onHandleMinimumReviewsFilter() {
  filterAlbums(minimumReviews.cellIndex, "number");
}

// function to filter the rows
function filterAlbums(columnIndex, columnType) {
  let rowsArray = Array.from(albumRows.children);

  //Create comparision parameters
  let compare = function (rowA, rowB) {
    //get cell contents
    let rowAValue = rowA.cells[columnIndex].textContent;
    let rowBValue = rowB.cells[columnIndex].textContent;

    //If the cell value is a number
    if (columnType === "number") {
      return parseFloat(rowAValue) - parseFloat(rowBValue);
    }
    //if the cell value is a datee
    if (columnType === "date") {
      return Date.parse(rowAValue) - Date.parse(rowBValue);
    }
  };
  //Sort the albums
  rowsArray.sort(compare);

  //Clear the table
  albumRows.innerHTML = "";
  //Append the sorted rows to the table
  albumRows.append(...rowsArray);
}
/* #endregion Bonus TASK 1*/

/* #region  Bonus TASK 2 */
const releaseDate = document.querySelector("#release-date");
releaseDate.addEventListener("click", onHandleReleaseDateFilter);
function onHandleReleaseDateFilter() {
  filterAlbums(releaseDate.cellIndex, "date");
}
/* #endregion Bonus TASK 2*/

/* TASK #1 */
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

    console.table(data); //Log Data for verification purposes
    return data;
  } catch (error) {
    throw error;
  }
}

//create fetched data backup
const albumStore = await fetchAlbumData();

//Function to render the albums data
async function renderAlbumsData() {
  //Create a copy of the data store
  const albumStoreCopy = [...albumStore];
  try {
    albumStoreCopy.forEach((album) => {
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
renderAlbumsData(); //render albums data on init

/* TASK #2 */

//Add Event handlers
albumSearchForm.addEventListener("submit", onSubmitAlbumSearch);
albumInput.addEventListener("input", onHandleAlbumInput);
albumRatingInput.addEventListener("input", onHandleAlbumRatingInput);

function onSubmitAlbumSearch(e) {
  e.preventDefault();
  isSuccess();
}

//Validate values from input fields
function validateInputFields() {
  const albumTitle = albumInput.value.toLowerCase().trim();
  const albumRating = albumRatingInput.value.trim();

  if (albumTitle === "" && (isNaN(albumRating) || albumRating === "")) {
    invalidTitle.classList.add("d-flex");
    invalidRating.classList.add("d-flex");
  } else {
    invalidTitle.classList.remove("d-flex");
    invalidRating.classList.remove("d-flex");
  }

  return { albumTitle, albumRating };
}

//Handle warnings on input event
function onHandleAlbumInput() {
  if (albumInput.value) {
    invalidTitle.classList.remove("d-flex");
  }
}

function onHandleAlbumRatingInput() {
  const albumRating = albumRatingInput.value.trim();

  if (albumRating === "" || isNaN(albumRating)) {
    invalidRating.classList.add("d-flex");
  } else {
    invalidRating.classList.remove("d-flex");
  }
}

//search for the album title/artist name using filter function
function searchAlbumOrArtist(searchCriteria) {
  if (!searchCriteria) {
    return [];
  }
  const query = searchCriteria;

  const results = albumStore.filter((album) => {
    if (album.album.toLowerCase().includes(query)) {
      return album;
    }
    if (album.artistName.toLowerCase().includes(query)) {
      return album;
    }
  });
  if (results.length === 0) {
    displaySearchNullMessage();
  }
  return results;
}

//Search for the album rating using filter function
function searchAlbumByRating(searchCriteria) {
  const query = searchCriteria;

  if (query === "" || isNaN(query)) {
    return [];
  }

  const results = albumStore.filter((album) => {
    return album.averageRating.toString().includes(query);
  });

  if (results.length === 0) {
    displaySearchNullMessage();
  }
  return results;
}

//Render search results
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
    }
  } catch (error) {
    console.error(error);
  }
}

//SUCCESS!!!
function isSuccess() {
  const { albumTitle, albumRating } = validateInputFields();

  let albumResults = [];

  //filter only by album or artist
  if (albumTitle && !albumRating) {
    messageContainer.innerHTML = ""; //Clear null search msg if present

    albumResults = searchAlbumOrArtist(albumTitle);
    renderAlbumSearch(albumResults);
  }

  //filter only by album rating
  if (!albumTitle && albumRating) {
    messageContainer.innerHTML = ""; //Clear null search msg if present

    albumResults = searchAlbumByRating(albumRating);
    //renderAlbumSearch(ratingResults)
    renderAlbumSearch(albumResults);
  }

  /* fix filter using both criterias */

  //fiter by both album/artist & rating
  if (albumTitle && albumRating) {
    messageContainer.innerHTML = ""; //Clear null search msg if present

    albumResults = searchAlbumOrArtist(albumTitle);
    const ratingResults = searchAlbumByRating(albumRating);

    const filterByAlbumAndRating = albumResults.filter((album) => {
      //find out if the album criteria matches the rating criteria
      return ratingResults.some((rating) => rating.album === album.album);
    });

    renderAlbumSearch(filterByAlbumAndRating);
  }

  console.log("Search Criteria: ", albumTitle, albumRating);
  console.log(albumResults);
  console.log(ratingResults);
}

function displaySearchNullMessage() {
  const displayNullSearchMsg = `
          <div id="null-search-message" class="d-flex">
            <h1>No albums found!!</h1>
          </div>
          `;
  messageContainer.innerHTML = displayNullSearchMsg;
}
