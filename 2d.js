class Graphics2d {
  constructor(
    xmin = -10.0,
    xmax = 10.0,
    ymin = -10.0,
    ymax = 10.0,
    W = 512,
    H = 512,
    f = function(x, y) {
      return x * x + y * y - 81;
    }
  ) {
    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
    this.W = W;
    this.H = H;
    this.f = f;
    this.ev = 0;
  }
  evaluate() {
    this.fvalues = new Float64Array(this.H * this.W);
    this.dots = new Array(this.H * this.W);
    let count = 0;
    for (
      let i = this.xmin;
      i <= this.xmax;
      i += (-this.xmin + this.xmax) / this.W
    )
      for (
        let j = this.ymin;
        j <= this.ymax;
        j += (-this.ymin + this.ymax) / this.H
      ) {
        this.dots[count] = [i, j];
        this.fvalues[count++] = this.f(i, j);
      }
    this.ev = 1;
  }
  draw(
    dots = "red",
    axis = "green",
    zeros = "indigo",
    gaps = "magenta",
    bg = "gray"
  ) {
    var graph = document.getElementById("canvas2");
    graph.width = this.W;
    graph.height = this.H;
    var ctx = graph.getContext("2d");
    if (this.ev == 0) this.evaluate();
    let stepx = this.W / (-this.xmin + this.xmax),
      stepy = this.H / (-this.ymin + this.ymax),
      zerox = Math.abs(this.xmin) * stepx,
      zeroy = Math.abs(this.ymin) * stepy;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, nd.W, nd.H);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = axis;
    ctx.moveTo(0, zeroy);
    ctx.lineTo(nd.W, zeroy);
    ctx.moveTo(zerox, 0);
    ctx.lineTo(zerox, nd.H);
    ctx.closePath();
    ctx.stroke();
    ctx.lineWidth = 0.2;
    ctx.strokeStyle = axis;
    for (let i = 0; i < this.W; i += sqx2 * stepx) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, this.H);
      ctx.closePath();
      ctx.stroke();
    }
    for (let j = 0; j < this.H; j += sqy2 * stepy) {
      ctx.beginPath();
      ctx.lineTo(0, j);
      ctx.lineTo(this.W, j);
      ctx.closePath();
      ctx.stroke();
    }

    ctx.lineWidth = 1;
    ctx.strokeStyle = dots;
    console.log(this.fvalues.length, this.dots.length);
    for (let i = 0; i < this.W * this.H; ++i) {
      ctx.beginPath();
      if (this.fvalues[i] < 0) {
        ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
      } else if (this.fvalues[i] > 0) {
        ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
      } else if (this.fvalues[i] == 0) ctx.fillStyle = "rgba(255, 255, 255, 1)";

      ctx.arc(
        zerox + this.dots[i][0] * stepx,
        zeroy - this.dots[i][1] * stepy,
        1,
        0,
        360
      );
      ctx.fill();
      ctx.closePath();
    }
    ctx.font = "25px Consolas";
    ctx.textBaseline = "ideographic";
    ctx.fillStyle = "black";
    let mx = "(" + this.xmax + ", " + this.ymax + ")",
      mn = "(" + this.xmin + ", " + this.ymin + ")";
    ctx.fillText(
      mx,
      zerox + this.xmax * stepx - (25 * mx.length) / 1.8,
      zeroy + this.ymin * stepy + 25
    );
    ctx.fillText(mn, zerox + this.xmin * stepx, zeroy + this.ymax * stepy);
  }
}
function replaceSpecialSequence(str) {
  str = str.split("cos").join("Math.cos");
  str = str.split("sin").join("Math.sin");
  str = str.split("tan").join("Math.tan");
  str = str.split("aMath.cos").join("Math.acos");
  str = str.split("aMath.sin").join("Math.asin");
  str = str.split("aMath.tan").join("Math.atan");
  str = str.split("pi").join("Math.PI");
  str = str.split("ln2").join("Math.LN2");
  str = str.split("ln10").join("Math.LN10");
  str = str.split("log2e").join("Math.LOG2E");
  str = str.split("log10e").join("Math.LOG10E");
  str = str.split("sqrt1_2").join("Math.SQRT1_2");
  str = str.split("sqrt2").join("Math.SQRT2");
  str = str.split("abs").join("Math.abs");
  str = str.split("ceil").join("Math.ceil");
  str = str.split("exp").join("Math.exp");
  str = str.split("floor").join("Math.floor");
  str = str.split("ln").join("Math.log");
  str = str.split("max").join("Math.max");
  str = str.split("min").join("Math.min");
  str = str.split("pow").join("Math.pow");
  str = str.split("round").join("Math.round");
  str = str.split("lg").join("logab");
  str = str.split("sqrt").join("Math.sqrt");
  str = str.split("e").join("Math.E");
  return str;
}
var sqx2 = 1,
  sqy2 = 1;
var nd = new Graphics2d();
nd.draw();
function yes2() {
  var xmin2 = parseFloat(document.getElementById("xmin2").value),
    xmax2 = parseFloat(document.getElementById("xmax2").value),
    ymin2 = parseFloat(document.getElementById("ymin2").value),
    ymax2 = parseFloat(document.getElementById("ymax2").value),
    W2 = parseFloat(document.getElementById("W2").value),
    H2 = parseFloat(document.getElementById("H2").value),
    f2 = document.getElementById("f2").value;
  sqx2 = parseFloat(document.getElementById("sqx2").value);
  sqy2 = parseFloat(document.getElementById("sqy2").value);
  f2 = replaceSpecialSequence(f2);
  var m2 = function(x, y) {
    return eval(f2);
  };
  nd = new Graphics2d(xmin2, xmax2, ymin2, ymax2, W2, H2, m2);
  nd.draw();
}