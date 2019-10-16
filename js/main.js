var toggleBtn = document.getElementsByClassName('toggle-switch')[0];
var dropdownBtn = Array.from(document.getElementsByClassName('drop-btn'));
var langDropBtn = document.getElementsByClassName('lang-btn')[0];
var langList = document.querySelectorAll('.lang-list>li>span');
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
    console.log(animateContainer.scrollTop,animateElem[8].offsetTop,animateElem[8]);
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

    //Lang drop
    langDropBtn.addEventListener('click', function(event){
        langDropBtn.closest('.lang-dropdown').classList.toggle('show-lang');
    })

    //Change Lang
    langList.forEach(lang=>{
        lang.addEventListener('click',function(event){
            selectLang(lang.closest('li'));
        })
    })

    //animate on scroll
    animateContainer.addEventListener('scroll', function(event){
        animateOnScroll();
    })
})