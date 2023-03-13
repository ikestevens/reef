let HEIGHT;

// set number of panels
var panelNum = randBetweenInt(1, 5);
if (fxrand() < 0.8) {
  horiz = false
} else {
  horiz = true
}

// set strand number and related thickness
var strandNum = randBetweenInt(1500, 3500);
var strands = [strandNum];
if (strandNum < 2000) {
  var strand_num_name = 'sparse';
  var coralThick = randBetweenInt(45, 60);
} else if (strandNum >= 2000 && strandNum < 2500) {
  var coralThick = randBetweenInt(55, 65);
  var strand_num_name = 'lush';
} else if (strandNum >= 2500 && strandNum < 3000) {
  var coralThick = randBetweenInt(60, 70);
  var strand_num_name = 'abundant';
} else {
  var coralThick = randBetweenInt(65, 75);
  var strand_num_name = 'prolific';
}

// set thickness attribute name
if (coralThick < 50) {
  var thickness_name = 'fatty';
} else if (coralThick >= 50 && coralThick < 60) {
  var thickness_name = 'wide';
} else if (coralThick >= 60 && coralThick < 70) {
  var thickness_name = 'slim';
} else {
  var thickness_name = 'skinny';
}

// set sway speed, speed name, cycle length and pause duration
var speed = randBetween(0.4, 0.9);
if (speed < 0.5) {
  var speed_name = 'languid';
  var cycle = randBetweenInt(190, 230);
  var pause = 22;
} else if (speed >= 0.5 && speed < 0.6) {
  var speed_name = 'gentle';
  var cycle = randBetweenInt(180, 220);
  var pause = 20;
} else if (speed >= 0.6 && speed < 0.7) {
  var speed_name = 'steady';
  var cycle = randBetweenInt(170, 210);
  var pause = 18;
} else if (speed >= 0.7 && speed < 0.8) {
  var speed_name = 'eddy';
  var cycle = randBetweenInt(160, 200);
  var pause = 16;
} else {
  var speed_name = 'current';
  var cycle = randBetweenInt(150, 190);
  var pause = 14;
}

// set cycle time name
if (cycle <= 130) {
  var cycle_name = 'short';
} else if (cycle > 130 && cycle <= 150) {
  var cycle_name = 'medium short';
} else if (cycle > 150 && cycle <= 170) {
  var cycle_name = 'medium';
} else if (cycle > 170 && cycle <= 190) {
  var cycle_name = 'medium long';
} else {
  var cycle_name = 'long';
}

// set noise degree and name
var noiseDegree = randBetweenInt(300, 500);
if (noiseDegree < 350) {
  var noise_name = 'high';
} else if (noiseDegree >= 350 && noiseDegree < 450) {
  var noise_name = 'normal';
} else {
  var noise_name = 'low';
}

// set color, make sure not too dark
var r = randBetweenInt(50, 255);
if (r < 100) {
  var b = randBetweenInt(100, 255);
} else {
  var b = randBetweenInt(50, 255);
}
if (r < 100 || b < 100) {
  var g = randBetweenInt(150, 255);
} else {
  var g = randBetweenInt(50, 255);
}

// print attributes
console.log("Panel Number: " + panelNum);
console.log("Horizontal: " + horiz)
console.log("Strand Amount: " + strand_num_name);
console.log("Strand Thickness: " + thickness_name);
console.log("Speed: " + speed_name);
console.log("Cycle Length: " + cycle_name)
console.log("Noise Variance: " + noise_name)

function setup() {
  HEIGHT = Math.min(windowWidth, windowHeight);
  createCanvas(HEIGHT, HEIGHT);
  frameRate(22)
  noStroke();
  for (let i=0; i<strandNum; i++) {
    var vec = createVector(randBetween(0, HEIGHT), randBetween(0, HEIGHT), (HEIGHT/coralThick));
    var dir = createVector(cos(0), sin(0));
    strands[i]= new Strand(vec, dir, speed);
  }
}

function draw() {
  if (frameCount == 1) {
    background(0);
  }
  // made it more transparent during the shift in sway windows
  var frameSet = frameCount % cycle
  if (frameSet < pause || frameSet > cycle - pause) {
    fill(0, 2)
  } else if (frameSet >= pause && frameSet < (cycle/2)-pause) {
    fill(0, 7)
  } else if (frameSet >= (cycle/2)-pause && frameSet < (cycle/2)+pause) {
    fill(0, 2)
  } else {
    fill(0, 7)
  }
  rect(0, 0, width, height);
  for (let i = 0; i < strands.length; i++) {
    strands[i].execute();
  }

  panelView(HEIGHT, panelNum, horiz);

  50 === frameCount && fxpreview();
}

function keyPressed() {
  if (keyCode === 83) {
    save("reef.png");
  }
  if (keyCode === 71) {
  createLoop({duration:8, gif:true});
}
}

