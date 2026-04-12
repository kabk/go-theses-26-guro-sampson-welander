window.addEventListener('load', () => {

  const indexList = document.getElementById('index-list');
  const header = document.getElementById('top-index');
  const floatingTitle = document.getElementById("floating-title");

  if (!indexList || !header) return;

  // ===== Get headings (EXCLUDE LAST 3 FOR NAV ONLY) =====
  const allHeadings = Array.from(document.querySelectorAll('h2'));
  const navHeadings = allHeadings.slice(0, -3); // 👈 ONLY CHANGE
  const headings = allHeadings; // 👈 keep floating title using ALL (unchanged behavior)

  // ===== Build index =====
  navHeadings.forEach((heading, i) => {
    if (!heading.id) heading.id = `section${i + 1}`;

    const li = document.createElement('li');
    const a = document.createElement('a');

    a.href = `#${heading.id}`;

    const navText = heading.dataset.nav || heading.textContent.trim();

    a.dataset.fullText = navText;
    a.dataset.number = i + 1;
    a.textContent = navText;

    li.appendChild(a);
    indexList.appendChild(li);
  });

  // ===== Floating Title (UNCHANGED) =====
  const TRIGGER_LINE = 50;

  function updateFloatingTitle() {
    if (!floatingTitle || headings.length === 0) return;

    let current = null;

    headings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();

      // reset all headings
      heading.style.opacity = "1";

      if (rect.top <= TRIGGER_LINE) {
        current = heading;
      }
    });

    // hide before first section
    if (!current) {
      floatingTitle.style.opacity = "0";
      return;
    }

    // update floating title
    floatingTitle.textContent = current.textContent.trim();
    floatingTitle.style.opacity = "1";

    // hide active h2
    current.style.opacity = "0";
  }

  updateFloatingTitle();
  window.addEventListener("scroll", updateFloatingTitle);
  window.addEventListener("resize", updateFloatingTitle);

  // ===== Hide/show top bar (UNCHANGED) =====
  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {

        if (currentScroll > lastScroll && currentScroll > 50) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
        ticking = false;
      });

      ticking = true;
    }
  });

});


// ===== Footnotes (UNCHANGED) =====
function toggleFootnote(id) {
  const note = document.getElementById(id);
  if (!note) return;

  if (note.style.display === "none" || note.style.display === "") {
    note.style.display = "inline";
  } else {
    note.style.display = "none";
  }
}


// ===== Fade-in animation (UNCHANGED) =====
const faders = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.3
});

faders.forEach(el => observer.observe(el));