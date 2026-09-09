const imagenes = [
    "img/paisaje-1.jpg",
    "img/paisaje-2.jpg",
    "img/paisaje-3.jpg",
    "img/paisaje-4.jpg",
    "img/paisaje-5.jpg",
    "img/paisaje-6.jpg"
];

let posicion = 0;

const imagenBanner = document.getElementById("imagen-banner");
const contador = document.getElementById("contador");
const botonAnterior = document.getElementById("anterior");
const botonSiguiente = document.getElementById("siguiente");

function mostrarImagen() {
    imagenBanner.src = imagenes[posicion];
    imagenBanner.alt = "Paisaje " + (posicion + 1);
    contador.textContent = (posicion + 1) + "/" + imagenes.length;
}

function cambiarImagen(paso) {
    posicion = posicion + paso;

    if (posicion >= imagenes.length) {
        posicion = 0;
    }

    if (posicion < 0) {
        posicion = imagenes.length - 1;
    }

    mostrarImagen();
}

botonAnterior.onclick = function () {
    cambiarImagen(-1);
};

botonSiguiente.onclick = function () {
    cambiarImagen(1);
};



const botonesMenu = document.querySelectorAll(".boton-menu");

function mostrarSubmenu(boton, abrir) {
    const idSubmenu = boton.getAttribute("aria-controls");
    const submenu = document.getElementById(idSubmenu);

    if (!submenu) return;

    submenu.hidden = !abrir;
    boton.setAttribute("aria-expanded", abrir);
}

function cerrarSubmenus() {
    for (const boton of botonesMenu) {
        mostrarSubmenu(boton, false);
    }
}

for (const boton of botonesMenu) {
    boton.addEventListener("click", function () {
        const abierto = boton.getAttribute("aria-expanded") === "true";

        cerrarSubmenus();
        mostrarSubmenu(boton, !abierto);
    });
}

mostrarImagen();