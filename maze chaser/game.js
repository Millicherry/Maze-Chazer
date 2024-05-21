const canvas=document.getElementById("canvas");
const c=canvas.getContext("2d");
canvas.width=innerWidth;
canvas.height=innerHeight;

const scoreEle=document.getElementById("score");
//console.log(score)
//creating the player
class player{
    constructor({pos,vel})
    {
        this.pos=pos;
        this.vel=vel;
        this.r=8;
        this.radians=0
        // this.openRate=0.10
        //this.rotation=0
    }
    draw(){
        c.save();
        //c.translate(this.pos.x,this.pos.y)
        //c.rotate(Math.PI);
        //c.tranlate(-this.pos.x,-this.pos.y)
        c.beginPath();
        c.arc(this.pos.x, this.pos.y,this.r,this.radians,Math.PI*2-this.radians);
        c.lineTo(this.pos.x, this.pos.y)
        c.fillStyle='yellow';
        c.fill();
        c.closePath();
        c.restore();
    }
    update()
    {
        this.draw()
        this.pos.x+=this.vel.x
        this.pos.y+=this.vel.y
        // if(this.radians < 0 || this.radians > 0.75)
        // {
        //     this.openRate = -this.openRate
        // }
        // this.radians+=this.openRate
    }
}
//creating ghost
class ghosts{
    static speed=2
    constructor({pos,vel,color="lightblue"})
    {
        this.pos=pos;
        this.vel=vel;
        this.r=8;
        this.color=color;
        this.prevCollisions=[];
        this.speed=2;
        this.scared=false;
    }
    draw(){
        c.beginPath();
        c.arc(this.pos.x, this.pos.y,this.r,0,Math.PI*2);
        c.fillStyle=this.scared ? 'blue' : this.color;
        c.fill();
        c.closePath();
    }
    update()
    {
        this.draw()
        this.pos.x+=this.vel.x
        this.pos.y+=this.vel.y
    }
}
//creating pellets
class pellet{
    constructor({pos})
    {
        this.pos=pos;
        this.r=2;
    }
    draw(){
        c.beginPath();
        c.arc(this.pos.x, this.pos.y,this.r,0,Math.PI*2);
        c.fillStyle='red';
        c.fill();
        c.closePath();
    }
    
}
//creating the bonus pellets
class PowerUp{
    constructor({pos})
    {
        this.pos=pos;
        this.r=4;
    }
    draw(){
        c.beginPath();
        c.arc(this.pos.x, this.pos.y,this.r,0,Math.PI*2);
        c.fillStyle='red';
        c.fill();
        c.closePath();
    }
    
}
//adding the boundary with images
class Boundary {
    static w=20;
    static h=20;
    constructor({pos,image}){
        this.pos=pos
        this.width=20
        this.height=20
        this.image=image
    }
    draw(){
        c.drawImage(this.image,this.pos.x,this.pos.y)
    }   
    update(){

    }
}
//map layout
let map=[
    [5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7],
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
    [3, 2, 5, 9, 7, 2, 5, 9, 7, 2, 3, 2, 5, 9, 7, 2, 5, 9, 7, 2, 3],
    [3, 2, 6, 10, 8, 2, 6, 10, 8, 2, 14, 2, 6, 10, 8, 2, 6, 10, 8, 2, 3],
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
    [3, 2, 13, 1, 11, 2, 12, 2, 13, 1, 9, 1, 11, 2, 12, 2, 13, 1, 11, 2, 3],
    [3, 2, 2, 2, 2, 2, 3, 50, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3],
    [6, 1, 1, 1, 7, 2, 15, 1, 11, 2, 14, 2, 13, 1, 16, 2, 5, 1, 1, 1, 8],
    [20, 20, 20, 20, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 20, 20, 20, 20],
    [5, 1, 1, 1, 8, 2, 14, 2, 13, 11, 2, 13, 11, 2, 14, 2, 6, 1, 1, 1, 7],
    [3, 20, 20, 20, 20, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 20, 20, 20, 20, 3],
    [6, 1, 1, 1, 7, 2, 12, 2, 12, 2, 2, 2, 12, 2, 12, 2, 5, 1, 1, 1, 8],
    [20, 20, 20, 20, 3, 2, 3, 2, 6, 11, 2, 13, 8, 2, 3, 2, 3, 20, 20, 20, 20],
    [20, 20, 20, 20, 3, 2, 14, 2, 2, 2, 2, 2, 2, 2, 14, 2, 3, 20, 20, 20, 20],
    [5, 1, 1, 1, 8, 2, 2, 2, 13, 1, 9, 1, 11, 2, 2, 2, 6, 1, 1, 1, 7],
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 50, 2, 2, 2, 2, 3],
    [3, 2, 13, 1, 7, 2, 13, 1, 11, 2, 14, 2, 13, 1, 11, 2, 5, 1, 11, 2, 3],
    [3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3],
    [15, 11, 2, 2, 14, 2, 12, 2, 13, 1, 9, 1, 11, 2, 12, 2, 14, 2, 2, 13, 16],
    [3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3],
    [3, 2, 13, 1, 1, 1, 10, 1, 11, 2, 14, 2, 13, 1, 10, 1, 1, 1, 11, 2, 3],
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
    [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8],
];
//addding three different ghosts
const ghost=[
    new ghosts({
        pos:{
            x:Boundary.w*10 +Boundary.w/2,
            y:Boundary.h*8+Boundary.h/2
        },
        vel:{
            x:ghosts.speed,
            y:0
        },
        color:'aliceblue'
    }),
    new ghosts({
        pos:{
            x:Boundary.w*10 +Boundary.w/2,
            y:Boundary.h*13+Boundary.h/2
        },
        vel:{
            x:ghosts.speed,
            y:0
        },
        color:'aliceblue'
    }),
    new ghosts({
        pos:{
            x:Boundary.w*10 +Boundary.w/2,
            y:Boundary.h*21+Boundary.h/2
        },
        vel:{
            x:ghosts.speed,
            y:0
        },
        color:'aliceblue'
    })/*,
    new ghosts({
        pos:{
            x:Boundary.w*10 +Boundary.w/2,
            y:Boundary.h*8+Boundary.h/2
        },
        vel:{
            x:ghosts.speed,
            y:0
        }
    })*/
];
const p=[];
const powerUps=[];
const boundaries = [];
const play=new player({
    pos:{
        x:Boundary.w+Boundary.w/2,
        y:Boundary.h+Boundary.h/2
    },
    vel:{
        x:0,
        y:0
    }    
})

