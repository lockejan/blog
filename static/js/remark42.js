// remark42 comment widget, mounted into #remark42 (layouts/partials/comments.html).
// site_id must match SITE on the server (roles/remark42 in the infra repo).
var remark_config = {
  host: 'https://comments.smittie.de',
  site_id: 'smittie',
  components: ['embed'],
  theme: 'dark',
  no_footer: true,
};

// remark42's official loader, unminified: ES modules where supported,
// classic scripts otherwise.
(function (components, doc) {
  components.forEach(function (name) {
    var script = doc.createElement('script');
    var ext = '.js';
    if ('noModule' in script) {
      script.type = 'module';
      ext = '.mjs';
    } else {
      script.async = true;
    }
    script.defer = true;
    script.src = remark_config.host + '/web/' + name + ext;
    (doc.head || doc.body).appendChild(script);
  });
})(remark_config.components || ['embed'], document);
