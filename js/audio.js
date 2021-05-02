function visualisation(button, play) {
    let parent = button.parentNode,
        audio = parent.querySelector("audio"),
        canvas = parent.getElementsByClassName("audioVisual")[0],
        time = parent.querySelector(".audioPlayTime"),
        ctx = canvas.getContext("2d"),
        audioCtx = new AudioContext(),
        analyser = audioCtx.createAnalyser(),
        barWidth = 0,
        barHeight = 0,
        bars = 80,
        source = audioCtx.createMediaElementSource(audio);

    source.connect(analyser);
    source.connect(audioCtx.destination);

    let data = new Uint8Array(analyser.frequencyBinCount);
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    barWidth = (canvas.width / bars);
    let canvasHeight = canvas.height;

    ctx.strokeStyle = "white";
    function animation() {
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        analyser.getByteFrequencyData(data);
        for(var i = 0; i < bars; i++){

            barHeight = (canvasHeight/255)*data[i];
            x = i*(barWidth+1);
            y = canvasHeight;
            y_end = y-barHeight;

            //draw a bar
            ctx.lineWidth = barWidth;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y_end);
            ctx.stroke();
        }
        requestAnimationFrame(animation);
    }
    audio.ontimeupdate = function() {
        time.style.width = ((100/audio.duration)*audio.currentTime)+"%";
    }

    animation();
    button.addEventListener("click",function() {
        for(button2 of play) {
            if(button != button2) {
                let parent = button2.parentNode;
                parent.querySelector("audio").pause();
                parent.querySelector(".play").innerHTML = "&#9658;";
            }
        }
        if(audio.paused) {
            pauseAnimation = false;
            audio.play();
            audioCtx.resume();
            button.innerHTML = "❚❚";
        }else {
            audio.pause();
            pauseAnimation = true;
            button.innerHTML = "&#9658;";
        }
    });
    audio.addEventListener("ended", function() {
        button.innerHTML = "&#9658;";
    });
}
