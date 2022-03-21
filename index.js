var turn=0;
const Gameboard=()=>{
    let winner;
    let gameboard=[['','',''],['','',''],['','','']];
    let numBoardSelected=0;
    const verifyWinner=()=>{
        //Horizontal check
        gameboard.forEach((i)=>{
            let checks=0;
            let playerRow;
            i.forEach((j)=>{
                if(checks==0)playerRow=j;
                if(playerRow==j)checks++;
                if(checks==3 && playerRow!="")winner=playerRow;
            });
        });
        //Vertical winner
        for (let i = 0; i < gameboard.length; i++) {
            let checks=0;
            let playerColumn;
            for (let j = 0; j < gameboard.length; j++) {
                if(checks==0)playerColumn=gameboard[j][i];
                if(playerColumn==gameboard[j][i])checks++;
                if(checks==3 & playerColumn!="")winner=playerColumn;
            }
        }
        //Diagonal 1 winners
        let playerDiagonal=gameboard[Math.floor(gameboard.length/2)][Math.floor(gameboard.length/2)];
        let checks=0;
        for (let i = 0; i < gameboard.length; i++) {
            if(playerDiagonal==gameboard[i][i] && playerDiagonal!="")checks++;
            if(checks==3 && playerDiagonal!="")winner=playerDiagonal;
        }
        //Diagonal 2 winners
        checks=0;
        playerDiagonal="X";
        for (let i=2,j=0; i >= 0; i--,j++) {
            if(playerDiagonal==gameboard[j][i] && playerDiagonal!="")checks++;
            if(checks==3 && playerDiagonal!="")winner=playerDiagonal;
        }
        //Empate
        if(numBoardSelected==9 && !winner)winner="Empate";
        if(numBoardSelected==9 || winner)displayWinner();
    };
    const setBox=(boardPosition,namePlayer)=>{
        if(!getWinner())gameboard[Math.floor(boardPosition/3)-1][boardPosition%3]=namePlayer;
        numBoardSelected++;
        verifyWinner(namePlayer);
    }
    const getGame=()=>gameboard;
    const getWinner=()=>winner;
    return {getGame, setBox, getWinner};
}
const Player=(name)=>{
    const getName=()=>name;
    const selectBox=(position)=>{
        gameBoard.setBox(position,name);
        printGameBoard();
    };
    return {getName, selectBox};
}
function displayWinner(){
    document.getElementById("winner").innerHTML=`Ganador: ${gameBoard.getWinner()}`;
}
function printGameBoard(){
    let data="";
    //console.log(gameBoard.getGame());
    let index=3;
    gameBoard.getGame().forEach((gameSection) => {
        gameSection.forEach(section=>{
            data+=`<div id='${index}' class='casilla ${section?"selected":"noSelected"}'>${section}</div>`;
            index++;
        });
    });
    document.getElementById("game").innerHTML=data;
    document.querySelectorAll(".noSelected").forEach(element=>{
        element.addEventListener(
            "click",
            (e)=>{
                players[turn].selectBox(e.target.id);
                if(turn>0)turn=0;
                else turn++;
            },
            false
        )
    })
}
var gameBoard;
var players=[];
function displayPlayersForm(){
    let data=`
        <form id='playersForm'>
            Jugador 1:<input type='text' name='player1' required/>
            Jugador 2:<input type='text' name='player2' required/>
            <input type='submit' value='Iniciar juego' />
            <input type='submit' value='Reiniciar juego' />
        </form>
    `;
    document.getElementById("playersForm").innerHTML=data;

    document.forms.playersForm.addEventListener(
        "submit",
        (e)=>{
            e.preventDefault();
            turn=0;
            gameBoard=Gameboard();
            players=[Player(e.target.player1.value),Player(e.target.player2.value)];
            printGameBoard();
        }
    )
}
displayPlayersForm();