console.log(' from js');
const welcomeScreen = document.getElementById('Welcome-screen');
const level = document.querySelectorAll('.level');

let selectedLevel = 0;
const innerTex = document.querySelector('.inner-text');
welcomeScreen.addEventListener('mouseover',()=>{
    anime({
        targets: welcomeScreen,
        clipPath : 'polygon(0 0, 100% 0%, 100% 100%, 0% 100%)',
        easing: 'easeInOutSine',
        duration: 150,
        
    });
    setTimeout(()=>{
        innerTex.style.display = 'inline';
    },150)
    
    
})
welcomeScreen.addEventListener('mouseleave',()=>{
    anime({
        targets: welcomeScreen,
        clipPath : ' polygon(17% 16%, 100% 0, 78% 81%, 0 100%)',
        easing: 'easeInOutSine',
        duration: 150,
        
    });
    innerTex.style.display = 'none';
    
})
level.forEach((item) => {
    item.addEventListener('click',(e)=>{
        selectedLevel = e.target.id;
        executeGame();
    });
});


const url = './logo.svg';
// Creat Node funtion..
function createNode(ele , content, parent){
    const tag = document.createElement(ele);
    const cont = document.createTextNode(content);
    tag.appendChild(cont);
    parent.appendChild(tag);
    return tag;
}
function removeWelcomeScreen(){
    setTimeout(()=>{
        welcomeScreen.style.display = 'none';
    },100);
    
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
// Get Random Images from Picsum : url's
let totalCards =0;
let isGameOver = false;
 function getImages(a){
    const arrUrl = [];
    if(a<=12){
        for(let i=0;i<a;i=i+2){
            let qFactor = Math.floor(Math.random()*100000);
            arrUrl[i] = `https://picsum.photos/seed/${qFactor}/200/250`;
            arrUrl[i+1] = `https://picsum.photos/seed/${qFactor}/200/250`;
        }
    }
    else{
        for(let i=0;i<12;i=i+2){
            let qFactor = Math.floor(Math.random()*100000);
            arrUrl[i] = `https://robohash.org/${qFactor}/150/200`;
            arrUrl[i+1] = `https://robohash.org/${qFactor}/150/200`;
        }        
    }
    totalCards = arrUrl.length;
    shuffle(arrUrl);
    let cardBack = document.querySelectorAll('.card-back');
    cardBack.forEach((card,index)=>{
        let image = createNode('img','',card);    
        image.setAttribute('src',arrUrl[index]);
    });

}
// To Create the Basic Overlay of the Game Page..
function createOverlay(){
    const body = document.querySelectorAll('body')[0];
    const maindiv = createNode('div','',body);
    maindiv.classList.add('mainDiv');
    const menu = createNode('div','',maindiv);
    menu.classList.add('menu');
    const menuUl = createNode('ul','',menu);
    const style_1 = createNode('style','',document.head);
    const btnSelectLevel = createNode('li','Select Level',menuUl);
    const btnStart = createNode('li','Play',menuUl);
    const timerText = createNode('li','Timer',menuUl);
    const timer = createNode('li','0:0',menuUl);
    
    // Adding Event Listener to Menu Buttons

    btnSelectLevel.addEventListener('click',()=>{
        document.location.reload();       
    });
    isPlayOn = false;
    once = false;
    // Wait till Images get Loaded..
    const loadScrean = createNode('div','',maindiv);
    setTimeout(()=>{
        loadScrean.classList.add('load-screen');
        loadScrean.style.display = 'none';
    },8000);
    
    let myTimer = null;
    // Listening for Play button click and start timer..
    btnStart.addEventListener('click',()=>{
        btnStart.classList.add('in-active-btn');
        if(once=== false){
            let timeSec = 1;
            let TimeMin = 0;
            let myTimer = setInterval(()=>{
                timer.innerHTML = `${TimeMin}:${timeSec}`;
                
                timeSec++;
                if(timeSec === 60){
                    TimeMin++;
                    timeSec =0;
                }
            },1000);
            
            once = true;            
        }
    });

    // to make Cards Clickable again..
    btnStart.addEventListener('click',()=>{
        document.querySelectorAll('.Card').forEach((card,index)=>{
            card.style.pointerEvents = 'auto';
            if(index===1){
                card.style.backgroundColor = '#0c0032';
                card.style.color = '#ddd';
            }
            isPlayOn = true;
        });
    })
    

    
    // Play Area Div
    const playArea = createNode('div','',maindiv);
    playArea.setAttribute('id','play-area');
    
    // The three Levels Initailizations..
    if(selectedLevel==='Level1'){
        for(let i=0;i<6;i++){
            let x = createNode('div','',playArea);
            x.classList.add('Card');
            x.setAttribute('id',`c-${i+1}`);
            let xin = createNode('div','',x);
            xin.classList.add('CardIn');
            let x1 = createNode('div','',xin);
            let x2 = createNode('div','',xin);
            x1.classList.add('card-front');
            x2.classList.add('card-back');
        }
        totalCards = 6;
        getImages(6);
    }
    else if(selectedLevel==='Level2'){
        for(let i=0;i<12;i++){
            let x = createNode('div','',playArea);
            x.classList.add('Card');
            x.setAttribute('id',`c-${i+1}`);
            let xin = createNode('div','',x);
            xin.classList.add('CardIn');
            let x1 = createNode('div','',xin);
            let x2 = createNode('div','',xin);
            x1.classList.add('card-front');
            x2.classList.add('card-back');
        }
        totalCards = 12;
        getImages(12);
    }
    else if(selectedLevel==='Level3'){
        for(let i=0;i<12;i++){
            let x = createNode('div','',playArea);
            x.classList.add('Card');
            x.setAttribute('id',`c-${i+1}`);
            let xin = createNode('div','',x);
            xin.classList.add('CardIn');
            let x1 = createNode('div','',xin);
            let x2 = createNode('div','',xin);
            x1.classList.add('card-front');
            x2.classList.add('card-back');
        }
        totalCards = 12;
        getImages(16);
    }
    // If-else End...

    // Styling The Game Contents
    const Pa = document.getElementById('play-area');
    Pa.addEventListener('click',Emphesis = ()=>{
        if(isPlayOn===false){
            
            btnStart.style.boxShadow ='0px 0px 49px 6px rgba(53, 0, 211, .8)';

        setTimeout(()=>{
            btnStart.style.boxShadow ='.6rem 1.0rem 3.2rem -1.0rem rgba(0,0,0,0.75)';
            } ,1000)
            
        }
    })
}
let cardSuccess= 0;
function createGame(){
    let cards = document.querySelectorAll(".Card");
    let playing = false;
    let count =0;

    let selectedArray = [];
    cards.forEach((card)=>{
    card. addEventListener('click',(e)=> {
    if(count <2 ){       
        if(playing)
            return;
        playing = true;
        //  Animation for Flip Card Effect..
            anime({
                targets: card,
                scale: [{value: 1}, {value: 1.1}, {value: 1, delay: 250}],
                rotateY: {value: '+=180', delay: 150},
                easing: 'easeInOutSine',
                duration: 250,
                complete: function(anim){
                playing = false;
                }
            });
        selectedArray.push(`#${card.getAttribute('id')}`);
        count++;
        if( count>0){
            let choice1 = document.querySelector(`${selectedArray[0]} .CardIn .card-back img`);
            let choice2 = document.querySelector(`${selectedArray[1]} .CardIn .card-back img`);
            if( (choice1.src === choice2.src)&&(selectedArray[0]!=selectedArray[1]) )
            {
                cardSuccess++;
                console.log(selectedArray);
                document.querySelector(`${selectedArray[0]}`).style.border = '4px solid green';
                document.querySelector(`${selectedArray[1]}`).style.border = '4px solid green';
                document.querySelector(`${selectedArray[0]}`).style.pointerEvents = 'none !important';
                document.querySelector(`${selectedArray[1]}`).style.pointerEvents = 'none !important';
                
                count =0;
                selectedArray = [];
                console.log('I ran');
                if(cardSuccess===totalCards/2){
                    setTimeout(gameOver,1000);
                    
                }
            }
        }
    }
    else{
        anime({
            targets: selectedArray,
            scale: [{value: 1}, {value: 1.1}, {value: 1, delay: 250}],
            rotateY: {value: '+=180', delay: 200},
            easing: 'easeInOutSine',
            duration: 250,
            autoplay: true,
            loop: 1
        });
        selectedArray = [];
        count =0;
        }
    }
        
    )});
}

function gameOver(){
    const mainDiv = document.querySelector('.mainDiv');
    const resScreen = createNode('div','',mainDiv);
    resScreen.classList.add('result-screen');
    console.log(document.querySelectorAll('.menu ul li'));
    const Timer = document.querySelectorAll('.menu ul li')[3]
    const getTime = Timer.innerHTML;
    Timer.style.display = 'none';
    isGameOver = true;
    const h2resScreen = createNode('h2','',resScreen);
    const spanCong = createNode('span','Congratulations!!',h2resScreen);
    const res = createNode('span',` You Completed the Challenge in ${getTime}s`,h2resScreen);
    spanCong.classList.add('span-cong');
    res.classList.add('span-res');
    
    
}

function executeGame(){
    removeWelcomeScreen();
    createOverlay();
    createGame();



}
