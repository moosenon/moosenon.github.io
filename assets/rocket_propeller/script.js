let Canvas;

/**
 * Object to store the state of the physical rod
 */
let Rod = {
    pos: {
        x: 0,
        y: 0,
    },
    vel: {
        x: 0,
        y: 0,
    },
    acc: {
        x: 0,
        y: 0,
    },
    theta: 0,
    omega: 0,
    alpha: 0,
    m: 1,
    L: 1,
    widthRatio: 0.2,
    forceMag: 1,
}

/*
 * Draws the grid in canvas coords as it would be seen at world coords (x,y)
 */
let drawGrid = function(x, y) {
    
}

let init = function() {
    let c = document.getElementById("simulation");
    let ctx = c.getContext("2d");
    Canvas = {
        c: c,
        ctx: ctx,
        width: 0,
        height: 0,
    }
    resizeCanvas();
}
let resizeCanvas = function() {
    let width = Canvas.c.parentElement.clientWidth;
    let height = Math.ceil(window.innerHeight*0.8);
    height = (height < width) ? height : width;
    Canvas.width = width;
    Canvas.height = height;
    Canvas.c.width = width;
    Canvas.c.height = height;
}
window.addEventListener("resize", resizeCanvas);
document.onreadystatechange = () => {
    if (document.readyState == "interactive") {
        init()
    }
}
