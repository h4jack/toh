const Mode = {
    totalDisc: 1,
    max: 11,
    totalMove: 0
}

var val = document.querySelectorAll(".total-disc-input.value");
const tbox = document.querySelectorAll(".tower-box");
let clickable = 1;

function addDiscs() {
    const temp = tbox[0].children[0];
    tbox[0].innerHTML = "";
    tbox[0].appendChild(temp);
    var bWidth = 1;
    if (window.innerWidth < 850) {
        bWidth = null;
    } else {
        var bDiv = 140 / Mode.totalDisc;
        // 20 - 160.
        // 140.
        // 140/2
        var j = bDiv;
    }
    for (let i = 0; i < Mode.totalDisc; i++) {
        const disc = document.createElement("div");
        disc.classList.add("disc");
        disc.id = `disc-${i + 1}`;
        disc.textContent = i + 1;
        if (bWidth) {
            disc.style.width = `calc(100% - ${160 - j}px`;
            j = j + bDiv;
        }
        disc.style.backgroundColor = `#${parseInt(Math.random() * 1000000)}`;
        tbox[0].appendChild(disc);
    }
    for (let i = 1; i < 3; i++) {
        tbox[i].innerHTML = `<div class="bar"></div>`;
    }
}

function setDraggable() {
    tbox.forEach(box => {
        var children_length = box.children.length;
        if (children_length > 1) {
            box.children[1].draggable = "true";
        }
        for (let i = 2; i < children_length; i++) {
            box.children[i].draggable = "";
        }
    });
}

function showPopup(title = null, message = null) {
    clickable = 0;
    if (title) {
        document.querySelector(".popup-title").textContent = title;
    } else {
        document.querySelector(".popup-title").textContent = "Tower of Hanoi";
    }
    if (message) {
        document.querySelector(".popup-message").innerHTML = message;
    } else {
        document.querySelector(".popup-message").innerHTML = `Select total Number of Disc to Start with. need help? <a class="click - help"
        onclick = "show_help()" > click here.</a > `;
    }
    document.querySelector(".popup-input").style.display = "flex";
    Mode.totalMove = 0;
}

document.querySelector(".menu-btn").addEventListener("click", () => {
    showPopup("Tower of Hanoi", `<p class="popup-message">Select total Number of Disc to Start with. need help? <a class="click-help"
                    onclick="show_help()">click here.</a>
            </p>`);
});

function isSolved() {
    var children_length = tbox[2].children.length;
    if (Mode.totalDisc + 1 != children_length) {
        return;
    }
    for (let i = 1; i < children_length; i++) {
        if (tbox[2].children[i].textContent != "" + i) {
            let text = tbox[2].children[1].textContent;
            if (text === "1D") {
                continue;
            }
            console.log("Not Solved, Something Wrong happened. please restart, or inform the error.");
            tbox[2].children[1].draggable = "";
            showPopup("Error 😵‍💫", "There is Something Wrong in the Game, Please Start Again.");
            return;
        }
    }

    console.log("***Solved. (Level " + Mode.totalDisc + ")");
    console.log("***Total Move Taken: " + Mode.totalMove);
    tbox[2].children[1].draggable = "";
    showPopup("Congratulations 🎉", `You have solved this tower of hanoi <b>Level ${Mode.totalDisc}</b> in <b>${Mode.totalMove}</b> Moves.
    Click Start to Play Again.`);
    if (Mode.totalDisc < 11) {
        val[0].textContent = Mode.totalDisc + 1;
        val[1].textContent = Mode.totalDisc + 1;
    }
}