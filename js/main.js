var jsonData,currentList,questList,popularList,maxCards,
    animateContainer = document.getElementsByClassName('uproar-main')[0],
    alert = document.getElementsByClassName('alert')[0];;

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
    var animateElem = document.querySelectorAll('[data-animate]');

    for(var i = 0; i < animateElem.length; i++){
        if((animateElem[i].offsetTop - animateContainer.scrollTop) < (window.innerHeight - 70) && !animateElem[i].classList.contains('show-card')){
            animateElem[i].classList.add('show-card');
        }
    }
}

//Accept Quest
function questAccept(btn){
    
    var card = btn.closest('.card'),
        gamePower = Math.abs((card.querySelector('.power').innerText)),
        userPower = document.querySelector('.power>span'),
        userPoints = document.querySelector('.points>span'),
        gamePoints = (Number(card.querySelector('.points').innerText));

    if(Number(userPower.innerText) >= gamePower){

        totalPoints = Number(userPoints.innerText) + gamePoints;
        totalPower = Number(userPower.innerText) - gamePower;
        card.classList.add('completed');
        card.classList.remove('appear');
        var countIt = setInterval(countUp, 10);

        addNewGame(card);
        function countUp(){
            if(totalPoints > Number(userPoints.innerText) || totalPower < Number(userPower.innerText)){
                
                totalPoints > Number(userPoints.innerText) ? userPoints.innerText = Number(userPoints.innerText) + 5 : false;
                totalPower < Number(userPower.innerText) ? userPower.innerText = Number(userPower.innerText) - 5 : false;

            }else{
                clearInterval(countIt);
            }
        }

    }else{
        alert.classList.add('show-alert');
    }
}

//Add New Game Card
function addNewGame(card){
    currentList = event.currentTarget;
    var listItem = document.createElement('li'),listData;
    listItem.classList.add('card','appear');
    
    if(currentList.closest('.uproar-quests')){
        questList.splice(cardIndex(card),1);
        listData = questList[currentList.childElementCount];
    }
    else if(currentList.closest('.uproar-popular')){
        popularList.splice(cardIndex(card),1);
        listItem.classList.add('game-card' );
        listData = popularList[currentList.childElementCount];
    }

    listTemplate = `
        <figure data-catagory="action"><img src="${listData.gameImage}" alt="${listData.gameTitle}"></figure>
        <figcaption class="game-desc"><h2>${listData.gameTitle}</h2><p>${listData.gameDesc}</p></figcaption>
        <div class="card-footer clear"><span class="points"><svg class="icon-logo"><use href="#icon-logo"></use></svg>${listData.gamePoint}</span><span class="power"><svg class="icon-power"><use href="#icon-power"></use></svg>${listData.gamePower}</span><button class="btn-primary">accept</button>
        </div>`;
    listItem.innerHTML = listTemplate;
    setTimeout(() => {
        currentList.append(listItem);
        card.remove();
    }, 500);
}

//Get Card Index
function cardIndex(card){
    var gamesList = card.closest('.games-list').querySelectorAll('li');
    for(var i = 0; i < gamesList.length; i++){
        if(gamesList[i] === card){
            return i;
        }
    }

}

//Load Languages from Json File
function loadLanguages(){
    var req = new XMLHttpRequest();
    req.open('GET','js/lang.json', true);
    req.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            var jsonData = JSON.parse(this.responseText),
                langList = document.querySelector('.lang-list');

            jsonData.languages.forEach(data => {
                var langTemplate = `<svg class="icon-flag"><use href="#icon-${data}"></use></svg><span>${data}</span>`;
                var listItem = document.createElement('li');
                listItem.innerHTML = langTemplate;
                langList.append(listItem);

            });
        }
    }
    req.send();
}

//Get Games List
function loadList(callback){
    var req = new XMLHttpRequest();
    req.open('GET','js/games.json',true);
    req.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            jsonData = JSON.parse(this.responseText);
            questList = jsonData.quest;
            popularList = jsonData.popular;
            callback();
        }
    }
    req.send();
}

//Update List
function updateList(list,n){
    listItem = document.createElement('li');
    listItem.classList.add('card','appear');
    if(list.closest('.uproar-quests')){
        var data = questList[n];
    }
    else if(list.closest('.uproar-popular')){
        listItem.classList.add('game-card' );
        var data = popularList[n];
    }
    listTemplate = `
        <figure data-catagory="action"><img src="${data.gameImage}" alt="${data.gameTitle}"></figure>
        <figcaption class="game-desc"><h2>${data.gameTitle}</h2><p>${data.gameDesc}</p></figcaption>
        <div class="card-footer clear"><span class="points"><svg class="icon-logo"><use href="#icon-logo"></use></svg>${data.gamePoint}</span><span class="power"><svg class="icon-power"><use href="#icon-power"></use></svg>${data.gamePower}</span><button class="btn-primary">accept</button>
        </div>`;

    listItem.innerHTML = listTemplate;
    list.append(listItem);
    
}

