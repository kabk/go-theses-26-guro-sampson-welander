const indexList = document.getElementById('index-list');

// Convert to array and remove last 3
const headings = Array.from(document.querySelectorAll('h2')).slice(0, -4);

headings.forEach((heading, i) => {
  if (!heading.id) heading.id = `section${i+1}`;

  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = `#${heading.id}`;

  a.textContent = heading.textContent;

  li.appendChild(a);
  indexList.appendChild(li);
});



const header = document.getElementById('top-index');
const firstH2 = document.querySelector('h2');

let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  const h2Top = firstH2.getBoundingClientRect().top;

  if (h2Top > 0) {

    header.style.transform = 'translateY(-100%)';
  } else {

    if (currentScroll > lastScroll) {

      header.style.transform = 'translateY(-100%)';
    } else {

      header.style.transform = 'translateY(0)';
    }
  }

  lastScroll = currentScroll;
});


function toggleFootnote(id) {
  const note = document.getElementById(id);

  if (note.style.display === "none") {
    note.style.display = "inline";
  } else {
    note.style.display = "none";
  }
}