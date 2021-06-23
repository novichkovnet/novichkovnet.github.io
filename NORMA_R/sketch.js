let sliderMu, sliderSigma;
let zScoreSize = 200;
let zScoreList =[];
let zScoreMax = 10;
let sigmaMin = 1;
let sigmaMax = 4;
let BackgroundColor = 'white';
let BorderColor = '#D9D9D9';
let GraphColor = '#F5DE68';
let ProbColorPoz = '#1BB047';
let ProbColorNeg = '#000000';
let MarignBottom = 16*13;
let GridMarignBottom = MarignBottom - 8;

function preload() {
    Headers = loadFont('font/SuisseIntl-SemiBold.otf');
    Regular = 'Arial';
  }

function setup() {
    background('white');

    //Sliders
    sliderMu = createSlider(0, zScoreMax, zScoreMax/2, 0.1);
    sliderMu.position(32, 69);
    sliderMu.addClass('mySliders');

    sliderSigma = createSlider(sigmaMin, sigmaMax, sigmaMin, 0.1);
    sliderSigma.position(32, 93);
    sliderSigma.addClass('mySliders');

    slidera = createSlider(0, zScoreMax, 3, 0.1);
    slidera.position(180, 93);
    slidera.addClass('mySliders');

    //sliderb = createSlider(0, zScoreMax, 7, 0.1);
    //sliderb.position(180, 93);
    //sliderb.addClass('mySliders');
}

