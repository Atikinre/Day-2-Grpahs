 

class Graphics1d{
  constructor(xmin=-10.0,xmax=10.0, ymin=-10.0, ymax=10.0, W=120 * 4, H=100 * 4, f = function(x){return x*x - 9}){
    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
    this.W = W;
    this.H = H;
    this.f = f;
  }
  evaluate(){
    let values = new Map;
    for(let i = this.xmin; i <= this.xmax; i += 0.01){
      values[i] = this.f(i);
    }
    return values;
  }
  draw(dots = "red", axis = "green", zeros = "indigo", gaps = "magenta", bg = "gray"){
    var graph = document.getElementById("canvas");
    var ctx = graph.getContext("2d");
    var drawed = new Graphics1d();
    let values = this.evaluate();
    ctx.fillRect(0, 0, ng.W, ng.H)
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.moveTo(0, ng.H / 2);
    ctx.lineTo(ng.W, ng.H / 2);
    ctx.moveTo(ng.W / 2, 0);
    ctx.lineTo(ng.W / 2, ng.H);
    ctx.closePath();
    ctx.stroke();
    ctx.lineWidth = 0.2;
    ctx.strokeStyle = "green";
    for(let i = 0; i <= ng.W; i += ng.W / (Math.abs(ng.xmin) + Math.abs(ng.xmax)))
      for(let j = 0; j <= ng.H; j += ng.H / (Math.abs(ng.ymin) + Math.abs(ng.ymax))){
      ctx.beginPath();
      ctx.moveTo(i, j);
      ctx.lineTo(i + ng.W / (Math.abs(ng.xmin) + Math.abs(ng.xmax)), j);
      ctx.lineTo(i + ng.W / (Math.abs(ng.xmin) + Math.abs(ng.xmax)), j + ng.H / (Math.abs(ng.ymin) + Math.abs(ng.ymax)));
      ctx.lineTo(i, j + ng.H / (Math.abs(ng.ymin) + Math.abs(ng.ymax)));
      ctx.closePath();
      ctx.stroke();
      }
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.moveTo(ng.xmin, values[ng.xmin]);
    for(let i = ng.xmin; i <= ng.xmax; i += 0.01)
      ctx.lineTo(ng.W / 2 + i * ng.W / 2 / ng.xmax  , (ng.H - values[i] * ng.H / 2 / ng.ymax));
    ctx.closePath();
    ctx.stroke();
  }
  
  autodraw(){
    
  }
};
var ng = new Graphics1d();
ng.draw();