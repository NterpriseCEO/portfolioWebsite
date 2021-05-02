document.onreadystatechange = function() {
    if (document.readyState == "complete") {
        let x = 0,
            carouselItem = document.querySelectorAll(".carouselItem"),
            carousel = document.getElementById("carouselItems"),
            max = carouselItem.length-1,
            width = carouselItem[0].clientWidth+4;

        document.getElementById("rightCarousel").addEventListener("click",function() {
            x++;
            console.log(width);
            if(x == max) {
                x = 0;
                console.log(x, max);
                carousel.scroll({left:0, behavior: "smooth"});
            }else {
                carousel.scrollBy({left:width, behavior: "smooth"});
            }
        });
        document.getElementById("leftCarousel").addEventListener("click",function() {
            x--;
            if(x == -1) {
                x = 5;
                console.log(x, max);
                carousel.scrollBy({left:carousel.scrollWidth, behavior: "smooth"});
            }else {
                carousel.scrollBy({left:-width, behavior: "smooth"});
            }
        });

        window.onresize = function() {
            width = carouselItem[0].clientWidth+4;
            //carousel.scroll({left:x*width, behavior: "smooth"});
        }

        let play = document.querySelectorAll(".play");
        for(let button of play) {
            visualisation(button, play);
        }

        window.onresize = function(event) {
            width = carouselItem[0].clientWidth+4;
            carousel.scroll({left:width*x, behavior: "smooth"});
            console.log("test");
        };
    }
}
