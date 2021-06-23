tex = createP();
tex.style('font-size', '18 px');
tex.style('background-color', '#E6E6E5');
tex.position(16, 43);
katex.render('\\mu', tex.elt);

tex = createP();
tex.style('font-size', '18 px');
tex.style('background-color', '#E6E6E5');
tex.position(16, 67);
katex.render('\\sigma', tex.elt);

tex = createP();
tex.style('font-size', '16 px');
tex.style('background-color', '#E6E6E5');
tex.position(120, 45);
katex.render('' + mu + '', tex.elt);

tex = createP();
tex.style('font-size', '16 px');
tex.style('background-color', '#E6E6E5');
tex.position(120, 68);
katex.render('' + sigma + '', tex.elt);

tex = createP();
tex.style('font-size', '18 px');
tex.style('background-color', '#E6E6E5');
tex.position(165, 43);
katex.render('a', tex.elt);

tex = createP();
tex.style('font-size', '18 px');
tex.style('background-color', '#E6E6E5');
tex.position(165, 67);
katex.render('b', tex.elt);

tex = createP();
tex.style('font-size', '16 px');
tex.style('background-color', '#E6E6E5');
tex.position(120, 45);
katex.render('' + mu + '', tex.elt);

tex = createP();
tex.style('font-size', '16 px');
tex.style('background-color', '#E6E6E5');
tex.position(120, 68);
katex.render('' + sigma + '', tex.elt);