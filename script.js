 

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
  draw(){
    var graph = document.getElementById("canvas");
    var ctx = graph.getContext("2d");
    var drawed = new Graphics1d();
    let values = this.evaluate();
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.moveTo(0, ng.H / 2);
    ctx.lineTo(ng.W, ng.H / 2);
    ctx.moveTo(ng.W / 2, 0);
    ctx.lineTo(ng.W / 2, ng.H);
    ctx.closePath();
    ctx.stroke();
    ctx.strokeWidth = 2;
    ctx.beginPath();
    for(int i = 0; i <= )
    ctx.beginPath();
    ctx.moveTo(ng.xmin, values[ng.xmin]);
    for(let i = ng.xmin; i <= ng.xmax; i += 0.01)
      ctx.lineTo(ng.W / 2 + i * ng.W / 2 / ng.xmax  , (ng.H - values[i] * ng.H / 2 / ng.ymax));
    ctx.closePath();
    
  }
  
  autodraw(){
    
  }
};
var ng = new Graphics1d();
ng.draw();