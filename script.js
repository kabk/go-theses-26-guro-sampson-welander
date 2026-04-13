window.addEventListener('load', () => {

  const indexList = document.getElementById('index-list');
  const header = document.getElementById('top-index');
  const floatingTitle = document.getElementById("floating-title");
  const floatingImg = document.getElementById("floating-img");

  if (!indexList || !header) return;

  // ===== Headings =====
  const allHeadings = Array.from(document.querySelectorAll('h2'));

  const navHeadings = window.innerWidth <= 480
    ? allHeadings.slice(0, -1)
    : allHeadings;

  const headings = allHeadings;

  // ===== Build nav =====
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

  // ===== Floating Image =====
const TRIGGER_LINE = floatingTitle.offsetTop;
  let currentImg = ""; 

  function updateFloatingTitle() {
    if (!floatingTitle || headings.length === 0) return;

    // hide on small screens
    if (window.innerWidth <= 768) {
      floatingTitle.style.opacity = "0";
      headings.forEach(h => h.style.opacity = "1");
      return;
    }

    let current = null;

    headings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();

      heading.style.opacity = "1";

      if (rect.top <= TRIGGER_LINE - 10) {
        current = heading;
      }
    });

    if (!current) {
      floatingTitle.style.opacity = "0";
      return;
    }

    const newImg = current.dataset.img;


    if (newImg && floatingImg && newImg !== currentImg) {
      currentImg = newImg;

      floatingImg.style.opacity = "0";

      setTimeout(() => {
        floatingImg.src = newImg;
        floatingImg.style.opacity = "1";
      }, 100);
    }

    floatingTitle.style.opacity = "1";
    current.style.opacity = "0";
  }

  // run + listeners
  updateFloatingTitle();
  window.addEventListener("scroll", updateFloatingTitle);
  window.addEventListener("resize", updateFloatingTitle);

  // ===== Hide/show top bar =====
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


// ===== Footnote toggle =====
function toggleFootnote(id) {
  const note = document.getElementById(id);
  if (!note) return;

  note.classList.toggle("show");
}


// ===== Fade-in animation =====
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