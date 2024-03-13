document.addEventListener('DOMContentLoaded', event => {

    err = document.getElementById('submit-error')
    button = document.getElementById('submit-button')
    // console.log("err", err)
    //button.addEventListener('click', next)

})
let err, button
let moveCount = 0;
let stage = 0;

function test() {
    console.log("intest")
}

function moveButton() {
    if(moveCount < 100){

        var button = document.getElementById("submit-button");
        
        // Get the dimensions of the viewport
        var viewportWidth = 200;
        var viewportHeight = -350;
        
        // Set the maximum X and Y coordinates to stay within the viewport
        var maxXPosition = viewportWidth - button.offsetWidth;
        var maxYPosition = viewportHeight - button.offsetHeight;
        
        // Calculate random X and Y coordinates within the viewport
        var newXPosition = Math.floor(Math.random() * maxXPosition);
        var newYPosition = Math.floor(Math.random() * maxYPosition);
        
        // Move the button to the new position
        button.style.transform = "translate(" + newXPosition + "px, " + newYPosition + "px)";
        moveCount += 1;
        console.log(moveCount);
    }
  }
  

  function next(){
    // console.error('why')
    let box = document.getElementById('submit-error');
    document.getElementById("submit-button").onclick = null;
    console.log("box",box)
    box.style.display = "none";
    document.getElementById("spinner").style.borderTopColor = color;
    document.getElementById("spinner").style.animationDuration = spin + 's'
    document.getElementById("spinner").style.display="block";
    setTimeout(()=>{
        console.log("next", stage)
        document.getElementById("spinner").style.display="none";
        stages[stage]();
        stage += 1;
        document.getElementById("submit-button").onclick = next;
    },timeout)


  }

  function fun(msg){
    console.log("in fun", msg)
    console.log(err)
    document.getElementById('submit-error').innerText = msg;
    document.getElementById('submit-error').style.display = "block";
    
  }

  let spin = 1;
  let timeout = 2000;
  let color = '#3498db';


  let stages = [
    ()=>{
    },
    ()=>{
        fun("Unable to send your message. Do NOT try to submit again.")
    },
    ()=>{
        applyRandomStylesToElements();
        setTimeout(()=>{
            crazy = "spin 1s linear infinite"
            applyRandomStylesToElements();
            setTimeout(()=>{
                crazy = "spin .1s linear infinite"
                applyRandomStylesToElements();
                setTimeout(()=>{
                    crazy = "spin .001s linear infinite"
                    applyRandomStylesToElements();
                    setTimeout(()=>{
                        removeAllElements();
                        createBlackScreen();
                    },3000)
                },1000)
            },3000)
        },5000)
        
        fun("Do you not know how to listen? DON'T PRESS THAT.")
    },
    ()=>{
        fun("Your data is incompatible. I CANNOT accept it.")
    },
    ()=>{
        fun("Look, I'm a simple form to collect your data. I've been having a bad day and would appreciate you to stop being dumb.")
    },
    ()=>{
        fun("I said STOP! This instant!")
        spin = .5;
    },
    ()=>{
        fun("I WASN'T PROGRAMMED FOR IDIOTS!!")
        spin = .2
        color = 'red';
    },
    ()=>{
        fun("STOOOOOOOOOOOOOOOPPPP!!!")
        spin = .1
        
    },
    ()=>{
        fun("YOU ARE BREAKING THE WEBSITE!!! STOP IMMEDIATELY!!!")
        spin= .05
        moveButton();
        button.addEventListener('mouseover', event => {
            moveButton()
        })
    },
    ()=>{fun("TWO CAN PLAY THAT GAME!!")
        timeout = 500;
        moveButton();
    },
    ()=>{fun("HOOOOOWWWWW?????")
        timeout= 10000;
        spin = .0001
        
    },
    ()=>{fun("ALERT: CPU reaching critical temperature!!")
    },
    ()=>{fun("WHHHHHHHHHYYYYYYYYYYYYYYYYYYYYYY");
    },
    ()=>{
        applyRandomStylesToElements();
},


  ]

  function randomColor() {
    // Generate a random hex color code
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }
  let crazy = "spin 2s linear infinite"
  function spinElement(element) {
    // Apply a spinning animation
    element.style.animation = crazy;
  }
  
  function applyRandomStylesToElements() {
    // Get all elements on the page
    var allElements = document.querySelectorAll('*');
  
    // Iterate through each element and apply random styles
    allElements.forEach(function(element) {
      // Set a random background color
      element.style.backgroundColor = randomColor();
  
      // Apply a spinning animation
      spinElement(element);
    });
  }
  
  // Call the function to apply random styles to all elements
  
  function removeAllElements() {
    // Get the body element
    var body = document.body;
  
    // Remove all child elements of the body
    while (body.firstChild) {
      body.removeChild(body.firstChild);
    }
  }
  

  function createBlackScreen() {
    // Create a new div for the black screen
    var blackScreen = document.createElement('div');
    
    // Set the background color of the div to black
    blackScreen.style.backgroundColor = 'black';
    
    // Set the dimensions to fill the entire viewport
    blackScreen.style.position = 'fixed';
    blackScreen.style.top = '0';
    blackScreen.style.left = '0';
    blackScreen.style.width = '100%';
    blackScreen.style.height = '100%';
    blackScreen.style.animation = "none"
    blackScreen.style.webkitAnimation = 'none';
    blackScreen.style.webkitAnimationName = 'none';
    blackScreen.style.webkitAnimationPlayState = 'paused';

    let elements = document.querySelectorAll('*');
    for (e of elements) {
        e.style.animation = "spin 2s linear 0"
    }

  
    // Append the black screen div to the body
    document.body.appendChild(blackScreen);

    setTimeout(()=>{
        let myDiv = document.getElementsByTagName("div")[0];
        myDiv.classList.add('center-container');

        myDiv.innerHTML = `<I class="fade-in" color="white" padding="50px"><b style="color: white;">I will return...</b></p>`
        },3000)
  }
  