function slideInit(resize){
    var slideContainer = document.querySelectorAll('.games-list');
    maxCards = Math.floor(slideContainer[0].offsetWidth / 255);

    for(var i = 0; i < slideContainer.length; i++){
        resize ? slideContainer[i].innerHTML = '' : false;
        slideContainer[i].classList.remove(`card-${maxCards-1}`,`card-${maxCards+1}`)
        slideContainer[i].classList.add(`card-${maxCards}`)
        loadCards(slideContainer[i],maxCards,resize);   
    }
}

function loadCards(slideContainer, maxCards,resize){
    var listItem, data;
    
    for(var i = 1; i <= maxCards; i++){
        listItem = document.createElement('li');
        listItem.classList.add('card');
        if(!resize){
            listItem.setAttribute('data-animate','fade-in');
            listItem.setAttribute('data-animate-delay',i*2);
        }
        if(i==1){
            listItem.classList.add('start-slide');
        }
        if(slideContainer.closest('.uproar-popular')){
            listItem.classList.add('game-card');
            data = popularList[i-1];
        }
        else if(slideContainer.closest('.uproar-quests')){
            data = questList[i-1];
        }
        listTemplate = `
        <figure data-catagory="action"><img src="${data.gameImage}" alt="${data.gameTitle}"></figure>
        <figcaption class="game-desc"><h2>${data.gameTitle}</h2><p>${data.gameDesc}</p></figcaption>
        <div class="card-footer clear"><span class="points"><svg class="icon-logo"><use href="#icon-logo"></use></svg>${data.gamePoint}</span><span class="power"><svg class="icon-power"><use href="#icon-power"></use></svg>${data.gamePower}</span><button class="btn-primary">accept</button>
        </div>`;

        listItem.innerHTML = listTemplate;
        slideContainer.append(listItem);
    }
}

//Slide Function
function slide(btn){
    var gamesList = btn.closest('.uproar-row').querySelector('.games-list');
    var translateDist = gamesList.querySelector('li').offsetWidth + 10;
    if(btn.classList.contains('btn-next')){    
        gamesList.style.transform=`translateX(-${translateDist * slideMov(gamesList,'right')}px)`
    }
    else if(btn.classList.contains('btn-prev')){
        gamesList.style.transform=`translateX(-${translateDist * slideMov(gamesList,'left')}px)`
    }
}

function slideMov(list,direction){
    
    var listItem = list.querySelectorAll('li');
    if(direction == 'right'){
        for(var i = 0; i < listItem.length; i++){
            
            if(listItem[i].classList.contains('start-slide') && listItem[i+1] != null){
                listItem[i+1].classList.add('start-slide');
                listItem[i].classList.remove('start-slide');
                if(listItem[i+maxCards]==null){
                    updateList(list,i+maxCards);
                }
                return i+1;
            }
        }
    }else if(direction = 'left'){
        for(var i = 0; i < listItem.length; i++){
            if(listItem[i].classList.contains('start-slide') && listItem[i-1] != null){
                listItem[i-1].classList.add('start-slide');
                listItem[i].classList.remove('start-slide');
                return i-1;
            }
        }
    }
}


//Initialization Function And Load Json Function
function init(callback){
    loadLanguages();
    loadList(callback);
}

//Event Binding Function
function eventBinder(){
    var toggleBtn = document.querySelectorAll('.toggle-switch'),
        dropdownBtn = document.querySelectorAll('.drop-btn'),
        langDropBtn = document.getElementsByClassName('lang-btn')[0],
        langDrop = document.getElementsByClassName('lang-dropdown')[0],
        gamesList = document.querySelectorAll('.games-list'),
        alertCloseBtn = document.getElementsByClassName('alert-close')[0],
        nextBtn = document.querySelectorAll('.btn-next'),
        prevBtn = document.querySelectorAll('.btn-prev');

    //Switch toggle
    toggleBtn.forEach(btn=>{
        btn.addEventListener('click',function(event){
            event.preventDefault();
            btn.classList.toggle('switched');
        });
    })

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
    langDrop.addEventListener('click', function(event){
        target = event.target;
        if(target.closest('.lang-list')){
            langDropBtn.innerHTML = target.closest('li').innerHTML;
            langDrop.classList.remove('show-lang');
        }
    })

    //animate on scroll
    animateContainer.addEventListener('scroll', function(event){
        animateOnScroll();
    })

    //Quest Accept 
    gamesList.forEach(list => {
        list.addEventListener('click', function(event){
            if(event.target.nodeName == 'BUTTON'){
                questAccept(event.target);
                event.target.classList.add('bounce');
                setTimeout(() => {
                    event.target.classList.remove('bounce')
                }, 500);
            }
        })
    });

    //Remove Alert
    alertCloseBtn.addEventListener('click', function(event){
        event.preventDefault();
        alert.classList.remove('show-alert');
    })

    slideInit()
    //Next Btn Slider
    nextBtn.forEach(btn=>{
        btn.addEventListener('click', function(event){
            event.preventDefault();
            slide(btn);
        })
    })

    prevBtn.forEach(btn=>{
        btn.addEventListener('click', function(event){
            event.preventDefault();
            slide(btn);
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
}

//-----------------------------------------------------Window Function
window.addEventListener('DOMContentLoaded',function(){
    init(eventBinder);
})

window.addEventListener('load', function(){
    //animate On Load
    animateOnScroll()
})

window.addEventListener('resize', function(){
    slideInit(true);
})

