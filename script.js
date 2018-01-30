var lengthOfTimelineInSeconds = 0;
var actionsArray = [];
var coeficientForCanvasRendering = 0; //Will store the value that I will use to draw the other .arc on the canvas

function init(lengthOfPeriodInSeconds) {
    lengthOfTimelineInSeconds = lengthOfPeriodInSeconds * 10;
    //To keep tolerancy of 10s
    if(290 < lengthOfTimelineInSeconds < 310){
        coeficientForCanvasRendering = 1;
    }else {
        if (lengthOfTimelineInSeconds < 300){
            var i = 0;
            while (lengthOfTimelineInSeconds < 300){
                i = lengthOfTimelineInSeconds * coeficientForCanvasRendering;
                ++coeficientForCanvasRendering;
            }
            coeficientForCanvasRendering = i;
        }
        if (lengthOfTimelineInSeconds > 300){
            var j = 0;
            while (lengthOfTimelineInSeconds > 300){
                j = lengthOfTimelineInSeconds * (1/coeficientForCanvasRendering);
                ++coeficientForCanvasRendering;
            }
            coeficientForCanvasRendering = j;
        }
    }
}

function validateForm() {

    var form = document.getElementById("timeline-form");
    document.getElementById("timeline-form-button").addEventListener("click", function () {
        form.submit();
        form.reset();
    });

    var elements = document.getElementById("timeline-form").elements;
    var obj = {};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        obj[item.name] = item.value;
        //Disable form elements
        elements[i].disabled = true;
    }
    if(obj.lengthOfPeriod > 0){
        init(obj.lengthOfPeriod);
        //Storing action time in seconds and team
        actionsArray = Object.keys(obj).map(function (key) { return obj[key]; });
        //Removing first element
        actionsArray.shift();
    }else{
        alert('Invalid time length per period.');
    }
    addAction(actionsArray); //Contains timeInSeconds, team
}

function drawTopCanvas(actionsArray) {
    //Place dots on top canvas
    //298 is the maximum representation value for 'x' so dots do not hang from the timeline
    var c = document.getElementById("topCanvas");
    var ctx = c.getContext("2d");
    ctx.lineWidth = 4;
    ctx.scale(1,8);
    ctx.beginPath();
    ctx.fillStyle="#00b2b1";
    if(!!actionsArray[0]) {
        if (actionsArray[1] = 'HOME') {
            var coef1 = coeficientForCanvasRendering * actionsArray[0];
            ctx.arc(coef1, 17, 2, 0, Math.PI * 2, false);
        }
        if (actionsArray[3] = 'HOME') {
            ctx.arc(coeficientForCanvasRendering * actionsArray[2], 17, 2, 0, Math.PI * 2, false);
        }
        if (actionsArray[5] = 'HOME') {
            ctx.arc(coeficientForCanvasRendering * actionsArray[4], 17, 2, 0, Math.PI * 2, false);
        }
        if (actionsArray[7] = 'HOME') {
            ctx.arc(coeficientForCanvasRendering * actionsArray[6], 17, 2, 0, Math.PI * 2, false);
        }
        if (actionsArray[9] = 'HOME') {
            ctx.arc(coeficientForCanvasRendering * actionsArray[8], 17, 2, 0, Math.PI * 2, false);
        }
        if (actionsArray[11] = 'HOME') {
            ctx.arc(coeficientForCanvasRendering * actionsArray[10], 17, 2, 0, Math.PI * 2, false);
        }
        ctx.fill();
    }
}

function drawBottomCanvas(actionsArray) {
    //Place dots on top canvas
    //298 is the maximum representation value for 'x' so dots do not hang from the timeline
    var c = document.getElementById("bottomCanvas");
    var ctx = c.getContext("2d");
    ctx.lineWidth = 4;
    ctx.scale(1,8);
    ctx.beginPath();
    ctx.fillStyle="#cd3e34";
    if(!!actionsArray[0]) {
        if (actionsArray[1] = 'AWAY') {
            var coef1 = coeficientForCanvasRendering * actionsArray[0];
            ctx.arc(coef1, 17, 2, 0, Math.PI * 2, false);
        }
        if (actionsArray[3] = 'AWAY') {
            ctx.arc(coeficientForCanvasRendering * actionsArray[2], 17, 2, 0, Math.PI * 2, false);
        }
        if (actionsArray[5] = 'AWAY') {
            ctx.arc(coeficientForCanvasRendering * actionsArray[4], 17, 2, 0, Math.PI * 2, false);
        }
        if (actionsArray[7] = 'AWAY') {
            ctx.arc(coeficientForCanvasRendering * actionsArray[6], 17, 2, 0, Math.PI * 2, false);
        }
        if (actionsArray[9] = 'AWAY') {
            ctx.arc(coeficientForCanvasRendering * actionsArray[8], 17, 2, 0, Math.PI * 2, false);
        }
        if (actionsArray[11] = 'AWAY') {
            ctx.arc(coeficientForCanvasRendering * actionsArray[10], 17, 2, 0, Math.PI * 2, false);
        }
    }
    ctx.fill();
}

function addAction(actionsArray) {

    //Place actions on bottom canvas
    drawTopCanvas(actionsArray);

    //Place actions on bottom canvas
    drawBottomCanvas(actionsArray);

}
