// obtenemos el elemento dropzone
const dropzone = document.getElementById("dropzone");
const gridContainer = document.querySelector(".grid-container");

//creamos los botones
const expandBtn = document.createElement("button");
const dismissBtn = document.createElement("button");

//le agregamos contenido y su clase
expandBtn.textContent = "+";
expandBtn.classList.add("adj");
dismissBtn.textContent = "-";
dismissBtn.classList.add("adj");

let imgs = [];
let msj = false;

// funciones para manejar los eventos
const removeClass = (e) => {
  e.preventDefault();
  dropzone.classList.remove("dragover");
};

const handleDragLeave = (e) => removeClass(e);

const handleDragEnter = (e) => {
  e.preventDefault();
  dropzone.classList.add("dragover");
};

const btnDisplay = (buttons, val) =>
  buttons.forEach((btn) => (btn.style.display = val));

const handleDrop = (e) => {
  removeClass(e);
  // obtenemos la imagen del evento de drag and drop
  const file = e.dataTransfer.files[0];
  // creamos un objeto URL para la imagen
  const imageURL = URL.createObjectURL(file);
  // creamos un contenedor para la imagen
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");
  //creamos la imagen que ira dentro del contenedor y luego al gridContainer
  const image = document.createElement("img");

  image.src = imageURL;
  image.classList.add("img");

  imgContainer.appendChild(image);
  //guardamos la imagen en un array
  imgs.push(imgContainer);
  //se coloca la imagen en la pagina
  gridContainer.appendChild(imgContainer);
};

// agregamos escuchadores para los eventos de drag y drop
dropzone.addEventListener("dragenter", handleDragEnter);
dropzone.addEventListener("dragleave", handleDragLeave);
dropzone.addEventListener("dragover", handleDragEnter);
dropzone.addEventListener("drop", handleDrop);

addEventListener("click", (e) => {
  const tgt = e.target.parentNode;
  if (tgt.classList.contains("img-container")) {
    msj = true;
    tgt.appendChild(dismissBtn);
    tgt.appendChild(expandBtn);

    let children = tgt.children;
    children = Array.from(children);
    children.shift();

    btnDisplay(children, "inline");

    addEventListener("click", (e) => {
      const btnTarget = e.target;
      if (btnTarget.textContent == "+") {
        btnTarget.parentNode.classList.add("expand");
        btnDisplay(children, "none");
      } else if (btnTarget.textContent == "-") {
        btnTarget.parentNode.classList.remove("expand");

        btnDisplay(children, "none");
      } else {
      }
    });
    tgt.addEventListener("mouseleave", () => {
      if (msj) {
        btnDisplay(children, "none");
        msj = false;
      }
    });
  }
});
