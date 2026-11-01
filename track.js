(function () {
  var map = { ig: 'instagram', insta: 'instagram', instagram: 'instagram', yt: 'youtube', youtube: 'youtube', tt: 'tiktok', tiktok: 'tiktok', friends: 'friends' };
  var names = { instagram: 'Instagram', youtube: 'YouTube', tiktok: 'TikTok', friends: 'a friend' };
  var src = null;
  try {
    var q = new URLSearchParams(location.search);
    var p = (q.get('from') || q.get('src') || '').toLowerCase();
    if (map[p]) src = map[p];
  } catch (e) {}
  if (!src) {
    try {
      var h = new URL(document.referrer).hostname;
      if (/(^|\.)instagram\.com$/.test(h)) src = 'instagram';
      else if (/(^|\.)(youtube\.com|youtu\.be)$/.test(h)) src = 'youtube';
      else if (/(^|\.)tiktok\.com$/.test(h)) src = 'tiktok';
    } catch (e) {}
  }
  try {
    if (src) sessionStorage.setItem('bv_src', src);
    else src = sessionStorage.getItem('bv_src');
  } catch (e) {}
  if (!src) return;
  var links = document.querySelectorAll('a[href*="play.google.com"]');
  for (var i = 0; i < links.length; i++) {
    var a = links[i];
    if (a.href.indexOf('referrer=') === -1) a.href += '&referrer=utm_source%3D' + src;
  }
  if (links.length) {
    var card = links[0].parentNode;
    var note = document.createElement('p');
    note.textContent = 'Welcome from ' + names[src] + ' 👋';
    note.style.cssText = 'margin:0 0 8px;font-weight:600';
    card.insertBefore(note, card.firstChild);
  }
})();
