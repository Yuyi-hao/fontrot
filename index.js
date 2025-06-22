(() => {
    const drawingCanvas = document.getElementById('drawing-canvas');
    const linewidthSlider = document.getElementById('brush-size');
    const clearButton = document.getElementById('clear-canvas');
    const saveButton = document.getElementById('save-canvas');

    // colors
    const colorPickers = document.querySelectorAll('.color-selector');
    colorPickers.forEach(element => {
        element.addEventListener('click', (event) => {
            colorPickers.forEach(p => p.classList.remove('selected'));
            currColor = element.value;
            element.classList.add('selected');
            console.log(element.value)
        });
        element.addEventListener('input', (event) => {
            colorPickers.forEach(p => p.classList.remove('selected'));
            element.value = event.target.value;
            currColor = element.value;
            element.classList.add('selected');
        });
        element.addEventListener('dblclick', () => {
            element.click();
        });
    });

    drawingCanvas.width = drawingCanvas.offsetWidth;
    drawingCanvas.height = drawingCanvas.offsetHeight;
    const drawingCtx = drawingCanvas.getContext('2d');
    let isDrawing = false;
    let currTool = "brush";
    let currColor = "black";

    let x =0;
    let y = 0;
    let brushWidth = 1;

    linewidthSlider.addEventListener('input', (event) => {
        brushWidth = event.target.value;
    });
    drawingCanvas.addEventListener('mousedown', (event) => {
        x = event.offsetX;
        y = event.offsetY;
        isDrawing = true;
    })
    drawingCanvas.addEventListener('mouseup', (event) => {
        if(isDrawing){
            x = 0;
            y = 0;
            isDrawing = false;
        }
    })
    drawingCanvas.addEventListener('mousemove', (event) => {
        if(isDrawing){
            drawLine(drawingCtx, x, y, event.offsetX, event.offsetY, currColor, brushWidth);
            x = event.offsetX;
            y = event.offsetY;
        }
    });
    function drawLine(ctx, x1, y1, x2, y2, color="black", lineWidth=1){
        ctx.beginPath();
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
    }

    clearButton.addEventListener("click", () => clearCanvas(drawingCtx));

    function clearCanvas(ctx){
        ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    }

    saveButton.addEventListener("click", () => {
        let canvasUrl = drawingCanvas.toDataURL("image/png", 1);
        const createEl = document.createElement('a');
        createEl.href = canvasUrl;
        createEl.download = "download-this-canvas";
        createEl.click();
        createEl.remove();
    })

})();