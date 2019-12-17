class BasicObject
{
    constructor()
    {
        this.pos = [0, 0]
        this.size = [10, 10]
    }

    center()
    {
        return [
            (this.pos[0] +(this.size[0] / 2)),
            (this.pos[1] +(this.size[1] / 2)),
        ]
    }
}

class DynamicObject extends BasicObject
{
    constructor()
    {
        super()
        this.dir = [10, 10]
    }
}

class Block extends BasicObject
{
    constructor()
    {
        super()
    }
}


class Ball extends DynamicObject
{
    constructor()
    {
        super()
    }

}

class Field
{
    constructor()
    {
        this.width = 800
        this.height = 800
        this.blocks = []
        this.balls = []
    }

    initBlocks()
    {
        
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
        // context.fillRect(30, 30, 100, 100)
    }

    clear()
    {
        this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.height)
    }

    render()
    {
        this.clear()
        console.log('bbb')
    }

    async play()
    {
        console.log('aaa')
        await new Promise(resolve => {
            setTimeout(() => {
                this.render()
                resolve()
            }, 500);
        });
        console.log('ccc')
    }
}

canvas = new Canvas()
canvas.play()