const keys={
    up:{
        press:false
    },
    down:{
        press:false
    },
    left:{
        press:false
    },
    right:{
        press:false
    },
    w:{
        press:false
    },
    a:{
        press:false
    },
    s:{
        press:false
    },
    d:{
        press:false
    }
}
let lastkey=" "
let score=-10

//creating an image using function,adding the images according to the map
function createImage(src){
    const image=new Image()
    image.src=src
    return image
}

map.forEach((row,i) =>{
    row.forEach((col,j) =>{
        switch(col){
            case 1:
                boundaries.push(
                new Boundary({
                    pos: {
                        x:Boundary.w*j,
                        y:Boundary.h*i
                    },
                    image: createImage('./images/pipeHorizontal.png')
                }))
                break;
            case 3:
                boundaries.push(
                new Boundary({
                    pos: {                            
                        x:Boundary.w*j,  
                        y:Boundary.h*i
                    },
                    image: createImage('./images/pipeVertical.png')
                }))
                break;    
            case 5:
                boundaries.push(
                new Boundary({
                    pos: {                                                        
                        x:Boundary.w*j,  
                        y:Boundary.h*i
                    },
                    image: createImage('./images/pipeCorner1.png')
                }))
                break; 
            case 7:
                boundaries.push(
                new Boundary({
                    pos: {                                                        
                        x:Boundary.w*j,  
                        y:Boundary.h*i
                    },
                    image: createImage('./images/pipeCorner2.png')
                }))
                break; 
            case 9:
                boundaries.push(
                new Boundary({
                    pos: {                                                        
                        x:Boundary.w*j,  
                        y:Boundary.h*i
                    },
                    image: createImage('./images/pipeConnectorDownwards.png')
                }))
                break;  
            case 10:
                boundaries.push(
                new Boundary({
                    pos: {                                                        
                        x:Boundary.w*j,  
                        y:Boundary.h*i
                    },
                    image: createImage('./images/pipeConnectorTop.png')
                }))
                break;  
            case 11:
                boundaries.push(
                new Boundary({
                    pos: {                                                        
                        x:Boundary.w*j,  
                        y:Boundary.h*i
                    },
                    image: createImage('./images/capRight.png')
                }))
                break; 
            case 12:
                boundaries.push(
                new Boundary({
                    pos: {                                                        
                        x:Boundary.w*j,  
                        y:Boundary.h*i
                    },
                    image: createImage('./images/capTop.png')
                }))
                break;
            case 13:
                boundaries.push(
                new Boundary({
                pos: {                                                        
                        x:Boundary.w*j,  
                        y:Boundary.h*i
                    },
                    image: createImage('./images/capLeft.png')
                }))
                break; 
            case 14:
                boundaries.push(
                new Boundary({
                    pos: {                                                        
                        x:Boundary.w*j,  
                        y:Boundary.h*i
                    },
                    image: createImage('./images/capBottom.png')
                }))
                break;    
            case 15:
                boundaries.push(
                new Boundary({
                    pos: {                                                        
                        x:Boundary.w*j,  
                        y:Boundary.h*i
                    },
                    image: createImage('./images/pipeConnectorRight.png')
                }))
                break; 
            case 16:
                boundaries.push(
                new Boundary({
                    pos: {                                                        
                        x:Boundary.w*j,  
                        y:Boundary.h*i
                    },
                    image: createImage('./images/pipeConnectorLeft.png')
                }))
                break;   
            case 20:
                boundaries.push(
                new Boundary({
                    pos: {                                                        
                        x:Boundary.w*j,  
                        y:Boundary.h*i
                    },
                     image: createImage('./images/black.jpg')
                }))
                break;     
            case 50:
                powerUps.push(
                new PowerUp({
                    pos: {                                                        
                        x:j*Boundary.w+Boundary.w/2,  
                        y:i*Boundary.h+Boundary.h/2
                    }
                }))
                break;
            case 6:
                boundaries.push(
                new Boundary({
                    pos: {                                                        
                        x:Boundary.w*j,  
                        y:Boundary.h*i
                    },
                    image: createImage('./images/pipeCorner4.png')
                }))
                break;   
            case 8:
                boundaries.push(
                new Boundary({
                    pos: {                                                        
                        x:Boundary.w*j,  
                        y:Boundary.h*i
                    },
                    image: createImage('./images/pipeCorner3.png')
                }))
                break;
            case 2:
                p.push(
                new pellet({
                    pos: {                                                        
                        x:j*Boundary.w+Boundary.w/2,  
                        y:i*Boundary.h+Boundary.h/2
                    }
                }))
                break;     
                            
            }
        })
})

