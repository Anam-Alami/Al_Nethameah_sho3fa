// رسم المستوى الديكارتي مع الأرقام من -30 إلى 30
function drawGraph(x1, y1, x2, y2) {
    let canvas = document.getElementById("graphCanvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // توسيع حجم الرسم ليكون أكبر
    canvas.width = 1600; // العرض أكبر
    canvas.height = 1600; // الارتفاع أكبر

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
    let scale = 30; // مقياس الرسم بحيث يظهر النطاق من -30 إلى 30 مع مسافة بين الأرقام

    // المحور الأفقي (الأرقام من -30 إلى 30)
    for (let i = -30; i <= 30; i++) {
        let xPosition = 800 + i * scale; // تحويل الإحداثيات للمحور الأفقي
        if (xPosition >= 50 && xPosition <= 1550) {  // عرض القيم ضمن نطاق المحور الأفقي
            ctx.fillText(i, xPosition, 820);  // الرقم أسفل المحور الأفقي
        }
    }

    // المحور الرأسي (الأرقام من -30 إلى 30)
    for (let i = -30; i <= 30; i++) {
        let yPosition = 800 - i * scale; // تحويل الإحداثيات للمحور الرأسي
        if (yPosition >= 50 && yPosition <= 1550) {  // عرض القيم ضمن نطاق المحور الرأسي
            ctx.fillText(i, 820, yPosition);  // الرقم إلى يسار المحور الرأسي
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
}

// حساب الميل
function calculateSlope(event) {
    event.preventDefault();
    let x1 = parseFloat(document.getElementById("x1").value);
    let y1 = parseFloat(document.getElementById("y1").value);
    let x2 = parseFloat(document.getElementById("x2").value);
    let y2 = parseFloat(document.getElementById("y2").value);

    if (x1 === x2) {
        document.getElementById("result").innerHTML = "الميل غير معرف لأن الخط عمودي.";
        return;
    }

    let slope = (y2 - y1) / (x2 - x1);
    document.getElementById("result").innerHTML = `ميل الخط: ${slope.toFixed(2)}`;

    drawGraph(x1, y1, x2, y2);
}

// عرض الشرح عند الضغط على الزر
document.getElementById("showExplanationButton").addEventListener("click", function() {
    let explanationDiv = document.getElementById("explanation");
    explanationDiv.style.display = explanationDiv.style.display === "none" ? "block" : "none";
});

// عرض شرح طريقة الحل عند الضغط على الزر
document.getElementById("showSolutionButton").addEventListener("click", function() {
    let solutionDiv = document.getElementById("solution");
    solutionDiv.style.display = solutionDiv.style.display === "none" ? "block" : "none";
});

// عرض الرسم عند الضغط على زر "عرض المستوى الديكارتي"
document.getElementById("showGraphButton").addEventListener("click", function() {
    document.getElementById("graphContainer").style.display = "block"; // عرض الرسم
    document.getElementById("showGraphButton").style.display = "none"; // إخفاء زر عرض الرسم
    document.getElementById("hideGraphButton").style.display = "block"; // إظهار زر إخفاء الرسم
});

// إخفاء الرسم عند الضغط على زر "إخفاء المستوى الديكارتي"
document.getElementById("hideGraphButton").addEventListener("click", function() {
    document.getElementById("graphContainer").style.display = "none"; // إخفاء الرسم
    document.getElementById("showGraphButton").style.display = "block"; // إظهار زر عرض الرسم
    document.getElementById("hideGraphButton").style.display = "none"; // إخفاء زر إخفاء الرسم
});
