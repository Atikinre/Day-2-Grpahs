class Graphics1d {
  constructor(
    xmin = -10.0,
    xmax = 10.0,
    ymin = -10.0,
    ymax = 10.0,
    W = 512,
    H = 512,
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
    let count = 0;
    var mxe = [this.f(this.xmin), this.f(this.xmax)];
    this.fvalues = new Float64Array(this.H * this.W);
    this.dots = new Array(this.H * this.W);
    for (
      let i = this.xmin;
      i <= this.xmax;
      i += (-this.xmin + this.xmax) / this.W
    ) {
      this.dots[count] = i;
      this.fvalues[count++] = this.f(i);
      mxe[1] = Math.max(this.fvalues[count - 1], mxe[1]);
      mxe[0] = Math.min(this.fvalues[count - 1], mxe[0]);
    }
    this.ev = 1;
    return mxe;
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
      zerox = -this.xmin * stepx,
      zeroy = this.ymax * stepy;
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
    for (let i = zerox; i < this.W; i += sqx * stepx) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, this.H);
      ctx.closePath();
      ctx.stroke();
    }
    for (let j = zeroy; j < this.H; j += sqy * stepy) {
      ctx.beginPath();
      ctx.lineTo(0, j);
      ctx.lineTo(this.W, j);
      ctx.closePath();
      ctx.stroke();
    }
    for (let i = zerox; i > 0; i -= sqx * stepx) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, this.H);
      ctx.closePath();
      ctx.stroke();
    }
    for (let j = zeroy; j > 0; j -= sqy * stepy) {
      ctx.beginPath();
      ctx.lineTo(0, j);
      ctx.lineTo(this.W, j);
      ctx.closePath();
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = dots;
    ctx.moveTo(zerox + this.xmin * stepx, zeroy - this.f(this.xmin) * stepy);
    for (let i = 0; i <= this.H * this.W; i++) {
      if (this.dots[i] != this.xmin) {
        let cur = this.fvalues[i];
        let prev = this.fvalues[i - 1];
        if (cur * prev <= 0) {
          if (Math.abs(cur - prev) > this.ymax - this.ymin) {
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = gaps;
            ctx.arc(
              zerox + this.dots[i] * stepx,
              zeroy - stepy * this.ymax,
              stepx / 10,
              0,
              180
            );
            ctx.arc(
              zerox + this.dots[i] * stepx,
              zeroy - stepy * this.ymin,
              stepx / 10,
              0,
              180
            );
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
          } else {
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = zeros;
            ctx.arc(zerox + this.dots[i] * stepx, zeroy, stepx / 10, 0, 180);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(
              zerox + this.dots[i - 1] * stepx,
              zeroy - this.fvalues[i - 1] * stepy
            );
            ctx.lineTo(
              zerox + this.dots[i] * stepx,
              zeroy - this.fvalues[i] * stepy
            );
          }
        } else
          ctx.lineTo(
            zerox + this.dots[i] * stepx,
            zeroy - this.fvalues[i] * stepy
          );
      }
    }
    ctx.stroke();
    ctx.closePath();
    ctx.font = "25px Consolas";
    ctx.textBaseline = "ideographic";
    ctx.fillStyle = "black";
    let mx = "(" + this.xmax + ", " + this.ymax + ")",
      mn = "(" + this.xmin + ", " + this.ymin + ")";
    ctx.fillText(
      mx,
      zerox + this.xmax * stepx - (25 * mx.length) / 1.8,
      zeroy - this.ymax * stepy + 25
    );
    ctx.fillText(mn, zerox + this.xmin * stepx, zeroy - this.ymin * stepy);
  }

  autodraw(
    dots = "red",
    axis = "green",
    zeros = "indigo",
    gaps = "magenta",
    bg = "gray"
  ) {
    console.log(this.ymin, this.ymax);
    if (this.ev == 0) var mx = this.evaluate();
    this.ymin = Math.min(mx[0], mx[1]);
    this.ymax = Math.max(mx[0], mx[1]);
    this.draw(dots, axis, zeros, gaps, bg);
    console.log(this.ymin, this.ymax);
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
var sqx = 1,
  sqy = 1;
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
  sqx = parseFloat(document.getElementById("sqx").value);
  sqy = parseFloat(document.getElementById("sqy").value);
  f = replaceSpecialSequence(f);
  var m = function(x) {
    return eval(f);
  };
  ng = new Graphics1d(xmin, xmax, ymin, ymax, W, H, m);
  ng.draw();
}
