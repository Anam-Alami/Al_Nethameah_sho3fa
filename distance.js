// منع إعادة تحميل الصفحة عند الضغط على زر "احسب"
document.getElementById("distanceForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // جلب القيم من الحقول
    let x1 = parseFloat(document.getElementById("x1").value);
    let y1 = parseFloat(document.getElementById("y1").value);
    let x2 = parseFloat(document.getElementById("x2").value);
    let y2 = parseFloat(document.getElementById("y2").value);

    // حساب الفرق بين الإحداثيات وتربيعهم
    let dx = x2 - x1;
    let dy = y2 - y1;
    let distance = Math.sqrt(dx * dx + dy * dy); // الجذر التربيعي لمجموع المربعات

    // عرض الناتج
    document.getElementById("equation-result").innerText =
        `المسافة بين النقطتين = ${distance.toFixed(2)}`;

    // رسم المستوى الديكارتي
    drawGraph(x1, y1, x2, y2);
});

// زر إظهار طريقة الحل
document.getElementById("showSolutionButton").addEventListener("click", function () {
    let solutionElement = document.getElementById("solution");
    solutionElement.style.display = (solutionElement.style.display === "none") ? "block" : "none";
});

// زر عرض الرسم البياني
document.getElementById("showGraphButton").addEventListener("click", function () {
    document.getElementById("graphContainer").style.display = "block";
    this.style.display = "none";
    document.getElementById("hideGraphButton").style.display = "inline-block";
});

// زر إخفاء الرسم البياني
document.getElementById("hideGraphButton").addEventListener("click", function () {
    document.getElementById("graphContainer").style.display = "none";
    this.style.display = "none";
    document.getElementById("showGraphButton").style.display = "inline-block";
});

// رسم المستوى الديكارتي
function drawGraph(x1, y1, x2, y2) {
    let canvas = document.getElementById("graphCanvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // حجم الرسم
    canvas.width = 1600;
    canvas.height = 1600;

    // رسم المحاور
    ctx.beginPath();
    ctx.moveTo(50, 800); 
    ctx.lineTo(1550, 800); // محور X
    ctx.moveTo(800, 50);   
    ctx.lineTo(800, 1550); // محور Y
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();

    // إضافة الأرقام من -30 إلى 30
    let scale = 30;
    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    for (let i = -30; i <= 30; i++) {
        let x = 800 + i * scale;
        if (x >= 50 && x <= 1550) ctx.fillText(i, x, 820);
        let y = 800 - i * scale;
        if (y >= 50 && y <= 1550) ctx.fillText(i, 820, y);
    }

    // تحويل الإحداثيات
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

    // رسم النقطة الأولى والثانية
    ctx.beginPath();
    ctx.arc(x1Scaled, y1Scaled, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x2Scaled, y2Scaled, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
}
