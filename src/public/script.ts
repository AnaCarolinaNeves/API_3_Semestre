function dadosInput(){  
    let model = document.getElementById('model').value
    let temperature = Number (document.getElementById('temperature').value)
    let engine = document.getElementById('engine').value
    let weight = Number (document.getElementById('weight').value)
    let wind = Number (document.getElementById('wind').value)
    let braking = Number (document.getElementById('braking').value)
    let speedAdditive = Number( document.getElementById('speedAdditive').value)
    let slope = Number( document.getElementById('slope').value)
    let altitude = Number (document.getElementById('altitude').value)

	var select = document.getElementById('btnCertification');
    var value = select.options[select.selectedIndex].value;

    if(value == 1){
        console.log('ANAC')
    }else if(value == 2){
        console.log('EASA')
    }else{
        console.log('FAA')
    }

    var selectx = document.getElementById('btnCondition');
	var valuex = selectx.options[selectx.selectedIndex].value;

    console.log(document.getElementById('flapSwitch').value);
    
    

    console.log(valuex); 
    console.log(model, engine, temperature , weight, wind, braking, speedAdditive, slope, altitude)


} 
