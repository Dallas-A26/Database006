const listEl = document.getElementById('list');
const form = document.getElementById('paintingForm');
const placeholder = document.getElementById('placeholder');
const message = document.getElementById('message');

// Used when an image file is missing (no file needed)
const DEFAULT_IMG = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60">' +
  '<rect width="60" height="60" fill="#ccc"/>' +
  '<text x="30" y="35" font-size="10" text-anchor="middle" fill="#666">No image</text></svg>');

let paintings = [];
let current = null;

async function loadPaintings() {
  const res = await fetch('/api/paintings');
  paintings = await res.json();
  console.log(paintings.length + ' paintings loaded');
  buildList();
}

function buildList() {
  listEl.innerHTML = '';
  paintings.forEach(p => {
    const div = document.createElement('div');
    div.className = 'item';

    const img = document.createElement('img');
    img.src = 'images/' + p.ImageFileName;
    img.alt = p.Title;
    img.onerror = () => { img.onerror = null; img.src = DEFAULT_IMG; };

    const link = document.createElement('a');
    link.href = '#';
    link.textContent = p.Title;
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.item a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
      selectPainting(p);
    });

    div.append(img, link);
    listEl.appendChild(div);
  });
}

function fillForm() {
  for (const el of form.elements) {
    if (el.name && el.name in current) el.value = current[el.name] ?? '';
  }
}

function selectPainting(p) {
  current = p;
  placeholder.hidden = true;
  form.hidden = false;
  message.textContent = '';
  form.action = '/api/paintings/' + p.PaintingID;
  document.getElementById('formTitle').textContent = p.Title;
  fillForm();
}

// Reset puts back the saved values for the selected painting
document.getElementById('resetBtn').addEventListener('click', () => {
  fillForm();
  message.textContent = '';
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const res = await fetch(form.action, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (res.ok) {
    const updated = await res.json();
    Object.assign(current, updated);
    document.getElementById('formTitle').textContent = current.Title;
    buildList();
    message.textContent = 'Saved!';
  } else {
    message.textContent = 'Save failed.';
  }
});

loadPaintings();