//toggle event
const toggleButton = document.querySelector(".toggle-button");
const body = document.body;
const headerNav = document.querySelector(".header-nav");
const bookmarkWrapper = document.querySelector(".bookmark-wrapper");
const texts = document.querySelectorAll(".text");

toggleButton.addEventListener('click', function(){
    toggleButton.classList.toggle("toggle-button-darkmode");
    toggleButton.textContent = "다크모드";

    if(toggleButton.classList.contains("toggle-button-darkmode")){
        toggleButton.textContent = "일반모드";
    }
    
    body.classList.toggle("body-background-darkmode");
    headerNav.classList.toggle("text-darkmode");
    for(let i = 0; i < texts.length; i++){
        texts[i].classList.toggle("text-darkmode");
    }


})

const searchInput = document.querySelector(".search-input");

searchInput.addEventListener('keyup', function(e){
    if(e.code === "Enter"){
        if(!e.target.value){
            alert("검색어를 입력하지 않았습니다!");
            return;
        }
        const target = "https://www.google.com/search?q=" + e.target.value;

        // 그냥이동하는 법
        //location.href = target;

        // 새탭 이동
        window.open(target);
        
    }
});