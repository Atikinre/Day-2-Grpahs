class Graphics1d {
  constructor(
    xmin = -10.0,
    xmax = 10.0,
    ymin = -10.0,
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
    let 
    stepx = this.W / (Math.abs(this.xmin) + Math.abs(this.xmax)),
    stepy = this.H / (Math.abs(this.ymin) + Math.abs(this.ymax)),
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
      zerox + (ng.xmin * stepx),
      zeroy - (this.f(this.xmin) * stepy));
    this.values[0] = NaN;
    for (let i = ng.xmin; i <= ng.xmax; i += 0.01){
       
      if(this.values[i] == NaN){
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = zeros;
        ctx.arc(i - 0.1, this.values[i - 0.1], 50, 0, 360, clockwise);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
      }
      else{
      ctx.lineTo(
        zerox + i * stepx,
        zeroy - this.values[i] * stepy
      );
      }
    }
    ctx.stroke();
    ctx.closePath();
    ctx.font = '20px serif';
    ctx.fillStyle = "black";
    ctx.fillText('(' + this.xmax + ", " + this.ymax + ')', zerox + this.xmax * stepx - 70, zeroy + this.ymin * stepy + 20);
    ctx.fillText('(' + this.xmin + ", "+ this.ymin + ')', zerox + this.xmin * stepx , zeroy + this.ymax * stepy - 10);
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
