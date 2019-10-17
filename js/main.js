var toggleBtn = document.getElementsByClassName('toggle-switch')[0];
var dropdownBtn = Array.from(document.getElementsByClassName('drop-btn'));
var langDropBtn = document.getElementsByClassName('lang-btn')[0];
var langList = document.querySelectorAll('.lang-list>li');
var langDrop = langList[0].closest('.lang-dropdown');
var animateContainer = document.getElementsByClassName('uproar-main')[0];
var animateElem = document.querySelectorAll('[data-animate]');

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

function animateOnScroll(){
    for(var i = 0; i < animateElem.length; i++){
        if((animateElem[i].offsetTop - animateContainer.scrollTop) < (window.innerHeight - 70) && !animateElem[i].classList.contains('fade-in')){
            animateElem[i].classList.add('fade-in');
        }
    }
}

//Window Load Function
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
})

//Window on click
window.addEventListener('click', function(event){
    var target = event.target;

    //Remove langage dropdown
    if(!target.closest('.lang-dropdown') && langDrop.classList.contains('show-lang')){
        langDrop.classList.remove('show-lang')
    }
})