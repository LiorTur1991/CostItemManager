window.helper = {}

window.helper.divs = ['home','add','reports'];

window.helper.show_div = function(divToShow){
    for (const div of window.helper.divs) {
        if(div == divToShow)
            document.getElementById(div).hidden = false;
        else
            document.getElementById(div).hidden = true;
    }
}

