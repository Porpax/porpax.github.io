(function () {
  'use strict';

  var TRANSLATE_JS = 'https://cdn.staticfile.net/translate.js/3.18.66/translate.js';

  function setActiveLanguage(language) {
    document.querySelectorAll('#blog-language-switcher button').forEach(function (button) {
      button.classList.toggle('active', button.dataset.language === language);
    });
  }

  function changeLanguage(language) {
    if (!window.translate) return;
    window.translate.changeLanguage(language);
    setActiveLanguage(language);
  }

  function createSwitcher() {
    if (document.getElementById('blog-language-switcher')) return;

    var switcher = document.createElement('div');
    switcher.id = 'blog-language-switcher';
    switcher.className = 'ignore';
    switcher.setAttribute('role', 'group');
    switcher.setAttribute('aria-label', '网页语言');
    switcher.innerHTML =
      '<button type="button" data-language="chinese_simplified" title="切换为中文">中</button>' +
      '<span aria-hidden="true">/</span>' +
      '<button type="button" data-language="english" title="Switch to English">EN</button>';

    switcher.addEventListener('click', function (event) {
      var button = event.target.closest('button[data-language]');
      if (button) changeLanguage(button.dataset.language);
    });

    document.body.appendChild(switcher);
    setActiveLanguage('chinese_simplified');
  }

  function initializeTranslation() {
    window.translate.language.setLocal('chinese_simplified');
    window.translate.selectLanguageTag.show = false;
    window.translate.selectLanguageTag.languages = 'chinese_simplified,english';
    window.translate.service.use('translate.service');
    ['pre', 'code', 'kbd', 'samp', 'script', 'style'].forEach(function (tag) {
      window.translate.ignore.tag.push(tag);
    });
    window.translate.ignore.class.push('ignore');
    window.translate.listener.start();
    window.translate.execute();
    createSwitcher();
  }

  function loadTranslation() {
    if (window.translate) {
      initializeTranslation();
      return;
    }

    var script = document.createElement('script');
    script.src = TRANSLATE_JS;
    script.async = true;
    script.onload = initializeTranslation;
    script.onerror = createSwitcher;
    document.head.appendChild(script);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTranslation, { once: true });
  } else {
    loadTranslation();
  }
})();
