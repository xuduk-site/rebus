let answers = [
    ["harry potter", "гаррі поттер"],
    ["спанч боб", "губка боб"],
    ["пірати карибського моря", "пірати"],
    ["сімпсони"],
    ["зоряні війни", "star wars"],
    ["lion king", "король лев"],
    ["frozen"],
    ["shreck", "шрек"],
    ["shreck", "шрек"],
    ["rocky", "роккі"],
    ["індіана джонс", "indiana jones"],
    ["один вдома", "home alone"],
    ["термінатор", "terminator"],
    ["назад у майбутнє", "back to the future"],
    ["мисливці за привидами", "ghost busters"]
]
let was = []
let progress = 0
let num =  Math.floor(1 + Math.random() * 15)
let angle = 0;
let time;

if (localStorage.getItem("time") != null) time = Number(localStorage.getItem("time"))
else { time = 300; localStorage.setItem("time", time) }

function startRebus(arg) {
    $("#melody").attr("src", `sound/${arg}.mp3`)
}

function startTime() {
    setInterval(() => {
        time = parseInt(localStorage.getItem("time")) - 1
        $(".time").val(time).trigger("change")
        if (time == 0) {
            alertify.error("Time is out!")
            setTimeout(() => window.open("/../1/index.html", "_self", false), 2000)
            localStorage.removeItem("time")
        } else if (time > 0) localStorage.setItem("time", time)
    }, 1000)
}

$(function () {
    $(".progress").knob({
        min: 0,
        max: 10,
        readOnly: true,
        displayInput: false,
        bgColor: "#645e5e"
    })

    $(".time").knob({
        min: 0,
        max: 300,
        readOnly: true,
        displayInput: false,
        bgColor: "#645e5e"
    })
    
    $("#rules").slideUp()
    $(".slideRules").click(function () {
        $("#rules").slideToggle()
    })
    $("#start").click(function () {
        $("#start").css({
            display: "none"
        })
        $(".sound, .answer").css({
            display: "flex"
        })
        startRebus(num)
        startTime()
    })

    $("#btnTask1").click(function () {
        console.log(answers[num - 1])
        if (answers[num - 1].indexOf($("#inputTask1").val().trim().toLowerCase()) != -1) {
            alertify.success("Правильна відповідь!")
            $("#inputTask1").val("")
            progress++
            $(".progress").val(progress).trigger("change")
            was.push(num)

            if (progress < 10) {
                do {
                    num = Math.floor(1 + Math.random() * 15)
                } while (was.includes(num))
                angle += 180;
                $(".wrapper").css("transform", `rotateY(${angle}deg)`)
                $(".content").css("transform", `rotateY(${angle}deg)`)
                startRebus(num)
            } else {
                $(".img, .time").css({
                    display: "none"
                })

                $("#nextTask").css({
                    display: "flex"
                })

                localStorage.removeItem("time")
            }
        } else {
            alertify.error("Не правильно!")
        }
    })
})