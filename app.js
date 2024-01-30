const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const Amount = document.querySelector(".input #Amout");
const msg = document.querySelector(".msg");
const btn = document.querySelector("button");
const fromCurr=document.querySelector(".left select");
const toCurr=document.querySelector(".right select");
const dropdowns = document.querySelectorAll("country,select");


window.addEventListener("load",()=>{
    updateExchangeRate();
});

for (select of dropdowns) {
    for (currCode in countryList) {
        let newOpt = document.createElement("option");
        newOpt.innerText = currCode;
        newOpt.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOpt.selected = "selected";

        } else if (select.name === "to" && currCode === "INR") {
            newOpt.selected = "selected";
        }
        select.append(newOpt);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);

    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn.addEventListener("click",(eve)=>{
    eve.preventDefault();
    updateExchangeRate();

});

const updateExchangeRate = async ()=>{
    let amtVal=Amount.value;
    if(amtVal === "" || amtVal <1){
        amtVal=1;
        Amount.value="1";
    }
    
let URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
let response=await fetch(URL);
let data=await response.json();
let rate = data [toCurr.value.toLowerCase()];

let finalAmount=amtVal * rate;
msg.innerText= `${amtVal} ${fromCurr.value}= ${finalAmount} ${toCurr.value}`;
}