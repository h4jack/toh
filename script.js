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

function addHotKey() {
    document.querySelectorAll(".hot-key").forEach(key => {
        key.remove();
    });
    tbox.forEach((box, index) => {
        let x = ['A', 'S', 'D']
        if (box.children.length > 1) {
            box.children[1].innerHTML += `<div class="hot-key">${x[index]}</div>`;
        }
    });
}

function moveDisc(from = null, to, disc = null) {
    if (disc) {
        if (to.children.length == 1) {
            to.appendChild(disc);
            Mode.totalMove++;
        } else {
            if (to.children[1].textContent > disc.textContent) {
                to.insertBefore(disc, to.children[1]);
                Mode.totalMove++;
            }
        }
    } else if (from.children.length > 1) {
        if (to.children.length == 1) {
            to.appendChild(from.children[1]);
            Mode.totalMove++;
        } else {
            if (to.children[1].textContent > from.children[1].textContent) {
                to.insertBefore(from.children[1], to.children[1]);
                Mode.totalMove++;
            }
        }
    }
    setDraggable();
    isSolved();
}

function startNew() {
    Mode.totalDisc = Number(val[0].textContent);
    document.querySelector(".popup-input").style.display = "none";
    clickable = 1;
    addFunctionality();
    addHotKey();
}

document.querySelectorAll(".add.btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        if (Number(val[0].textContent) < Mode.max) {
            val[0].textContent = Number(val[1].textContent) + 1;
            val[1].textContent = Number(val[1].textContent) + 1;
        }
    });
});

document.querySelectorAll(".add.btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        if (Number(val[0].textContent) < Mode.max) {
            val[0].textContent = Number(val[1].textContent) + 1;
            val[1].textContent = Number(val[1].textContent) + 1;
        }
    });
});

document.querySelectorAll(".sub.btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        if (Number(val[0].textContent) > 1) {
            val[0].textContent = Number(val[0].textContent) - 1;
            val[1].textContent = Number(val[1].textContent) - 1;
        }
    });
});

document.querySelector(".start-btn-ingame").addEventListener("click", () => {
    startNew();
});


document.querySelector(".start.game").addEventListener("click", () => {
    startNew();
});

function show_help() {
    const message_box = document.querySelector(".popup-message");
    if (message_box.textContent[0] === "S") {
        message_box.innerHTML = `Your goal is to drag the all the discs from Tower A to Tower C in the Same order shown in the Tower A. there is a intermediate help Tower(Tower B). you can take help of this tower to solve the TOH. <br>
        <br>
        if mobile device and drag functionality is not working, you can <b>click</b> the tower to select the top most element, and then <b>click</b> the tower where you want to move your element.
        <br>if you don't want to touch the mouse, you can use the keyboard to move element and start,
        <br> here is a guide to keyboard control:
        <br><kbd>A<kbd>: Select Tower A  
        <br><kbd>S<kbd>: Select Tower B 
        <br><kbd>D<kbd>: Select Tower C
        <br><kbd>Enter<kbd>: to Start new Game, with the selected no of disc 
        <br><kbd>+<kbd>: to increase disc by 1.
        <br><kbd>-<kbd>: to decrease disc by 1.
        <br><kbd>H<kbd>: click Menu Button to open the menu/startbutton.
        <br><kbd>R<kbd>: Run Automatic Solve using AI.
        <br>now please Start the Game.
        <br>I challenge you to complete all level from 1 to 11. hide this? <a class="click-help" onclick="show_help();">click here.</a>`
        return;
    }
    message_box.innerHTML = `Select total Number of Disc to Start with. need help? <a class="click-help" onclick="show_help();">click here.`;
}

function addFunctionality() {
    addDiscs();
    addHotKey();
    setDraggable();
    const discs = document.querySelectorAll(".disc");
    // Event listeners for draggable elements
    discs.forEach((disc) => {
        disc.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.target.id);
        });

        // disc.addEventListener('dragend', () => {});
    });
}

let selectedBox = null; // Keep track of the currently selected box

// Event listeners for boxes
tbox.forEach((box) => {
    box.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    box.addEventListener('drop', (e) => {
        const discId = e.dataTransfer.getData('text');
        const disc = document.getElementById(discId);
        moveDisc(null, box, disc)
        addHotKey();
    });

    box.addEventListener("click", () => {
        if (!clickable) {
            showKey("Can't Click, Already Solved Start new Game.");
            return;
        }
        if (selectedBox) {
            selectedBox.children[1].style.border = `none`;
            selectedBox.children[1].style.boxShadow = `none`;
            if (selectedBox === box) {
                selectedBox = null;
                return;
            }
            if (selectedBox.children.length > 1) {
                if (box.children.length == 1) {
                    box.appendChild(selectedBox.children[1]);
                    Mode.totalMove++;
                } else {
                    if (box.children[1].textContent > selectedBox.children[1].textContent) {
                        box.insertBefore(selectedBox.children[1], box.children[1]);
                        Mode.totalMove++;
                    } else if (box.children.length > 1) {
                        // Add border to the clicked box and set it as the selected box
                        box.children[1].style.border = `2px solid green`;
                        box.children[1].style.boxShadow = `0px 0px 10px green`;
                        selectedBox = box;
                        return;
                    }
                }
            }
            selectedBox = null;
            addHotKey();
            setDraggable();
            isSolved();
        } else if (box.children.length > 1) {
            // Add border to the clicked box and set it as the selected box
            box.children[1].style.border = `2px solid green`;
            box.children[1].style.boxShadow = `0px 0px 10px green`;
            selectedBox = box;
        }
    });
});


let solveTimeInterval = 1;

function solveTOH(n, TowerA, TowerC, TowerB, A, C, B) {
    if (!n) {
        return;
    }
    solveTOH(n - 1, TowerA, TowerB, TowerC, A, B, C);
    setTimeout(() => {
        console.log(`Move disc ${n} fron Rod Tower${A} to Tower${C}\n`)
        TowerA.click();
        TowerC.click();
    }, 300 * solveTimeInterval)
    solveTimeInterval++;
    solveTOH(n - 1, TowerB, TowerC, TowerA, B, C, A);
}

function runAutoSolve() {
    startNew();
    solveTOH(Mode.totalDisc, tbox[0], tbox[2], tbox[1], "A", "C", "B");
    solveTimeInterval = 1;
}