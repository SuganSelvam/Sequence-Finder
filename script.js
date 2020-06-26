var vPage =document.createElement("div")
vPage.setAttribute("class","page")
document.body.append(vPage)

var vHeading = document.createElement("div")
vHeading.setAttribute("class","heading")
vHeading.innerHTML="Sequence Finder"
vPage.appendChild(vHeading)

var vContainer = document.createElement("div")
vContainer.setAttribute("class","container")
vPage.appendChild(vContainer)

var vScore = document.createElement("div")
vScore.setAttribute("id","score")
vScore.setAttribute("class","scoreTab")
vScore.innerHTML= "Your Score Is "
vContainer.appendChild(vScore)

var vResult = document.createElement("span")
vResult.setAttribute("class","resultTab")
vResult.setAttribute("id","result")
vResult.innerHTML = 0
vScore.appendChild(vResult)

var vCircle = document.createElement("div")
vCircle.setAttribute("id","circle")
vContainer.appendChild(vCircle)

//Quadrant 1
var vQ1 = document.createElement("div")
vQ1.setAttribute("id","q1")
vQ1.setAttribute("class","quarter")
vQ1.setAttribute("value","1")
vQ1.innerHTML=1
vCircle.appendChild(vQ1)

var vStar1 = document.createElement("span")
vStar1.setAttribute("id","star")
vStar1.setAttribute("class","star")
vQ1.appendChild(vStar1)

//Quadrant 2
var vQ2 = document.createElement("div")
vQ2.setAttribute("id","q2")
vQ2.setAttribute("class","quarter")
vQ2.setAttribute("value","2")
vQ2.innerHTML=2
vCircle.appendChild(vQ2)

var vStar2 = document.createElement("span")
vStar2.setAttribute("id","star")
vStar2.setAttribute("class","star")
vQ2.appendChild(vStar2)

//Quadrant 3
var vQ3 = document.createElement("div")
vQ3.setAttribute("id","q3")
vQ3.setAttribute("class","quarter")
vQ3.setAttribute("value","3")
vQ3.innerHTML=3
vCircle.appendChild(vQ3)

var vStar3 = document.createElement("span")
vStar3.setAttribute("id","star")
vStar3.setAttribute("class","star")
vQ3.appendChild(vStar3)

//Quadrant 4
var vQ4 = document.createElement("div")
vQ4.setAttribute("id","q4")
vQ4.setAttribute("class","quarter")
vQ4.setAttribute("value","4")
vQ4.innerHTML=4
vCircle.appendChild(vQ4)

var vStar4 = document.createElement("span")
vStar4.setAttribute("id","star")
vStar4.setAttribute("class","star")
vQ4.appendChild(vStar4)

var vButtonTab = document.createElement("div")
vButtonTab.setAttribute("id","buttonTab")
vContainer.appendChild(vButtonTab)

var vStart = document.createElement("button")
vStart.setAttribute("type","button")
vStart.setAttribute("class","btns")
vStart.innerHTML="Start"
vButtonTab.appendChild(vStart)

var vNbsp = document.createElement("span")
vNbsp.innerHTML = "&nbsp"
vButtonTab.appendChild(vNbsp)

var vReset = document.createElement("button")
vReset.setAttribute("type","button")
vReset.setAttribute("class","btns")
vReset.setAttribute("onclick","reset()")
vReset.innerHTML="Reset"
vButtonTab.appendChild(vReset)

let blinkVal=[];  //array of random values from 1-4 to select a random color for AI turn
let userVal=[];   //array to hold the value for user input
let stars;         //current value of in which quadrant the star to blink
let turns =1;      //to hold the value of how many rounds cleared
let curAns;        //tohold value of current ans to check with AI's answer
let AIturn;         //bool varibale to to see if computers turn or not
let intervalId;     //variale for interval
let userTurn = true;//bool variable to check if it is user's turn
let win;            //variable to check if player has won


vStart.addEventListener('click',(event)=>{
    if(userTurn || win){
    console.log("start Pressed")   
    play();
    }
});

function reset(){
    console.log("Reset Pressed")
    vResult.innerHTML = 0;
    clear();
    clearInterval(intervalId)
    alert("Game Over")
}
//function which sets intial default value and giving  array of random values
function play(){
    win=false;
    blinkVal =[];
    userVal=[];
    stars=0;
    intervalId = 0;
    turns=1;
    vResult.innerHTML=1;
    curAns = true;
    for( var i = 0; i < 10 ; i++){
        blinkVal.push(Math.floor(Math.random() * 4) + 1);
    }
    AIturn = true;

    intervalId = setInterval(startgame, 800);
}

//function to start the game
function startgame(){
    userTurn = false;

    if (stars == turns){
        clearInterval(intervalId);
        AIturn = false;
        clear();
        userTurn = true;    
    }
    if (AIturn){
        clear();
        console.log(turns)
        setTimeout(() => {
            if (blinkVal[stars] == 1) quad1(); 
            if (blinkVal[stars] == 2) quad2(); 
            if (blinkVal[stars] == 3) quad3(); 
            if (blinkVal[stars] == 4) quad4(); 
            stars++;
        }, 200);
    }
}


//function to be called to blink the stars for their respective quadrant
function quad1(){
    vStar1.innerHTML="&#9733";
}
function quad2(){
    vStar2.innerHTML="&#9733";
}
function quad3(){
    vStar3.innerHTML="&#9733";
}
function quad4(){
    vStar4.innerHTML="&#9733";
}

function clear(){
    vStar1.innerHTML="";
    vStar2.innerHTML="";
    vStar3.innerHTML="";
    vStar4.innerHTML="";
}


vQ1.addEventListener("click", (event)=>{
    if(userTurn){
        userVal.push(1);
        ansCheck();
        quad1();
        if(!win){
            setTimeout(()=>{
                clear();
            }, 300);
        }
    }
})

vQ2.addEventListener("click", (event)=>{
    if(userTurn){
        userVal.push(2);
        ansCheck();
        quad2();
        if(!win){
            setTimeout(()=>{
                clear();
            }, 300);
        }
    }
})

vQ3.addEventListener("click", ()=>{
    if(userTurn){
        userVal.push(3);
        ansCheck();
        quad3();
        if(!win){
            setTimeout(()=>{
                clear();
            }, 300);
        }
    }
})

vQ4.addEventListener("click", ()=>{
    if(userTurn){
        userVal.push(4);
        ansCheck();
        quad4();
        if(!win){
            setTimeout(()=>{
                clear();
            }, 300);
        }
    }
})

//function for checking the answer
function ansCheck() {
    if(userVal.length == 10 && curAns==true)
    gameWon();
    
    if(userVal[userVal.length-1] !== blinkVal[userVal.length-1]){
        curAns = false;
    }
        
    if(curAns == false){
        alert("Wrong Answer, Restarting The Game")
        setTimeout(()=>{
            clear();
            alert("Your score is "+turns)
            vResult.innerHTML=turns;
            play();
        },200)
    }
    if(turns == userVal.length && curAns==true  && win==false){
        userVal=[];
        turns++;
        AIturn = true;
        vResult.innerHTML=turns;
        intervalId= setInterval(startgame, 1000);
    }
}

//function to pop up when the user has won the game
function gameWon(){
    alert("You Have Won !!!!")
    userTurn = false
    win = true
}

