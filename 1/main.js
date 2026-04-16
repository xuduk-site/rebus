let answers = ["вітер", "телефон", "тварина", "калькулятор", "килим", "телевізор", "томат", "капелюх", "навушники", "диван", "дім", "дерево"]
let was = []
let progress = 0
let num =  Math.floor(1 + Math.random() * 12)
let angle = 0;

function startRebus(arg) {
    $("#picture").attr("src", `imgs/${arg}.png`)
}

$(function () {
    $(".progress").knob({
        min: 0,
        max: 5,
        readOnly: true,
        displayInput: false,
        bgColor: "#645e5e"
    })
    $("#rules").slideUp()
    $(".slideRules").click(function () {
        $("#rules").slideToggle()
    })

    startRebus(num)

    $("#btnTask1").click(function () {
        console.log(answers[num - 1])
        if ($("#inputTask1").val().trim().toLowerCase() == `${answers[num - 1]}`) {
            alertify.success("Правильна відповідь!")
            $("#inputTask1").val("")
            progress++
            $(".progress").val(progress).trigger("change")
            was.push(num)

            if (progress < 5) {
                do {
                    num = Math.floor(1 + Math.random() * 12)
                } while (was.includes(num))
                angle += 180;
                $(".wrapper").css("transform", `rotateY(${angle}deg)`)
                $(".content").css("transform", `rotateY(${angle}deg)`)
                startRebus(num)
            } else {
                $(".img").css({
                    display: "none"
                })

                $("#nextTask").css({
                    display: "flex"
                })
            }
        } else {
            alertify.error("Не правильно!")
        }
    })
})