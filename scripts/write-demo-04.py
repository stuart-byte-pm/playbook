
# Script to write homepage-demo-04.html
import os

out = r"C:\Users\Admin\OneDrive\Desktop\playbook+\assets\files\homepage-demo-04.html"

html = r"""<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Playbook Advisory Group — Connecting you to clarity</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap" rel="stylesheet">

  <style>
    :root {
      --color-black:       #000000;
      --color-gold:        #AB7F58;
      --color-white:       #FFFFFF;
      --color-navy:        #271F57;
      --color-paper-dark:  #FADCC1;
      --color-mid-grey:    #F4F4F4;
      --color-text-primary:   #000000;
      --color-text-on-dark:   #FFFFFF;
      --color-text-secondary: #555555;
      --color-text-accent:    #AB7F58;
      --color-border-default: #E5E5E5;
      --color-border-accent:  #AB7F58;
      --font-primary: 'Inter', Arial, sans-serif;
      --weight-light:    300;
      --weight-regular:  400;
      --weight-medium:   500;
      --weight-semibold: 600;
      --weight-bold:     700;
      --size-display:  clamp(2.75rem, 6vw, 4.5rem);
      --size-h1:       clamp(2.25rem, 4.5vw, 3.5rem);
      --size-h2:       clamp(1.75rem, 3vw, 2.5rem);
      --size-h3:       clamp(1.375rem, 2vw, 2rem);
      --size-h4:       1.5rem;
      --size-h5:       1.25rem;
      --size-body-lg:  1.125rem;
      --size-body:     1rem;
      --size-body-sm:  0.875rem;
      --size-caption:  0.75rem;
      --size-label:    0.6875rem;
      --lh-tight:   1.1;
      --lh-snug:    1.2;
      --lh-normal:  1.5;
      --lh-relaxed: 1.65;
      --ls-tight:   -0.025em;
      --ls-normal:  0;
      --ls-wide:    0.025em;
      --ls-wider:   0.05em;
      --ls-widest:  0.1em;
      --space-1:   0.25rem;
      --space-2:   0.5rem;
      --space-3:   0.75rem;
      --space-4:   1rem;
      --space-6:   1.5rem;
      --space-8:   2rem;
      --space-10:  2.5rem;
      --space-12:  3rem;
      --space-16:  4rem;
      --space-20:  5rem;
      --space-24:  6rem;
      --space-32:  8rem;
      --radius-sm: 2px;
      --radius-md: 4px;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
      --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
      --shadow-lg: 0 8px 24px rgba(0,0,0,0.12);
      --shadow-card-hover: 0 12px 40px rgba(0,0,0,0.10);
      --duration-fast:   140ms;
      --duration-base:   220ms;
      --duration-slow:   320ms;
      --duration-page:   400ms;
      --ease-standard:   cubic-bezier(0.4, 0, 0.2, 1);
      --ease-decelerate: cubic-bezier(0, 0, 0.2, 1);
      --max-width: 1440px;
      --gutter: clamp(1.5rem, 5vw, 5rem);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
    html { scroll-behavior: smooth; font-size: 16px; }
    body {
      font-family: var(--font-primary);
      font-size: var(--size-body);
      font-weight: var(--weight-regular);
      line-height: var(--lh-relaxed);
      color: var(--color-text-primary);
      background-color: var(--color-white);
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    a { text-decoration: none; color: inherit; }
    img { display: block; max-width: 100%; }
    button { font-family: inherit; cursor: pointer; border: none; background: none; }
    .reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity var(--duration-slow) var(--ease-decelerate), transform var(--duration-slow) var(--ease-decelerate);
    }
    .reveal.is-visible { opacity: 1; transform: translateY(0); }
    .reveal-delay-1 { transition-delay: 80ms; }
    .reveal-delay-2 { transition-delay: 160ms; }
    .reveal-delay-3 { transition-delay: 240ms; }
    .reveal-delay-4 { transition-delay: 320ms; }
    .reveal-delay-5 { transition-delay: 400ms; }
    .container { max-width: var(--max-width); margin-inline: auto; padding-inline: var(--gutter); }
    .section { padding-block: var(--space-32); }
    .section--tight { padding-block: var(--space-24); }
    .label-tag {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      font-size: var(--size-label);
      font-weight: var(--weight-semibold);
      letter-spacing: var(--ls-widest);
      text-transform: uppercase;
      color: var(--color-text-accent);
    }
    .label-tag::before { content: ''; display: block; width: 20px; height: 1px; background: var(--color-gold); }
    .label-tag--on-dark { color: #ffffff; }
    .label-tag--on-dark::before { background: #ffffff; }
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding-block: var(--space-6);
      transition: background-color var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard), padding var(--duration-base) var(--ease-standard);
    }
    .nav.is-scrolled { background-color: rgba(255,255,255,0.96); backdrop-filter: blur(12px); box-shadow: 0 1px 0 var(--color-border-default); padding-block: var(--space-4); }
    .nav__inner { max-width: var(--max-width); margin-inline: auto; padding-inline: var(--gutter); display: flex; align-items: center; justify-content: space-between; }
    .nav__logo { display: flex; align-items: center; gap: var(--space-3); }
    .nav__mark { width: 32px; height: 32px; flex-shrink: 0; }
    .nav__wordmark { font-size: var(--size-body-sm); font-weight: var(--weight-semibold); letter-spacing: var(--ls-wide); text-transform: uppercase; color: var(--color-white); line-height: 1.2; transition: color var(--duration-base) var(--ease-standard); }
    .nav.is-scrolled .nav__wordmark { color: var(--color-black); }
    .nav__links { display: flex; align-items: center; gap: var(--space-8); list-style: none; }
    .nav__link { font-size: var(--size-body-sm); font-weight: var(--weight-medium); color: rgba(255,255,255,0.8); letter-spacing: var(--ls-wide); transition: color var(--duration-fast) var(--ease-standard); position: relative; }
    .nav__link::after { content: ''; position: absolute; bottom: -3px; left: 0; width: 0; height: 1px; background: var(--color-gold); transition: width var(--duration-base) var(--ease-standard); }
    .nav__link:hover { color: var(--color-white); }
    .nav__link:hover::after { width: 100%; }
    .nav.is-scrolled .nav__link { color: var(--color-text-secondary); }
    .nav.is-scrolled .nav__link:hover { color: var(--color-black); }
    .nav__cta { font-size: var(--size-body-sm); font-weight: var(--weight-medium); letter-spacing: var(--ls-wide); padding: 0.625rem 1.25rem; border: 1px solid rgba(255,255,255,0.4); color: var(--color-white); border-radius: var(--radius-sm); transition: background-color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard); }
    .nav__cta:hover { background-color: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.7); }
    .nav.is-scrolled .nav__cta { border-color: var(--color-black); color: var(--color-black); }
    .nav.is-scrolled .nav__cta:hover { background-color: var(--color-black); color: var(--color-white); }
    .nav__links { display: none; }
    .nav__cta   { display: none; }
    .nav__toggle { display: flex; flex-direction: column; gap: 5px; width: 24px; padding: 4px 0; cursor: pointer; z-index: 210; position: relative; }
    .nav__toggle span { display: block; height: 1.5px; background: var(--color-white); transition: transform var(--duration-base) var(--ease-standard), opacity var(--duration-fast) var(--ease-standard), background-color var(--duration-base) var(--ease-standard); }
    .nav.is-scrolled .nav__toggle span { background: var(--color-black); }
    .nav__toggle.is-open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
    .nav__toggle.is-open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .nav__toggle.is-open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
    .nav__toggle.is-open span { background: var(--color-white) !important; }
    .nav__backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 150; opacity: 0; pointer-events: none; transition: opacity var(--duration-base) var(--ease-standard); }
    .nav__backdrop.is-open { opacity: 1; pointer-events: all; }
    .nav__drawer { position: fixed; top: 0; right: 0; bottom: 0; width: min(420px, 100vw); background-color: var(--color-black); z-index: 200; display: flex; flex-direction: column; padding: 7rem var(--space-10) var(--space-10); transform: translateX(100%); transition: transform var(--duration-page) var(--ease-decelerate); overflow-y: auto; }
    .nav__drawer.is-open { transform: translateX(0); }
    .nav__drawer-links { list-style: none; display: flex; flex-direction: column; gap: 0; flex: 1; }
    .nav__drawer-link { display: block; font-size: clamp(1.5rem, 4vw, 2rem); font-weight: var(--weight-bold); letter-spacing: var(--ls-tight); color: rgba(255,255,255,0.35); padding-block: var(--space-6); border-bottom: 1px solid rgba(255,255,255,0.07); transition: color var(--duration-fast) var(--ease-standard); line-height: 1.1; }
    .nav__drawer-link:hover { color: var(--color-white); }
    .nav__drawer-link:last-child { border-bottom: none; }
    .nav__drawer.is-open .nav__drawer-link { animation: drawerLinkIn 400ms var(--ease-decelerate) both; }
    .nav__drawer.is-open li:nth-child(1) .nav__drawer-link { animation-delay: 80ms; }
    .nav__drawer.is-open li:nth-child(2) .nav__drawer-link { animation-delay: 130ms; }
    .nav__drawer.is-open li:nth-child(3) .nav__drawer-link { animation-delay: 180ms; }
    .nav__drawer.is-open li:nth-child(4) .nav__drawer-link { animation-delay: 230ms; }
    @keyframes drawerLinkIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
    .nav__drawer-footer { padding-top: var(--space-10); border-top: 1px solid rgba(255,255,255,0.07); margin-top: var(--space-6); }
    .nav__drawer-cta { display: inline-flex; align-items: center; gap: var(--space-3); font-size: var(--size-body-sm); font-weight: var(--weight-medium); letter-spacing: var(--ls-wide); padding: 0.875rem 1.75rem; background-color: var(--color-gold); color: var(--color-white); border-radius: var(--radius-sm); transition: background-color var(--duration-fast) var(--ease-standard); }
    .nav__drawer-cta:hover { background-color: #9a7050; }
    .nav__drawer-tagline { margin-top: var(--space-6); font-size: var(--size-caption); letter-spacing: var(--ls-wider); text-transform: uppercase; color: rgba(255,255,255,0.2); }
    .hero { position: relative; min-height: 100svh; display: flex; flex-direction: column; justify-content: flex-end; background-color: var(--color-navy); overflow: hidden; }
    .hero__video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; z-index: 0; filter: saturate(0.35) brightness(0.65); }
    .hero::before { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.5), linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.25) 100%), linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%); pointer-events: none; z-index: 0; }
    .hero__grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 64px 64px; pointer-events: none; }
    .hero__content { position: relative; z-index: 1; max-width: var(--max-width); margin-inline: auto; padding-inline: var(--gutter); padding-block: var(--space-32) var(--space-24); display: flex; flex-direction: column; align-items: flex-start; }
    .hero__label { margin-bottom: var(--space-8); opacity: 0; animation: fadeUp var(--duration-slow) var(--ease-decelerate) 200ms forwards; }
    .hero__heading { font-size: var(--size-display); font-weight: var(--weight-bold); line-height: var(--lh-tight); letter-spacing: var(--ls-tight); color: var(--color-white); max-width: 22ch; margin-bottom: var(--space-8); opacity: 0; animation: fadeUp var(--duration-slow) var(--ease-decelerate) 320ms forwards; }
    .hero__heading em { font-style: normal; color: #ffffff; }
    .hero__sub { font-size: var(--size-body-lg); font-weight: var(--weight-light); line-height: var(--lh-relaxed); color: #ffffff; max-width: 52ch; margin-bottom: var(--space-12); opacity: 0; animation: fadeUp var(--duration-slow) var(--ease-decelerate) 440ms forwards; }
    .hero__actions { display: flex; align-items: center; gap: var(--space-6); flex-wrap: wrap; opacity: 0; animation: fadeUp var(--duration-slow) var(--ease-decelerate) 560ms forwards; }
    .btn-primary { display: inline-flex; align-items: center; gap: var(--space-3); font-size: var(--size-body-sm); font-weight: var(--weight-medium); letter-spacing: var(--ls-wide); padding: 0.875rem 1.75rem; background-color: var(--color-gold); color: var(--color-white); border-radius: var(--radius-sm); transition: background-color var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard); will-change: transform; }
    .btn-primary:hover { background-color: #9a7050; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(171,127,88,0.35); }
    .btn-primary:active { transform: translateY(0); }
    .btn-primary .arrow { transition: transform var(--duration-fast) var(--ease-standard); }
    .btn-primary:hover .arrow { transform: translateX(3px); }
    .btn-ghost { display: inline-flex; align-items: center; gap: var(--space-3); font-size: var(--size-body-sm); font-weight: var(--weight-medium); letter-spacing: var(--ls-wide); color: #ffffff; border-bottom: 1px solid rgba(255,255,255,0.5); padding-bottom: 2px; transition: color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard); }
    .btn-ghost:hover { color: var(--color-white); border-color: #ffffff; }
    .btn-ghost .arrow { transition: transform var(--duration-fast) var(--ease-standard); }
    .btn-ghost:hover .arrow { transform: translateX(3px); }
    .hero__scroll { position: absolute; bottom: var(--space-8); left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: var(--space-2); font-size: var(--size-caption); letter-spacing: var(--ls-wider); text-transform: uppercase; color: rgba(255,255,255,0.3); opacity: 0; animation: fadeIn 600ms var(--ease-decelerate) 1200ms forwards; z-index: 1; }
    .hero__scroll-line { width: 1px; height: 40px; background: linear-gradient(to bottom, rgba(255,255,255,0.3), transparent); animation: scrollPulse 2.4s ease-in-out infinite; }
    @keyframes scrollPulse { 0%, 100% { opacity: 0.3; transform: scaleY(1); } 50% { opacity: 0.7; transform: scaleY(1.1); } }
    .belief { background-color: var(--color-white); padding-block: var(--space-32); }
    .belief__inner { display: grid; grid-template-columns: 1fr 2fr; gap: var(--space-20); align-items: start; }
    .belief__eyebrow { padding-top: 0.5rem; }
    .belief__image { margin-top: var(--space-8); width: 50%; overflow: hidden; }
    .belief__image img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .belief__body { border-top: 1px solid var(--color-border-default); padding-top: var(--space-8); }
    .belief__quote { font-size: var(--size-h3); font-weight: var(--weight-bold); line-height: var(--lh-snug); letter-spacing: var(--ls-tight); color: var(--color-black); margin-bottom: var(--space-8); }
    .belief__quote strong { font-weight: var(--weight-semibold); }
    .belief__copy { font-size: var(--size-body-lg); font-weight: var(--weight-light); color: var(--color-text-secondary); line-height: var(--lh-relaxed); max-width: 55ch; margin-bottom: var(--space-8); }
    .belief__link { display: inline-flex; align-items: center; gap: var(--space-2); font-size: var(--size-body-sm); font-weight: var(--weight-medium); letter-spacing: var(--ls-wide); color: var(--color-black); border-bottom: 1px solid var(--color-black); padding-bottom: 2px; transition: color var(--duration-fast), border-color var(--duration-fast); }
    .belief__link:hover { color: var(--color-gold); border-color: var(--color-gold); }
    .belief__link .arrow { transition: transform var(--duration-fast) var(--ease-standard); }
    .belief__link:hover .arrow { transform: translateX(3px); }
    @media (max-width: 768px) { .belief__inner { grid-template-columns: 1fr; gap: var(--space-8); } }
    .gaps { background-color: var(--color-mid-grey); background-image: url('../images/backgrounds/background-image-04.png'); background-repeat: no-repeat; background-size: 100% auto; background-position: center bottom; padding-block: var(--space-32); }
    .gaps__header { margin-bottom: var(--space-16); }
    .gaps__title { font-size: var(--size-h2); font-weight: var(--weight-bold); letter-spacing: var(--ls-tight); line-height: var(--lh-snug); color: var(--color-black); margin-top: var(--space-6); max-width: 28ch; }
    .gaps__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background-color: var(--color-border-default); }
    .gap-card { background-color: var(--color-white); padding: var(--space-10) var(--space-8); display: flex; flex-direction: column; gap: var(--space-6); transition: background-color var(--duration-base) var(--ease-standard); }
    .gap-card:hover { background-color: var(--color-black); }
    .gap-card__number { font-size: var(--size-caption); font-weight: var(--weight-semibold); letter-spacing: var(--ls-widest); text-transform: uppercase; color: var(--color-gold); }
    .gap-card__name { font-size: var(--size-h4); font-weight: var(--weight-bold); letter-spacing: var(--ls-tight); color: var(--color-black); transition: color var(--duration-base) var(--ease-standard); }
    .gap-card__copy { font-size: var(--size-body); font-weight: var(--weight-light); line-height: var(--lh-relaxed); color: var(--color-text-secondary); transition: color var(--duration-base) var(--ease-standard); flex: 1; }
    .gap-card__divider { width: 24px; height: 1px; background-color: var(--color-border-default); transition: background-color var(--duration-base) var(--ease-standard), width var(--duration-base) var(--ease-standard); }
    .gap-card:hover .gap-card__name { color: var(--color-white); }
    .gap-card:hover .gap-card__copy { color: rgba(255,255,255,0.6); }
    .gap-card:hover .gap-card__divider { background-color: var(--color-gold); width: 40px; }
    @media (max-width: 768px) { .gaps__grid { grid-template-columns: 1fr; } }
    .services { background-color: var(--color-white); padding-block: var(--space-32); }
    .services__header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: var(--space-16); gap: var(--space-8); }
    .services__title { font-size: var(--size-h2); font-weight: var(--weight-bold); letter-spacing: var(--ls-tight); line-height: var(--lh-snug); color: var(--color-black); margin-top: var(--space-6); max-width: 24ch; }
    .services__list { display: flex; flex-direction: column; border-top: 1px solid var(--color-border-default); }
    .service-row { display: grid; grid-template-columns: auto 1fr auto; align-items: start; gap: var(--space-8); padding-block: var(--space-8); border-bottom: 1px solid var(--color-border-default); cursor: pointer; }
    .service-row__index { font-size: var(--size-caption); font-weight: var(--weight-semibold); letter-spacing: var(--ls-widest); color: var(--color-gold); padding-top: 0.3rem; z-index: 1; min-width: 2rem; }
    .service-row__content { z-index: 1; }
    .service-row__title { font-size: var(--size-h4); font-weight: var(--weight-bold); letter-spacing: var(--ls-tight); color: var(--color-black); margin-bottom: var(--space-2); transition: color var(--duration-base) var(--ease-standard); }
    .service-row__desc { font-size: var(--size-body-sm); color: var(--color-text-secondary); line-height: var(--lh-relaxed); max-width: 55ch; overflow: hidden; max-height: 0; opacity: 0; transition: max-height var(--duration-base) var(--ease-decelerate), opacity var(--duration-base) var(--ease-standard), color var(--duration-base) var(--ease-standard); }
    .service-row:hover .service-row__desc { max-height: 5rem; opacity: 1; }
    .service-row__arrow { z-index: 1; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--color-border-default); border-radius: 50%; color: var(--color-black); transition: transform var(--duration-base) var(--ease-standard), background-color var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard), color var(--duration-base) var(--ease-standard); margin-top: 0.2rem; }
    .service-row:hover .service-row__arrow { transform: rotate(45deg); background-color: var(--color-gold); border-color: var(--color-gold); color: var(--color-white); }
    .service-row:hover .service-row__title { color: var(--color-gold); }
    .services__layout { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-16); align-items: stretch; }
    .services__image-panel { display: flex; flex-direction: column; }
    .services__image-frame { position: relative; flex: 1; overflow: hidden; background-color: var(--color-mid-grey); }
    .services__image-frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .services__image-caption { font-size: var(--size-caption); font-weight: var(--weight-medium); letter-spacing: var(--ls-wider); text-transform: uppercase; color: var(--color-text-secondary); margin-top: var(--space-3); }
    @media (max-width: 900px) { .services__layout { grid-template-columns: 1fr; } .services__image-panel { display: none; } }
    @media (max-width: 600px) { .services__header { flex-direction: column; align-items: flex-start; } .service-row { grid-template-columns: auto 1fr auto; gap: var(--space-4); } }
    .model-band { background-color: var(--color-black); padding-block: var(--space-24); position: relative; overflow: hidden; }
    .model-band::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 120% at 100% 50%, rgba(171,127,88,0.1) 0%, transparent 60%); pointer-events: none; }
    .model-band__header { display: flex; align-items: flex-end; justify-content: space-between; gap: var(--space-8); margin-bottom: var(--space-12); }
    .model-band__intro { flex: 1; }
    .model-band__title { font-size: var(--size-h2); font-weight: var(--weight-bold); letter-spacing: var(--ls-tight); line-height: var(--lh-snug); color: var(--color-white); margin-top: var(--space-6); max-width: 32ch; }
    .model-band__copy { font-size: var(--size-body); font-weight: var(--weight-light); color: rgba(255,255,255,0.5); line-height: var(--lh-relaxed); max-width: 48ch; margin-top: var(--space-4); }
    .model-stages { display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-md); overflow: hidden; }
    .model-stage { padding: var(--space-8); border-right: 1px solid rgba(255,255,255,0.1); cursor: pointer; position: relative; opacity: 0.38; transition: opacity 320ms var(--ease-standard), background-color 320ms var(--ease-standard); overflow: hidden; user-select: none; }
    .model-stage:last-child { border-right: none; }
    .model-stage:hover { opacity: 0.65; }
    .model-stage--active { opacity: 1; background-color: rgba(255,255,255,0.04); }
    .model-stage--active:hover { opacity: 1; }
    .model-stage__number { font-size: var(--size-caption); font-weight: var(--weight-semibold); letter-spacing: var(--ls-wider); text-transform: uppercase; color: var(--color-gold); margin-bottom: var(--space-4); opacity: 0.5; transition: opacity 320ms; }
    .model-stage--active .model-stage__number { opacity: 1; }
    .model-stage__name { font-size: var(--size-h4); font-weight: var(--weight-bold); letter-spacing: var(--ls-tight); line-height: var(--lh-tight); color: rgba(255,255,255,0.5); margin-bottom: var(--space-4); transition: color 320ms var(--ease-standard); }
    .model-stage--active .model-stage__name { color: var(--color-white); }
    .model-stage__desc { font-size: var(--size-body-sm); color: rgba(255,255,255,0.38); line-height: var(--lh-relaxed); margin-top: var(--space-4); transition: color 320ms var(--ease-standard); }
    .model-stage--active .model-stage__desc { color: rgba(255,255,255,0.65); }
    .model-stage__bar { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: rgba(255,255,255,0.06); }
    .model-stage__bar-fill { height: 100%; width: 0%; background: var(--color-gold); }
    .model-stage--active .model-stage__bar-fill { animation: stageProgress 3s linear forwards; }
    @keyframes stageProgress { from { width: 0%; } to { width: 100%; } }
    .btn-outline-light { display: inline-flex; align-items: center; gap: var(--space-3); font-size: var(--size-body-sm); font-weight: var(--weight-medium); letter-spacing: var(--ls-wide); padding: 0.875rem 1.75rem; border: 1px solid rgba(255,255,255,0.3); color: var(--color-white); border-radius: var(--radius-sm); white-space: nowrap; flex-shrink: 0; transition: background-color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard); will-change: transform; }
    .btn-outline-light:hover { background-color: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.6); transform: translateY(-1px); }
    .btn-outline-light .arrow { transition: transform var(--duration-fast) var(--ease-standard); }
    .btn-outline-light:hover .arrow { transform: translateX(3px); }
    @media (max-width: 960px) { .model-band__header { flex-direction: column; align-items: flex-start; } .model-stages { grid-template-columns: repeat(2, 1fr); } .model-stage:nth-child(2) { border-right: none; } .model-stage:nth-child(1), .model-stage:nth-child(2) { border-bottom: 1px solid rgba(255,255,255,0.1); } }
    @media (max-width: 560px) { .model-stages { grid-template-columns: 1fr; } .model-stage { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); } .model-stage:last-child { border-bottom: none; } }
    .sectors { background-color: #f7f7f7; background-image: url('../images/backgrounds/background-image-02.png'); background-repeat: no-repeat; background-size: 100% auto; background-position: center bottom; padding-block: var(--space-32); }
    .sectors__header { margin-bottom: var(--space-16); }
    .sectors__title { font-size: var(--size-h2); font-weight: var(--weight-bold); letter-spacing: var(--ls-tight); line-height: var(--lh-snug); color: var(--color-black); margin-top: var(--space-6); max-width: 28ch; }
    .sectors__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); }
    .sector-card { background-color: var(--color-white); display: flex; flex-direction: column; cursor: pointer; overflow: hidden; transition: transform var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard); will-change: transform; }
    .sector-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-card-hover); }
    .sector-card__image { position: relative; aspect-ratio: 16/9; overflow: hidden; background-color: var(--color-navy); }
    .sector-card__image img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform var(--duration-slow) var(--ease-standard); }
    .sector-card:hover .sector-card__image img { transform: scale(1.04); }
    .sector-card__body { padding: var(--space-6) var(--space-6) var(--space-8); display: flex; flex-direction: column; gap: var(--space-4); flex: 1; }
    .sector-card__name { font-size: var(--size-h5); font-weight: var(--weight-semibold); letter-spacing: var(--ls-tight); color: var(--color-black); }
    .sector-card__sub { font-size: var(--size-body-sm); color: var(--color-text-secondary); line-height: var(--lh-relaxed); flex: 1; }
    .sector-card__tags { display: flex; flex-wrap: wrap; gap: var(--space-2); }
    .tag { font-size: var(--size-caption); font-weight: var(--weight-medium); letter-spacing: var(--ls-wide); padding: 0.2rem 0.6rem; border: 1px solid var(--color-border-default); color: var(--color-text-secondary); border-radius: var(--radius-sm); }
    @media (max-width: 768px) { .sectors__grid { grid-template-columns: 1fr; } }
    @media (min-width: 769px) and (max-width: 960px) { .sectors__grid { grid-template-columns: repeat(2, 1fr); } }
    .insights { background-color: var(--color-white); padding-block: var(--space-32); }
    .insights__header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: var(--space-16); gap: var(--space-8); }
    .insights__title { font-size: var(--size-h2); font-weight: var(--weight-bold); letter-spacing: var(--ls-tight); line-height: var(--lh-snug); color: var(--color-black); margin-top: var(--space-6); max-width: 22ch; }
    .insights__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
    .insight-card { display: flex; flex-direction: column; gap: 0; cursor: pointer; }
    .insight-card__image { aspect-ratio: 16/9; background-color: var(--color-mid-grey); overflow: hidden; position: relative; margin-bottom: var(--space-6); }
    .insight-card__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; transition: transform var(--duration-slow) var(--ease-standard); }
    .insight-card:hover .insight-card__img { transform: scale(1.04); }
    .insight-card__image-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%); pointer-events: none; }
    .insight-card__meta { display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-4); }
    .insight-card__tag { font-size: var(--size-caption); font-weight: var(--weight-semibold); letter-spacing: var(--ls-wider); text-transform: uppercase; color: var(--color-gold); }
    .insight-card__dot { width: 3px; height: 3px; border-radius: 50%; background: var(--color-border-default); }
    .insight-card__date { font-size: var(--size-caption); color: var(--color-text-secondary); }
    .insight-card__title { font-size: var(--size-h5); font-weight: var(--weight-semibold); letter-spacing: var(--ls-tight); line-height: var(--lh-snug); color: var(--color-black); transition: color var(--duration-fast) var(--ease-standard); margin-bottom: var(--space-4); }
    .insight-card:hover .insight-card__title { color: var(--color-navy); }
    .insight-card__excerpt { font-size: var(--size-body-sm); color: var(--color-text-secondary); line-height: var(--lh-relaxed); margin-bottom: var(--space-6); }
    .insight-card__link { display: inline-flex; align-items: center; gap: var(--space-2); font-size: var(--size-body-sm); font-weight: var(--weight-medium); color: var(--color-black); border-bottom: 1px solid var(--color-border-default); padding-bottom: 2px; align-self: flex-start; transition: color var(--duration-fast), border-color var(--duration-fast); }
    .insight-card__link .arrow { transition: transform var(--duration-fast) var(--ease-standard); }
    .insight-card:hover .insight-card__link { color: var(--color-gold); border-color: var(--color-gold); }
    .insight-card:hover .insight-card__link .arrow { transform: translateX(3px); }
    @media (max-width: 768px) { .insights__grid { grid-template-columns: 1fr; } .insights__header { flex-direction: column; align-items: flex-start; } }
    @media (min-width: 769px) and (max-width: 960px) { .insights__grid { grid-template-columns: repeat(2, 1fr); } }
    .diagnostic { background-color: var(--color-black); padding-block: var(--space-32); position: relative; overflow: hidden; }
    .diagnostic::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 50% 100% at 0% 50%, rgba(171,127,88,0.08) 0%, transparent 60%); pointer-events: none; }
    .diagnostic__inner { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-24); align-items: center; }
    .diagnostic__eyebrow { margin-bottom: var(--space-8); }
    .diagnostic__title { font-size: var(--size-h1); font-weight: var(--weight-bold); letter-spacing: var(--ls-tight); line-height: var(--lh-tight); color: var(--color-white); margin-bottom: var(--space-8); }
    .diagnostic__copy { font-size: var(--size-body-lg); font-weight: var(--weight-light); color: rgba(255,255,255,0.5); line-height: var(--lh-relaxed); margin-bottom: var(--space-10); max-width: 44ch; }
    .diagnostic__image { position: relative; overflow: hidden; border-radius: var(--radius-md); aspect-ratio: 4/5; align-self: stretch; }
    .diagnostic__image img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; transition: transform var(--duration-slow) var(--ease-standard); }
    .diagnostic__image::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,0.25) 0%, transparent 40%); pointer-events: none; }
    .diagnostic:hover .diagnostic__image img { transform: scale(1.03); }
    .diagnostic--meet .diagnostic__content { opacity: 0; transform: translateX(-80px); transition: opacity 600ms cubic-bezier(0.2, 0, 0, 1), transform 600ms cubic-bezier(0.2, 0, 0, 1); }
    .diagnostic--meet .diagnostic__image { opacity: 0; transform: translateX(80px); transition: opacity 600ms cubic-bezier(0.2, 0, 0, 1), transform 600ms cubic-bezier(0.2, 0, 0, 1); }
    .diagnostic--meet.is-visible .diagnostic__content, .diagnostic--meet.is-visible .diagnostic__image { opacity: 1; transform: translateX(0); }
    @media (max-width: 768px) { .diagnostic__inner { grid-template-columns: 1fr; } .diagnostic__image { aspect-ratio: 16/9; } .diagnostic--meet .diagnostic__content, .diagnostic--meet .diagnostic__image { transform: translateY(40px); } .diagnostic--meet.is-visible .diagnostic__content, .diagnostic--meet.is-visible .diagnostic__image { transform: translateY(0); } }
    .contact { background-color: var(--color-mid-grey); padding-block: var(--space-24); }
    .contact__inner { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-24); align-items: start; }
    .contact__title { font-size: var(--size-h2); font-weight: var(--weight-bold); letter-spacing: var(--ls-tight); line-height: var(--lh-snug); color: var(--color-black); margin-top: var(--space-6); margin-bottom: var(--space-6); }
    .contact__copy { font-size: var(--size-body); color: var(--color-text-secondary); line-height: var(--lh-relaxed); max-width: 40ch; }
    .contact__offices { margin-top: var(--space-10); display: flex; flex-direction: column; gap: var(--space-6); }
    .office { display: flex; flex-direction: column; gap: var(--space-1); }
    .office__label { font-size: var(--size-caption); font-weight: var(--weight-semibold); letter-spacing: var(--ls-widest); text-transform: uppercase; color: var(--color-gold); }
    .office__address { font-size: var(--size-body-sm); color: var(--color-text-secondary); line-height: var(--lh-relaxed); }
    .contact__form { display: flex; flex-direction: column; gap: var(--space-4); }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
    .form-group { display: flex; flex-direction: column; gap: var(--space-2); }
    .form-label { font-size: var(--size-caption); font-weight: var(--weight-semibold); letter-spacing: var(--ls-wider); text-transform: uppercase; color: var(--color-text-secondary); }
    .form-input, .form-select, .form-textarea { font-family: var(--font-primary); font-size: var(--size-body-sm); color: var(--color-black); background-color: var(--color-white); border: 1px solid var(--color-border-default); border-radius: var(--radius-sm); padding: 0.75rem 1rem; outline: none; transition: border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard); width: 100%; -webkit-appearance: none; }
    .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--color-black); box-shadow: 0 0 0 3px rgba(0,0,0,0.06); }
    .form-textarea { resize: vertical; min-height: 120px; line-height: var(--lh-relaxed); }
    .form-submit { display: inline-flex; align-items: center; gap: var(--space-3); font-size: var(--size-body-sm); font-weight: var(--weight-medium); letter-spacing: var(--ls-wide); padding: 0.875rem 1.75rem; background-color: var(--color-black); color: var(--color-white); border-radius: var(--radius-sm); align-self: flex-start; transition: background-color var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard); will-change: transform; }
    .form-submit:hover { background-color: var(--color-navy); transform: translateY(-1px); }
    .form-submit:active { transform: translateY(0); }
    .form-submit .arrow { transition: transform var(--duration-fast) var(--ease-standard); }
    .form-submit:hover .arrow { transform: translateX(3px); }
    @media (max-width: 768px) { .contact__inner { grid-template-columns: 1fr; } .form-row { grid-template-columns: 1fr; } }
    .footer { background-color: var(--color-black); padding-block: var(--space-16) var(--space-10); }
    .footer__top { display: grid; grid-template-columns: 1fr 2fr; gap: var(--space-20); padding-bottom: var(--space-12); border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: var(--space-10); }
    .footer__brand { display: flex; align-items: flex-start; gap: var(--space-4); }
    .footer__tagline { font-size: var(--size-body-sm); font-weight: var(--weight-light); color: rgba(255,255,255,0.35); line-height: var(--lh-relaxed); margin-top: var(--space-4); max-width: 22ch; }
    .footer__nav { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-8); }
    .footer__nav-group-title { font-size: var(--size-caption); font-weight: var(--weight-semibold); letter-spacing: var(--ls-widest); text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: var(--space-4); }
    .footer__nav-links { display: flex; flex-direction: column; gap: var(--space-3); list-style: none; }
    .footer__nav-link { font-size: var(--size-body-sm); font-weight: var(--weight-light); color: rgba(255,255,255,0.5); transition: color var(--duration-fast) var(--ease-standard); }
    .footer__nav-link:hover { color: var(--color-white); }
    .footer__bottom { display: flex; justify-content: space-between; align-items: center; gap: var(--space-4); flex-wrap: wrap; }
    .footer__legal { font-size: var(--size-caption); color: rgba(255,255,255,0.2); }
    .footer__legal-links { display: flex; gap: var(--space-6); list-style: none; }
    .footer__legal-link { font-size: var(--size-caption); color: rgba(255,255,255,0.2); transition: color var(--duration-fast) var(--ease-standard); }
    .footer__legal-link:hover { color: rgba(255,255,255,0.5); }
    @media (max-width: 768px) { .footer__top { grid-template-columns: 1fr; } .footer__nav { grid-template-columns: 1fr 1fr; } .footer__bottom { flex-direction: column; align-items: flex-start; } }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
    .text-gold { color: var(--color-gold); }
    .progress-bar { position: fixed; top: 0; left: 0; height: 2px; background: var(--color-gold); z-index: 300; pointer-events: none; will-change: width; }
    .reveal-left { opacity: 0; transform: translateX(-40px); transition: opacity var(--duration-slow) var(--ease-decelerate), transform var(--duration-slow) var(--ease-decelerate); }
    .reveal-left.is-visible { opacity: 1; transform: translateX(0); }
    .reveal-right { opacity: 0; transform: translateX(40px); transition: opacity var(--duration-slow) var(--ease-decelerate), transform var(--duration-slow) var(--ease-decelerate); }
    .reveal-right.is-visible { opacity: 1; transform: translateX(0); }
    .reveal-scale { opacity: 0; transform: scale(0.93) translateY(24px); transition: opacity var(--duration-slow) var(--ease-decelerate), transform var(--duration-slow) var(--ease-decelerate); }
    .reveal-scale.is-visible { opacity: 1; transform: scale(1) translateY(0); }
    .reveal-left.reveal-delay-1, .reveal-right.reveal-delay-1, .reveal-scale.reveal-delay-1 { transition-delay: 80ms; }
    .reveal-left.reveal-delay-2, .reveal-right.reveal-delay-2, .reveal-scale.reveal-delay-2 { transition-delay: 160ms; }
    .reveal-left.reveal-delay-3, .reveal-right.reveal-delay-3, .reveal-scale.reveal-delay-3 { transition-delay: 240ms; }
    .reveal-left.reveal-delay-4, .reveal-right.reveal-delay-4, .reveal-scale.reveal-delay-4 { transition-delay: 320ms; }
    .reveal-left.reveal-delay-5, .reveal-right.reveal-delay-5, .reveal-scale.reveal-delay-5 { transition-delay: 400ms; }
    .label-tag::before { transform: scaleX(0); transform-origin: left; transition: transform 400ms var(--ease-decelerate) 120ms; }
    .is-visible .label-tag::before, .label-tag.is-visible::before { transform: scaleX(1); }
    .hero__label .label-tag::before { animation: lineGrow 400ms var(--ease-decelerate) 240ms both; }
    @keyframes lineGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
    .hero__word { display: inline-block; overflow: hidden; padding-bottom: 0.08em; margin-bottom: -0.08em; vertical-align: top; }
    .hero__word-inner { display: inline-block; opacity: 0; transform: translateY(105%); animation: wordUp var(--duration-slow) var(--ease-decelerate) both; }
    @keyframes wordUp { to { opacity: 1; transform: translateY(0); } }
    .belief__quote .quote-line { display: inline; overflow: hidden; padding-bottom: 0.06em; margin-bottom: -0.06em; }
    .belief__quote .quote-line-inner { display: inline; opacity: 0; transform: translateY(100%); transition: opacity 360ms var(--ease-decelerate), transform 360ms var(--ease-decelerate); }
    .belief__quote.is-visible .quote-line-inner { opacity: 1; transform: translateY(0); }
    .belief__quote.is-visible .quote-line:nth-child(1) .quote-line-inner { transition-delay: 0ms; }
    .belief__quote.is-visible .quote-line:nth-child(2) .quote-line-inner { transition-delay: 120ms; }
    .belief__quote.is-visible .quote-line:nth-child(3) .quote-line-inner { transition-delay: 240ms; }
    .gap-card__number { overflow: hidden; }
    .gap-card__number-digit { display: inline-block; opacity: 0; transform: translateY(110%); transition: opacity 320ms var(--ease-decelerate), transform 320ms var(--ease-decelerate); }
    .gap-card.is-visible .gap-card__number-digit { opacity: 1; transform: translateY(0); }
    .gap-card.is-visible .gap-card__number-digit:nth-child(1) { transition-delay: 40ms; }
    .gap-card.is-visible .gap-card__number-digit:nth-child(2) { transition-delay: 120ms; }
    /* WHERE WE SIT */
    .where-we-sit__inner { display: grid; grid-template-columns: 1fr 2fr; gap: var(--space-20); align-items: start; }
    .where-we-sit__title { font-size: var(--size-h2); font-weight: var(--weight-bold); letter-spacing: var(--ls-tight); line-height: var(--lh-snug); color: var(--color-black); margin-top: var(--space-6); max-width: 16ch; }
    .where-we-sit__intro { font-size: var(--size-body-lg); font-weight: var(--weight-light); line-height: var(--lh-relaxed); color: var(--color-text-secondary); max-width: 58ch; margin-bottom: var(--space-6); }
    .where-we-sit__grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-8); margin-top: var(--space-8); padding-top: var(--space-8); border-top: 1px solid var(--color-border-default); }
    .where-we-sit__col-label { font-size: var(--size-caption); font-weight: var(--weight-semibold); letter-spacing: var(--ls-widest); text-transform: uppercase; color: var(--color-gold); margin-bottom: var(--space-4); }
    .where-we-sit__list { list-style: none; display: flex; flex-direction: column; gap: var(--space-3); }
    .where-we-sit__list li { font-size: var(--size-body-sm); line-height: var(--lh-relaxed); color: var(--color-text-primary); padding-left: var(--space-4); position: relative; }
    .where-we-sit__list li::before { content: ''; position: absolute; left: 0; top: 0.6em; width: 6px; height: 1px; background: var(--color-gold); }
    .where-we-sit__list--not li { color: var(--color-text-secondary); }
    .where-we-sit__list--not li::before { background: var(--color-border-default); }
    @media (max-width: 900px) { .where-we-sit__inner { grid-template-columns: 1fr; } .where-we-sit__grid { grid-template-columns: 1fr; } }
  </style>
</head>

<body>

  <!-- NAVIGATION -->
  <header class="nav" id="nav" role="banner">
    <div class="nav__inner">
      <a href="/" class="nav__logo" aria-label="Playbook Advisory Group — home">
        <svg class="nav__mark" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="16" cy="16" r="15.5" stroke="#AB7F58" stroke-opacity="0.3"/>
          <path d="M16 5 L17.5 13.5 L26 12 L19 17 L26 22 L17.5 18.5 L16 27 L14.5 18.5 L6 22 L13 17 L6 12 L14.5 13.5 Z" fill="none" stroke="#AB7F58" stroke-width="1.2" stroke-linejoin="round"/>
          <circle cx="16" cy="16" r="2" fill="#AB7F58"/>
        </svg>
        <div>
          <div class="nav__wordmark">Playbook</div>
          <div style="font-size:0.6rem;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.4);transition:color 220ms;">Advisory Group</div>
        </div>
      </a>
      <nav aria-label="Primary navigation">
        <ul class="nav__links">
          <li><a href="#" class="nav__link">The Playbook model</a></li>
          <li><a href="#" class="nav__link">Services</a></li>
          <li><a href="#" class="nav__link">Sectors</a></li>
          <li><a href="#" class="nav__link">Insights</a></li>
        </ul>
      </nav>
      <button class="nav__toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="navDrawer">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <div class="nav__backdrop" id="navBackdrop" aria-hidden="true"></div>

  <nav class="nav__drawer" id="navDrawer" role="dialog" aria-modal="true" aria-label="Site navigation">
    <ul class="nav__drawer-links">
      <li><a href="#model"    class="nav__drawer-link">The Playbook model</a></li>
      <li><a href="#services" class="nav__drawer-link">Services</a></li>
      <li><a href="#"         class="nav__drawer-link">Sectors</a></li>
      <li><a href="#"         class="nav__drawer-link">Insights</a></li>
    </ul>
    <div class="nav__drawer-footer">
      <a href="#contact" class="nav__drawer-cta">
        Talk to Playbook
        <svg class="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      <p class="nav__drawer-tagline">Connecting you to clarity</p>
    </div>
  </nav>


  <!-- HERO -->
  <section class="hero" aria-labelledby="hero-heading">
    <video class="hero__video" src="../../web/public/videos/istockphoto-931929622-640_adpp_is.mp4" autoplay loop muted playsinline aria-hidden="true"></video>
    <div class="hero__grid" aria-hidden="true"></div>
    <div class="hero__content">
      <div class="hero__label">
        <span class="label-tag label-tag--on-dark">Senior-led, sponsor-side advisory</span>
      </div>
      <h1 class="hero__heading" id="hero-heading">
        Organisations don't lack experience. They lack a way to <em>remember it</em>.
      </h1>
      <p class="hero__sub">
        We strengthen the decisions that shape major programmes — and bring them under control when it matters most. Operating between board oversight and technical delivery, we remain independent from execution: ensuring decisions are clear, objective, and defensible.
      </p>
      <div class="hero__actions">
        <a href="#diagnostic" class="btn-primary">
          The Capital Governance Diagnostic
          <svg class="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="#model" class="btn-ghost">
          The Playbook model
          <svg class="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
    <div class="hero__scroll" aria-hidden="true">
      <div class="hero__scroll-line"></div>
      <span>Scroll</span>
    </div>
  </section>


  <!-- THE PROBLEM -->
  <section class="belief section" aria-labelledby="belief-heading">
    <div class="container">
      <div class="belief__inner">
        <div class="belief__eyebrow reveal">
          <span class="label-tag">The problem</span>
          <div class="belief__image">
            <img src="../images/sections/homepage-section-02.png" alt="" loading="lazy">
          </div>
        </div>
        <div class="belief__body">
          <blockquote class="belief__quote reveal">
            "Major programmes rarely fail in delivery. They fail in the decisions that precede it."
          </blockquote>
          <p class="belief__copy reveal reveal-delay-1">
            Unclear governance. Lack of clarity. Diffused accountability. Experience that never reaches the moment of decision. By the time issues become visible, risk is already embedded. We work with sponsors and senior leaders to bring structure, clarity, and control to the environments where those decisions are made.
          </p>
          <a href="#" class="belief__link reveal reveal-delay-2">
            How we work
            <svg class="arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>


  <!-- WHERE WE SIT -->
  <section class="where-we-sit section" aria-labelledby="where-heading">
    <div class="container">
      <div class="where-we-sit__inner">
        <div class="where-we-sit__left reveal">
          <span class="label-tag">Where we sit</span>
          <h2 class="where-we-sit__title" id="where-heading">
            Independent by design
          </h2>
        </div>
        <div class="where-we-sit__right">
          <p class="where-we-sit__intro reveal reveal-delay-1">
            Delivery capability is abundant. What is often missing is independent sponsor-side authority — ensuring decisions are clear, governance is robust, and programmes are set up to succeed before delivery begins.
          </p>
          <p class="where-we-sit__intro reveal reveal-delay-2">
            Our role sits earlier — and alongside — delivery. We work with sponsors to strengthen the authority, governance, and decision-making environment in which complex programmes are set up and run.
          </p>
          <div class="where-we-sit__grid reveal reveal-delay-3">
            <div class="where-we-sit__col">
              <div class="where-we-sit__col-label">We are</div>
              <ul class="where-we-sit__list">
                <li>Sponsor-side advisory, aligned to client interests</li>
                <li>Specialists in governance and decision quality</li>
                <li>Engaged early to reduce risk and strengthen outcomes</li>
                <li>Independent from delivery and execution</li>
              </ul>
            </div>
            <div class="where-we-sit__col">
              <div class="where-we-sit__col-label">We are not</div>
              <ul class="where-we-sit__list where-we-sit__list--not">
                <li>A design or construction consultancy</li>
                <li>A delivery-led project management firm</li>
                <li>Embedded resource or capacity support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- WHEN WE ARE ENGAGED -->
  <section class="gaps section" aria-labelledby="engagement-heading">
    <div class="container">
      <div class="gaps__header">
        <span class="label-tag reveal">When we are typically engaged</span>
        <h2 class="gaps__title reveal reveal-delay-1" id="engagement-heading">
          Three moments where independent advisory changes the outcome
        </h2>
      </div>
      <div class="gaps__grid" role="list">

        <article class="gap-card reveal" role="listitem">
          <div class="gap-card__number">01</div>
          <h3 class="gap-card__name">Before commitment</h3>
          <div class="gap-card__divider" aria-hidden="true"></div>
          <p class="gap-card__copy">
            Where a major scheme is being defined, we work with sponsors to scope complex programmes, strengthen governance, and ensure decisions are clear and aligned from the outset — establishing the clarity required to proceed with confidence.
          </p>
        </article>

        <article class="gap-card reveal reveal-delay-1" role="listitem">
          <div class="gap-card__number">02</div>
          <h3 class="gap-card__name">When programmes are under pressure</h3>
          <div class="gap-card__divider" aria-hidden="true"></div>
          <p class="gap-card__copy">
            Where a programme is drifting, unclear, or exposed, we establish where issues sit, bring structure to decision-making, and define a clear recovery plan — restoring the control and stable footing that the programme needs.
          </p>
        </article>

        <article class="gap-card reveal reveal-delay-2" role="listitem">
          <div class="gap-card__number">03</div>
          <h3 class="gap-card__name">When independent assurance is required</h3>
          <div class="gap-card__divider" aria-hidden="true"></div>
          <p class="gap-card__copy">
            Where sponsors, funders, or governance bodies require an independent view, we assess whether governance is functioning, whether decisions remain aligned to strategy, and whether risks are being appropriately managed.
          </p>
        </article>

      </div>
    </div>
  </section>


  <!-- SERVICES -->
  <section class="services section" id="services" aria-labelledby="services-heading">
    <div class="container">
      <div class="services__header">
        <div>
          <span class="label-tag reveal">What we do</span>
          <h2 class="services__title reveal reveal-delay-1" id="services-heading">
            Sponsor-side advisory, independent from delivery
          </h2>
        </div>
        <a href="#" class="belief__link reveal reveal-delay-2" style="white-space:nowrap;align-self:flex-end;">
          All services
          <svg class="arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>

      <div class="services__layout">
        <div class="services__image-panel reveal">
          <div class="services__image-frame">
            <img src="../images/sectors/sectors-private-development-02.png" alt="Sponsor-side advisory in practice" loading="lazy">
          </div>
          <p class="services__image-caption">Sponsor-side advisory</p>
        </div>

        <div class="services__list" role="list">

          <div class="service-row reveal" role="listitem" tabindex="0" aria-label="Capital investment strategy">
            <span class="service-row__index">01</span>
            <div class="service-row__content">
              <h3 class="service-row__title">Capital investment strategy</h3>
              <p class="service-row__desc">Upstream strategic advisory on major capital investment decisions — defining the governance structure, business case rationale, and decision framework before commitment.</p>
            </div>
            <div class="service-row__arrow" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 3h10v10M3 13L13 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </div>

          <div class="service-row reveal reveal-delay-1" role="listitem" tabindex="0" aria-label="Programme governance">
            <span class="service-row__index">02</span>
            <div class="service-row__content">
              <h3 class="service-row__title">Programme governance</h3>
              <p class="service-row__desc">Designing and strengthening governance frameworks that direct complex programmes with clarity — establishing accountabilities, decision disciplines, and escalation structures.</p>
            </div>
            <div class="service-row__arrow" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 3h10v10M3 13L13 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </div>

          <div class="service-row reveal reveal-delay-2" role="listitem" tabindex="0" aria-label="Sponsor-side advisory">
            <span class="service-row__index">03</span>
            <div class="service-row__content">
              <h3 class="service-row__title">Sponsor-side advisory</h3>
              <p class="service-row__desc">Acting exclusively for the client as an extension of the senior leadership team — providing independent challenge, objective oversight, and protected decision space.</p>
            </div>
            <div class="service-row__arrow" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 3h10v10M3 13L13 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </div>

          <div class="service-row reveal reveal-delay-3" role="listitem" tabindex="0" aria-label="Programme health diagnostics and project recovery">
            <span class="service-row__index">04</span>
            <div class="service-row__content">
              <h3 class="service-row__title">Programme health diagnostics and project recovery</h3>
              <p class="service-row__desc">Rapid, structured assessment of programmes in distress — identifying root causes, restoring governance clarity, and creating the conditions for recovery.</p>
            </div>
            <div class="service-row__arrow" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 3h10v10M3 13L13 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </div>

          <div class="service-row reveal reveal-delay-4" role="listitem" tabindex="0" aria-label="Funding and business case advisory">
            <span class="service-row__index">05</span>
            <div class="service-row__content">
              <h3 class="service-row__title">Funding and business case advisory</h3>
              <p class="service-row__desc">Supporting the development of investment cases and funding submissions that hold under scrutiny — structuring the argument, evidence base, and approval pathway.</p>
            </div>
            <div class="service-row__arrow" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 3h10v10M3 13L13 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>


  <!-- THE PLAYBOOK MODEL -->
  <section class="model-band section--tight" id="model" aria-labelledby="model-heading">
    <div class="container">
      <div class="model-band__header reveal">
        <div class="model-band__intro">
          <span class="label-tag label-tag--on-dark">The Playbook model</span>
          <h2 class="model-band__title" id="model-heading">
            How experience becomes institutional judgement
          </h2>
          <p class="model-band__copy">
            Organisations don't lack experience. They lack a way to remember it. The Playbook model describes the four-stage progression that closes that gap.
          </p>
        </div>
        <a href="#" class="btn-outline-light">
          Explore the model
          <svg class="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>

      <div class="model-stages reveal" role="tablist" aria-label="The Playbook Model stages">
        <div class="model-stage model-stage--active" role="tab" aria-selected="true" tabindex="0" data-stage="0">
          <div class="model-stage__number">01</div>
          <div class="model-stage__name">Experience</div>
          <div class="model-stage__desc">Experience teaches the lesson. Complex programmes generate the raw material — but only if it is captured before it walks out of the door.</div>
          <div class="model-stage__bar"><div class="model-stage__bar-fill"></div></div>
        </div>
        <div class="model-stage" role="tab" aria-selected="false" tabindex="-1" data-stage="1">
          <div class="model-stage__number">02</div>
          <div class="model-stage__name">Insight</div>
          <div class="model-stage__desc">Insight recognises the pattern. Experience becomes insight when organisations can see what recurs — across programmes, decisions, and failures.</div>
          <div class="model-stage__bar"><div class="model-stage__bar-fill"></div></div>
        </div>
        <div class="model-stage" role="tab" aria-selected="false" tabindex="-1" data-stage="2">
          <div class="model-stage__number">03</div>
          <div class="model-stage__name">Judgement</div>
          <div class="model-stage__desc">Judgement guides the decision. Insight becomes judgement when patterns are translated into principles that hold under pressure and scrutiny.</div>
          <div class="model-stage__bar"><div class="model-stage__bar-fill"></div></div>
        </div>
        <div class="model-stage" role="tab" aria-selected="false" tabindex="-1" data-stage="3">
          <div class="model-stage__number">04</div>
          <div class="model-stage__name">Institutional memory</div>
          <div class="model-stage__desc">A playbook ensures the lesson is not forgotten. Judgement is codified so it survives beyond individuals — and reaches the next decision when the stakes are high.</div>
          <div class="model-stage__bar"><div class="model-stage__bar-fill"></div></div>
        </div>
      </div>

    </div>
  </section>


  <!-- SECTORS -->
  <section class="sectors section" aria-labelledby="sectors-heading">
    <div class="container">
      <div class="sectors__header">
        <span class="label-tag reveal">Sectors we serve</span>
        <h2 class="sectors__title reveal reveal-delay-1" id="sectors-heading">
          Senior-led advisory across public, private, and infrastructure
        </h2>
      </div>
      <div class="sectors__grid">
        <article class="sector-card reveal" tabindex="0">
          <div class="sector-card__image">
            <img src="../images/sectors/sectors-public-infrastructure-01.png" alt="Public sector capital programme" loading="lazy">
          </div>
          <div class="sector-card__body">
            <h3 class="sector-card__name">Public sector</h3>
            <p class="sector-card__sub">Local authorities, NHS trusts, and higher education institutions — navigating political complexity, audit scrutiny, and the accountability structures of public capital programmes.</p>
            <div class="sector-card__tags">
              <span class="tag">Local authority</span>
              <span class="tag">Healthcare</span>
              <span class="tag">Higher education</span>
            </div>
          </div>
        </article>
        <article class="sector-card reveal reveal-delay-1" tabindex="0">
          <div class="sector-card__image">
            <img src="../images/sectors/sectors-private-development-02.png" alt="Private sector development" loading="lazy">
          </div>
          <div class="sector-card__body">
            <h3 class="sector-card__name">Private sector</h3>
            <p class="sector-card__sub">Developer sponsors, regeneration leads, manufacturers, and commercial operators — strengthening governance where investment scale demands independent discipline.</p>
            <div class="sector-card__tags">
              <span class="tag">Regeneration</span>
              <span class="tag">Manufacturing</span>
              <span class="tag">Commercial</span>
            </div>
          </div>
        </article>
        <article class="sector-card reveal reveal-delay-2" tabindex="0">
          <div class="sector-card__image">
            <img src="../images/sectors/sectors-healthcare-03.png" alt="Infrastructure and healthcare" loading="lazy">
          </div>
          <div class="sector-card__body">
            <h3 class="sector-card__name">Infrastructure</h3>
            <p class="sector-card__sub">Logistics, transport, highways, utilities, and defence — complex long-duration programmes where independent governance authority and decision discipline are structurally critical.</p>
            <div class="sector-card__tags">
              <span class="tag">Transport</span>
              <span class="tag">Utilities</span>
              <span class="tag">Defence</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>


  <!-- INSIGHTS -->
  <section class="insights section" aria-labelledby="insights-heading">
    <div class="container">
      <div class="insights__header">
        <div>
          <span class="label-tag reveal">Thought leadership</span>
          <h2 class="insights__title reveal reveal-delay-1" id="insights-heading">
            Perspectives on governance, capital programmes, and decision quality
          </h2>
        </div>
        <a href="#" class="belief__link reveal reveal-delay-2" style="white-space:nowrap;align-self:flex-end;">
          All insights
          <svg class="arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
      <div class="insights__grid">
        <article class="insight-card reveal">
          <div class="insight-card__image">
            <img src="../images/hero/hero-governance-briefing-02.png" alt="" loading="lazy" class="insight-card__img">
            <div class="insight-card__image-overlay"></div>
          </div>
          <div class="insight-card__meta">
            <span class="insight-card__tag">Governance</span>
            <span class="insight-card__dot" aria-hidden="true"></span>
            <time class="insight-card__date" datetime="2026-03-10">10 March 2026</time>
          </div>
          <h3 class="insight-card__title">The most expensive lessons in any programme are the ones that must be learned twice</h3>
          <p class="insight-card__excerpt">Why the Memory Gap, Translation Gap, and Decision Gap repeat — and what structurally closes them before financial commitment.</p>
          <a href="#" class="insight-card__link">Read article <svg class="arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
        </article>
        <article class="insight-card reveal reveal-delay-1">
          <div class="insight-card__image">
            <img src="../images/insights/insights-architectural-detail-02.png" alt="" loading="lazy" class="insight-card__img">
            <div class="insight-card__image-overlay"></div>
          </div>
          <div class="insight-card__meta">
            <span class="insight-card__tag">Healthcare</span>
            <span class="insight-card__dot" aria-hidden="true"></span>
            <time class="insight-card__date" datetime="2026-02-24">24 February 2026</time>
          </div>
          <h3 class="insight-card__title">Why NHS capital programmes drift: diffuse accountability and the governance bridge</h3>
          <p class="insight-card__excerpt">The structural conditions that allow NHS capital programmes to escalate in cost and complexity — and where independent sponsor-side advisory changes the outcome.</p>
          <a href="#" class="insight-card__link">Read article <svg class="arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
        </article>
        <article class="insight-card reveal reveal-delay-2">
          <div class="insight-card__image">
            <img src="../images/insights/insights-structural-detail-04.png" alt="" loading="lazy" class="insight-card__img">
            <div class="insight-card__image-overlay"></div>
          </div>
          <div class="insight-card__meta">
            <span class="insight-card__tag">Regeneration</span>
            <span class="insight-card__dot" aria-hidden="true"></span>
            <time class="insight-card__date" datetime="2026-02-07">7 February 2026</time>
          </div>
          <h3 class="insight-card__title">What the Governance Bridge looks like in residential regeneration</h3>
          <p class="insight-card__excerpt">How the space between Board oversight and programme delivery creates risk in mixed-use schemes — and how structured sponsor-side advisory fills it.</p>
          <a href="#" class="insight-card__link">Read article <svg class="arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
        </article>
      </div>
    </div>
  </section>


  <!-- DIAGNOSTIC CTA -->
  <section class="diagnostic section" id="diagnostic" aria-labelledby="diagnostic-heading">
    <div class="container">
      <div class="diagnostic__inner diagnostic--meet">
        <div class="diagnostic__content">
          <div class="diagnostic__eyebrow">
            <span class="label-tag label-tag--on-dark">Every engagement begins with clarity</span>
          </div>
          <h2 class="diagnostic__title" id="diagnostic-heading">
            The Capital Governance Diagnostic
          </h2>
          <p class="diagnostic__copy">
            Whether we are engaged to set up a programme, restore control, or provide independent assurance, the first step is always the same. We establish a clear, structured understanding of how decisions are being made, where risks sit, and where governance needs to strengthen — before delivery begins and significant commitments are made.
          </p>
          <a href="#contact" class="btn-primary">
            Request the Diagnostic
            <svg class="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
        <div class="diagnostic__image">
          <img src="../images/services/services-walkthrough-06.png" alt="Governance advisory session in progress" loading="lazy">
        </div>
      </div>
    </div>
  </section>


  <!-- CONTACT -->
  <section class="contact section--tight" id="contact" aria-labelledby="contact-heading">
    <div class="container">
      <div class="contact__inner">
        <div class="reveal">
          <span class="label-tag">Talk to Playbook</span>
          <h2 class="contact__title" id="contact-heading">Start with a conversation</h2>
          <p class="contact__copy">
            Playbook operates as an extension of the senior leadership team. If you are dealing with a complex programme — or want to strengthen governance before problems arise — speak with us directly.
          </p>
          <div class="contact__offices" aria-label="Our offices">
            <div class="office">
              <span class="office__label">Headquarters</span>
              <address class="office__address" style="font-style:normal;">Spencer Yard<br>Leamington Spa</address>
            </div>
            <div class="office">
              <span class="office__label">Midlands</span>
              <address class="office__address" style="font-style:normal;">Jewellery Quarter<br>Birmingham</address>
            </div>
            <div class="office">
              <span class="office__label">Email</span>
              <a href="mailto:hello@playbook-group.co.uk" class="office__address" style="color:inherit;border-bottom:1px solid var(--color-border-default);display:inline-block;padding-bottom:2px;transition:color 140ms,border-color 140ms;">hello@playbook-group.co.uk</a>
            </div>
          </div>
        </div>
        <form class="contact__form reveal reveal-delay-1" novalidate aria-label="Contact form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="name">Name</label>
              <input class="form-input" type="text" id="name" name="name" autocomplete="name" placeholder="Your name" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="org">Organisation</label>
              <input class="form-input" type="text" id="org" name="organisation" placeholder="Your organisation" required>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input class="form-input" type="email" id="email" name="email" autocomplete="email" placeholder="your@email.com" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="subject">Subject</label>
            <select class="form-select" id="subject" name="subject">
              <option value="" disabled selected>Select a subject</option>
              <option value="diagnostic">Capital Governance Diagnostic</option>
              <option value="governance">Programme governance</option>
              <option value="advisory">Sponsor-side advisory</option>
              <option value="recovery">Programme health / recovery</option>
              <option value="general">General enquiry</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="message">Message</label>
            <textarea class="form-textarea" id="message" name="message" placeholder="Briefly describe the programme or challenge you are working with&#8230;"></textarea>
          </div>
          <button type="submit" class="form-submit">
            Send enquiry
            <svg class="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  </section>


  <!-- FOOTER -->
  <footer class="footer" aria-label="Site footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <div>
            <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem;">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="15.5" stroke="#AB7F58" stroke-opacity="0.3"/>
                <path d="M16 5 L17.5 13.5 L26 12 L19 17 L26 22 L17.5 18.5 L16 27 L14.5 18.5 L6 22 L13 17 L6 12 L14.5 13.5 Z" fill="none" stroke="#AB7F58" stroke-width="1.2" stroke-linejoin="round"/>
                <circle cx="16" cy="16" r="2" fill="#AB7F58"/>
              </svg>
              <span style="font-size:0.8rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:rgba(255,255,255,0.7);">Playbook Advisory Group</span>
            </div>
            <p class="footer__tagline">Connecting you to clarity.<br>Senior-led, sponsor-side advisory for capital programmes.</p>
          </div>
        </div>
        <nav class="footer__nav" aria-label="Footer navigation">
          <div>
            <h3 class="footer__nav-group-title">Advisory</h3>
            <ul class="footer__nav-links">
              <li><a href="#" class="footer__nav-link">Capital investment strategy</a></li>
              <li><a href="#" class="footer__nav-link">Programme governance</a></li>
              <li><a href="#" class="footer__nav-link">Sponsor-side advisory</a></li>
              <li><a href="#" class="footer__nav-link">Health diagnostics</a></li>
              <li><a href="#" class="footer__nav-link">Funding and business case</a></li>
            </ul>
          </div>
          <div>
            <h3 class="footer__nav-group-title">Company</h3>
            <ul class="footer__nav-links">
              <li><a href="#" class="footer__nav-link">The Playbook model</a></li>
              <li><a href="#" class="footer__nav-link">Sectors</a></li>
              <li><a href="#" class="footer__nav-link">Insights</a></li>
              <li><a href="#" class="footer__nav-link">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 class="footer__nav-group-title">Connect</h3>
            <ul class="footer__nav-links">
              <li><a href="mailto:hello@playbook-group.co.uk" class="footer__nav-link">hello@playbook-group.co.uk</a></li>
              <li><a href="#" class="footer__nav-link">LinkedIn</a></li>
              <li><a href="#" class="footer__nav-link">Spencer Yard, Leamington Spa</a></li>
              <li><a href="#" class="footer__nav-link">Jewellery Quarter, Birmingham</a></li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="footer__bottom">
        <p class="footer__legal">&copy; 2026 Playbook Advisory Group Limited. Registered in England and Wales.</p>
        <ul class="footer__legal-links">
          <li><a href="#" class="footer__legal-link">Privacy policy</a></li>
          <li><a href="#" class="footer__legal-link">Legal notices</a></li>
          <li><a href="#" class="footer__legal-link">Carbon Reduction Policy</a></li>
        </ul>
      </div>
    </div>
  </footer>


  <script>
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const nav        = document.getElementById('nav');
    const navSubline = nav.querySelector('[style*="Advisory Group"]');
    const hero       = document.querySelector('.hero');

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.setAttribute('aria-hidden', 'true');
    document.body.prepend(progressBar);

    let scrollTicking = false;
    let lastScrollY   = 0;

    function onScrollFrame() {
      const scrollY = lastScrollY;
      const viewH   = window.innerHeight;
      const docH    = document.documentElement.scrollHeight;
      const isScrolled = scrollY > 40;
      nav.classList.toggle('is-scrolled', isScrolled);
      if (navSubline) {
        navSubline.style.color = isScrolled ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)';
      }
      const progress = docH > viewH ? (scrollY / (docH - viewH)) * 100 : 0;
      progressBar.style.width = Math.min(progress, 100) + '%';
      if (!prefersReducedMotion && hero && scrollY < viewH * 1.4) {
        hero.style.backgroundPositionY = 'calc(30% + ' + (scrollY * 0.22) + 'px)';
      }
      scrollTicking = false;
    }

    window.addEventListener('scroll', () => {
      lastScrollY = window.scrollY;
      if (!scrollTicking) {
        requestAnimationFrame(onScrollFrame);
        scrollTicking = true;
      }
    }, { passive: true });

    (function () {
      const toggle   = document.getElementById('navToggle');
      const drawer   = document.getElementById('navDrawer');
      const backdrop = document.getElementById('navBackdrop');
      if (!toggle || !drawer || !backdrop) return;
      let isOpen = false;
      function openMenu() {
        isOpen = true;
        toggle.classList.add('is-open');
        drawer.classList.add('is-open');
        backdrop.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close menu');
        document.body.style.overflow = 'hidden';
        setTimeout(() => drawer.querySelector('.nav__drawer-link')?.focus(), 380);
      }
      function closeMenu() {
        isOpen = false;
        toggle.classList.remove('is-open');
        drawer.classList.remove('is-open');
        backdrop.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
      }
      toggle.addEventListener('click', () => isOpen ? closeMenu() : openMenu());
      backdrop.addEventListener('click', closeMenu);
      drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
      document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) closeMenu(); });
      drawer.addEventListener('keydown', e => {
        if (e.key !== 'Tab' || !isOpen) return;
        const focusable = Array.from(drawer.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])'));
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });
    })();

    function buildHeroHeading() {
      const heading = document.querySelector('.hero__heading');
      if (!heading || prefersReducedMotion) return;
      heading.style.opacity = '1';
      heading.style.animation = 'none';
      const plain  = ['Organisations', "don't", 'lack', 'experience.', 'They', 'lack', 'a', 'way', 'to'];
      const accent = ['remember', 'it.'];
      let delay = 280;
      const step = 58;
      function makeWord(text, d) {
        const outer = document.createElement('span');
        outer.className = 'hero__word';
        const inner = document.createElement('span');
        inner.className = 'hero__word-inner';
        inner.style.animationDelay = d + 'ms';
        inner.textContent = text;
        outer.appendChild(inner);
        return outer;
      }
      heading.innerHTML = '';
      plain.forEach((word, i) => {
        if (i > 0) heading.appendChild(document.createTextNode(' '));
        heading.appendChild(makeWord(word, delay));
        delay += step;
      });
      heading.appendChild(document.createTextNode(' '));
      const em = document.createElement('em');
      accent.forEach((word, i) => {
        if (i > 0) em.appendChild(document.createTextNode(' '));
        em.appendChild(makeWord(word, delay));
        delay += step;
      });
      heading.appendChild(em);
    }

    buildHeroHeading();

    function buildBeliefQuote() {
      const quote = document.querySelector('.belief__quote');
      if (!quote || prefersReducedMotion) return;
      const lines = [
        '"Major programmes rarely fail in delivery.',
        'They fail in the decisions that precede it."'
      ];
      quote.innerHTML = lines.map(line =>
        '<span class="quote-line"><span class="quote-line-inner">' + line + '</span></span>'
      ).join('');
    }

    buildBeliefQuote();

    function buildGapNumbers() {
      document.querySelectorAll('.gap-card__number').forEach(el => {
        const text = el.textContent.trim();
        el.innerHTML = [...text].map(ch => '<span class="gap-card__number-digit">' + ch + '</span>').join('');
      });
    }

    buildGapNumbers();

    function upgradeRevealClasses() {
      document.querySelectorAll('.gap-card, .sector-card, .insight-card').forEach(el => {
        el.classList.replace('reveal', 'reveal-scale');
      });
      document.querySelectorAll('.services__image-panel').forEach(el => {
        el.classList.replace('reveal', 'reveal-left');
      });
      document.querySelectorAll('.service-row').forEach(el => {
        el.classList.replace('reveal', 'reveal-left');
      });
      document.querySelectorAll('.contact__form').forEach(el => {
        el.classList.replace('reveal', 'reveal-right');
      });
      const beliefQuote = document.querySelector('.belief__quote');
      if (beliefQuote && !beliefQuote.classList.contains('reveal')) {
        beliefQuote.classList.add('reveal');
      }
    }

    upgradeRevealClasses();

    const allRevealEls = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-cascade, .diagnostic--meet'
    );

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

    if (prefersReducedMotion) {
      allRevealEls.forEach(el => el.classList.add('is-visible'));
      const heading = document.querySelector('.hero__heading');
      if (heading) { heading.style.opacity = '1'; heading.style.animation = 'none'; }
      document.querySelectorAll('.hero__word-inner').forEach(w => {
        w.style.opacity = '1'; w.style.transform = 'none'; w.style.animation = 'none';
      });
    } else {
      allRevealEls.forEach(el => revealObserver.observe(el));
    }

    document.querySelectorAll('.btn-primary, .btn-outline-light, .btn-ghost').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width  / 2) * 0.12;
        const y = (e.clientY - r.top  - r.height / 2) * 0.18;
        btn.style.transform = 'translate(' + x + 'px, ' + y + 'px) translateY(-1px)';
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });

    document.querySelectorAll('.service-row').forEach(row => {
      row.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); row.classList.toggle('kb-active'); }
      });
    });

    (function () {
      const stages   = Array.from(document.querySelectorAll('.model-stage'));
      const stagesEl = document.querySelector('.model-stages');
      if (!stages.length || !stagesEl) return;
      let current   = 0;
      let timer     = null;
      let isRunning = false;
      function activateStage(index, resetTimer) {
        stages.forEach((s, i) => {
          const active = i === index;
          s.classList.toggle('model-stage--active', active);
          s.setAttribute('aria-selected', active);
          s.setAttribute('tabindex', active ? '0' : '-1');
          const fill = s.querySelector('.model-stage__bar-fill');
          if (fill) {
            fill.style.animation = 'none';
            fill.offsetHeight;
            if (active) fill.style.animation = '';
          }
        });
        current = index;
        if (resetTimer && isRunning) { clearInterval(timer); timer = setInterval(advance, 3000); }
      }
      function advance() { activateStage((current + 1) % stages.length, false); }
      function startCycle() { if (isRunning) return; isRunning = true; timer = setInterval(advance, 3000); }
      function stopCycle() { isRunning = false; clearInterval(timer); }
      const modelObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) startCycle(); else stopCycle(); });
      }, { threshold: 0.25 });
      modelObserver.observe(stagesEl);
      stages.forEach((stage, i) => {
        stage.addEventListener('click', () => activateStage(i, true));
        stage.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateStage(i, true); }
          if (e.key === 'ArrowRight') activateStage((i + 1) % stages.length, true);
          if (e.key === 'ArrowLeft')  activateStage((i + stages.length - 1) % stages.length, true);
        });
      });
      if (prefersReducedMotion) stopCycle();
    })();

    document.querySelectorAll('.gap-card').forEach(card => { card.setAttribute('tabindex', '0'); });

    const navSections = document.querySelectorAll('section[id]');
    const navLinks    = document.querySelectorAll('.nav__link');
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === '#' + id;
          link.style.opacity = isActive && nav.classList.contains('is-scrolled') ? '1' : '';
        });
      });
    }, { threshold: 0.45, rootMargin: '-80px 0px 0px 0px' });
    navSections.forEach(s => navObserver.observe(s));

    const form       = document.querySelector('.contact__form');
    const formSubmit = document.querySelector('.form-submit');
    if (form && formSubmit) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        formSubmit.textContent = 'Sending\u2026';
        formSubmit.style.opacity = '0.7';
        formSubmit.disabled = true;
        setTimeout(() => {
          formSubmit.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8l3.5 3.5L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Enquiry sent';
          formSubmit.style.opacity = '1';
          formSubmit.style.backgroundColor = 'var(--color-navy)';
        }, 1200);
      });
    }

    document.querySelectorAll('.sector-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r   = card.getBoundingClientRect();
        const x   = (e.clientX - r.left)  / r.width  - 0.5;
        const y   = (e.clientY - r.top)   / r.height - 0.5;
        card.style.transform = 'translateY(-4px) rotateX(' + (-y * 4) + 'deg) rotateY(' + (x * 4) + 'deg)';
        card.style.boxShadow = (-x * 8) + 'px ' + (-y * 8 + 8) + 'px 32px rgba(0,0,0,0.10)';
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; card.style.boxShadow = ''; });
    });
  </script>

</body>
</html>"""

with open(out, 'w', encoding='utf-8') as f:
    f.write(html)

print("Done. Bytes written:", len(html.encode('utf-8')))
