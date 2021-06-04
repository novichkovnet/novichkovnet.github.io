let sliderMu, sliderSigma;
let zScoreSize = 200;
let zScoreList =[];
let zScoreMax = 10;
let sigmaMin = 1;
let sigmaMax = 4;

function preload() {
    SuisseIntl = loadFont('font/SuisseIntl-SemiBold.otf');
    KaTextReg = loadFont('font/KaTeX_Main-Regular.ttf');
    KaTextIt = loadFont('font/KaTeX_Main-Italic.ttf');
  }

function setup() {
    background('white');

    //Sliders
    sliderMu = createSlider(0, zScoreMax, zScoreMax/2, 0.01);
    sliderMu.position(32, 69);
    sliderMu.addClass('mySliders');

    sliderSigma = createSlider(sigmaMin, sigmaMax, sigmaMin, 0.01);
    sliderSigma.position(32, 93);
    sliderSigma.addClass('mySliders');

    slidera = createSlider(0, zScoreMax, 3, 0.01);
    slidera.position(180, 69);
    slidera.addClass('mySliders');

    sliderb = createSlider(0, zScoreMax, 7, 0.01);
    sliderb.position(180, 93);
    sliderb.addClass('mySliders');
}

function draw() {
    
    let window_weight = windowWidth; // get window width
    let window_height = windowHeight; // get window height
    
    createCanvas(window_weight, window_height); // redraw canvas with window sizes
    
    fill('#E6E6E5');
    rect(0, 0, window_weight, window_height, 16);

    //Grid System
    //gridSystem(window_weight, window_height); // add grid systen in to the canvas

    //Calculation
    let mu = sliderMu.value();
    let sigma = sliderSigma.value();
    let a = slidera.value();
    let b = sliderb.value();

    let densityNorma = normalCalc(sigma, mu, mu);
    let coordinatesList =[16,window_height - 256];
    
    //Visualization
    fill('white');
    
    start = mu - sigma*5;
    end = mu + sigma*5;

    viz1 (mu, sigma, zScoreSize, window_weight, window_height, start, end);

    fill('gray');
    noStroke();
    start = a;
    end = b;

    viz1 (mu, sigma, zScoreSize, window_weight, window_height, start, end);

    noFill();
    stroke('black');
    strokeWeight(2);
    
    start = mu - sigma*5;
    end = mu + sigma*5;

    viz1 (mu, sigma, zScoreSize, window_weight, window_height, start, end);

   //Graphic

   stroke('black'); // color of graphics strokes
   strokeWeight(1); // weight of basic strokes
   
   //Basic strokes
   
   line(16,map(densityNorma, 0, .4,  window_height - 256, 160), window_weight - 16, map(densityNorma, 0, .4,  window_height - 256, 160)); // top line
   line(map(mu, 0, 10, 15, window_weight-16), 130, map(mu, 0, 10, 15, window_weight-16), window_height - 256); // center line
   line(map(a, 0, 10, 15, window_weight-16), 155, map(a, 0, 10, 15, window_weight-16), window_height - 256); // a line
   line(map(b, 0, 10, 15, window_weight-16), 155, map(b, 0, 10, 15, window_weight-16), window_height - 256); // b line

   strokeWeight(.25);
   sigmaGrid (mu, sigma, window_weight, window_height)
   
   
   //Akcent Strokes
   strokeWeight(1); // weight of zero line
   line(16, window_height - 256, window_weight-16, window_height - 256); // zero line

    //Typography
    noStroke();
    fill('#000000');
    textFont(SuisseIntl);
    textStyle(BOLD);
    
    textAlign(LEFT);
    
    textSize(24);
    text('Normal distribution', 16, 40);
    
    textSize(18);
    text('Z-score calculations', 16, window_height-184);
    text('Probability', 16, window_height-90);

    textSize(12);
    text('© YandexPracticum',16, window_height-24);

    // nums on graph

    textFont('Arial');
    
    textSize(14);
    textStyle(NORMAL);
    text('density = ' + round(densityNorma, 2), 16, map(densityNorma, 0, .2,  window_height - 256, 160) + 18); // density on graph
    textAlign(CENTER);
    textStyle(NORMAL);
    text('μ = ' + mu, map(mu, 0, 10, 15, window_weight-16), 125); //mu num on graph
    text('a = ' + a, map(a, 0, 10, 15, window_weight-16), 145); //a num on graph
    text('b = ' + b, map(b, 0, 10, 15, window_weight-16), 145); //a num on graph
    
    // slider texts

    tex = createP();
    tex.style('font-size', '20px');
    tex.position(0, 0);
    katex.render('\\nabla^{2}\\Phi=\\sigma(x'+100+')', tex.elt);
    
    textFont(KaTextIt);
    textAlign(LEFT);
    textSize(18);
    text('μ', 16, 76);
    text('σ', 16, 100);
    
    text('a', 164, 77);
    text('b', 164, 101);

    textSize(17);
    
    text(mu, 120, 77);
    text(sigma, 120, 101);

    //text

    text(a, 268, 77); //a mum slider
    text(b, 268, 101); // b num slider

    // formulas

    textFont('Times New Roman');

    text('z(a) = z(' + a + ') = (a - μ) / σ = (' + a + ' - ' + mu + ') / ' + sigma + ' = ' + round((a-mu)/sigma,2), 16,window_height - 157);
    text('z(b) = z(' + b + ') = (b - μ) / σ = (' + b + ' - ' + mu + ') / ' + sigma + ' = ' + round((b-mu)/sigma,2), 16,window_height - 130);

    let p1 = 0;
    
    for (i  = mu - sigma*5; i <= a; i = i + .001) {
        p = normalCalc(sigma, mu, i)*.1;
        p1 = p1 + p;
    }

    let p2 = 0;

    for (i  = mu - sigma*5; i <= b; i = i + .001) {
        p = normalCalc(sigma, mu, i)*.1;
        p2 = p2 + p;
    }

    text('P = P(b) - P(a)= ' + round(p2/100,4) + ' - ' + round(p1/100,4) + ' = ' + round((p2/100 - p1/100),4), 16,window_height - 60);

}

