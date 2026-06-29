// Lista de arquivos de imagem (coloque seus arquivos em assets/images/)
// Exemplo: ['foto1.jpg','foto2.png','paisagem.webp']
// Substitua/adicione os nomes conforme suas imagens.
const images = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpg'
];

// Caminho relativo a partir de assets/index.html -> assets/images/
const imagesPath = 'images/';

const gallery = document.getElementById('gallery');
const tpl = document.getElementById('thumb-template');

function createThumb(filename){
  const clone = tpl.content.cloneNode(true);
  const img = clone.querySelector('img');
  const caption = clone.querySelector('figcaption');

  img.src = imagesPath + filename;
  img.alt = filename;
  caption.textContent = filename;
  return clone;
}

// Preenche galeria
function initGallery(){
  if (!images || images.length === 0){
    gallery.textContent = 'Nenhuma imagem encontrada. Coloque imagens em assets/images/ e atualize a lista em script.js.';
    return;
  }
  const frag = document.createDocumentFragment();
  images.forEach(name => {
    frag.appendChild(createThumb(name));
  });
  gallery.appendChild(frag);
}

// Chamada inicial
initGallery();
