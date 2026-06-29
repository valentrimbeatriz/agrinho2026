// Autodetector de imagens em assets/images usando padrão image1.jpg, image2.png, etc.
// Configure conforme necessário:
const imagesPath = 'images/'; // relative a assets/index.html
const filenamePrefix = 'image'; // padrão: image1.jpg, image2.jpg ...
const extensions = ['jpg','png','webp'];
const MAX_IMAGES = 30; // quantas imagens testar no máximo
const timeoutPerImage = 3000; // ms de timeout por tentativa

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

function loadImageWithTimeout(src, timeout = timeoutPerImage){
  return new Promise(resolve => {
    const img = new Image();
    let done = false;
    const t = setTimeout(() => {
      if (!done) { done = true; resolve({ ok: false }); }
    }, timeout);
    img.onload = () => { if (!done) { done = true; clearTimeout(t); resolve({ ok: true, src }); } };
    img.onerror = () => { if (!done) { done = true; clearTimeout(t); resolve({ ok: false }); } };
    img.src = src;
  });
}

async function autodetectImages(){
  const found = [];
  const attempts = [];

  for (let i = 1; i <= MAX_IMAGES; i++){
    for (const ext of extensions){
      const name = `${filenamePrefix}${i}.${ext}`;
      const src = imagesPath + name;
      attempts.push(
        loadImageWithTimeout(src).then(res => {
          if (res.ok) found.push(name);
        })
      );
    }
  }

  // Espera todas as tentativas terminarem (ou timeout)
  await Promise.all(attempts);

  // Ordena por índice numérico (image1, image2...)
  found.sort((a,b) => {
    const ia = parseInt(a.replace(/[^0-9]/g,''),10) || 0;
    const ib = parseInt(b.replace(/[^0-9]/g,''),10) || 0;
    return ia - ib;
  });

  return found;
}

async function initGallery(){
  // Primeiro tenta detectar automaticamente imagens com padrão
  const detected = await autodetectImages();

  if (!detected || detected.length === 0){
    gallery.textContent = 'Nenhuma imagem detectada automaticamente. Coloque imagens em assets/images/ com nomes como image1.jpg, image2.png, ... ou edite assets/script.js para ajustar o padrão.';
    return;
  }

  const frag = document.createDocumentFragment();
  detected.forEach(name => frag.appendChild(createThumb(name)));
  gallery.appendChild(frag);
}

// Inicializa a galeria
initGallery();
