const progress = document.querySelector('.reading-progress');
const progressBar = progress?.querySelector('span');
const toTop = document.querySelector('.float-top');

if (progress && progressBar && toTop) {
  let queued = false;
  const update = () => {
    const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const percent = Math.min(100, Math.max(0, Math.round(window.scrollY / scrollable * 100)));
    progressBar.style.width = `${percent}%`;
    progress.setAttribute('aria-valuenow', String(percent));
    toTop.classList.toggle('visible', window.scrollY > 650);
    queued = false;
  };
  window.addEventListener('scroll', () => {
    if (!queued) {
      queued = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener('resize', update);
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  update();
}