class Strand{
  constructor(vec,dir,speed){
    this.vec = vec;
    this.dir = dir;
    this.speed = speed;
  }
  execute() {
    this.move();
    this.recenter();
    this.drawCircle();
  }
  move(){
    let angle=noise(this.vec.x/noiseDegree, this.vec.y/noiseDegree, frameCount/noiseDegree)*TWO_PI;
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    var vel = this.dir.copy();
    var d = 1;
    vel.mult(this.speed*d);
    if (frameCount % cycle < (cycle/2)) {
      this.vec.add(vel);
    } else {
      this.vec.sub(vel);
    }
    var frameSet = frameCount % cycle
    if (frameSet < pause) {
      vel.mult(this.speed*d/3);
      this.vec.add(vel);
    } else if (frameSet > cycle - pause) {
      vel.mult(this.speed*d/3);
      this.vec.sub(vel);
    } else if (frameSet >= pause && frameSet < (cycle/2)-pause) {
      vel.mult(this.speed*d);
      this.vec.add(vel);
    } else if (frameSet >= (cycle/2)-pause && frameSet < (cycle/2)) {
      vel.mult(this.speed*d/3);
      this.vec.add(vel);
    } else if (frameSet >= (cycle/2) && frameSet < (cycle/2)+pause) {
      vel.mult(this.speed*d/3);
      this.vec.sub(vel);
    } else {
      vel.mult(this.speed*d);
      this.vec.sub(vel);
    }
  }
  recenter(){
  if (this.vec.x < 0 || this.vec.x > HEIGHT || this.vec.y < 0 || this.vec.y > HEIGHT) {
    this.vec.x = randBetween(0, HEIGHT);
    this.vec.y = randBetween(0, HEIGHT);
  }
}
  drawCircle(){
    fill(r, b, g);
    ellipse(this.vec.x, this.vec.y, this.vec.z);
  }
}

// function to add the panels
function panelView(height, numPanels, horiz) {
  layer = createGraphics(height+(height/100),height+(height/100));
  //white layer
  layer.fill("white");
  noStroke()
  layer.rect(-(height/50), -(height/50), height+(height/45), height+(height/45));

  //draw out the panels
  let msk = createGraphics(height+(height/100), height+(height/100));
  msk.background(0);
  msk.erase();
  msk.noStroke();
  var denomenator = (numPanels * (numPanels+1))+1
  var ratWeight = 1
  if (numPanels == 1) {
    if (horiz == true) {
      noStroke()
      msk.rect(ratWeight*height/11, height/6, 9*height/11, 2*height/3);
      strokeWeight(height/105);
      stroke(0);
      noFill();
      rect(ratWeight*height/11, height/6, 9*height/11, 2*height/3);
      ratWeight = ratWeight + (numPanels + 1);
      noStroke();
    } else {
    noStroke()
    msk.rect(height/6, ratWeight*height/11, 2*height/3, 9*height/11);
    strokeWeight(height/105);
    stroke(0);
    noFill();
    rect(height/6, ratWeight*height/11, 2*height/3, 9*height/11);
    ratWeight = ratWeight + (numPanels + 1);
    noStroke();
  }
  } else if (numPanels == 2) {
    if (horiz == true) {
      for (let i=0; i < numPanels; i++) {
        noStroke()
        msk.rect(height/8, ratWeight*height/11, 3*height/4, (numPanels*2)*height/11);
        strokeWeight(10);
        stroke(0);
        noFill();
        rect(height/8, ratWeight*height/11, 3*height/4, (numPanels*2)*height/11);
        ratWeight = ratWeight + (numPanels + 3);
        noStroke()
      }
    } else {
      for (let i=0; i < numPanels; i++) {
        noStroke()
        msk.rect(ratWeight*height/11, height/8, (numPanels*2)*height/11, 3*height/4);
        strokeWeight(10);
        stroke(0);
        noFill();
        rect(ratWeight*height/11, height/8, (numPanels*2)*height/11, 3*height/4);
        ratWeight = ratWeight + (numPanels + 3);
        noStroke()
      }
    }
  } else {
    if (horiz == true) {
      for (let i=0; i < numPanels; i++) {
        noStroke()
        msk.rect(height/8, ratWeight*height/denomenator, 3*height/4, (numPanels)*height/denomenator);
        strokeWeight(10);
        stroke(0);
        noFill();
        rect(height/8, ratWeight*height/denomenator, 3*height/4, (numPanels)*height/denomenator);
        ratWeight = ratWeight + (numPanels + 1);
        noStroke();
      }
    }
    else {
  for (let i=0; i < numPanels; i++) {
    noStroke()
    msk.rect(ratWeight*height/denomenator, height/8, (numPanels)*height/denomenator, 3*height/4);
    strokeWeight(10);
    stroke(0);
    noFill();
    rect(ratWeight*height/denomenator, height/8, (numPanels)*height/denomenator, 3*height/4);
    ratWeight = ratWeight + (numPanels + 1);
    noStroke();
  }
}
}
  let mskImage = msk.get();
  pgImage = layer.get();
  pgImage.mask(mskImage);
  image(pgImage, 0, 0);
}

function randBetween(a, b) {
    return a + (b - a) * fxrand()
}

function randBetweenInt(a, b) {
    return Math.floor(a + (b + 1 - a) * fxrand())
}
