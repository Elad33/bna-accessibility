/*! BNA — Accessibility widget config (shared across all landing pages).
 *  Edit these values once here; every page that loads this file updates. */
window.A11yWidgetConfig = {
  position: 'right',          // 'right' | 'left'
  color:    '#1d4ed8',        // BNA brand color — change to your brand (keep AA contrast on white)
  lang:     'he',
  hotkey:   'alt+shift+a',
  statement: {
    orgName:         'BNA',
    coordinatorName: 'אלעד אשר',
    coordinatorRole: 'רכז נגישות',
    phone:           '054-2000-179',
    email:           '',        // recommended: add an accessibility email
    fax:             '',
    updated:         '10/06/2026',
    conformance:     'AA',
    limitations:     'ייתכנו תכנים של צד שלישי (סרטונים, מפות) שאינם נגישים במלואם. אנו פועלים לתיקון מתמשך.'
  }
};

/*!
 * A11y Widget — תפריט נגישות מוטמע
 * ----------------------------------------------------------------------------
 * כפתור/תפריט נגישות עצמאי (vanilla JS, ללא תלויות) להטמעה בכל אתר.
 * מותאם לדרישות החוק הישראלי (ת"י 5568 / WCAG 2.0–2.1 רמה AA) וסע' 35
 * לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות).
 *
 * הטמעה:
 *   <script>
 *     window.A11yWidgetConfig = {
 *       position: 'right',          // 'right' | 'left'
 *       color:    '#1d4ed8',        // צבע המותג (חייב ניגודיות AA מול לבן)
 *       lang:     'he',             // 'he' | 'en'
 *       hotkey:   'alt+shift+a',    // קיצור לפתיחת התפריט
 *       statement: {
 *         orgName: 'שם הארגון',
 *         coordinatorName: 'שם רכז הנגישות',
 *         coordinatorRole: 'רכז נגישות',
 *         phone: '03-0000000',
 *         email: 'access@example.co.il',
 *         fax: '',
 *         updated: '2026-06-10',
 *         conformance: 'AA',
 *         url: '/accessibility-statement.html', // אופציונלי: קישור לעמוד מלא
 *         limitations: 'תכנים של צד שלישי עשויים שלא להיות נגישים במלואם.'
 *       }
 *     };
 *   </script>
 *   <script src="a11y-widget.js" defer></script>
 *
 * הערה משפטית: הווידג'ט הוא תוסף עזר. הוא אינו תחליף להנגשת האתר עצמו
 * (HTML סמנטי, ניגודיות, ניווט מקלדת, טקסט חלופי וכו').
 * ----------------------------------------------------------------------------
 */
