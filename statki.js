
let ally, enemy, side;
let poziom, strona = true;
let bot_hits = [];
function clear_all() { // WYCZYSC WSZYSTKO
    ally = {
        map: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        ships: [[""], [""], ["", ""], ["", ""], ["", "", ""], ["", "", "", ""], ["", "", "", "", ""]]
    }

    enemy = {
        map: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
        ships: [[""], [""], ["", ""], ["", ""], ["", "", ""], ["", "", "", ""], ["", "", "", "", ""]]
    }

    for (let i = 0; i < 100; i++) document.getElementById("mojakomorka" + i).style.backgroundColor = "rgb(141, 169, 201)";
    for (let i = 0; i < 100; i++) document.getElementById("enemykomorka" + i).style.backgroundColor = "rgb(141, 169, 201)";
    bot_hits = [];
}

function randomNumber(number) { // LOSUJE LICZBE Z PRZEDZIALU 0 - N-1
    return Math.floor(Math.random() * number);
}

const cichy = 0;

// FUNKCJA DO PRZYCISKU STARTU TWORZACA LOSOWO STATKI
function generateShips() {
    document.getElementById("panel").innerHTML = "";
    clear_all();
    strona = true;
    for (let l = 0; l < 2; l++){
        if(strona){
            for (let i = 0; i < ally.ships.length; i++) {
                makeShip(i,ally);
            }
        }
        else {
            for (let i = 0; i < ally.ships.length; i++) {
                makeShip(i,enemy);
            }
        }
        strona = false;
    }

    console.log(ally, enemy)
}

// TWORZENIE STATKU
function makeShip(i,side) {
    (randomNumber(2) == 1) ? poziom = true : poziom = false; //LOSUJ CZY STATEK MA BYĆ W POZIOMIE CZY W PIONIE

    let x, y;
    if (poziom) {   // JESLI W POZIOMIE
        x = randomNumber(10);
        y = randomNumber(10 - side.ships[i].length);
    }
    else {  // JESLI W PIONIE
        x = randomNumber(10 - side.ships[i].length);
        y = randomNumber(10);
    }


    if (wolne(x, y, i,side)) drawShip(x, y, i,side); // JESLI JEST WOLNE MIEJSCE NARYSUJ STATEK
    else return makeShip(i,side); //JESLI NIE MA MIEJSCA WYGENERUJ NOWE KOORDYNATY
}


// SPRAWDZANIE CZY JEST WOLNE MIEJSCE 
function wolne(x, y, i, side) {
    if (poziom) { // JESLI STATEK JEST W POZIOMIE
        for (let j = 0; j < side.ships[i].length; j++) {
            if (side.map[x][j + y] == 2 || side.map[x][j + y] == 1) return false; // JESLI KOORDYNATY SA ZAJETE ZWROC FALSE
        }
        return true;
    }
    else { // JESLI STATEK JEST W PIONIE
        for (let j = 0; j < side.ships[i].length; j++) {
            if (side.map[j + x][y] == 2 || side.map[j + x][y] == 1) return false;
        }
        return true;
    }
}

function drawShip(x, y, i,side) {

    let min_y, max_y, min_x, max_x;

    if (poziom) {
        (y - 1 < 0) ? min_y = y : min_y = y - 1;  //MIN Y
        (y + side.ships[i].length > 9) ? max_y = y : max_y = y + side.ships[i].length; //MAX Y
        (x - 1 < 0) ? min_x = x : min_x = x - 1; //MIN X
        (x >= 9) ? max_x = x : max_x = x + 1; //MAX X
    }
    else {
        (x - 1 < 0) ? min_x = x : min_x = x - 1;  //MIN X
        (x + side.ships[i].length > 9) ? max_x = x : max_x = x + side.ships[i].length; //MAX X
        (y - 1 < 0) ? min_y = y : min_y = y - 1; //MIN Y
        (y > 9) ? max_y = y : max_y = y + 1; //MAX Y
    }

    // RYSOWANIE OBRAMOWANIA STATKU NA BITMAPIE
    for (let h = min_x; h <= max_x; h++) {
        for (let k = min_y; k <= max_y; k++) {
            side.map[h][k] = 2;
        }
    }

    // RYSOWANIE STATKU NA BITMAPIE ORAZ W HTML`u
    for (let j = 0; j < side.ships[i].length; j++) {
        side.map[x][y] = 1;
        let coord = x * 10 + y;

        side.ships[i][j] = coord; // PRZYPISZ KOORDYNATY DO STATKÓW

        if(strona) document.getElementById("mojakomorka" + coord).style.backgroundColor = "rgb(85, 74, 60)"; // JESLI STRONA == TRUE (ALLY) TO MALUJ NA HTML
        (poziom) ? y += 1 : x += 1;
    }
}

function hit(coord){
    let x = Math.floor(coord / 10);
    let y = coord % 10;
    if(enemy.map[x][y] == 1){
        document.getElementById("enemykomorka" + coord).style.backgroundColor = "red";
        hittedShip(enemy,coord, "enemy");
    }
    else {
        document.getElementById("enemykomorka" + coord).style.backgroundColor = "yellow";
        enemyhit();
    }
}

function enemyhit(){
    x = randomNumber(10);
    y = randomNumber(10);
    let coord = x*10 + y
    if(!bot_hits.includes(coord)){
        bot_hits.push(coord);
        if(ally.map[x][y] == 1) {
            document.getElementById("mojakomorka" + coord).innerHTML = "!";
            document.getElementById("mojakomorka" + coord).style.color = "red";
            hittedShip(ally,coord, "ally");
            return enemyhit();
        }
        else {
            document.getElementById("mojakomorka" + coord).style.backgroundColor = "yellow";
        }
    }
    else return enemyhit();
}

function hittedShip(side, coord, o){
    for (let i = 0; i < side.ships.length; i++){
        if(side.ships[i].indexOf(coord) != -1) side.ships[i][side.ships[i].indexOf(coord)] = "hit";
    }
    checkWin(side, o);
}

function checkWin(side, o){
    for (let i = 0; i < side.ships.length; i++){
        for (let j = 0; j < side.ships[i].length; j++) {
            if(side.ships[i][j] != 'hit')  return 0;
        }
    }
    if (o == "enemy") document.getElementById("panel").innerHTML = "Wygrałeś";
    else document.getElementById("panel").innerHTML = "Przegrałeś";
}

