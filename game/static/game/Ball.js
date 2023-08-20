import { distance,angle,renew,rotate,randbetween } from "./index.js"

export class Ball{
    friction = 0.9
    acceleration = 0.1
   
    constructor(x,y,r){
    this.x = x
    this.y = y
    this.velocity = {
        dx : randbetween(-3,3),
        dy : randbetween(-3,3)
    }
    this.r = r
}

    draw(c){
        c.beginPath()
        c.arc(this.x,this.y,this.r,0,2*Math.PI)
        c.fillStyle = 'red'
        c.fill()
        c.stroke()
    }

    update(others,c){
        this.draw(c)
        if(this.x>=c.canvas.width-this.r-this.velocity.dx || this.x<=this.r-this.velocity.dx)
            this.velocity.dx *= -1
        if(this.y>=c.canvas.height-this.r-this.velocity.dy || this.y<=this.r-this.velocity.dy)
            this.velocity.dy *= -1
        for(var i=0;i<others.length;i++){
            if(this == others[i])
                continue;
            if(distance(this,others[i]) <= 2 * this.r){
                console.log('collision')
                var teta = angle(this,others[i])
                renew(this,others[i],teta)
            }
        }
        this.x += this.velocity.dx
        this.y += this.velocity.dy
    }

    update_with_gravity(){
        if(this.x>=c.canvas.width-this.r-this.dx || this.x<=this.r-this.dx)
            this.dx*=-1
        if(this.y>c.canvas.height-this.r-this.dy )
            this.dy = -this.dy*friction  
        else
            this.dy+=acceleration
        this.y += this.dy
        this.x += this.dx
        this.draw()
    }
}