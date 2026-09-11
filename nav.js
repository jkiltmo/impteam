
(function () {
  var ITEMS = [
    { href: 'index.html', label: 'Home' },
    { href: 'child.html', label: 'Child' },
    { href: 'sign.html', label: 'Sign' },
    { href: 'bin.html', label: 'BIN' },
    { href: 'aisle.html', label: 'Aisle' },
    { href: 'instructions.html', label: 'Site Document' },
    { href: 'signin.html', label: 'Sign-In QR' },
    { href: 'company.html', label: 'Company' },
    { label: 'Billing', children: [
      { href: 'RGNBilling.html', label: 'RGN Billing' },
      { href: 'CRLBilling.html', label: 'CRL Billing' },
      { href: 'ABBBilling.html', label: 'ABB Billing' }
    ] }
  ];

  function build() {
    if (!document.body || document.querySelector('.top-banner')) return;

    var path = location.pathname.split('/').pop() || 'index.html';

    function makeLink(item) {
      var a = document.createElement('a');
      a.className = 'nav-link';
      a.href = item.href;
      a.textContent = item.label;
      if (item.href === path) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
      return a;
    }

    var header = document.createElement('header');
    header.className = 'top-banner';
    header.setAttribute('role', 'banner');

    var nav = document.createElement('nav');
    nav.className = 'top-nav';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Main');

    ITEMS.forEach(function (item) {
      if (item.children) {
        var group = document.createElement('div');
        group.className = 'nav-group';

        var trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.className = 'nav-link nav-trigger';
        trigger.setAttribute('aria-haspopup', 'true');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.appendChild(document.createTextNode(item.label + ' '));
        var caret = document.createElement('span');
        caret.className = 'caret';
        caret.setAttribute('aria-hidden', 'true');
        caret.textContent = '▾';
        trigger.appendChild(caret);

        var menu = document.createElement('div');
        menu.className = 'nav-menu';

        var groupActive = false;
        item.children.forEach(function (child) {
          if (child.href === path) groupActive = true;
          menu.appendChild(makeLink(child));
        });
        if (groupActive) trigger.classList.add('active');

        trigger.addEventListener('click', function (e) {
          e.stopPropagation();
          var open = group.classList.toggle('open');
          trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        group.appendChild(trigger);
        group.appendChild(menu);
        nav.appendChild(group);
      } else {
        nav.appendChild(makeLink(item));
      }
    });

    header.appendChild(nav);
    document.body.insertBefore(header, document.body.firstChild);

    // Close any open dropdown when clicking elsewhere
    document.addEventListener('click', function () {
      var open = document.querySelector('.nav-group.open');
      if (open) {
        open.classList.remove('open');
        var t = open.querySelector('.nav-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
