var container=document.createElement('div');
container.setAttribute('class','container');

var heading=document.createElement('h1');
heading.innerText="THE PERTINENT TIMES";
heading.setAttribute('class','header')

var hr1=document.createElement('hr');

var hr2=document.createElement('hr');

document.body.append(container);
container.append(heading);
container.append(hr1);
var a=["home","world","politics","magazine","technology","science","health","sports","arts","fashion","food","travel"];

for(var i=0;i<a.length;i++){
 var navbarItems=document.createElement('div');
 navbarItems.setAttribute('class','navbarOuter');
 navbarItems.setAttribute('id',`${a[i]}`);
 navbarItems.innerText=`${a[i].toUpperCase()}`;
 container.append(navbarItems);
}
container.append(hr2);

getApis();

var navs=document.getElementsByClassName('navbarOuter');
Array.from(navs).forEach(element=>{
    element.addEventListener("click",function(){
        getApis((this.innerText).toLowerCase());
    })
});

async function getApis(section='home'){
    console.log(section);
    var fetcher=await fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=j3cF3ircAYrvv1A2tUdxS2eUAFkc2Q6M`);
    var fetcherJson=await fetcher.json();
    var results=fetcherJson.results;
    results.forEach(element=>{
        if(element.section==section){
            var card=document.createElement('div');
            card.classList.add('cardDesign','card','mb-3');
            card.innerHTML=`<div class="row no-gutters">
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.abstract}</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
            <div class="col-md-4">
            <img src="${element.multimedia[0].url}" class="card-img">
          </div>
          </div>`;
          container.append(card);
        }
        else{
            var card1=document.createElement('div');
            card1.setAttribute('class','card mb-3');
            card1.innerHTML=`  <div class="row no-gutters">
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.abstract}</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
            <div class="col-md-4">
            <img src="${element.multimedia[0].url}" class="img-thumbnail" alt="...">
          </div>
          </div>`;
          container.append(card1);
        }
    });
}