function draw() {
    
    let window_weight = windowWidth; // get window width
    let window_height = windowHeight; // get window height
    
    createCanvas(window_weight, window_height); // redraw canvas with window sizes
    
    fill(BackgroundColor);
    stroke(BorderColor);
    strokeWeight(1);
    rect(0, 0, window_weight, window_height, 16);

    //Grid System
    //gridSystem(window_weight, window_height); // add grid systen in to the canvas

    //Calculation
    let mu = sliderMu.value();
    let sigma = sliderSigma.value();
    
    let a = slidera.value();
    let b = 10;

    let densityNorma = normalCalc(sigma, mu, mu);
    let coordinatesList =[16,window_height - 256];
    
    //Visualization

    //noFill();
    //noStroke();

    sigmaGrid (mu, sigma, window_weight, window_height);

    fill(GraphColor);
    
    start = mu - sigma*5;
    end = mu + sigma*5;

    viz1 (mu, sigma, zScoreSize, window_weight, window_height, start, end);

    if (b > a) {
        fill(ProbColorPoz);
        
    } else {
        fill(ProbColorNeg);
    }
    
    noStroke();
    start = a;
    end = b;

    viz1 (mu, sigma, zScoreSize, window_weight, window_height, start, end);

    noFill();
    //stroke('black');
    //strokeWeight(2);
    
    start = mu - sigma*5;
    end = mu + sigma*5;

    viz1 (mu, sigma, zScoreSize, window_weight, window_height, start, end);


   //Graphic

   stroke('black'); // color of graphics strokes
   strokeWeight(1); // weight of basic strokes
   
   //Basic strokes
   
   line(16,map(densityNorma, 0, .4,  window_height - MarignBottom, 160), window_weight - 16, map(densityNorma, 0, .4,  window_height - MarignBottom, 160)); // top line
   line(map(mu, 0, 10, 15, window_weight-16), 130, map(mu, 0, 10, 15, window_weight-16), window_height - MarignBottom); // center line

    

   line(map(a, 0, 10, 15, window_weight-16), 155, map(a, 0, 10, 15, window_weight-16), window_height - MarignBottom); // a line
   line(map(b, 0, 10, 15, window_weight-16), 155, map(b, 0, 10, 15, window_weight-16), window_height - MarignBottom); // b line


   //Akcent Strokes
   strokeWeight(1); // weight of zero line
   line(16, window_height - MarignBottom, window_weight-16, window_height - MarignBottom); // zero line


    //Typography
    noStroke();
    fill('#000000');
    textFont(Headers);
    textStyle(BOLD);
    
    textAlign(LEFT);
    
    textSize(24);
    text('Normal distribution', 16, 40);
    
    textSize(18);
    text('Z-score calculations', 16, window_height - 16*8.5);
    text('Right probability', 16, window_height-16*4);

    //textSize(12);
    //text('© YandexPracticum',16, window_height-24);

    // nums on graph

    textFont(Regular);
    
    textSize(14);
    textStyle(NORMAL);
    text('density = ' + round(densityNorma, 2), 16, map(densityNorma, 0, .4,  window_height - MarignBottom, 160) + 18); // density on graph
    textAlign(CENTER);
    textStyle(NORMAL);
    text('μ = ' + mu, map(mu, 0, 10, 15, window_weight-16), 120); //mu num on graph
    text('a = ' + a, map(a, 0, 10, 15, window_weight-16), 145); //a num on graph
    //text('a = ' + b, map(b, 0, 10, 15, window_weight-16), 145); //a num on graph
    
    // slider texts
    
    textFont(Regular);
    textAlign(LEFT);
    textSize(14);
    text('μ', 16, 76);
    text('σ', 16, 100);
    
    //textFont(Regular);
    //textSize(18);

    text('Left value', 165, 77);
    text('a', 165, 101);
    
    text(mu, 120, 77);
    text(sigma, 120, 101);

    //text

    text(a, 268, 101); //a mum slider
    //text(b, 268, 101); // b num slider

    // formulas

    //textFont(Regular);

    //text('z(a) = z(' + a + ') = (a - μ) / σ = (' + a + ' - ' + mu + ') / ' + sigma + ' = ' + round((a-mu)/sigma,2), 16,window_height - 16*8);
    text('z(' + a + ') = (a - μ) / σ = (' + a + ' - ' + mu + ') / ' + sigma + ' = ' + round((a-mu)/sigma,2), 16,window_height  - 16*6.5);

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

    text('P(Rigth) = 1 - P(Left) = ' + round(1 - (p1/100),4), 16, window_height - 32);

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
    
    vertex(map(start, 0, 10, 15, window_weight-16), map(0, 0, .2,  window_height - MarignBottom, 160));
    

    for (let i = 0; i <= zScoreSize; i++) {
        zScore = map(i, 0, zScoreSize, start, end);
        density = normalCalc(sigma, mu, zScore);
        let x = map(zScore, 0, 10, 15, window_weight-16);
        let y = map(density, 0, .4,  window_height - MarignBottom, 160);
        vertex(x, y);
    }

    vertex(map(end, 0, 10, 15, window_weight-16), map(0, 0, .2,  window_height - MarignBottom, 160));

    endShape();
}

function sigmaGrid (mu, sigma, window_weight, window_height) {

    x = -10;
    strokeWeight(1);

    for(i = mu - sigma*10; i <= mu + sigma*10; i = i + sigma){

        if (round(i, 2) != mu) {
            strokeWeight(1);
            stroke(BorderColor);
            line(map(i, 0, 10, 15, window_weight-16), window_height - GridMarignBottom, map(i, 0, 10, 15, window_weight-16), 162);
            textFont(Regular);
            textSize(11);
            textAlign(CENTER);
            
            if (window_weight >= 600) {
                fill(BackgroundColor);
                noStroke();
                rect(map(i, 0, 10, 15, window_weight-16)-20, window_height - GridMarignBottom + 16, 40, 30);
                fill('black');
                text(str(x) + 'σ = ' + round(i, 2), map(i, 0, 10, 15, window_weight-16), window_height - GridMarignBottom + 16);
            } else {
                fill(BackgroundColor);
                noStroke();
                rect(map(i, 0, 10, 15, window_weight-16)-20, window_height - GridMarignBottom + 16, 40, 30);
                fill('black');
                text(str(x) + 'σ', map(i, 0, 10, 15, window_weight-16), window_height - GridMarignBottom  + 16);
            }
           
        }

        x = x + 1;
    };
    

}