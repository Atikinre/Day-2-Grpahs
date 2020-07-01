class Graphics1d {
  constructor(
    xmin = -2,
    xmax = 10.0,
    ymin = -2,
    ymax = 10.0,
    W = 120 * 4,
    H = 100 * 4,
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
    for (let i = this.xmin; i <= this.xmax; i += 0.01) {
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
    var ctx = graph.getContext("2d");
    var drawed = new Graphics1d();
    if (this.ev == 0) this.evaluate();
    let zerox = Math.abs(this.xmin) * this.W / (Math.abs(this.xmin) + Math.abs(this.xmax)) ,
    zeroy = Math.abs(this.ymin) * this.H / (Math.abs(this.ymin) + Math.abs(this.ymax));
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
    for (
      let i = 0;
      i <= ng.W;
      i += ng.W / (Math.abs(ng.xmin) + Math.abs(ng.xmax))
    )
      for (
        let j = 0;
        j <= ng.H;
        j += ng.H / (Math.abs(ng.ymin) + Math.abs(ng.ymax))
      ) {
        ctx.beginPath();
        ctx.moveTo(i, j);
        ctx.lineTo(i + ng.W / (Math.abs(ng.xmin) + Math.abs(ng.xmax)), j);
        ctx.lineTo(
          i + ng.W / (Math.abs(ng.xmin) + Math.abs(ng.xmax)),
          j + ng.H / (Math.abs(ng.ymin) + Math.abs(ng.ymax))
        );
        ctx.lineTo(i, j + ng.H / (Math.abs(ng.ymin) + Math.abs(ng.ymax)));
        ctx.closePath();
        ctx.stroke();
      }
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = dots;
    ctx.moveTo(
      zerox + (ng.xmin * zerox) / ng.xmax,
      zeroy - (this.f(this.xmin) * zeroy / 2 / this.ymax));
    for (let i = ng.xmin; i <= ng.xmax; i += 0.01){
      ctx.lineTo(
        zerox + (i * ng.W) / 2 / ng.xmax,
        zeroy - (this.values[i] * ng.H) / 2 / ng.ymax
      );
      ctx.stroke();
    ctx.closePath();
    
    }
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
var ng = new Graphics1d();
ng.draw();
