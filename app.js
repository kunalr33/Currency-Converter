const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

let dropdowns = document.querySelectorAll(".selectContainer select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let btn = document.querySelector("#exchange");
let msg = document.querySelector(".msg");
let icon = document.querySelector(".icon");

for(let select of dropdowns){
    for(let currCode in countryList ){
        let option = document.createElement("option");
        option.innerText = currCode;
        option.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            option.selected = "selected";
        }else if (select.name === "To" && currCode === "INR") {
            option.selected = "selected";
        }
        select.append(option);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(el)=>{
    let currCode = el.value;
    let country = countryList[currCode];
    let newSrc = `https://flagsapi.com/${country}/flat/64.png`
    let img = el.parentElement.querySelector("img");
    img.src = newSrc;
};
const exchange= async ()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    const url = `${BASE_URL}${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let exchangeRateJson= await fetch(url);
    let exchangeRateData = await exchangeRateJson.json();
    let exchangeRate = exchangeRateData[toCurr.value.toLowerCase()];
    let conversion = amtVal*exchangeRate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${conversion.toFixed(2)} ${toCurr.value}`;
}

icon.addEventListener("click",(evt)=>{
    let hinge = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = hinge;
    for(let el of dropdowns){
        updateFlag(el);
        evt.preventDefault();
        exchange();
    }
});
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    exchange();
  });

window.addEventListener("load", () => {
    exchange();
 });