//adding the collision function
function circleCollidesWithRect({
    circle,rectangle
})
{
    const padding=Boundary.w/2-circle.r-1
    return (circle.pos.y - circle.r + circle.vel.y <= rectangle.pos.y + rectangle.height +padding &&
        circle.pos.x + circle.r + circle.vel.x >= rectangle.pos.x -padding &&
        circle.pos.y + circle.r + circle.vel.y >= rectangle.pos.y -padding &&
        circle.pos.x - circle.r + circle.vel.x <= rectangle.pos.x + rectangle.width + padding )
}

let animationId
function animate(){
    animationId= requestAnimationFrame(animate)
    //console.log(animationId)
    c.clearRect(0,0,canvas.width,canvas.height)
/*
    p.forEach((pel,i) => {
        pel.draw()
        
   })

*/
    if(keys.up.press && lastkey==='up' || keys.w.press && lastkey==='w')
    {
        for(let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i]
            if(
                circleCollidesWithRect({
                    circle: {...play,vel:{
                        x:0,
                        y:-4
                    }},
                    rectangle: boundary
            })){
                play.vel.y=0
                break
            } else{
                play.vel.y=-4
            }
        }    
    }
    else if(keys.down.press && lastkey==='down' || keys.s.press && lastkey==='s')
    {
        for(let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i]
            if(
                circleCollidesWithRect({
                    circle: {...play,vel:{
                        x:0,
                        y:+4
                    }},
                    rectangle: boundary
            })){
                play.vel.y=0
                break
            } else{
                play.vel.y=+4
            }
        }    
    }
    else if(keys.left.press && lastkey==='left' || keys.a.press && lastkey==='a')
    {
        for(let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i]
            if(
                circleCollidesWithRect({
                    circle: {...play,vel:{
                        x:-4,
                        y:0
                    }},
                    rectangle: boundary
            })){
                play.vel.x=0
                break
            } else{
                play.vel.x=-4
            }
        }    
    }
    else if(keys.right.press && lastkey==='right' || keys.d.press && lastkey==='d')
    {
        for(let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i]
            if(
                circleCollidesWithRect({
                    circle: {...play,vel:{
                        x:+4,
                        y:0
                    }},
                    rectangle: boundary
            })){
                play.vel.x=0
                break
            } else{
                play.vel.x=+4
            }
        }    
    
    }
