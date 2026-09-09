const movies = [
  {
    id: 1,
    title: "Interestelar",
    genre: "Ciencia ficción",
    year: 2014,
    rating: 4.8,
    director: "Christopher Nolan",
    poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
    synopsis:
      "Un equipo de exploradores atraviesa un agujero de gusano en busca de un nuevo hogar para la humanidad."
  },
  {
    id: 2,
    title: "Spider-Man: Homecoming",
    genre: "Acción",
    year: 2017,
    rating: 4.6,
    director: "Jon Watts",
    poster: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80",
    synopsis:
      "Peter Parker intenta equilibrar su vida escolar y sus responsabilidades como superhéroe."
  },
  {
    id: 3,
    title: "Toy Story",
    genre: "Animación",
    year: 1995,
    rating: 4.5,
    director: "John Lasseter",
    poster: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
    synopsis:
      "La amistad entre Woody y Buzz se pone a prueba cuando llega un nuevo juguete a la habitación."
  },
  {
    id: 4,
    title: "The Conjuring",
    genre: "Terror",
    year: 2013,
    rating: 4.7,
    director: "James Wan",
    poster: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    synopsis:
      "Dos investigadores paranormales reciben una llamada sobre una familia atormentada por fuerzas oscuras."
  },
  {
    id: 5,
    title: "La La Land",
    genre: "Comedia",
    year: 2016,
    rating: 4.4,
    director: "Damien Chazelle",
    poster: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80",
    synopsis:
      "Una pianista y un músico de jazz se conocen y empiezan una historia de amor llena de sueños."
  },
  {
    id: 6,
    title: "Dune",
    genre: "Ciencia ficción",
    year: 2021,
    rating: 4.8,
    director: "Denis Villeneuve",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    synopsis:
      "En un futuro lejano, un joven noble hereda una misión peligrosa en un planeta desértico."
  },
  {
    id: 7,
    title: "Shrek",
    genre: "Animación",
    year: 2001,
    rating: 4.3,
    director: "Andrew Adamson",
    poster: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
    synopsis:
      "Un ogro solitario debe rescatar a una princesa y aprender que la apariencia no define a una persona."
  },
  {
    id: 8,
    title: "Mad Max: Fury Road",
    genre: "Acción",
    year: 2015,
    rating: 4.7,
    director: "George Miller",
    poster: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=800&q=80",
    synopsis:
      "En un mundo postapocalíptico, Max y Furiosa luchan por sobrevivir en una carrera frenética."
  }
];

let selectedGenre = "all";
let searchText = "";
let favorites = new Set();

const movieList = document.getElementById("movieList");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const modal = document.getElementById("movieModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");
const themeToggle = document.getElementById("themeToggle");

function renderMovies() {
  const filteredMovies = movies.filter((movie) => {
    const matchesGenre =
      selectedGenre === "all" || movie.genre === selectedGenre;

    const matchesSearch =
      movie.title.toLowerCase().includes(searchText.toLowerCase());

    return matchesGenre && matchesSearch;
  });

  if (filteredMovies.length === 0) {
    movieList.innerHTML = `
      <div class="movie-card" style="padding: 24px; grid-column: 1 / -1;">
        <h3>No se encontraron películas</h3>
      </div>
    `;
    return;
  }

  movieList.innerHTML = filteredMovies
    .map((movie) => {
      const isFavorite = favorites.has(movie.id);
      return `
        <article class="movie-card">
          <img class="movie-poster" src="${movie.poster}" alt="${movie.title}" />
          <div class="movie-info">
            <div class="movie-top">
              <h3 class="movie-title">${movie.title}</h3>
              <button
                class="favorite-btn"
                type="button"
                data-id="${movie.id}"
                aria-label="Agregar a favoritos"
              >
                ${isFavorite ? "⭐" : "☆"}
              </button>
            </div>

            <div class="meta">
              <span>${movie.genre}</span>
              <span>${movie.year}</span>
            </div>

            <div class="rating">⭐ ${movie.rating}</div>

            <button class="details-btn" type="button" data-id="${movie.id}">
              Ver detalles
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function openModal(movie) {
  modalBody.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}" />
    <div>
      <h2>${movie.title}</h2>
      <p><strong>Género:</strong> ${movie.genre}</p>
      <p><strong>Año:</strong> ${movie.year}</p>
      <p><strong>Director:</strong> ${movie.director}</p>
      <p><strong>Calificación:</strong> ⭐ ${movie.rating}</p>
      <p>${movie.synopsis}</p>
    </div>
  `;

  modal.classList.remove("hidden");
}

function closeMovieModal() {
  modal.classList.add("hidden");
}

searchInput.addEventListener("input", (event) => {
  searchText = event.target.value.trim();
  renderMovies();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedGenre = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderMovies();
  });
});

movieList.addEventListener("click", (event) => {
  const favoriteButton = event.target.closest(".favorite-btn");
  const detailsButton = event.target.closest(".details-btn");

  if (favoriteButton) {
    const movieId = Number(favoriteButton.dataset.id);

    if (favorites.has(movieId)) {
      favorites.delete(movieId);
    } else {
      favorites.add(movieId);
    }

    renderMovies();
    return;
  }

  if (detailsButton) {
    const movieId = Number(detailsButton.dataset.id);
    const movie = movies.find((item) => item.id === movieId);
    if (movie) openModal(movie);
  }
});

closeModal.addEventListener("click", closeMovieModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeMovieModal();
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeToggle.textContent = isLight ? "🌞" : "🌙";
});

renderMovies();