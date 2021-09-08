class Operation
{
    constructor(x,y)
    {
        this.x=x;
        this.y=y;
    }

    sum()
    {
        return this.x+this.y;
    }
}




let add=new Operation(2,3)
console.log(add.sum())