// detect collisions between ghost and player
    for(let i=ghost.length-1;i>=0;i--)
    {
        const g=ghost[i]
        if(Math.hypot(g.pos.x-play.pos.x,g.pos.y-play.pos.y)
            < g.r+play.r)
        {  
            if(g.scared) {
                ghost.splice(i,1);
                score+=100
                scoreEle.innerHTML=score
            }
            else{
            cancelAnimationFrame(animationId)
            console.log("you lost!!")
            document.getElementById('youlost').style.opacity ='1';
            document.getElementById('restartButton').style.opacity ='1';
            document.getElementById('restartButton').onclick = function() {
                // document.getElementById('restartButton').style.display = 'block';
                    location.reload();
                this.style.opacity ='0'; // Hide the start button after the game starts
                document.getElementById('youlost').style.opacity ='1';
            };
            }
        }   
    } 
    
    //win condition
    
    if(p.length===0 || ghost.length===0)
    {
        console.log("you won!!")
        cancelAnimationFrame(animationId)
        document.getElementById('youwon').style.opacity ='1';
        document.getElementById('restartButton').style.opacity ='1';
            document.getElementById('restartButton').onclick = function() {
                // document.getElementById('restartButton').style.display = 'block';
                    location.reload();
                this.style.opacity ='0'; // Hide the start button after the game starts
                document.getElementById('youlost').style.opacity ='1';
            };
    }

//power ups 
    for(let i=powerUps.length-1;i>=0;i--)
    {
        const powerUp=powerUps[i]
        powerUp.draw()
        //player collides with power up
        if(Math.hypot(powerUp.pos.x-play.pos.x,powerUp.pos.y-play.pos.y)
            < powerUp.r+play.r)
        {
            powerUps.splice(i,1)
            //make ghost scared
            ghost.forEach(g =>{
                g.scared = true
                setTimeout(() => {
                    g.scared = false
                }, 3000)
            })
        }    
    }