function gridSystem(window_weight, window_height) {
    // grid system
    fill('#E9E9E9'); // color inside border
    stroke('000000'); // grid system stroce colors
    rect(16, 24, window_weight-32, window_height-48); // inner border
    line(0,40,window_weight,40); // title baseline
    line(0,64,window_weight,64); // sladers baseline 1
    line(0,80,window_weight,80); // sladers baseline 2
    line(0,88,window_weight,88); // sladers baseline 3
    line(0,104,window_weight,104); // sladers baseline 4

    //top baselines
    for (let step = 128; step <= 160; step = step + 8) {
        line(0,step,window_weight,step);
    }

    //bottom baselines
    for (let step = window_height - 256; step <= window_height - 216; step = step + 8) {
        line(0,step,window_weight,step);
    }

    line(0,window_height - 192,window_weight,window_height - 192); // z-score title line 1
    line(0,window_height - 192 + 8,window_weight,window_height - 192 + 8); // z-score title line 2

    line(0,window_height - 168,window_weight,window_height - 168); // z-score formula 1 line 1
    line(0,window_height - 168 + 8*3,window_weight,window_height - 168 + 8*3); // z-score formula 1 line 2

    line(0,window_height - 136,window_weight,window_height - 136); // z-score formula 2 line 1
    line(0,window_height - 136 + 8*3,window_weight,window_height - 136 + 8*3); // z-score formula 2 line 2

    line(0,window_height - 88,window_weight,window_height - 88); // Probability title line 1
    line(0,window_height - 88 + 8,window_weight,window_height - 88 + 8); // Probability title line 2

    line(0,window_height - 64,window_weight,window_height - 64); // Probability formula line 1
    line(0,window_height - 64 + 8,window_weight,window_height - 64 + 8); // Probability formula line 2

    line(0,window_height - 32,window_weight,window_height - 32); // Logo line 1
}

function normalCalc(sigma, mu, zScore) {
    let density = (1/(sigma*Math.sqrt(2*Math.PI)))*Math.exp(0-Math.pow(zScore-mu,2)/(2*Math.pow(sigma,2)));
    return density;
}

function viz1 (mu, sigma, zScoreSize, window_weight, window_height, start, end,) {
    
    beginShape();
    
    vertex(map(start, 0, 10, 15, window_weight-16), map(0, 0, .2,  window_height - 256, 160));
    

    for (let i = 0; i <= zScoreSize; i++) {
        zScore = map(i, 0, zScoreSize, start, end);
        density = normalCalc(sigma, mu, zScore);
        let x = map(zScore, 0, 10, 15, window_weight-16);
        let y = map(density, 0, .4,  window_height - 256, 160);
        vertex(x, y);
    }

    vertex(map(end, 0, 10, 15, window_weight-16), map(0, 0, .2,  window_height - 256, 160));

    endShape();
}

function sigmaGrid (mu, sigma, window_weight, window_height) {

    x = -10;

    for(i = mu - sigma*10; i <= mu + sigma*10; i = i + sigma){

        if (round(i, 2) != mu) {
            line( map(i, 0, 10, 15, window_weight-16), window_height - 240, map(i, 0, 10, 15, window_weight-16), 162);
            textFont('Arial');
            textSize(11);
            textAlign(CENTER);
            fill('gray');
            if (window_weight >= 700) {
                text(str(x) + 'σ = ' + round(i, 2), map(i, 0, 10, 15, window_weight-16), window_height - 240 + 18);
            } else {
                text(str(x) + 'σ', map(i, 0, 10, 15, window_weight-16), window_height - 240 + 18);
            }
           
        }

        x = x + 1;
    };
    

}