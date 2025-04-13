document.addEventListener("DOMContentLoaded", function () {
    function calculateEquation() {
        let x1 = parseFloat(document.getElementById("x1").value);
        let y1 = parseFloat(document.getElementById("y1").value);
        let x2 = parseFloat(document.getElementById("x2").value);
        let y2 = parseFloat(document.getElementById("y2").value);

        if (x1 === x2) {
            document.getElementById("equation-result").innerText = `المعادلة: س = ${x1}`;
            drawGraph(x1, y1, x2, y2);
            return;
        }

        let m = (y2 - y1) / (x2 - x1);
        let b = y1 - m * x1;
        document.getElementById("equation-result").innerText = `المعادلة: ص = ${m.toFixed(2)} س + ${b.toFixed(2)}`;
        drawGraph(x1, y1, x2, y2);
    }

    function checkPoint() {
        let px = parseFloat(document.getElementById("px").value);
        let py = parseFloat(document.getElementById("py").value);
        let equationText = document.getElementById("equation-result").innerText;

        if (!equationText.includes("ص") && !equationText.includes("س")) {
            document.getElementById("check-result").innerText = "يُرجى حساب معادلة الخط أولاً.";
            return;
        }

        if (equationText.includes("س =")) {
            let xVal = parseFloat(equationText.match(/[-+]?[0-9]*\.?[0-9]+/g)[0]);
            document.getElementById("check-result").innerText = (px === xVal)
                ? "النقطة تقع على الخط."
                : "النقطة لا تقع على الخط.";
            return;
        }

        let match = equationText.match(/[-+]?[0-9]*\.?[0-9]+/g);
        let m = parseFloat(match[0]);
        let b = parseFloat(match[1]);
        let expectedY = m * px + b;

        document.getElementById("check-result").innerText = (Math.abs(expectedY - py) < 0.0001)
            ? "النقطة تقع على الخط."
            : "النقطة لا تقع على الخط.";
    }

    window.calculateEquation = calculateEquation;
    window.checkPoint = checkPoint;
});

function drawGraph(x1, y1, x2, y2) {
    let canvas = document.getElementById("graphCanvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width = 1600;
    canvas.height = 1600;

    let scale = 30;

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(50, 800);
    ctx.lineTo(1550, 800);
    ctx.moveTo(800, 50);
    ctx.lineTo(800, 1550);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw axis labels
    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    for (let i = -30; i <= 30; i++) {
        let x = 800 + i * scale;
        if (x >= 50 && x <= 1550) ctx.fillText(i, x, 820);
        let y = 800 - i * scale;
        if (y >= 50 && y <= 1550) ctx.fillText(i, 820, y);
    }

    // Convert to canvas coordinates
    let x1Scaled = 800 + x1 * scale;
    let y1Scaled = 800 - y1 * scale;
    let x2Scaled = 800 + x2 * scale;
    let y2Scaled = 800 - y2 * scale;

    // Draw line
    ctx.beginPath();
    ctx.moveTo(x1Scaled, y1Scaled);
    ctx.lineTo(x2Scaled, y2Scaled);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw points
    ctx.beginPath();
    ctx.arc(x1Scaled, y1Scaled, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x2Scaled, y2Scaled, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
}

// Show/Hide Graph Buttons
document.getElementById("showGraphButton").addEventListener("click", function () {
    document.getElementById("graphContainer").style.display = "block";
    this.style.display = "none";
    document.getElementById("hideGraphButton").style.display = "inline-block";
});

document.getElementById("hideGraphButton").addEventListener("click", function () {
    document.getElementById("graphContainer").style.display = "none";
    this.style.display = "none";
    document.getElementById("showGraphButton").style.display = "inline-block";
});
