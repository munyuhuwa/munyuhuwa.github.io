var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
// context.fillRect(30, 30, 100, 100)

function render ()
{
    context.clearRect(0, 0, canvas.clientWidth, canvas.height)
}

class Block
{
    constructor ()
    {
        this.pos = [0, 0]
        this.size = [10, 10]
    }
}

class Ball
{
    constructor ()
    {
        this.pos = [0, 0]
        this.dir = [0, 0]
        this.size = [10, 10]
    }
}

class Field
{
    constructor ()
    {
        this.width = 800
        this.height = 800
        this.blocks = []
        this.balls = []
    }

    initBlocks ()
    {
        
    }
    
    moveBalls ()
    {

    }
}