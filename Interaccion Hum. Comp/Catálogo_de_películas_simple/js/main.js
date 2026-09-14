var peliculas = [
  {
    id: 1,
    titulo: "Interestelar",
    genero: "Ciencia ficción",
    anio: 2014,
    calificacion: 4.8,
    director: "Christopher Nolan",
    poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
    sinopsis: "Un equipo de exploradores atraviesa un agujero de gusano en busca de un nuevo hogar para la humanidad."
  },
  {
    id: 2,
    titulo: "Spider-Man: Homecoming",
    genero: "Acción",
    anio: 2017,
    calificacion: 4.6,
    director: "Jon Watts",
    poster: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80",
    sinopsis: "Peter Parker intenta equilibrar su vida escolar y sus responsabilidades como superhéroe."
  },
  {
    id: 3,
    titulo: "Toy Story",
    genero: "Animación",
    anio: 1995,
    calificacion: 4.5,
    director: "John Lasseter",
    poster: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
    sinopsis: "La amistad entre Woody y Buzz se pone a prueba cuando llega un nuevo juguete a la habitación."
  },
  {
    id: 4,
    titulo: "The Conjuring",
    genero: "Terror",
    anio: 2013,
    calificacion: 4.7,
    director: "James Wan",
    poster: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    sinopsis: "Dos investigadores paranormales reciben una llamada sobre una familia atormentada por fuerzas oscuras."
  },
  {
    id: 5,
    titulo: "La La Land",
    genero: "Comedia",
    anio: 2016,
    calificacion: 4.4,
    director: "Damien Chazelle",
    poster: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80",
    sinopsis: "Una pianista y un músico de jazz se conocen y empiezan una historia de amor llena de sueños."
  },
  {
    id: 6,
    titulo: "Dune",
    genero: "Ciencia ficción",
    anio: 2021,
    calificacion: 4.8,
    director: "Denis Villeneuve",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    sinopsis: "En un futuro lejano, un joven noble hereda una misión peligrosa en un planeta desértico."
  },
  {
    id: 7,
    titulo: "Shrek",
    genero: "Animación",
    anio: 2001,
    calificacion: 4.3,
    director: "Andrew Adamson",
    poster: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
    sinopsis: "Un ogro solitario debe rescatar a una princesa y aprender que la apariencia no define a una persona."
  },
  {
    id: 8,
    titulo: "Mad Max: Fury Road",
    genero: "Acción",
    anio: 2015,
    calificacion: 4.7,
    director: "George Miller",
    poster: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=800&q=80",
    sinopsis: "En un mundo postapocalíptico, Max y Furiosa luchan por sobrevivir en una carrera frenética."
  }
];

var favoritos = [];
var generoActual = "todas";

function esFavorito(id) {
  var esta = false;
  for (var i = 0; i < favoritos.length; i++) {
    if (favoritos[i] === id) {
      esta = true;
    }
  }
  return esta;
}

function marcarFavorito(id) {
  if (esFavorito(id)) {
    var nuevaLista = [];
    for (var i = 0; i < favoritos.length; i++) {
      if (favoritos[i] !== id) {
        nuevaLista.push(favoritos[i]);
      }
    }
    favoritos = nuevaLista;
  } else {
    favoritos.push(id);
  }
  mostrarPeliculas();
}

function filtrarPorGenero(genero, boton) {
  generoActual = genero;

  var botones = document.getElementsByClassName("boton-filtro");
  for (var i = 0; i < botones.length; i++) {
    botones[i].classList.remove("activo");
  }
  boton.classList.add("activo");

  mostrarPeliculas();
}

function buscarPeliculas() {
  mostrarPeliculas();
}

function mostrarPeliculas() {
  var texto = document.getElementById("cajaBusqueda").value.toLowerCase();
  var contenedor = document.getElementById("listaPeliculas");
  var html = "";
  var hayResultados = false;

  for (var i = 0; i < peliculas.length; i++) {
    var pelicula = peliculas[i];

    var coincideGenero = generoActual === "todas" || pelicula.genero === generoActual;
    var coincideTexto = pelicula.titulo.toLowerCase().indexOf(texto) !== -1;

    if (coincideGenero && coincideTexto) {
      hayResultados = true;

      var estrella = "☆";
      if (esFavorito(pelicula.id)) {
        estrella = "⭐";
      }

      html += "<div class='tarjeta'>";
      html += "<img src='" + pelicula.poster + "' alt='" + pelicula.titulo + "'>";
      html += "<div class='info-tarjeta'>";
      html += "<button class='boton-favorito' onclick='marcarFavorito(" + pelicula.id + ")'>" + estrella + "</button>";
      html += "<h3>" + pelicula.titulo + "</h3>";
      html += "<p>" + pelicula.genero + " - " + pelicula.anio + "</p>";
      html += "<p>Calificación: " + pelicula.calificacion + "</p>";
      html += "<button class='boton-detalles' onclick='verDetalles(" + pelicula.id + ")'>Ver detalles</button>";
      html += "</div>";
      html += "</div>";
    }
  }

  if (hayResultados === false) {
    html = "<p>No se encontraron películas</p>";
  }

  contenedor.innerHTML = html;
}

function verDetalles(id) {
  var pelicula = null;

  for (var i = 0; i < peliculas.length; i++) {
    if (peliculas[i].id === id) {
      pelicula = peliculas[i];
    }
  }

  if (pelicula === null) {
    return;
  }

  var html = "";
  html += "<img src='" + pelicula.poster + "' alt='" + pelicula.titulo + "'>";
  html += "<h2>" + pelicula.titulo + "</h2>";
  html += "<p><strong>Género:</strong> " + pelicula.genero + "</p>";
  html += "<p><strong>Año:</strong> " + pelicula.anio + "</p>";
  html += "<p><strong>Director:</strong> " + pelicula.director + "</p>";
  html += "<p><strong>Calificación:</strong> " + pelicula.calificacion + "</p>";
  html += "<p>" + pelicula.sinopsis + "</p>";

  document.getElementById("contenidoDetalles").innerHTML = html;
  document.getElementById("ventanaDetalles").classList.remove("oculto");
}

function cerrarDetalles() {
  document.getElementById("ventanaDetalles").classList.add("oculto");
}

mostrarPeliculas();
