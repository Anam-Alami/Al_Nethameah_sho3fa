document.addEventListener("DOMContentLoaded", function() {
    function calculateEquation() {
        let x1 = parseFloat(document.getElementById("x1").value);
        let y1 = parseFloat(document.getElementById("y1").value);
        let x2 = parseFloat(document.getElementById("x2").value);
        let y2 = parseFloat(document.getElementById("y2").value);
        
        if (x1 === x2) {
            document.getElementById("equation-result").innerText = `المعادلة: س = ${x1}`;
            return;
        }
        
        let m = (y2 - y1) / (x2 - x1);
        let b = y1 - m * x1;
        document.getElementById("equation-result").innerText = `المعادلة: ص = ${m.toFixed(2)} س + ${b.toFixed(2)}`;
    }
    
    function checkPoint() {
        let px = parseFloat(document.getElementById("px").value);
        let py = parseFloat(document.getElementById("py").value);
        let equationText = document.getElementById("equation-result").innerText;
        
        if (!equationText.includes("ص")) {
            document.getElementById("check-result").innerText = "يُرجى حساب معادلة الخط أولاً.";
            return;
        }
        
        let match = equationText.match(/[-+]?[0-9]*\.?[0-9]+/g);
        let m = parseFloat(match[0]);
        let b = parseFloat(match[1]);
        let expectedY = m * px + b;
        
        document.getElementById("check-result").innerText = (expectedY === py) ? "النقطة تقع على الخط." : "النقطة لا تقع على الخط.";
    }
    
    window.calculateEquation = calculateEquation;
    window.checkPoint = checkPoint;
});