(function () {
  'use strict';

  if (window.__A11yWidgetLoaded) return;
  window.__A11yWidgetLoaded = true;

  /* ----------------------------------------------------------------------- *
   * 1. קונפיגורציה
   * ----------------------------------------------------------------------- */
  var scriptEl = document.currentScript;
  function dataAttr(name, fallback) {
    if (scriptEl && scriptEl.dataset && scriptEl.dataset[name] != null && scriptEl.dataset[name] !== '') {
      return scriptEl.dataset[name];
    }
    return fallback;
  }

  var userCfg = window.A11yWidgetConfig || {};
  var CONFIG = {
    position: dataAttr('position', userCfg.position || 'right'),
    color: dataAttr('color', userCfg.color || '#1d4ed8'),
    lang: dataAttr('lang', userCfg.lang || 'he'),
    hotkey: (dataAttr('hotkey', userCfg.hotkey || 'alt+shift+a') || '').toLowerCase(),
    showCredit: String(dataAttr('credit', userCfg.showCredit != null ? userCfg.showCredit : true)) !== 'false',
    statement: userCfg.statement || {}
  };

  var STORAGE_KEY = 'a11y-widget-state-v1';

  /* ----------------------------------------------------------------------- *
   * 2. תרגומים (i18n)
   * ----------------------------------------------------------------------- */
  var I18N = {
    he: {
      dir: 'rtl',
      openLabel: 'פתיחת תפריט נגישות',
      title: 'תפריט נגישות',
      close: 'סגירה',
      reset: 'איפוס הגדרות',
      statement: 'הצהרת נגישות',
      shortcuts: 'קיצורי מקלדת',
      langBtn: 'English',
      groupText: 'התאמות טקסט',
      groupColor: 'צבע וניגודיות',
      groupTools: 'ניווט ועזרים',
      fontSize: 'גודל טקסט',
      lineHeight: 'ריווח שורות',
      letterSpacing: 'ריווח אותיות',
      wordSpacing: 'ריווח מילים',
      readableFont: 'גופן קריא',
      textAlign: 'יישור טקסט',
      highlightTitles: 'הדגשת כותרות',
      highlightLinks: 'הדגשת קישורים',
      contrastDark: 'ניגודיות כהה',
      contrastLight: 'ניגודיות בהירה',
      contrastInvert: 'היפוך צבעים',
      monochrome: 'גווני אפור',
      lowSaturation: 'רוויה נמוכה',
      highSaturation: 'רוויה גבוהה',
      bigCursor: 'סמן גדול',
      readingGuide: 'מדריך קריאה',
      readingMask: 'מסכת קריאה',
      stopAnimations: 'עצירת אנימציות',
      keyboardNav: 'ניווט מקלדת',
      skipToContent: 'דילוג לתוכן',
      readAloud: 'הקראה קולית',
      decrease: 'הקטנה',
      increase: 'הגדלה',
      off: 'כבוי',
      on: 'פעיל',
      stmtTitle: 'הצהרת נגישות',
      stmtIntro: 'אנו רואים חשיבות רבה במתן שירות שוויוני לכלל הגולשים ופועלים להנגשת האתר בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג–2013, ולתקן הישראלי ת"י 5568 המבוסס על הנחיות WCAG 2.0 ברמה AA.',
      stmtArrangements: 'הסדרי הנגישות באתר',
      stmtArrangementsBody: 'באתר מוטמע תפריט נגישות המאפשר התאמת התצוגה: הגדלת טקסט, ריווח, ניגודיות גבוהה, היפוך צבעים, גווני אפור, הדגשת קישורים וכותרות, סמן גדול, מדריך ומסכת קריאה, עצירת אנימציות, ניווט מקלדת והקראה קולית. ההגדרות נשמרות לאורך הגלישה.',
      stmtConformance: 'רמת הנגישות',
      stmtConformanceBody: 'האתר עומד בדרישות התקן הישראלי ת"י 5568 ברמת התאמה ',
      stmtLimitations: 'מגבלות ידועות',
      stmtContactTitle: 'פנייה בנושא נגישות',
      stmtContactBody: 'אם נתקלתם בקושי בנגישות האתר, נשמח שתפנו אל רכז הנגישות שלנו:',
      stmtCoordinator: 'רכז נגישות',
      stmtPhone: 'טלפון',
      stmtEmail: 'דוא"ל',
      stmtFax: 'פקס',
      stmtUpdated: 'עודכן בתאריך',
      stmtFullPage: 'למעבר להצהרת הנגישות המלאה',
      shortcutsTitle: 'קיצורי מקלדת',
      shortcutsToggle: 'פתיחה/סגירה של תפריט הנגישות',
      shortcutsClose: 'סגירת התפריט',
      shortcutsTab: 'מעבר בין הפקדים',
      shortcutsActivate: 'הפעלת פקד',
      credit: 'תפריט נגישות'
    },
    en: {
      dir: 'ltr',
      openLabel: 'Open accessibility menu',
      title: 'Accessibility Menu',
      close: 'Close',
      reset: 'Reset settings',
      statement: 'Accessibility statement',
      shortcuts: 'Keyboard shortcuts',
      langBtn: 'עברית',
      groupText: 'Text adjustments',
      groupColor: 'Color & contrast',
      groupTools: 'Navigation & tools',
      fontSize: 'Text size',
      lineHeight: 'Line spacing',
      letterSpacing: 'Letter spacing',
      wordSpacing: 'Word spacing',
      readableFont: 'Readable font',
      textAlign: 'Text align',
      highlightTitles: 'Highlight headings',
      highlightLinks: 'Highlight links',
      contrastDark: 'Dark contrast',
      contrastLight: 'Light contrast',
      contrastInvert: 'Invert colors',
      monochrome: 'Grayscale',
      lowSaturation: 'Low saturation',
      highSaturation: 'High saturation',
      bigCursor: 'Big cursor',
      readingGuide: 'Reading guide',
      readingMask: 'Reading mask',
      stopAnimations: 'Stop animations',
      keyboardNav: 'Keyboard navigation',
      skipToContent: 'Skip to content',
      readAloud: 'Read aloud',
      decrease: 'Decrease',
      increase: 'Increase',
      off: 'Off',
      on: 'On',
      stmtTitle: 'Accessibility Statement',
      stmtIntro: 'We are committed to providing equal service to all users and to making this site accessible in accordance with the Israeli Equal Rights for Persons with Disabilities Regulations (Service Accessibility Accommodations), 2013, and Israeli Standard IS 5568, based on WCAG 2.0 Level AA.',
      stmtArrangements: 'Accessibility arrangements',
      stmtArrangementsBody: 'This site includes an accessibility menu allowing display adjustments: larger text, spacing, high contrast, color inversion, grayscale, link & heading highlighting, big cursor, reading guide & mask, animation stopping, keyboard navigation and read-aloud. Settings persist across the session.',
      stmtConformance: 'Conformance level',
      stmtConformanceBody: 'The site conforms to Israeli Standard IS 5568 at conformance level ',
      stmtLimitations: 'Known limitations',
      stmtContactTitle: 'Accessibility contact',
      stmtContactBody: 'If you encounter an accessibility issue, please contact our accessibility coordinator:',
      stmtCoordinator: 'Accessibility coordinator',
      stmtPhone: 'Phone',
      stmtEmail: 'Email',
      stmtFax: 'Fax',
      stmtUpdated: 'Last updated',
      stmtFullPage: 'Go to the full accessibility statement',
      shortcutsTitle: 'Keyboard shortcuts',
      shortcutsToggle: 'Open / close the accessibility menu',
      shortcutsClose: 'Close the menu',
      shortcutsTab: 'Move between controls',
      shortcutsActivate: 'Activate a control',
      credit: 'Accessibility menu'
    }
  };

  function t(key) {
    var lang = state.lang || CONFIG.lang;
    return (I18N[lang] && I18N[lang][key]) || (I18N.he[key]) || key;
  }

  /* ----------------------------------------------------------------------- *
   * 3. State + persistence
   * ----------------------------------------------------------------------- */
  var DEFAULT_STATE = {
    fontScale: 1,        // 1 .. 1.9
    lineHeight: 0,       // 0..3
    letterSpacing: 0,    // 0..3
    wordSpacing: 0,      // 0..3
    readableFont: false,
    textAlign: 0,        // 0=off,1=right,2=center,3=left,4=justify
    highlightTitles: false,
    highlightLinks: false,
    contrast: '',        // '', dark, light, invert, monochrome, low-saturation, high-saturation
    bigCursor: false,
    readingGuide: false,
    readingMask: false,
    stopAnimations: false,
    keyboardNav: false,
    readAloud: false,
    lang: CONFIG.lang
  };

  var state = loadState();

  function loadState() {
    var s = {};
    for (var k in DEFAULT_STATE) s[k] = DEFAULT_STATE[k];
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        for (var key in parsed) {
          if (key in DEFAULT_STATE) s[key] = parsed[key];
        }
      }
    } catch (e) { /* localStorage unavailable / private mode */ }
    return s;
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  /* ----------------------------------------------------------------------- *
   * 4. SVG icons
   * ----------------------------------------------------------------------- */
  var ICONS = {
    a11y: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="3.8" r="2.2"/><path d="M3.5 8.2c2.7 1 5.4 1.5 8.5 1.5s5.8-.5 8.5-1.5M12 8.6v6m0 0l-3 6.4m3-6.4l3 6.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    text: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M7 6v13M4 12h9M4 18h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    contrast: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 3a9 9 0 010 18z"/></svg>',
    tools: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4a4 4 0 00-5.5 5.2L3 14.7 5.3 17l5.5-5.5A4 4 0 0016 6l-2.4 2.4-1.9-1.9z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    reset: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12a7 7 0 107-7 7 7 0 00-5.5 2.7M5 5v3h3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    doc: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 11h6M9 15h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    keyboard: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 10h.01M11 10h.01M15 10h.01M8 14h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    minus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>'
  };

  /* ----------------------------------------------------------------------- *
   * 5. Effects — החלת ההגדרות על האתר
   * ----------------------------------------------------------------------- */
  var docEl = document.documentElement;
  var fontSizeStore = new WeakMap();
  var fontObserver = null;
  var fontReapplyTimer = null;

  function setAttr(name, value) {
    if (value === '' || value == null || value === false) docEl.removeAttribute(name);
    else docEl.setAttribute(name, value === true ? '' : String(value));
  }

  // 5a. Font scaling — סריקת DOM ושמירת הגודל המקורי
  function shouldSkipNode(el) {
    if (!el || el.nodeType !== 1) return true;
    var tag = el.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' ||
        tag === 'SVG' || tag === 'IFRAME' || tag === 'CANVAS' || tag === 'IMG' ||
        tag === 'VIDEO' || tag === 'AUDIO') return true;
    if (host && (el === host || host.contains(el))) return true;
    return false;
  }

  function applyFontScale() {
    var scale = state.fontScale;
    var nodes = document.body ? document.body.getElementsByTagName('*') : [];
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (shouldSkipNode(el)) continue;
      if (!fontSizeStore.has(el)) {
        var cs = parseFloat(window.getComputedStyle(el).fontSize);
        if (!cs) continue;
        fontSizeStore.set(el, cs);
      }
      var base = fontSizeStore.get(el);
      el.style.setProperty('font-size', scale === 1 ? '' : (base * scale).toFixed(2) + 'px', 'important');
    }
    manageFontObserver();
  }

  function manageFontObserver() {
    if (state.fontScale !== 1 && !fontObserver && window.MutationObserver) {
      fontObserver = new MutationObserver(function () {
        clearTimeout(fontReapplyTimer);
        fontReapplyTimer = setTimeout(applyFontScale, 400);
      });
      fontObserver.observe(document.body, { childList: true, subtree: true });
    } else if (state.fontScale === 1 && fontObserver) {
      fontObserver.disconnect();
      fontObserver = null;
    }
  }

  // 5b. החלת כל ההגדרות
  function applyAll() {
    setAttr('data-a11y-line', state.lineHeight || '');
    setAttr('data-a11y-letter', state.letterSpacing || '');
    setAttr('data-a11y-word', state.wordSpacing || '');
    setAttr('data-a11y-readable', state.readableFont);
    setAttr('data-a11y-align', ['', 'right', 'center', 'left', 'justify'][state.textAlign] || '');
    setAttr('data-a11y-titles', state.highlightTitles);
    setAttr('data-a11y-links', state.highlightLinks);
    setAttr('data-a11y-contrast', state.contrast);
    setAttr('data-a11y-cursor', state.bigCursor ? 'black' : '');
    setAttr('data-a11y-stop', state.stopAnimations);
    setAttr('data-a11y-keyboard', state.keyboardNav);
    setAttr('data-a11y-read', state.readAloud);

    applyFontScale();
    updateOverlay();
    if (state.stopAnimations) pauseMedia();
    saveState();
  }

  function pauseMedia() {
    var media = document.querySelectorAll('video, audio');
    for (var i = 0; i < media.length; i++) {
      try { media[i].pause(); } catch (e) {}
    }
  }

  /* ----------------------------------------------------------------------- *
   * 6. Overlay — מדריך קריאה / מסכת קריאה
   * ----------------------------------------------------------------------- */
  var overlay, guideEl, maskTop, maskBottom, overlayBound = false;
  var lastY = window.innerHeight / 2;

  function updateOverlay() {
    if (!overlay) return;
    var active = state.readingGuide || state.readingMask;
    overlay.style.display = active ? 'block' : 'none';
    guideEl.style.display = state.readingGuide ? 'block' : 'none';
    maskTop.style.display = state.readingMask ? 'block' : 'none';
    maskBottom.style.display = state.readingMask ? 'block' : 'none';
    if (active && !overlayBound) {
      window.addEventListener('mousemove', onOverlayMove, { passive: true });
      overlayBound = true;
    } else if (!active && overlayBound) {
      window.removeEventListener('mousemove', onOverlayMove);
      overlayBound = false;
    }
    positionOverlay(lastY);
  }

  function onOverlayMove(e) { lastY = e.clientY; positionOverlay(lastY); }

  function positionOverlay(y) {
    if (!overlay) return;
    if (state.readingGuide) guideEl.style.top = y + 'px';
    if (state.readingMask) {
      var band = 60;
      maskTop.style.height = Math.max(0, y - band) + 'px';
      maskBottom.style.top = (y + band) + 'px';
    }
  }

  /* ----------------------------------------------------------------------- *
   * 7. Read aloud — הקראה קולית
   * ----------------------------------------------------------------------- */
  var readBound = false;
  function manageReadAloud() {
    var supported = 'speechSynthesis' in window;
    if (state.readAloud && supported && !readBound) {
      document.addEventListener('click', onReadClick, true);
      readBound = true;
    } else if ((!state.readAloud || !supported) && readBound) {
      document.removeEventListener('click', onReadClick, true);
      try { window.speechSynthesis.cancel(); } catch (e) {}
      readBound = false;
    }
    if (state.readAloud && !supported) state.readAloud = false;
  }

  function onReadClick(e) {
    if (host && host.contains(e.target)) return; // אל תקריא את התפריט עצמו
    var text = (e.target.innerText || e.target.textContent || '').trim();
    if (!text) return;
    e.preventDefault();
    e.stopPropagation();
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text.slice(0, 600));
      u.lang = (state.lang === 'en') ? 'en-US' : 'he-IL';
      window.speechSynthesis.speak(u);
    } catch (err) {}
  }

  /* ----------------------------------------------------------------------- *
   * 8. Skip to content
   * ----------------------------------------------------------------------- */
  function skipToContent() {
    var target = document.querySelector('main, [role="main"], #main, #content, .main-content, article');
    if (!target) {
      var h1 = document.querySelector('h1');
      target = h1 || document.body;
    }
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    try { target.focus({ preventScroll: false }); } catch (e) { target.focus(); }
    target.scrollIntoView({ behavior: state.stopAnimations ? 'auto' : 'smooth', block: 'start' });
    closePanel();
  }

  /* ----------------------------------------------------------------------- *
   * 9. Runtime CSS — מוזרק ל-<head>, משפיע על האתר (לא על ה-UI שלנו)
   * ----------------------------------------------------------------------- */
  var BLACK_CURSOR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 24 24'%3E%3Cpath d='M5 2v18l4.5-4.3L12.3 22l2.6-1.1-2.7-6.1H19z' fill='%23000' stroke='%23fff' stroke-width='1.2' stroke-linejoin='round'/%3E%3C/svg%3E";

  function injectRuntimeCSS() {
    if (document.getElementById('a11y-runtime')) return;
    var css = [
      // ריווח שורות
      'html[data-a11y-line="1"] body *:not(.a11y-root):not(.a11y-root *){line-height:1.6 !important}',
      'html[data-a11y-line="2"] body *:not(.a11y-root):not(.a11y-root *){line-height:2 !important}',
      'html[data-a11y-line="3"] body *:not(.a11y-root):not(.a11y-root *){line-height:2.6 !important}',
      // ריווח אותיות
      'html[data-a11y-letter="1"] body *:not(.a11y-root):not(.a11y-root *){letter-spacing:.06em !important}',
      'html[data-a11y-letter="2"] body *:not(.a11y-root):not(.a11y-root *){letter-spacing:.12em !important}',
      'html[data-a11y-letter="3"] body *:not(.a11y-root):not(.a11y-root *){letter-spacing:.2em !important}',
      // ריווח מילים
      'html[data-a11y-word="1"] body *:not(.a11y-root):not(.a11y-root *){word-spacing:.1em !important}',
      'html[data-a11y-word="2"] body *:not(.a11y-root):not(.a11y-root *){word-spacing:.25em !important}',
      'html[data-a11y-word="3"] body *:not(.a11y-root):not(.a11y-root *){word-spacing:.45em !important}',
      // גופן קריא
      'html[data-a11y-readable] body *:not(.a11y-root):not(.a11y-root *){font-family:Arial,"Helvetica Neue",Tahoma,"Segoe UI",sans-serif !important}',
      // יישור טקסט
      'html[data-a11y-align="right"] body :is(p,li,h1,h2,h3,h4,h5,h6,td,th,blockquote,dd,dt,figcaption){text-align:right !important}',
      'html[data-a11y-align="center"] body :is(p,li,h1,h2,h3,h4,h5,h6,td,th,blockquote,dd,dt,figcaption){text-align:center !important}',
      'html[data-a11y-align="left"] body :is(p,li,h1,h2,h3,h4,h5,h6,td,th,blockquote,dd,dt,figcaption){text-align:left !important}',
      'html[data-a11y-align="justify"] body :is(p,li,blockquote,dd){text-align:justify !important}',
      // הדגשת כותרות
      'html[data-a11y-titles] body :is(h1,h2,h3,h4,h5,h6){background:#fff200 !important;color:#000 !important;outline:2px dashed #000 !important;outline-offset:2px}',
      // הדגשת קישורים
      'html[data-a11y-links] body a{text-decoration:underline !important;font-weight:700 !important;background:#fff200 !important;color:#000 !important;outline:2px solid #000 !important;outline-offset:2px}',
      // ניגודיות כהה
      'html[data-a11y-contrast="dark"] body *:not(.a11y-root):not(.a11y-root *){background-color:#000 !important;color:#fff !important;border-color:#fff !important;text-shadow:none !important;box-shadow:none !important}',
      'html[data-a11y-contrast="dark"] body a, html[data-a11y-contrast="dark"] body a *{color:#ffff00 !important}',
      'html[data-a11y-contrast="dark"] body :is(h1,h2,h3,h4,h5,h6){color:#00e5ff !important}',
      'html[data-a11y-contrast="dark"] body :is(button,input,textarea,select){background:#000 !important;color:#fff !important;border:1px solid #fff !important}',
      // ניגודיות בהירה
      'html[data-a11y-contrast="light"] body *:not(.a11y-root):not(.a11y-root *){background-color:#fff !important;color:#000 !important;border-color:#000 !important;text-shadow:none !important}',
      'html[data-a11y-contrast="light"] body a, html[data-a11y-contrast="light"] body a *{color:#0000cc !important;text-decoration:underline !important}',
      // פילטרים על תוכן האתר בלבד (לא על הווידג'ט)
      'html[data-a11y-contrast="invert"] body>*:not(.a11y-root){filter:invert(1) hue-rotate(180deg)}',
      'html[data-a11y-contrast="invert"] body>*:not(.a11y-root) :is(img,video,picture,canvas,svg,[style*="background-image"]){filter:invert(1) hue-rotate(180deg)}',
      'html[data-a11y-contrast="monochrome"] body>*:not(.a11y-root){filter:grayscale(100%)}',
      'html[data-a11y-contrast="low-saturation"] body>*:not(.a11y-root){filter:saturate(.45)}',
      'html[data-a11y-contrast="high-saturation"] body>*:not(.a11y-root){filter:saturate(2)}',
      // סמן גדול
      'html[data-a11y-cursor="black"] body *:not(.a11y-root):not(.a11y-root *){cursor:url("' + BLACK_CURSOR + '") 5 2,auto !important}',
      // עצירת אנימציות
      'html[data-a11y-stop] body *:not(.a11y-root):not(.a11y-root *), html[data-a11y-stop] body *:not(.a11y-root):not(.a11y-root *)::before, html[data-a11y-stop] body *:not(.a11y-root):not(.a11y-root *)::after{animation:none !important;transition:none !important;scroll-behavior:auto !important}',
      // ניווט מקלדת — חיווי פוקוס חזק
      'html[data-a11y-keyboard] body :is(a,button,input,select,textarea,summary,[tabindex],[role="button"],[role="link"]):focus{outline:3px solid #1d4ed8 !important;outline-offset:2px !important;box-shadow:0 0 0 3px #fff,0 0 0 6px #1d4ed8 !important}',
      // הקראה קולית — חיווי שניתן ללחוץ
      'html[data-a11y-read] body *:not(.a11y-root):not(.a11y-root *){cursor:help !important}'
    ].join('\n');

    var styleEl = document.createElement('style');
    styleEl.id = 'a11y-runtime';
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }

  /* ----------------------------------------------------------------------- *
   * 10. Widget UI — Shadow DOM
   * ----------------------------------------------------------------------- */
  var host, root, panel, trigger, isOpen = false, lastFocused = null;

  var WIDGET_CSS = function () {
    return [
      ':host{all:initial}',
      '*{box-sizing:border-box;font-family:Arial,"Helvetica Neue","Segoe UI",sans-serif}',
      '.wrap{--c:' + CONFIG.color + ';--cd:color-mix(in srgb,var(--c) 82%,#000);direction:' + t('dir') + '}',
      // כפתור ההפעלה
      '.trigger{position:fixed;bottom:20px;' + (CONFIG.position === 'left' ? 'left' : 'right') + ':20px;width:60px;height:60px;border-radius:50%;background:var(--c);color:#fff;border:0;cursor:pointer;box-shadow:0 6px 22px rgba(0,0,0,.28);display:flex;align-items:center;justify-content:center;z-index:2147483646;transition:transform .18s ease,box-shadow .18s ease}',
      '.trigger:hover{transform:scale(1.07)}',
      '.trigger:focus-visible{outline:3px solid #fff;outline-offset:3px;box-shadow:0 0 0 6px var(--c)}',
      '.trigger svg{width:34px;height:34px;fill:currentColor}',
      // overlay רקע
      '.scrim{position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:2147483646;opacity:0;visibility:hidden;transition:opacity .2s ease}',
      '.scrim.open{opacity:1;visibility:visible}',
      // הפאנל
      '.panel{position:fixed;bottom:0;' + (CONFIG.position === 'left' ? 'left:0' : 'right:0') + ';top:0;width:380px;max-width:100%;background:#fff;color:#111827;z-index:2147483647;box-shadow:0 0 40px rgba(0,0,0,.3);display:flex;flex-direction:column;transform:translateX(' + (CONFIG.position === 'left' ? '-100%' : '100%') + ');transition:transform .26s cubic-bezier(.22,1,.36,1);direction:' + t('dir') + '}',
      '.panel.open{transform:translateX(0)}',
      // כותרת
      '.head{background:var(--c);color:#fff;padding:16px 18px;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-shrink:0}',
      '.head h2{margin:0;font-size:19px;font-weight:800;display:flex;align-items:center;gap:9px}',
      '.head h2 svg{width:26px;height:26px;fill:currentColor}',
      '.iconbtn{background:rgba(255,255,255,.16);border:0;color:#fff;width:40px;height:40px;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center}',
      '.iconbtn:hover{background:rgba(255,255,255,.3)}',
      '.iconbtn:focus-visible{outline:3px solid #fff;outline-offset:2px}',
      '.iconbtn svg{width:22px;height:22px;fill:none}',
      // שורת פעולות עליונה
      '.topbar{display:flex;gap:8px;padding:10px 14px;background:#f1f5f9;border-bottom:1px solid #e2e8f0;flex-shrink:0}',
      '.topbar button{flex:1;background:#fff;border:1px solid #cbd5e1;border-radius:9px;padding:9px 6px;font-size:12.5px;font-weight:600;color:#0f172a;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;min-height:48px;justify-content:center}',
      '.topbar button:hover{border-color:var(--c);color:var(--cd)}',
      '.topbar button:focus-visible{outline:3px solid var(--c);outline-offset:2px}',
      '.topbar button svg{width:18px;height:18px;fill:none;stroke:currentColor}',
      // גוף נגלל
      '.body{overflow-y:auto;padding:8px 14px 20px;flex:1;-webkit-overflow-scrolling:touch}',
      '.group{margin-top:14px}',
      '.group h3{font-size:13px;text-transform:uppercase;letter-spacing:.04em;color:#64748b;margin:0 2px 8px;display:flex;align-items:center;gap:7px}',
      '.group h3 svg{width:16px;height:16px;fill:none;stroke:currentColor}',
      '.grid{display:grid;grid-template-columns:1fr 1fr;gap:9px}',
      // אריח פיצ'ר
      '.tile{position:relative;background:#f8fafc;border:2px solid #e2e8f0;border-radius:12px;padding:12px 8px;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;min-height:74px;font-size:13px;font-weight:600;color:#1e293b;text-align:center;transition:border-color .15s,background .15s}',
      '.tile:hover{border-color:#94a3b8;background:#f1f5f9}',
      '.tile:focus-visible{outline:3px solid var(--c);outline-offset:2px}',
      '.tile[aria-pressed="true"]{border-color:var(--c);background:color-mix(in srgb,var(--c) 12%,#fff);color:var(--cd)}',
      '.tile .ic{font-size:22px;line-height:1}',
      '.tile .badge{position:absolute;top:6px;inset-inline-end:8px;background:var(--c);color:#fff;border-radius:20px;font-size:11px;font-weight:700;padding:1px 7px;min-width:20px}',
      // אריח stepper (גודל טקסט)
      '.stepper{grid-column:1 / -1;background:#f8fafc;border:2px solid #e2e8f0;border-radius:12px;padding:10px 12px;display:flex;align-items:center;justify-content:space-between;gap:10px}',
      '.stepper .lbl{font-size:13.5px;font-weight:700;color:#1e293b}',
      '.stepper .ctrl{display:flex;align-items:center;gap:8px}',
      '.stepper .val{min-width:54px;text-align:center;font-weight:800;font-size:14px;color:var(--cd)}',
      '.stepper button{width:40px;height:40px;border-radius:10px;border:1px solid #cbd5e1;background:#fff;color:var(--cd);cursor:pointer;display:flex;align-items:center;justify-content:center}',
      '.stepper button:hover{border-color:var(--c)}',
      '.stepper button:focus-visible{outline:3px solid var(--c);outline-offset:2px}',
      '.stepper button:disabled{opacity:.4;cursor:not-allowed}',
      '.stepper button svg{width:18px;height:18px;stroke:currentColor}',
      // פוטר
      '.foot{flex-shrink:0;border-top:1px solid #e2e8f0;padding:9px 14px;display:flex;align-items:center;justify-content:space-between;gap:8px;background:#f8fafc;font-size:12px;color:#64748b}',
      '.foot button{background:none;border:0;color:var(--cd);font-weight:700;cursor:pointer;font-size:12.5px;padding:6px 4px;border-radius:6px}',
      '.foot button:focus-visible{outline:3px solid var(--c);outline-offset:2px}',
      '.credit{font-size:11px;color:#94a3b8}',
      // מודאלים פנימיים (הצהרה / קיצורים)
      '.sheet{position:absolute;inset:0;background:#fff;z-index:5;display:flex;flex-direction:column;transform:translateY(8%);opacity:0;visibility:hidden;transition:transform .22s,opacity .22s}',
      '.sheet.open{transform:translateY(0);opacity:1;visibility:visible}',
      '.sheet .body{padding:18px}',
      '.sheet h3{margin:.2em 0 .5em;font-size:17px;color:#0f172a}',
      '.sheet h4{margin:1.1em 0 .3em;font-size:14px;color:var(--cd)}',
      '.sheet p,.sheet li{font-size:14px;line-height:1.6;color:#334155}',
      '.sheet a{color:var(--cd);font-weight:700}',
      '.sheet dl{margin:.4em 0;display:grid;grid-template-columns:auto 1fr;gap:4px 12px;font-size:14px}',
      '.sheet dt{font-weight:700;color:#475569}',
      '.kbd{display:inline-block;background:#f1f5f9;border:1px solid #cbd5e1;border-bottom-width:2px;border-radius:6px;padding:1px 7px;font-size:12.5px;font-weight:700;color:#0f172a;font-family:monospace}',
      '.kbrow{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:9px 0;border-bottom:1px solid #eef2f6;font-size:14px}',
      // נגישות התפריט עצמו
      '.tile,.iconbtn,.topbar button,.stepper button{-webkit-tap-highlight-color:transparent}',
      '@media (max-width:480px){.panel{width:100%;top:auto;height:88vh;border-radius:18px 18px 0 0;transform:translateY(100%)}.panel.open{transform:translateY(0)}.trigger{width:54px;height:54px;bottom:16px}}',
      '@media (prefers-reduced-motion:reduce){.panel,.scrim,.trigger,.sheet{transition:none !important}}'
    ].join('\n');
  };

  /* ----------------------------------------------------------------------- *
   * 11. בניית ה-DOM של התפריט
   * ----------------------------------------------------------------------- */
  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (html != null) n.innerHTML = html;
    return n;
  }

  // הגדרת הפיצ'רים בתפריט
  function tileDefs() {
    return {
      text: [
        { type: 'stepper', key: 'fontSize' },
        { type: 'cycle', key: 'lineHeight', icon: '↕', max: 3 },
        { type: 'cycle', key: 'letterSpacing', icon: 'A·A', max: 3 },
        { type: 'cycle', key: 'wordSpacing', icon: '⇆', max: 3 },
        { type: 'toggle', key: 'readableFont', icon: 'Aa' },
        { type: 'cycle', key: 'textAlign', icon: '≣', max: 4, labels: ['', '⟸', '≡', '⟹', '☰'] },
        { type: 'toggle', key: 'highlightTitles', icon: 'H' },
        { type: 'toggle', key: 'highlightLinks', icon: '🔗' }
      ],
      color: [
        { type: 'contrast', val: 'dark', key: 'contrastDark', icon: '◑' },
        { type: 'contrast', val: 'light', key: 'contrastLight', icon: '◐' },
        { type: 'contrast', val: 'invert', key: 'contrastInvert', icon: '🌓' },
        { type: 'contrast', val: 'monochrome', key: 'monochrome', icon: '◍' },
        { type: 'contrast', val: 'low-saturation', key: 'lowSaturation', icon: '🎚' },
        { type: 'contrast', val: 'high-saturation', key: 'highSaturation', icon: '🌈' }
      ],
      tools: [
        { type: 'toggle', key: 'bigCursor', icon: '↖' },
        { type: 'toggle', key: 'readingGuide', icon: '▭' },
        { type: 'toggle', key: 'readingMask', icon: '▤' },
        { type: 'toggle', key: 'stopAnimations', icon: '⏸' },
        { type: 'toggle', key: 'keyboardNav', icon: '⌨' },
        { type: 'action', key: 'skipToContent', icon: '⤓', fn: skipToContent },
        { type: 'toggle', key: 'readAloud', icon: '🔊' }
      ]
    };
  }

  function buildTile(def) {
    var label = t(def.key);
    if (def.type === 'stepper') {
      var wrap = el('div', { class: 'stepper' });
      var lbl = el('div', { class: 'lbl' }, label);
      var ctrl = el('div', { class: 'ctrl' });
      var dec = el('button', { type: 'button', 'aria-label': t('decrease') + ' ' + label }, ICONS.minus);
      var val = el('span', { class: 'val' }, Math.round(state.fontScale * 100) + '%');
      var inc = el('button', { type: 'button', 'aria-label': t('increase') + ' ' + label }, ICONS.plus);
      function refresh() {
        val.textContent = Math.round(state.fontScale * 100) + '%';
        dec.disabled = state.fontScale <= 1;
        inc.disabled = state.fontScale >= 1.9;
      }
      dec.addEventListener('click', function () { state.fontScale = Math.max(1, +(state.fontScale - 0.1).toFixed(2)); refresh(); applyAll(); });
      inc.addEventListener('click', function () { state.fontScale = Math.min(1.9, +(state.fontScale + 0.1).toFixed(2)); refresh(); applyAll(); });
      // RTL: מינוס מימין, פלוס משמאל מתוקן ע"י סדר ה-DOM הטבעי
      ctrl.appendChild(dec); ctrl.appendChild(val); ctrl.appendChild(inc);
      wrap.appendChild(lbl); wrap.appendChild(ctrl);
      refresh();
      return wrap;
    }

    var btn = el('button', { type: 'button', class: 'tile' });
    var icon = el('span', { class: 'ic', 'aria-hidden': 'true' }, def.icon);
    var text = el('span', {}, label);
    var badge = el('span', { class: 'badge' });
    badge.style.display = 'none';
    btn.appendChild(badge); btn.appendChild(icon); btn.appendChild(text);

    function sync() {
      var pressed = false, badgeVal = '';
      if (def.type === 'toggle') {
        pressed = !!state[def.key];
      } else if (def.type === 'cycle') {
        pressed = state[def.key] > 0;
        badgeVal = state[def.key] > 0 ? (def.labels ? def.labels[state[def.key]] : state[def.key]) : '';
      } else if (def.type === 'contrast') {
        pressed = state.contrast === def.val;
      }
      btn.setAttribute('aria-pressed', def.type === 'action' ? 'false' : String(pressed));
      if (badgeVal) { badge.textContent = badgeVal; badge.style.display = ''; }
      else badge.style.display = 'none';
    }

    btn.addEventListener('click', function () {
      if (def.type === 'toggle') {
        state[def.key] = !state[def.key];
        if (def.key === 'readAloud') manageReadAloud();
      } else if (def.type === 'cycle') {
        state[def.key] = (state[def.key] + 1) % (def.max + 1);
      } else if (def.type === 'contrast') {
        state.contrast = (state.contrast === def.val) ? '' : def.val;
        syncAllContrast();
      } else if (def.type === 'action') {
        def.fn();
        return;
      }
      sync();
      applyAll();
    });

    btn._sync = sync;
    btn._def = def;
    sync();
    return btn;
  }

  var contrastButtons = [];
  function syncAllContrast() {
    for (var i = 0; i < contrastButtons.length; i++) contrastButtons[i]._sync();
  }

  function build() {
    injectRuntimeCSS();

    host = el('div', { class: 'a11y-root', 'data-a11y-host': '' });
    document.body.appendChild(host);
    root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;

    var style = document.createElement('style');
    style.textContent = WIDGET_CSS();
    root.appendChild(style);

    var wrap = el('div', { class: 'wrap' });

    // overlay (מדריך/מסכה) — בתוך ה-shadow כדי לא להיות מושפע מאפקטים
    overlay = el('div', { class: 'a11y-ov', 'aria-hidden': 'true' });
    overlay.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:2147483645;display:none';
    guideEl = el('div'); guideEl.style.cssText = 'position:absolute;left:0;right:0;height:24px;margin-top:-12px;background:rgba(37,99,235,.28);border-top:2px solid #1d4ed8;border-bottom:2px solid #1d4ed8;display:none';
    maskTop = el('div'); maskTop.style.cssText = 'position:absolute;left:0;right:0;top:0;background:rgba(0,0,0,.55);display:none';
    maskBottom = el('div'); maskBottom.style.cssText = 'position:absolute;left:0;right:0;bottom:0;background:rgba(0,0,0,.55);display:none';
    overlay.appendChild(maskTop); overlay.appendChild(maskBottom); overlay.appendChild(guideEl);
    wrap.appendChild(overlay);

    // כפתור הפעלה
    trigger = el('button', { type: 'button', class: 'trigger', 'aria-haspopup': 'dialog', 'aria-expanded': 'false', 'aria-label': t('openLabel') }, ICONS.a11y);
    trigger.addEventListener('click', togglePanel);
    wrap.appendChild(trigger);

    // scrim
    var scrim = el('div', { class: 'scrim' });
    scrim.addEventListener('click', closePanel);
    wrap.appendChild(scrim);

    // panel
    panel = el('div', { class: 'panel', role: 'dialog', 'aria-modal': 'true', 'aria-label': t('title'), tabindex: '-1' });

    var head = el('div', { class: 'head' });
    head.appendChild(el('h2', {}, ICONS.a11y + '<span>' + t('title') + '</span>'));
    var closeBtn = el('button', { type: 'button', class: 'iconbtn', 'aria-label': t('close') }, ICONS.close);
    closeBtn.addEventListener('click', closePanel);
    head.appendChild(closeBtn);
    panel.appendChild(head);

    // topbar: reset / statement / shortcuts / lang
    var topbar = el('div', { class: 'topbar' });
    var resetB = el('button', { type: 'button' }, ICONS.reset + '<span>' + t('reset') + '</span>');
    resetB.addEventListener('click', resetAll);
    var stmtB = el('button', { type: 'button' }, ICONS.doc + '<span>' + t('statement') + '</span>');
    stmtB.addEventListener('click', function () { openSheet('statement'); });
    var kbB = el('button', { type: 'button' }, ICONS.keyboard + '<span>' + t('shortcuts') + '</span>');
    kbB.addEventListener('click', function () { openSheet('shortcuts'); });
    var langB = el('button', { type: 'button' }, '🌐<span>' + t('langBtn') + '</span>');
    langB.addEventListener('click', toggleLang);
    topbar.appendChild(resetB); topbar.appendChild(stmtB); topbar.appendChild(kbB); topbar.appendChild(langB);
    panel.appendChild(topbar);

    // body
    var body = el('div', { class: 'body' });
    var defs = tileDefs();
    var groups = [
      { id: 'text', icon: ICONS.text, items: defs.text },
      { id: 'color', icon: ICONS.contrast, items: defs.color },
      { id: 'tools', icon: ICONS.tools, items: defs.tools }
    ];
    contrastButtons = [];
    allTiles = [];
    groups.forEach(function (g) {
      var grp = el('div', { class: 'group' });
      var titleKey = g.id === 'text' ? 'groupText' : (g.id === 'color' ? 'groupColor' : 'groupTools');
      grp.appendChild(el('h3', {}, g.icon + '<span>' + t(titleKey) + '</span>'));
      var grid = el('div', { class: 'grid' });
      g.items.forEach(function (def) {
        var tile = buildTile(def);
        if (def.type === 'contrast') contrastButtons.push(tile);
        if (tile._sync) allTiles.push(tile);
        grid.appendChild(tile);
      });
      grp.appendChild(grid);
      body.appendChild(grp);
    });
    panel.appendChild(body);

    // footer
    var foot = el('div', { class: 'foot' });
    if (CONFIG.showCredit) foot.appendChild(el('span', { class: 'credit' }, t('credit')));
    else foot.appendChild(el('span', {}));
    var footReset = el('button', { type: 'button' }, t('reset'));
    footReset.addEventListener('click', resetAll);
    foot.appendChild(footReset);
    panel.appendChild(foot);

    // sheets (statement + shortcuts)
    panel.appendChild(buildStatementSheet());
    panel.appendChild(buildShortcutsSheet());

    wrap.appendChild(scrim);
    wrap.appendChild(panel);
    root.appendChild(wrap);

    scrimEl = scrim;
  }

  var allTiles = [], scrimEl;

  /* ----------------------------------------------------------------------- *
   * 12. Sheets — הצהרת נגישות + קיצורי מקלדת
   * ----------------------------------------------------------------------- */
  var sheetStatement, sheetShortcuts;

  function sheetShell(titleKey) {
    var sheet = el('div', { class: 'sheet', role: 'dialog', 'aria-modal': 'true', 'aria-label': t(titleKey), tabindex: '-1' });
    var head = el('div', { class: 'head' });
    head.appendChild(el('h2', {}, '<span>' + t(titleKey) + '</span>'));
    var back = el('button', { type: 'button', class: 'iconbtn', 'aria-label': t('close') }, ICONS.close);
    back.addEventListener('click', function () { closeSheet(); });
    head.appendChild(back);
    sheet.appendChild(head);
    var body = el('div', { class: 'body' });
    sheet.appendChild(body);
    sheet._body = body;
    return sheet;
  }

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function buildStatementSheet() {
    sheetStatement = sheetShell('stmtTitle');
    renderStatement();
    return sheetStatement;
  }

  function renderStatement() {
    var s = CONFIG.statement || {};
    var b = sheetStatement._body;
    var html = '';
    if (s.orgName) html += '<h3 style="margin-top:0">' + esc(s.orgName) + '</h3>';
    html += '<p>' + t('stmtIntro') + '</p>';
    html += '<h4>' + t('stmtArrangements') + '</h4><p>' + t('stmtArrangementsBody') + '</p>';
    html += '<h4>' + t('stmtConformance') + '</h4><p>' + t('stmtConformanceBody') + esc(s.conformance || 'AA') + '.</p>';
    if (s.limitations) html += '<h4>' + t('stmtLimitations') + '</h4><p>' + esc(s.limitations) + '</p>';
    html += '<h4>' + t('stmtContactTitle') + '</h4><p>' + t('stmtContactBody') + '</p>';
    html += '<dl>';
    if (s.coordinatorName) html += '<dt>' + t('stmtCoordinator') + '</dt><dd>' + esc(s.coordinatorName) + (s.coordinatorRole ? ' (' + esc(s.coordinatorRole) + ')' : '') + '</dd>';
    if (s.phone) html += '<dt>' + t('stmtPhone') + '</dt><dd><a href="tel:' + esc(s.phone) + '">' + esc(s.phone) + '</a></dd>';
    if (s.email) html += '<dt>' + t('stmtEmail') + '</dt><dd><a href="mailto:' + esc(s.email) + '">' + esc(s.email) + '</a></dd>';
    if (s.fax) html += '<dt>' + t('stmtFax') + '</dt><dd>' + esc(s.fax) + '</dd>';
    if (s.updated) html += '<dt>' + t('stmtUpdated') + '</dt><dd>' + esc(s.updated) + '</dd>';
    html += '</dl>';
    if (s.url) html += '<p><a href="' + esc(s.url) + '">' + t('stmtFullPage') + ' »</a></p>';
    b.innerHTML = html;
  }

  function buildShortcutsSheet() {
    sheetShortcuts = sheetShell('shortcutsTitle');
    var b = sheetShortcuts._body;
    var hk = CONFIG.hotkey.replace('alt', 'Alt').replace('shift', 'Shift').replace('ctrl', 'Ctrl').replace(/\+/g, ' + ').replace(/\b([a-z])\b/g, function (m) { return m.toUpperCase(); });
    var rows = [
      [t('shortcutsToggle'), hk],
      [t('shortcutsClose'), 'Esc'],
      [t('shortcutsTab'), 'Tab'],
      [t('shortcutsActivate'), 'Enter / Space']
    ];
    var html = '';
    rows.forEach(function (r) {
      html += '<div class="kbrow"><span>' + r[0] + '</span><span class="kbd">' + r[1] + '</span></div>';
    });
    b.innerHTML = html;
    return sheetShortcuts;
  }

  function openSheet(which) {
    var sheet = which === 'statement' ? sheetStatement : sheetShortcuts;
    sheet.classList.add('open');
    setTimeout(function () { sheet.focus(); }, 50);
  }
  function closeSheet() {
    sheetStatement.classList.remove('open');
    sheetShortcuts.classList.remove('open');
    setTimeout(function () { panel.focus(); }, 50);
  }

  /* ----------------------------------------------------------------------- *
   * 13. Open / close + focus management
   * ----------------------------------------------------------------------- */
  function togglePanel() { isOpen ? closePanel() : openPanel(); }

  function openPanel() {
    isOpen = true;
    lastFocused = document.activeElement;
    panel.classList.add('open');
    scrimEl.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
    document.addEventListener('keydown', onKeydown, true);
    setTimeout(function () { panel.focus(); }, 60);
  }

  function closePanel() {
    isOpen = false;
    closeSheet();
    panel.classList.remove('open');
    scrimEl.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', onKeydown, true);
    try { (lastFocused && lastFocused.focus) ? lastFocused.focus() : trigger.focus(); } catch (e) { trigger.focus(); }
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      if (sheetStatement.classList.contains('open') || sheetShortcuts.classList.contains('open')) closeSheet();
      else closePanel();
      return;
    }
    if (e.key === 'Tab') trapFocus(e);
  }

  function getFocusable() {
    var scope = sheetStatement.classList.contains('open') ? sheetStatement :
                sheetShortcuts.classList.contains('open') ? sheetShortcuts : panel;
    var list = scope.querySelectorAll('button:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])');
    return Array.prototype.filter.call(list, function (n) { return n.offsetParent !== null || n === scope; });
  }

  function trapFocus(e) {
    var f = getFocusable();
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    var active = root.activeElement;
    if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
  }

  /* ----------------------------------------------------------------------- *
   * 14. Reset / language / hotkey
   * ----------------------------------------------------------------------- */
  function resetAll() {
    var lang = state.lang;
    for (var k in DEFAULT_STATE) state[k] = DEFAULT_STATE[k];
    state.lang = lang;
    // ניקוי גדלי גופן שנשמרו
    applyAll();
    manageReadAloud();
    syncAllContrast();
    for (var i = 0; i < allTiles.length; i++) allTiles[i]._sync();
    // עדכון תצוגת ה-stepper
    rebuildBody();
  }

  function rebuildBody() {
    // הדרך הפשוטה לעדכן את כל הפקדים (כולל stepper) — בנייה מחדש של הגוף
    var newPanelChildren = panel.querySelector('.body');
    if (!newPanelChildren) return;
    var defs = tileDefs();
    newPanelChildren.innerHTML = '';
    contrastButtons = []; allTiles = [];
    var groups = [
      { id: 'text', icon: ICONS.text, key: 'groupText', items: defs.text },
      { id: 'color', icon: ICONS.contrast, key: 'groupColor', items: defs.color },
      { id: 'tools', icon: ICONS.tools, key: 'groupTools', items: defs.tools }
    ];
    groups.forEach(function (g) {
      var grp = el('div', { class: 'group' });
      grp.appendChild(el('h3', {}, g.icon + '<span>' + t(g.key) + '</span>'));
      var grid = el('div', { class: 'grid' });
      g.items.forEach(function (def) {
        var tile = buildTile(def);
        if (def.type === 'contrast') contrastButtons.push(tile);
        if (tile._sync) allTiles.push(tile);
        grid.appendChild(tile);
      });
      grp.appendChild(grid);
      newPanelChildren.appendChild(grp);
    });
  }

  function toggleLang() {
    state.lang = (state.lang === 'he') ? 'en' : 'he';
    saveState();
    // בנייה מחדש מלאה של ה-UI עם השפה החדשה
    var wasOpen = isOpen;
    host.remove();
    build();
    applyAll();
    manageReadAloud();
    if (wasOpen) openPanel();
  }

  function matchHotkey(e) {
    if (!CONFIG.hotkey) return false;
    var parts = CONFIG.hotkey.split('+');
    var key = parts[parts.length - 1];
    var needAlt = parts.indexOf('alt') > -1;
    var needShift = parts.indexOf('shift') > -1;
    var needCtrl = parts.indexOf('ctrl') > -1;
    return (!!e.altKey === needAlt) && (!!e.shiftKey === needShift) && (!!e.ctrlKey === needCtrl) &&
           (e.key && e.key.toLowerCase() === key);
  }

  /* ----------------------------------------------------------------------- *
   * 15. Init
   * ----------------------------------------------------------------------- */
  function init() {
    build();
    applyAll();
    manageReadAloud();

    // קיצור מקלדת גלובלי לפתיחת התפריט
    document.addEventListener('keydown', function (e) {
      if (matchHotkey(e)) { e.preventDefault(); togglePanel(); }
    });

    // חשיפת API פשוט
    window.A11yWidget = {
      open: openPanel,
      close: closePanel,
      toggle: togglePanel,
      reset: resetAll,
      setLang: function (l) { if (l !== state.lang) toggleLang(); },
      getState: function () { var c = {}; for (var k in state) c[k] = state[k]; return c; }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
