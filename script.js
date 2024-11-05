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