// Select the list container
const indexList = document.getElementById('index-list');

// Select all h2 headings
const headings = document.querySelectorAll('h2');

headings.forEach((heading, i) => {
  // Assign ID if missing
  if (!heading.id) heading.id = `section${i+1}`;

  // Create list item and link
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = `#${heading.id}`;
  a.textContent = heading.textContent;

  li.appendChild(a);
  indexList.appendChild(li);
});

function toggleFootnote(id) {
  const note = document.getElementById(id);

  if (note.style.display === "none") {
    note.style.display = "inline";
  } else {
    note.style.display = "none";
  }
}