var toggleBtn = document.getElementsByClassName('toggle-switch')[0];
var dropdownBtn = Array.from(document.getElementsByClassName('drop-btn'));
var langDropBtn = document.getElementsByClassName('lang-btn')[0];
var langList = document.querySelectorAll('.lang-list>li');
var langDrop = langList[0].closest('.lang-dropdown');
var animateContainer = document.getElementsByClassName('uproar-main')[0];
var animateElem = document.querySelectorAll('[data-animate]');
var userPower = document.querySelector('.power>span');
var userPoints = document.querySelector('.points>span');
var gamesList = document.querySelectorAll('.games-list');
var questBtns = document.querySelectorAll('.card-footer button');
var alert = document.getElementsByClassName('alert')[0];
var alertCloseBtn = document.getElementsByClassName('alert-close')[0];
var questTemplate = `
    <figure class="b-action">
        <img src="images/pubg-banner.jpg" alt="pubg" srcset="images/pubg-banner@2x.jpg 2x, images/pubg-banner@3x.jpg 3x">
    </figure>
    <figcaption class="game-desc">
        <h2>PUBG mobile</h2>
        <p>Deal 5000 damage to enemies with grenades.</p>
    </figcaption>
    <div class="card-footer clear">
        <span class="points"><svg class="icon-logo"><use href="#icon-logo"></use></svg>+600</span>
        <span class="power"><svg class="icon-power"><use href="#icon-power"></use></svg>-300</span>
        <button class="btn-primary">accept</button>
    </div>`;
var popularTemplate = `
    <figure class="b-action">
        <img src="images/starknight-icon.jpg" alt="starknight">
    </figure>
    <figcaption class="game-desc">
        <h2>star knight</h2>
        <p>earn 10,000 coins</p>
    </figcaption>
    <div class="card-footer clear">
        <span class="points"><svg class="icon-logo"><use href="#icon-logo"></use></svg>+50</span>
        <span class="power"><svg class="icon-power"><use href="#icon-power"></use></svg>-100</span>
        <button class="btn-primary">accept</button>
    </div>`;
var i;


//Dropdown function
function dropdown(droplist,btn){
    parentDropList = btn.closest('.drop-list');
    if(droplist.style.height){
        droplist.style.height = null;
        if(parentDropList){
            parentDropList.style.height = `${parentDropList.scrollHeight-droplist.scrollHeight}px`;
        }
    }
    else{
        droplist.style.height = `${droplist.scrollHeight}px`;
        if(parentDropList){
            droplist.style.height = `${droplist.scrollHeight}px`;
            parentDropList.style.height = `${parentDropList.scrollHeight+droplist.scrollHeight}px`;
        }
    }
}

//Select Lang Function
function selectLang(lang){
    langDropBtn.innerHTML = lang.innerHTML;
    langDropBtn.closest('.lang-dropdown').classList.remove('show-lang');
}

//Animate on scroll
function animateOnScroll(){
    for(i = 0; i < animateElem.length; i++){
        if((animateElem[i].offsetTop - animateContainer.scrollTop) < (window.innerHeight - 70) && !animateElem[i].classList.contains('fade-in')){
            animateElem[i].classList.add('fade-in');
        }
    }
}

//Accept Quest
function questAccept(btn){
    var card = btn.closest('.card');
    var gamePower = Math.abs((card.querySelector('.power').innerText)),
        gamePoints = (Number(card.querySelector('.points').innerText));

    if(Number(userPower.innerText) >= gamePower){

        userPoints.innerText = Number(userPoints.innerText) + gamePoints;
        userPower.innerText = Number(userPower.innerText) - gamePower;
        card.classList.add('completed');
        addNewGame(card)

    }else{
        alert.classList.add('show-alert');
    }
}

//Add New Game Card
function addNewGame(card){
    currentList = event.currentTarget;
    var listItem = document.createElement('li');
    listItem.setAttribute('data-animate','fade-in');
    listItem.setAttribute('data-animate-delay','0');
    if(currentList.closest('.uproar-quests')){
        //Quest caard
        listItem.classList.add('card','fade-in');
        listItem.innerHTML += questTemplate;
        setTimeout(() => {
            currentList.append(listItem);
            card.remove();
        }, 500);
    }
    else if(currentList.closest('.uproar-popular')){
        //Popular card
        listItem.classList.add('card','fade-in','game-card');
        listItem.innerHTML += popularTemplate;
        setTimeout(() => {
            currentList.append(listItem);
            card.remove();
        }, 500);
    }
}

//-----------------------------------------------------Window Load Function
window.addEventListener('load',function(){
    
    //Switch toggle
    toggleBtn.addEventListener('click',function(event){
        event.preventDefault();
        toggleBtn.classList.toggle('switched');
    });

    //Dropdown 
    dropdownBtn.forEach(btn=>{
        btn.addEventListener('click',function(event){
            event.preventDefault();
            this.classList.toggle('drop-open')
            dropdown(btn.nextElementSibling,btn)
        })
    })

    //Language drop
    langDropBtn.addEventListener('click', function(){
        langDrop.classList.toggle('show-lang');
    })

    //Change Lang
    langList.forEach(lang=>{
        lang.addEventListener('click',function(event){
            selectLang(lang.closest('li'));
        })
    })

    //animate On Load
    animateOnScroll()

    //animate on scroll
    animateContainer.addEventListener('scroll', function(event){
        animateOnScroll();
    })

    //Quest Accept 
    gamesList.forEach(list => {
        list.addEventListener('click', function(event){
            if(event.target.nodeName == 'BUTTON'){
                questAccept(event.target);
            }
        })
    });

    alertCloseBtn.addEventListener('click', function(event){
        event.preventDefault();
        alert.classList.remove('show-alert');
    })
    
})


//Window on click
window.addEventListener('click', function(event){
    var target = event.target;

    //Remove langage dropdown
    if(!target.closest('.lang-dropdown') && langDrop.classList.contains('show-lang')){
        langDrop.classList.remove('show-lang')
    }

    //Remove alert
    if(!target.closest('.alert') && !target.classList.contains('btn-primary')  && alert.classList.contains('show-alert')){
        alert.classList.remove('show-alert');
    }
})