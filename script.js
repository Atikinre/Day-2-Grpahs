 

class Graphics1d{
  constructor(xmin=-10.0,xmax=10.0, ymin=-10.0, ymax=10.0, W=120, H=100, f = function(x){return x*x - 9}){
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
    for(let i = this.xmin; i <= this.xmax; i += 0.01)
      ctx.lineTo(i , values[i]);
    ctx.closePath();
    ctx.stroke();
  }
  
  autodraw(){
    
  }
};
var ng = new Graphics1d();
ng.draw();