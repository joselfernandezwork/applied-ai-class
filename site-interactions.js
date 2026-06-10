(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const style = document.createElement('style');
  style.textContent = `
    .site-scroll-progress{position:fixed;inset:0 0 auto;z-index:9999;height:3px;background:rgba(15,23,42,.75);pointer-events:none}
    .site-scroll-progress span{display:block;width:100%;height:100%;transform:scaleX(0);transform-origin:left;background:linear-gradient(90deg,#38BDF8,#A855F7,#34D399);box-shadow:0 0 16px rgba(56,189,248,.65)}
    .site-reveal{opacity:0;transform:translateY(24px);transition:opacity .65s ease,transform .65s cubic-bezier(.2,.75,.25,1);transition-delay:var(--site-delay,0ms)}
    .site-reveal.site-visible{opacity:1;transform:none}
    .site-section-rail{position:fixed;right:18px;top:50%;z-index:900;display:flex;flex-direction:column;gap:9px;transform:translateY(-50%)}
    .site-section-dot{width:9px;height:9px;padding:0;border:1px solid #64748B;border-radius:99px;background:#0F172A;cursor:pointer;transition:height .2s,background .2s,border-color .2s}
    .site-section-dot:hover,.site-section-dot:focus-visible{border-color:#38BDF8}
    .site-section-dot.site-active{height:25px;background:#38BDF8;border-color:#38BDF8}
    .site-back-top{position:fixed;right:18px;bottom:18px;z-index:900;width:42px;height:42px;border:1px solid #475569;border-radius:50%;background:rgba(15,23,42,.92);color:#F1F5F9;font:700 18px/1 Inter,sans-serif;cursor:pointer;opacity:0;transform:translateY(10px);pointer-events:none;transition:opacity .2s,transform .2s,border-color .2s}
    .site-back-top.site-visible{opacity:1;transform:none;pointer-events:auto}
    .site-back-top:hover,.site-back-top:focus-visible{border-color:#38BDF8;color:#38BDF8}
    @media(max-width:1100px){.site-section-rail{display:none}}
    @media(prefers-reduced-motion:reduce){.site-reveal{opacity:1;transform:none;transition:none}.site-scroll-progress span,.site-back-top{transition:none}}
  `;
  document.head.appendChild(style);

  const progress = document.createElement('div');
  progress.className = 'site-scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  const progressFill = document.createElement('span');
  progress.appendChild(progressFill);
  document.body.prepend(progress);

  const backTop = document.createElement('button');
  backTop.className = 'site-back-top';
  backTop.type = 'button';
  backTop.textContent = '↑';
  backTop.setAttribute('aria-label', 'Back to top');
  backTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  });
  document.body.appendChild(backTop);

  function updateScrollUI() {
    const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const ratio = Math.min(window.scrollY / scrollable, 1);
    progressFill.style.transform = 'scaleX(' + ratio + ')';
    backTop.classList.toggle('site-visible', window.scrollY > 520);
  }

  let scrollQueued = false;
  window.addEventListener('scroll', function () {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(function () {
      updateScrollUI();
      scrollQueued = false;
    });
  }, { passive: true });
  updateScrollUI();

  const revealSelector = [
    '.stage', '.section', '.info-box', '.main-card', '.video-card',
    '.tool-card', '.slide-item', '.why-card', '.usecase-card',
    '.risk-card', '.tier-card'
  ].join(',');
  const revealItems = Array.from(document.querySelectorAll(revealSelector));

  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (item) { item.classList.add('site-visible'); });
  } else {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('site-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });

    revealItems.forEach(function (item, index) {
      item.classList.add('site-reveal');
      item.style.setProperty('--site-delay', ((index % 6) * 45) + 'ms');
      revealObserver.observe(item);
    });
  }

  const sections = Array.from(document.querySelectorAll('.stage, .section'))
    .filter(function (section) { return section.offsetHeight > 140; });

  if (sections.length > 2 && window.innerWidth > 1100) {
    const rail = document.createElement('nav');
    rail.className = 'site-section-rail';
    rail.setAttribute('aria-label', 'Page sections');
    const dots = sections.map(function (section, index) {
      if (!section.id) section.id = 'section-' + (index + 1);
      const heading = section.querySelector('.stage-label, .section-title, h2');
      const label = heading ? heading.textContent.trim() : 'Section ' + (index + 1);
      const dot = document.createElement('button');
      dot.className = 'site-section-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', label);
      dot.title = label;
      dot.addEventListener('click', function () {
        section.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      });
      rail.appendChild(dot);
      return dot;
    });
    document.body.appendChild(rail);

    const sectionObserver = new IntersectionObserver(function (entries) {
      const visible = entries
        .filter(function (entry) { return entry.isIntersecting; })
        .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
      if (!visible) return;
      const activeIndex = sections.indexOf(visible.target);
      dots.forEach(function (dot, index) {
        dot.classList.toggle('site-active', index === activeIndex);
      });
    }, { threshold: [0.2, 0.45, 0.7], rootMargin: '-15% 0px -45% 0px' });
    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        const video = entry.target;
        if (entry.isIntersecting && video.muted && video.hasAttribute('autoplay')) {
          video.play().catch(function () {});
        } else if (!entry.isIntersecting) {
          video.pause();
        }
      });
    }, { threshold: 0.35 });
    document.querySelectorAll('video').forEach(function (video) {
      videoObserver.observe(video);
    });
  }
})();
