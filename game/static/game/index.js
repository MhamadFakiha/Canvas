
import { Ball } from "./Ball.js";

var canvas = document.querySelector('canvas');
function resize_window(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}
resize_window()
window.addEventListener('resize',resize_window)

var c = canvas.getContext('2d')

var mouse = {
    x:undefined,
    y:undefined
}

window.addEventListener('mousemove',
function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});



export function randbetween(x,y){
    return Math.random()*(y-x-1)+x
}

export function distance(c1,c2){
    var d = Math.pow(c1.x-c2.x,2) + Math.pow(c1.y-c2.y,2)
    d = Math.sqrt(d)
    return d
}

export function rotate(circle,teta){
    const vx = circle.velocity.dx
    const vy = circle.velocity.dy
    circle.velocity.dx = vx * Math.cos(teta) - vy * Math.sin(teta)
    circle.velocity.dy = vx * Math.sin(teta) + vy * Math.cos(teta)
    console.log("in rotate",vx,vy,teta)
}


export function renew(circle1,circle2,teta){
    console.log("before rotate",circle1.velocity.dx)
    console.log("before rotate",circle2.velocity.dx)
    rotate(circle1,teta)
    rotate(circle2,teta)
    console.log("after rotate",circle1.velocity.dx)
    console.log("after rotate",circle2.velocity.dx)
    const v = circle1.velocity.dx
    circle1.velocity.dx = circle2.velocity.dx
    circle2.velocity.dx = v
    console.log("after renew",circle1.velocity.dx)
    console.log("after renew",circle2.velocity.dx)
    rotate(circle1,-teta)
    rotate(circle2,-teta)
}

export function angle(circle1,circle2){
    console.log('in angle',(circle1.y-circle2.y)/(circle1.x-circle2.x))
    return -Math.atan((circle1.y-circle2.y)/(circle1.x-circle2.x))
}



var radius=60
var circles = []

 for(var i=0;i<5;i++){
    var x = randbetween(radius,canvas.width-radius)
    var y = randbetween(radius,canvas.height-radius)
    for(let j=0;j<circles.length;j++){
        if(i==0)
            continue
        if(distance(circles[j],{x,y}) <= 2*radius){
            x = randbetween(radius,canvas.width-radius)
            y = randbetween(radius,canvas.height-radius)
            j=-1
        }
    }
    circles.push(new Ball(x,y,radius))
 }
     

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,window.innerWidth,window.innerHeight)
    for(var i=0;i<circles.length;i++)
        circles[i].update(circles,c)
    }

animate()

