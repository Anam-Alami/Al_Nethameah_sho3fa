// رسم المستوى الديكارتي مع الأرقام من -30 إلى 30
function drawGraph(x1, y1, x2, y2, midpointX, midpointY) {
    let canvas = document.getElementById("graphCanvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // توسيع حجم الرسم ليكون أكبر
    canvas.width = 1600;
    canvas.height = 1600;

    // رسم المحاور
    ctx.beginPath();
    ctx.moveTo(50, 800);  // المحور الأفقي (X)
    ctx.lineTo(1550, 800); // أطول المحور الأفقي
    ctx.moveTo(800, 50);   // المحور الرأسي (Y)
    ctx.lineTo(800, 1550); // أطول المحور الرأسي
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();

    // إضافة الأرقام على المحاور من -30 إلى 30
    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    let scale = 30; 

    // المحور الأفقي (الأرقام من -30 إلى 30)
    for (let i = -30; i <= 30; i++) {
        let xPosition = 800 + i * scale;
        if (xPosition >= 50 && xPosition <= 1550) {
            ctx.fillText(i, xPosition, 820);
        }
    }

    // المحور الرأسي (الأرقام من -30 إلى 30)
    for (let i = -30; i <= 30; i++) {
        let yPosition = 800 - i * scale;
        if (yPosition >= 50 && yPosition <= 1550) {
            ctx.fillText(i, 820, yPosition);
        }
    }

    // تحويل الإحداثيات للنقاط المدخلة
    let x1Scaled = 800 + x1 * scale;
    let y1Scaled = 800 - y1 * scale;
    let x2Scaled = 800 + x2 * scale;
    let y2Scaled = 800 - y2 * scale;

    // رسم الخط بين النقطتين
    ctx.beginPath();
    ctx.moveTo(x1Scaled, y1Scaled);
    ctx.lineTo(x2Scaled, y2Scaled);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.stroke();

    // إضافة النقاط المدخلة
    ctx.beginPath();
    ctx.arc(x1Scaled, y1Scaled, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x2Scaled, y2Scaled, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();

    // رسم نقطة المنتصف
    let midpointXScaled = 800 + midpointX * scale;
    let midpointYScaled = 800 - midpointY * scale;
    ctx.beginPath();
    ctx.arc(midpointXScaled, midpointYScaled, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "green"; // لون نقطة المنتصف
    ctx.fill();
}

// حساب إحداثيات المنتصف
function calculateMidpoint(event) {
    event.preventDefault();
    let x1 = parseFloat(document.getElementById("x1").value);
    let y1 = parseFloat(document.getElementById("y1").value);
    let x2 = parseFloat(document.getElementById("x2").value);
    let y2 = parseFloat(document.getElementById("y2").value);

    // حساب المنتصف
    let midpointX = (x1 + x2) / 2;
    let midpointY = (y1 + y2) / 2;

    // عرض إحداثيات المنتصف
    document.getElementById("result").innerHTML = `إحداثيات المنتصف: (${midpointX.toFixed(2)}, ${midpointY.toFixed(2)})`;

    // رسم المستوى الديكارتي والنقاط
    drawGraph(x1, y1, x2, y2, midpointX, midpointY);
}

// عرض الرسم عند الضغط على زر "عرض المستوى الديكارتي"
document.getElementById("showGraphButton").addEventListener("click", function() {
    document.getElementById("graphContainer").style.display = "block";
    document.getElementById("showGraphButton").style.display = "none";
    document.getElementById("hideGraphButton").style.display = "block";
});

// إخفاء الرسم عند الضغط على زر "إخفاء المستوى الديكارتي"
document.getElementById("hideGraphButton").addEventListener("click", function() {
    document.getElementById("graphContainer").style.display = "none";
    document.getElementById("showGraphButton").style.display = "block";
    document.getElementById("hideGraphButton").style.display = "none";
});

 // عرض الشرح عند الضغط على زر "إظهار شرح الدرس"
document.getElementById("showExplanationButton").addEventListener("click", function() {
    document.getElementById("explanation").style.display = "block";
    document.getElementById("solution").style.display = "none";
});

// عرض طريقة الحل عند الضغط على زر "إظهار طريقة الحل"
document.getElementById("showSolutionButton").addEventListener("click", function() {
    document.getElementById("solution").style.display = "block";
    document.getElementById("explanation").style.display = "none";
});
