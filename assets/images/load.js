//Title 
var blinkborder = function() {
    titlename = document.getElementById("typewriter")
    col = titlename.style.borderColor
    if (col === ""){
        titlename.style.borderColor = "transparent"
    }else{
        titlename.style.borderColor = ""
    }
    
    var comma = titlename.getAttribute("comma") 
    if (comma !== null && comma !== "done") {
        if (comma > 0) {
            titlename.setAttribute("comma", comma - 1)
        } else {
            titlename.setAttribute("comma", "done")
            
            clearInterval(titlename.getAttribute("interval"))

            var interval = setInterval(addLetter, TYPE_SPEED)
            titlename.setAttribute("interval", interval)

            comma_task() // wait was too long
        }
    }
    
}

var addLetter = function() {
    titlename = document.getElementById("typewriter")
    nametext = titlename.getAttribute("text") // text to add letter by letter
    titlename.textContent += nametext[0]
    titlename.style.borderColor = "" // make cursor static when typing
    nametext = nametext.substr(1) // remove last letter and add to text
    titlename.setAttribute("text", nametext)

    // // a comma is like taking an oral break, let's take a digital break shall we :)
    // if (titlename.textContent.at(-1) === ','){
    //     clearInterval(titlename.getAttribute("interval"))
    //     titlename.setAttribute("comma", COMMA_BLINKS)  // cursor will blink the specified number of times before resuming 
    //     interval = setInterval(blinkborder, BLINK_SPEED) 
    //     titlename.setAttribute("interval", interval)
    // }

    if (nametext === ""){
        clearInterval(titlename.getAttribute("interval"))
        setInterval(blinkborder, BLINK_SPEED)
        after_task()
    }
}

var device_check = function() {
    console.log('Checking device type...');
    function isMobileDevice() {
        return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        // return true;
    }
    if (isMobileDevice()) {
            console.log('Mobile device detected. Switching to mobile stylesheet.');
            // Remove the default stylesheet
            var mainStyle = document.getElementById('main-style');
            mainStyle.parentNode.removeChild(mainStyle);
    
            // Create a new link element for mobile stylesheet
            var mobileStyle = document.createElement('link');
            mobileStyle.rel = 'stylesheet';
            mobileStyle.href = 'stylesheet_mobile.css'; // Path to your mobile stylesheet
            document.head.appendChild(mobileStyle);
    }
}

var typewrite = function() {
    before_task()
    titlename = document.getElementById("typewriter")
    var interval = setInterval(addLetter, TYPE_SPEED)
    titlename.setAttribute("interval", interval)
}

// window.onload = typewrite
window.onload = function() {
    device_check()
    before_task()
}

