var Nightmare = require('nightmare');
var nm = Nightmare({ show: false })
var animatedGif = require('nightmare-animated-gif');

function papa(script){
    console.log("start");
    var targets = script.split(";");
    targets.forEach((item)=>{
        if(item.match(/https?:\/\//)){
            console.log("goto: " + item);
            nm.goto(item);
            nm.wait(500);
        }else{
            nm.wait(item);
            nm.use(animatedGif.captureAs('screenshot'))
            console.log("click: " + item);
            nm.click(item);
        }
    })
    nm.use(animatedGif.captureAs('screenshot'))
    nm.end()
        .then(function () {
            console.log("writing gif")
            animatedGif.generate('screenshot', './screenshot.gif', {
                repeat: 0, // forever
                delay: 1000,
                quality: 10,
            });
        })
        .catch(function (error) {
            console.error('failed:', error);
        });
}

papa("https://github.com/;body > header > div > div > div > a.btn.btn-primary.site-header-actions-btn")

