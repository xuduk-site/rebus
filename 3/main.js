let cards = [
    {
        name: "rust",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWMmPudoH_wXmXrtdOmjKEgxOGJzZyukjA2A&s",
        id: 1
    },
    {
        name: "react",
        img: "https://habrastorage.org/r/w1560/getpro/habr/upload_files/feb/4ce/88e/feb4ce88e54fed7d3892692402142776.jpeg",
        id: 2
    },
    {
        name: "ipad1,1",
        img: "https://2mac.ua/wp-content/uploads/2021/12/ai-pad-1.jpg",
        id: 3
    },
    {
        name: "python",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT70Xb63s5-zBjZYYYyGqJNAxF9rdlkPnfIJw&s",
        id: 4
    },
    {
        name: "archlinux",
        img: "https://linuxiac.com/wp-content/uploads/2020/06/archlinux.jpg",
        id: 5
    },
    {
        name: "winxp",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX9b6iChzCDQ4meg-t0Rf-hBNDgl_0d8rCVQ&s",
        id: 6
    },
    {
        name: "ios5",
        img: "https://upload.wikimedia.org/wikipedia/uk/c/cb/IOS_5_logo.png",
        id: 7
    },
    {
        name: "iphone2,1",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRYOmIOGh4s1h2hsBYaQ0RQ9OC_7Oo6VoQGQ&s",
        id: 8
    },
    {
        name: "js",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL78Oj2Wj93W4BBCgqt7vE5uqmGFhokNfa5g&s",
        id: 9
    },
    {
        name: "smallbasic",
        img: "https://avatars.githubusercontent.com/u/9652716?s=280&v=4",
        id: 10
    },
    {
        name: "reddit",
        img: "https://upload.wikimedia.org/wikipedia/uk/4/43/Reddit_logo_new.png",
        id: 11
    },
    {
        name: "ruby",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRADkQzLF0y7D_a4SMdDbYdopIrdyatnrOgHQ&s",
        id: 12   
    },
]
let was = []
let progress = 0
let num =  Math.floor(1 + Math.random() * 15)
let angle = 0;
let time;
let firstCard = null
let secondCard = null

if (localStorage.getItem("time") != null) time = Number(localStorage.getItem("time"))
else { time = 300; localStorage.setItem("time", time) }

$(function () {
    $(".progress").knob({
        min: 0,
        max: 12,
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
        $(".gameBoard").css({
            display: "grid"
        })
        fillBoard()
        $(".card").on('click', cardClicked)
        startTime()
    })

    $("#btnTask1").click(function () {
        console.log(cards[num - 1])
        if (cards[num - 1].indexOf($("#inputTask1").val().trim().toLowerCase()) != -1) {
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

function startTime() {
    setInterval(() => {
        time = parseInt(localStorage.getItem("time")) - 1
        $(".time").val(time).trigger("change")
        if (time == 0) {
            alertify.error("Time is out!")
            setTimeout(() => window.open("../2/index.html", "_self", false), 2000)
            localStorage.removeItem("time")
        } else if (time > 0) localStorage.setItem("time", time)
    }, 1000)    
}

function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

function fillBoard() {
    let board = shuffle([...cards, ...cards])
    for (let i = 0; i < board.length; i++) {
        let cardHTML = `
            <div class="card" data-id="${board[i].id}">
                <div class="front">ROBOCODE</div>
                <div class="back">
                    <img src="${board[i].img}" alt="${board[i].name}">
                </div>
            </div>
        `
        $(".gameBoard").append(cardHTML)
    }
}

function cardClicked(e) {
    if (secondCard || $(this).hasClass("matched") || $(this).hasClass("flip")) return
    
    if (!firstCard) {
        firstCard = $(this)
        firstCard.addClass("flip")
        return
    }

    if (firstCard) {
        secondCard = $(this)
        secondCard.addClass("flip")
        if (firstCard.attr("data-id") == secondCard.attr("data-id")) {
            firstCard.addClass("matched")
            secondCard.addClass("matched")
            firstCard = null
            secondCard = null
            progress++
            $(".progress").val(progress).trigger("change")
            if (progress == 12) alertify.success("Win!")
            return
        } else {
            setTimeout(() => {
                firstCard.removeClass("flip")
                secondCard.removeClass("flip")
                firstCard = null
                secondCard = null
            } , 600)
        }
    }
}
