class Log{
    constructor(x,y,angle){
        var options={
            density:1,
            friction:0.5
        }

        this.body=Bodies.rectangle(x,y,20,100);
        this.width=20;
        this.height=100;
        Matter.Body.setAngle(this.body,angle);
        World.add(world,this.body);

    }

    display(){
       // rotate(this.body.angle);
      //  translate(this.body.position.x,this.body.position.y);

        rectMode(CENTER);
        rect(this.body.position.x,this.body.position.y,this.width,this.height)
    }

}