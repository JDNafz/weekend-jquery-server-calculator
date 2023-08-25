$(document).ready(onReady);

function onReady() {
    // as soon as page loads > get list of artists from server
    $('#submit-btn').on('click', submit)
    $('#clear-btn').on('click', clearInput)

    $('#plus').on('click', setCalc)
    $('#minus').on('click', setCalc)
    $('#divide').on('click', setCalc)
    $('#multiply').on('click', setCalc)
} // end onReady

function clearInput(){
    $('#input-one').val('');
    $('#input-two').val('');
    $('#input-one').focus();
    calcToPerform = '';
}

let calcToPerform = '';
function setCalc(){
    if (this.id == 'plus'){
        calcToPerform = '+'
    }
    if (this.id == 'minus'){
        calcToPerform = '-'
    }
    if (this.id == 'multiply'){
        calcToPerform = '*'
    }
    if (this.id == 'divide'){
        calcToPerform = '/'
    }    
}//end setCalc


function submit(){
    console.log('in submit()')
    
    if (emptyFields()){
        return
    }
    
    let postData = {
        number1: $('#input-one').val(),
        number2: $('#input-two').val(),
        calc: calcToPerform
    }
    $.ajax({   
        type: 'POST',  
        url: '/calc',
        data: postData
    }).then( (res) => { // if good response ie 200,201:
    }).catch((res) => {
    });// if bad response
    $.ajax({   
        type: 'GET',  
        url: '/calc' 
    }).then( (res) => { // if good response ie 200,201:
       render(res);
    }).catch((res) => { 
    });// if bad response
}//end submit



function render(res){
    console.log('in render')
    // console.log(res);
    let el = $('#insertion');
    el.empty();
    for (let calc of res){
        console.log(calc);
      el.append(`
        <li id='calc${calc.calcCount}' class="calcLine" data-index="${calc.calcCount}">
            ${calc.number1} ${calc.calc} ${calc.number2} = ${calc.result}
        </li>
      `);
    } 
}





//  ✅    
//  ✅      two inputs, one submit('='), 'C' clear button, +, -, * /
//  ✅      client POST inputs
//  ✅      server POST inputs
//   ✅     server data structure
//  ✅          History: Array of all previous calculations
//   ✅     server perform math operations
//                  Addition, Subtraction, Multiplication, and Division.
//   ✅      server responds 'OK' 
//   ✅     client GET req
//   ✅     server GET
//   ✅     client update DOM
//  ✅      Clear button
// TODO:    
// * Do not use eval()


//STRETCH GOALS:
    //TODO: convert interface to normal calc 
                //number buttons
                //block /inline blcok layout
    //TODO: Show an alert if they left inputs empty
    //TODO: Clear history by clicking on a button. NOT A GET nor a POST
            //TODO: research DELETE request!
    //TODO: Allow a user to click on an entry in the History list to re-run that calculation. 
        //  This should display the answer on the calculator interface like a normal calculation.
    //TODO: Other logical progression?