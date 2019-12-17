class BasicObject
{
    constructor(_posX = 0, _posY = 0, _sizeW = 10, _sizeH = 10)
    {
        this.posX = _posX
        this.posY = _posY
        this.sizeW = _sizeH
        this.sizeH = _sizeW
        this.fillStyle = "rgba(0, 128, 255, 1)"
    }

    centerX()
    {
        return (this.posX + this.sizeW / 2)
    }

    centerY()
    {
        return (this.posY + this.sizeH / 2)
    }
}

class DynamicObject extends BasicObject
{
    constructor(_posX = 0, _posY = 0, _sizeW = 10, _sizeH = 10)
    {
        super(_posX, _posY, _sizeW, _sizeH)
        this.dirX = 10
        this.dirY = 10
    }
}

class Block extends BasicObject
{
    constructor(_posX = 0, _posY = 0, _sizeW = 10, _sizeH = 10)
    {
        super(_posX, _posY, _sizeW, _sizeH)
    }
}


class Ball extends DynamicObject
{
    constructor(_posX = 0, _posY = 0, _sizeW = 10, _sizeH = 10)
    {
        super(_posX, _posY, _sizeW, _sizeH)
    }

    radius()
    {
        return (this.sizeW / 2)
    }
}

class Field
{
    constructor(_width, _height)
    {
        this.width = _width
        this.height = _height
        this.blocks = []
        this.balls = []
        this.initBlocks()
    }

    initBlocks()
    {
        this.balls.push(new Ball(100, 100, 30, 30))
        this.blocks.push(new Block(200, 400, 50, 50))
    }
    
    moveBalls()
    {

    }
}

class Canvas
{
    constructor()
    {
        this.canvas = document.getElementById('canvas')
        this.context = this.canvas.getContext('2d')
        this.canvas.width = this.canvas.clientWidth
        this.canvas.height = this.canvas.clientHeight
        this.field = new Field(this.canvas.width, this.canvas.height);

    }

    clear()
    {
        this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)
    }

    render()
    {
        this.clear()
        // console.log('bbb')
        // context.fillRect(30, 30, 100, 100)
        // console.log(this.field.balls)
        for (const ball of this.field.balls)
        {
            // console.log(ball)
            this.context.beginPath()
            const x = ball.centerX()
            const y = ball.centerY()
            this.context.arc(x, y, ball.radius(), (0.0 * Math.PI / 180.0), (360.0 * Math.PI / 180.0), false)
            this.context.fillStyle = ball.fillStyle
            this.context.fill()
        }
        for (const block of this.field.blocks)
        {
            // console.log(ball)
            this.context.beginPath()
            this.context.rect(block.posX, block.posY, block.sizeW, block.sizeH)
            this.context.fillStyle = block.fillStyle
            this.context.fill()
        }
    }

    play(self = this)
    {
        // console.log(this)
        self.render()
        setTimeout(() => {
            self.play(self)
        }, 500)
    }
}

canvas = new Canvas()
canvas.play()