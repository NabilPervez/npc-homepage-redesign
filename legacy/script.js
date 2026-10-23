// Sheen follows the pointer across the hero (card motion). Phones keep the ripple only.
(() => {
  const hero = document.getElementById('hero');
  if (!matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches) return;
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty('--tx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    hero.style.setProperty('--ty', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  });
})();

// Ripple on every button press (card's tap ripple)
document.addEventListener('pointerdown', (e) => {
  const btn = e.target.closest('.btn');
  if (!btn || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const r = btn.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'rip';
  ripple.style.left = (e.clientX - r.left) + 'px';
  ripple.style.top = (e.clientY - r.top) + 'px';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
});

// Copy the email address; fall back to selecting it where the Clipboard API is blocked
(() => {
  const copy = document.getElementById('copy');
  const email = document.getElementById('em');
  copy.addEventListener('click', () => {
    navigator.clipboard.writeText(email.textContent).then(
      () => { copy.textContent = 'Copied'; },
      () => {
        const range = document.createRange();
        range.selectNodeContents(email);
        const selection = getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        copy.textContent = 'Selected';
      }
    );
  });
})();

// Roster: the row in the middle of the screen lights up (khyzr studio pattern)
(() => {
  const rows = [...document.querySelectorAll('[data-row]')];
  if (!('IntersectionObserver' in window)) {
    rows.forEach((row) => row.classList.add('on'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle('on', e.isIntersecting)),
    { rootMargin: '-40% 0px -40% 0px' }
  );
  rows.forEach((row) => io.observe(row));
  rows[0].classList.add('on');
})();
