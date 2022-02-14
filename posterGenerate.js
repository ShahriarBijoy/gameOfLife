
var colors = ['#2a9d8f','#e9c46a','#f4a261','#e76f51','#c44569','#f7d794','#f78fb3','#63cdda','#6c5ce7',
'#55efc4','#d1ccc0','#ff5252','#badc58','#e056fd','#ffffff'];
let itter = 16
let margin = 40
let step


function setup() {
  createCanvas(760, 760, SVG);
  noLoop()
  // frameRate(4);
  step = (width - margin * 2) / itter

}


function draw() {
  background('#2d3436')
  var currentYear = year();
  var currentMonth = month();
  var currentDay = day();
  var currentHour = hour();
  var currentMinute = minute();

  var currentDate = currentYear + '-' + nf(currentMonth, 2) + '-' + nf(currentDay, 2)+ '-' +
  nf(currentHour,2) + ':' + nf(currentMinute, 2);

  fill(255);
  noStroke();
  textSize(10);
  text(currentDate,633, 745);
  fill(150);
  text('This digital art is generated on :',470, 745);
  fill(255);
  text('Designed @HFK_BREMEN.',40, 745);

  for (let y = 0; y < itter; y++) {
    for (let x = 0; x < itter; x++) {
      push()
      translate(x * step + margin, y * step + margin)

      let pat = new Pattern(step)
      // 0 - half oval, 1 - straight, 2 - diagonal
      pat.create(0)
      pop()
    }
  }
}


function keyPressed(){
  if (keyCode == LEFT_ARROW){
    save("myNFT.svg");
    // noLoop();
  }
}

class Pattern {
  constructor(step) {

    this.width = step
    this.height = step
    this.step = step
    this.arr0 = [0, HALF_PI, PI, PI + HALF_PI]
    this.arr1 = [[0,0,this.step,0],[this.step,0,this.step,this.step],[this.step,this.step,0,this.step],[0,this.step,0,0]]
    this.arr2 = [[0,0,this.step,this.step],[0,this.step, this.step,0]]

  }

  create(type) {
    noStroke()
    let colorpicker = int(random(colors.length));
    fill(colors[colorpicker]);
    // opacity(100);
    push()
    switch (type) {
      case 0:
        let rRot = random(this.arr0)
        translate(this.width / 2, this.height / 2)
        rotate(rRot)
        arc(0, 0, this.width, this.height, 0, PI)
        break
      case 1:
      	let rPar = random(this.arr1)
        stroke(255)
        strokeCap(PROJECT)
        strokeWeight(this.step/5)
      	line(rPar[0], rPar[1], rPar[2], rPar[3])
        break
      case 2:
      	let rPos = random(this.arr2)
        stroke(255)
        strokeCap(PROJECT)
        strokeWeight(this.step/5)
        line(rPos[0], rPos[1], rPos[2], rPos[3])
        break
      default:
        console.log("the switch is broken")
    }
    pop()

  }

}
