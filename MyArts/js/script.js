(function () {
    'use strict';

    // ---------- Data ----------
    // 2026 collection: 24 artworks. To add older years later, push new objects
    // with year: 2015 (etc.) and src: 'images/your-file.jpg'.
    var artworks = [];
    var i;
    for (i = 1; i <= 24; i++) {
        artworks.push({
            src: 'images/' + i + '.jpg',
            year: 2026,
            title: 'Untitled · ' + i
        });
    }

    var YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
    var currentFilter = 'all';

    var filterBar = document.getElementById('filterBar');
    var grid = document.getElementById('galleryGrid');

    // ---------- Build filter buttons ----------
    function countForYear(y) {
        return artworks.filter(function (a) { return a.year === y; }).length;
    }

    function buildFilters() {
        var btnAll = document.createElement('button');
        btnAll.className = 'filter-btn active';
        btnAll.dataset.year = 'all';
        btnAll.textContent = 'All';
        filterBar.appendChild(btnAll);

        YEARS.forEach(function (y) {
            var b = document.createElement('button');
            b.className = 'filter-btn';
            b.dataset.year = String(y);
            b.textContent = y;
            var c = countForYear(y);
            if (c > 0) {
                var badge = document.createElement('span');
                badge.className = 'count';
                badge.textContent = c;
                b.appendChild(badge);
            }
            filterBar.appendChild(b);
        });

        filterBar.addEventListener('click', function (e) {
            var btn = e.target.closest('.filter-btn');
            if (!btn) return;
            currentFilter = btn.dataset.year;
            filterBar.querySelectorAll('.filter-btn').forEach(function (x) { x.classList.remove('active'); });
            btn.classList.add('active');
            renderGrid();
        });
    }

    // ---------- Render grid ----------
    function visibleArtworks() {
        if (currentFilter === 'all') return artworks;
        var y = parseInt(currentFilter, 10);
        return artworks.filter(function (a) { return a.year === y; });
    }

    function renderGrid() {
        grid.innerHTML = '';
        var list = visibleArtworks();

        // Placeholder cards for years with no art yet (only when filtering that year, or in All view)
        var showPlaceholders = (currentFilter === 'all') ? true : (list.length === 0);
        if (showPlaceholders) {
            var missingYears = (currentFilter === 'all')
                ? YEARS.filter(function (y) { return countForYear(y) === 0; })
                : [parseInt(currentFilter, 10)];
            missingYears.forEach(function (y) {
                var ph = document.createElement('div');
                ph.className = 'placeholder-card';
                ph.innerHTML = '<div class="ph-year">' + y + '</div>' +
                               '<div class="ph-text">Archive being digitized — coming soon</div>';
                grid.appendChild(ph);
            });
        }

        list.forEach(function (art, idx) {
            var card = document.createElement('div');
            card.className = 'art-card';
            card.dataset.index = String(idx);
            card.innerHTML =
                '<img src="' + art.src + '" alt="' + art.title + '" loading="lazy" onerror="this.parentElement.style.display=\'none\'">' +
                '<span class="year-tag">' + art.year + '</span>' +
                '<div class="art-caption">' + art.title + ' · ' + art.year + '</div>';
            card.addEventListener('click', function () { openLightbox(art); });
            grid.appendChild(card);
        });
    }

    // ---------- Lightbox ----------
    var lightbox = document.getElementById('lightbox');
    var lbImg = document.getElementById('lbImg');
    var lbCaption = document.getElementById('lbCaption');
    var currentArt = null;

    function openLightbox(art) {
        currentArt = art;
        lbImg.src = art.src;
        lbImg.alt = art.title;
        lbCaption.textContent = art.title + ' · ' + art.year;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        currentArt = null;
    }
    function stepLightbox(dir) {
        if (!currentArt) return;
        var list = visibleArtworks();
        var i = list.indexOf(currentArt);
        if (i === -1) return;
        var next = (i + dir + list.length) % list.length;
        openLightbox(list[next]);
    }

    document.getElementById('lbClose').addEventListener('click', closeLightbox);
    document.getElementById('lbPrev').addEventListener('click', function () { stepLightbox(-1); });
    document.getElementById('lbNext').addEventListener('click', function () { stepLightbox(1); });
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') stepLightbox(-1);
        if (e.key === 'ArrowRight') stepLightbox(1);
    });

    // ---------- Mobile menu ----------
    var menuBtn = document.getElementById('menuBtn');
    var navMenu = document.querySelector('.nav-menu');
    menuBtn.addEventListener('click', function () { navMenu.classList.toggle('open'); });
    navMenu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { navMenu.classList.remove('open'); });
    });

    // ---------- Init ----------
    buildFilters();
    renderGrid();
})();
