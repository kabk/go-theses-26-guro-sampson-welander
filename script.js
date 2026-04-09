window.addEventListener('load', () => {

  const indexList = document.getElementById('index-list');
  const header = document.getElementById('top-index');


  if (!indexList || !header) return;

  // Get all h2 and remove last 4
  const allHeadings = Array.from(document.querySelectorAll('h2'));
  const headings = allHeadings.slice(0, -4);

  headings.forEach((heading, i) => {
    if (!heading.id) heading.id = `section${i + 1}`;

    const li = document.createElement('li');
    const a = document.createElement('a');

    a.href = `#${heading.id}`;


    a.dataset.fullText = heading.textContent.trim();
    a.dataset.number = i + 1;

   
    a.textContent = a.dataset.fullText;

    li.appendChild(a);
    indexList.appendChild(li);
  });


  function updateNavText() {
    const links = document.querySelectorAll('#index-list a');

    if (window.innerWidth <= 768) {
      links.forEach(link => {
        link.textContent = link.dataset.number;
      });
    } else {
      links.forEach(link => {
        link.textContent = link.dataset.fullText;
      });
    }
  }


  updateNavText();
  window.addEventListener('resize', updateNavText);



  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {

        if (currentScroll > lastScroll && currentScroll > 50) {
          // scrolling down → hide
          header.style.transform = 'translateY(-100%)';
        } else {
          // scrolling up → show
          header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
        ticking = false;
      });

      ticking = true;
    }
  });

});



function toggleFootnote(id) {
  const note = document.getElementById(id);
  if (!note) return;

  if (note.style.display === "none" || note.style.display === "") {
    note.style.display = "inline";
  } else {
    note.style.display = "none";
  }
}

const faders = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible'); // 👈 THIS enables reverse
    }
  });
}, {
  threshold: 0.3
});

faders.forEach(el => observer.observe(el));