//touching pellet and removing it
    for(let i=p.length-1;i>=0;i--)
    {
        const pel=p[i]
        pel.draw()
        if(Math.hypot(pel.pos.x-play.pos.x,pel.pos.y-play.pos.y)
            < pel.r+play.r)
        {
                //console.log('touching')
                p.splice(i,1)
                score+=10
                scoreEle.innerHTML=score
        }        
    }

    boundaries.forEach((boundary) =>{
        boundary.draw() 

        if(
            circleCollidesWithRect({
                circle: play,
                rectangle: boundary
            }))
            {
                play.vel.x=0
                play.vel.y=0
            }
         
    })  

    play.update()

    //play.vel.x=0
    //play.vel.y=0
    ghost.forEach((g) =>{
        g.update()                  
        const collisions=[]
        boundaries.forEach((boundary) =>{
            if(
                !collisions.includes('top') &&
                circleCollidesWithRect({
                    circle: {...g,vel:{
                        x:0,
                        y:-g.speed
                    }},
                    rectangle: boundary
            }))
            {
                collisions.push('top')
            }
            else if(
                !collisions.includes('down') &&
                circleCollidesWithRect({
                    circle: {...g,vel:{
                        x:0,
                        y:g.speed
                    }},
                    rectangle: boundary
            }))
            {
                collisions.push('down')
            }
            else if(
                !collisions.includes('left') &&
                circleCollidesWithRect({
                    circle: {...g,vel:{
                        x:-g.speed,
                        y:0
                    }},
                    rectangle: boundary
            }))
            {
                collisions.push('left')
            }
            else if(
                !collisions.includes('right') &&
                circleCollidesWithRect({
                    circle: {...g,vel:{
                        x:g.speed,
                        y:0
                    }},
                    rectangle: boundary
            }))
            {
                collisions.push('right')
            }
        })
    
        if(collisions.length>g.prevCollisions.length)
        {
            g.prevCollisions = collisions
           // console.log(collisions)
           // console.log("prev:",g.prevCollisions)
        } 
        if(JSON.stringify(collisions)!==JSON.stringify(g.prevCollisions))   
        {
           // console.log("gogo!!")
   
            if(g.vel.x>0){
                g.prevCollisions.push('right')
            }
            else if(g.vel.x<0){
                g.prevCollisions.push('left')
            }
            else if(g.vel.y>0){
                g.prevCollisions.push('down')
            }
            else if(g.vel.y<0){
                g.prevCollisions.push('top')
            }
            //console.log(collisions)
            //console.log("prev:",g.prevCollisions)
            //console.log(g.prevCollisions)

            const pathways=g.prevCollisions.filter((collision) =>{
                return !collisions.includes(collision)
            })
            //console.log({pathways})

            const direction=pathways[Math.floor(Math.random()*pathways.length)]
           // console.log(direction)
            switch(direction){
                case 'down':
                    g.vel.y=g.speed
                    g.vel.x=0
                    break
                case 'top':
                    g.vel.y=-g.speed
                    g.vel.x=0
                    break
                case 'left':
                    g.vel.y=0
                    g.vel.x=-g.speed
                    break
                case 'right':
                    g.vel.y=0
                    g.vel.x=g.speed
                    break
            }  
            g.prevCollisions=[] 
            
        }    
    })
/*
    //player going to the right
    if(play.vel.x>0) play.rotation=0
    //player going to the left
    else if(play.vel.x<0) play.rotation=Math.PI
    //player going to the up
    else if(play.vel.y<0) play.rotation=Math.PI/2
    //player going to the down
    else if(play.vel.y>0) play.rotation=Math.PI*1.5
*/
}//end of animate()

animate()
//play.draw()

addEventListener(('keydown'),({key}) =>{
    switch (key) {
        case "ArrowUp" :
            keys.up.press=true
            lastkey="up"
            break;
        case 'w' :
            keys.w.press=true
            lastkey="w"
            break;        
        case "ArrowDown" :
            keys.down.press=true
            lastkey="down"
            break;
        case 's' :
            keys.s.press=true
            lastkey="s"
            break;    
        case "ArrowLeft" :
            keys.left.press=true
            lastkey="left"
            break; 
        case 'a' :
            keys.a.press=true
            lastkey="a"
            break;      
        case "ArrowRight" :
            keys.right.press=true
            lastkey="right"
            break;      
        case 'd':
            keys.d.press=true
            lastkey="d"
            break;     
    } 
    //console.log(keys.up.press)
    //console.log(keys.down.press)
   // console.log(keys.left.press)
   // console.log(keys.right.press)
    
})

addEventListener(('keyup'),({key}) =>{
    switch (key) {
        case "ArrowUp" :
            keys.up.press=false
            break;
        case 'w':
            keys.w.press=false
            break;
        case "ArrowDown":
            keys.down.press=false
            break;
        case 's':
            keys.s.press=false
            break;
        case "ArrowLeft" :
            keys.left.press=false
            break;  
        case 'a':
            keys.a.press=false
            break;
        case "ArrowRight":
            keys.right.press=false
            break;      
        case 'd':
            keys.d.press=false
            break;    
            
    } 
   // console.log(play.vel)
    
})
