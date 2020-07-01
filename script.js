class Graphics1d {
  constructor(
    xmin = -10.0,
    xmax = 10.0,
    ymin = -10.0,
    ymax = 10.0,
    W = 1000,
    H = 1000,
    f = function(x) {
      return x * x - 9;
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
    this.values = new Map();

    for (
      let i = this.xmin;
      i <= this.xmax;
      i += (-this.xmin + this.xmax) / this.W
    ) {
      this.values[i] = this.f(i);
    }
    this.ev = 1;
    return this.values;
  }
  draw(
    dots = "red",
    axis = "green",
    zeros = "indigo",
    gaps = "magenta",
    bg = "gray"
  ) {
    var graph = document.getElementById("canvas");
    graph.width = this.W;
    graph.height = this.H;
    var ctx = graph.getContext("2d");
    var drawed = new Graphics1d();
    if (this.ev == 0) this.evaluate();
    let stepx = this.W / (-this.xmin + this.xmax),
      stepy = this.H / (-this.ymin + this.ymax),
      zerox = Math.abs(this.xmin) * stepx,
      zeroy = Math.abs(this.ymin) * stepy;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, ng.W, ng.H);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = axis;
    ctx.moveTo(0, zeroy);
    ctx.lineTo(ng.W, zeroy);
    ctx.moveTo(zerox, 0);
    ctx.lineTo(zerox, ng.H);
    ctx.closePath();
    ctx.stroke();
    ctx.lineWidth = 0.2;
    ctx.strokeStyle = axis;
    for (let i = 0; i < ng.W; i += stepx)
      for (let j = 0; j < ng.H; j += stepy) {
        ctx.beginPath();
        ctx.moveTo(i, j);
        ctx.lineTo(i + stepx, j);
        ctx.lineTo(i + stepx, j + stepy);
        ctx.lineTo(i, j + stepy);
        ctx.closePath();
        ctx.stroke();
      }
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = dots;
    ctx.moveTo(zerox + this.xmin * stepx, zeroy - this.f(this.xmin) * stepy);
    for (
      let i = this.xmin;
      i <= this.xmax;
      i += (-this.xmin + this.xmax) / this.W
    ) {
      if (0) {
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = zeros;
        ctx.arc(
          zerox + i * stepx,
          zeroy - stepy * this.values[i - (-this.xmin + this.xmax) / this.W],
          3,
          0,
          180
        );
        ctx.arc(
          zerox + i * stepx,
          zeroy - stepy * this.values[i + (-this.xmin + this.xmax) / this.W],
          stepx,
          0,
          180
        );
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
      } else {
        ctx.lineTo(zerox + i * stepx, zeroy - this.values[i] * stepy);
      }
    }
    ctx.stroke();
    ctx.closePath();
    ctx.font = stepx + "px Consolas";
    ctx.textBaseline = "ideographic";
    ctx.fillStyle = "black";
    let mx = "(" + this.xmax + ", " + this.ymax + ")",
      mn = "(" + this.xmin + ", " + this.ymin + ")";
    ctx.fillText(
      mx,
      zerox + this.xmax * stepx - (stepx * mx.length) / 1.8,
      zeroy + this.ymin * stepy + stepx
    );
    ctx.fillText(mn, zerox + this.xmin * stepx, zeroy + this.ymax * stepy);
  }

  autodraw(
    dots = "red",
    axis = "green",
    zeros = "indigo",
    gaps = "magenta",
    bg = "gray"
  ) {
    this.ymin = this.f(this.xmin);
    this.ymax = this.f(this.xmax);
    this.draw(dots, axis, zeros, gaps, bg);
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
var ng = new Graphics1d();
ng.draw();
function yes() {
  var xmin = parseFloat(document.getElementById("xmin").value),
    xmax = parseFloat(document.getElementById("xmax").value),
    ymin = parseFloat(document.getElementById("ymin").value),
    ymax = parseFloat(document.getElementById("ymax").value),
    W = parseFloat(document.getElementById("W").value),
    H = parseFloat(document.getElementById("H").value),
    f = document.getElementById("f").value;
  f = replaceSpecialSequence(f);
  var m = function(x) {
    return eval(f);
  };
  ng = new Graphics1d(xmin, xmax, ymin, ymax, W, H, m);
  ng.draw();
}
