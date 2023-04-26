document.querySelector('.busca').addEventListener('submit', async (event)=>{

    event.preventDefault();
    let input = document.querySelector('#searchInput').value;

    if(input!==""){
      showWarning('carregando...');
      let firsturl=`http://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(input)}&appid=92cd692fca27d3f7181ac5bd3ef272e8`;

      let results= await  fetch(firsturl);
      let json=  await results.json();
      console.log(json);
      if(json[0]){
            
        console.log()
        let secondurl= await `https://api.openweathermap.org/data/2.5/weather?lat=${json[0].lat}&lon=${json[0].lon}&units=metric&lang=pt_br&appid=92cd692fca27d3f7181ac5bd3ef272e8`;
        let results2= await fetch(secondurl);
        let json2= await results2.json();
        console.log(json2);
        if(json2.cod===200){
            searchInfo({
                humidity:json2.main.humidity,
                name: json2.name,
                country: json2.sys.country,
                time: json2.main.temp,
                tempIcon: json2.weather[0].icon,
                windSped: json2.wind.speed,
                windDegree: json2.wind.deg
            })
        }
      }
      else{
        document.querySelector('.resultado').style.display="none";
        showWarning('não encontrado');
      }
    };   
}
);
function searchInfo(json2){
    showWarning('');
    document.querySelector('.resultado').style.display="block";
    document.querySelector('.titulo').innerHTML=`${json2.name}, ${json2.country}`;
    document.querySelector('.tempInfo').innerHTML=`${json2.time}<sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML=`${json2.windSped}<span>km/h</span>`;
    document.querySelector('.umiInfo').innerHTML=`${json2.humidity}<span>(g/m³)</span>`;
    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json2.tempIcon}@2x.png`);  

};



    function showWarning(msg){
        document.querySelector(".aviso").innerHTML=msg;
    
    };


