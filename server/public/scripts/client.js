$(document).ready(onReady);

function onReady() {
    // as soon as page loads > get list of artists from server
    $('#submit-btn').on('click', submit)
    $('#clear-btn').on('click', clearInput)

    $('#one').on('click', fieldAppend)
    $('#two').on('click',fieldAppend)
    $('#three').on('click',fieldAppend)
    $('#four').on('click',fieldAppend)
    $('#five').on('click',fieldAppend)
    $('#six').on('click',fieldAppend)
    $('#seven').on('click',fieldAppend)
    $('#eight').on('click',fieldAppend)
    $('#nine').on('click',fieldAppend)
    $('#zero').on('click',fieldAppend)
    $('#period').on('click',fieldAppend)

    $('#plus').on('click', fieldAppend)
    $('#minus').on('click', fieldAppend)
    $('#divide').on('click', fieldAppend)
    $('#multiply').on('click', fieldAppend)
} // end onReady

function clearInput(){
    $('#input-one').val('');
    $('#input-two').val('');
    $('#input-one').focus();
    field = '';
    // calcToPerform = '';
}

let numberOne = '';
let numberTwo = '';
let calcToPerform = '';
let num2slice = 0;
let field = '';
let lastWasSymbol = true;

//it's like this, but it's dis now
function fieldAppend(){
    if (this.value > -1){ // if a number is input this will be true, if it's a symbol, it will return false.
        lastWasSymbol = false;
    } else{
        if (lastWasSymbol){ //if the previous input char was symbol, remove it replace it with the current one.
            field = field.slice(0,field.length -1); //pop the old one off, replace with the current after end of else 
        }
        lastWasSymbol = true;
        numberOne = field.slice(0,field.length);//note the first number, now that a symbol has been input.
        calcToPerform = this.value;// note which operation we will do.
        num2slice = field.length + 1; //indicates the starting index for the slice of the second number.
    }//end of else
    field += this.value
    $('#input-one').val(field);


}// end fieldAppend    


function submit(){
    numberTwo = field.slice(num2slice,field.length)

    let postData = {
        number1: numberOne,
        number2: numberTwo,
        calc: calcToPerform
    }
    numberOne = Number(postData.number1);
    numberTwo = Number(postData.number2);
    if (emptyFields(numberOne,numberTwo)){
        return
    }
    $.ajax({   
        type: 'POST',  
        url: '/calc',
        data: postData
    }).then( (res) => { // if good response ie 200,201:
        calcToPerform = '';
    }).catch((res) => {
    });// if bad response
    $.ajax({   
        type: 'GET',  
        url: '/calc' 
    }).then( (res) => { // if good response ie 200,201:
       render(res);
    }).catch((res) => { 
    });// if bad response
    field = '';
}//end submit



function render(res){
    let el = $('#insertion');
    el.empty();
    for (let calc of res){
      el.append(`
        <li id='calc${calc.calcCount}' class="calcLine" data-index="${calc.calcCount}">
            ${calc.number1} ${calc.calc} ${calc.number2} = ${calc.result}
        </li>
      `);
    } 
}


function emptyFields(){
    if ($('#input-one').val() == ''){
        alert('please enter an operation');
    }
    // if (calcToPerform == ''){
    //     alert(`please select an operator '+', '-', '/', or 'x'`)
    // }
    // if (numberOne == '' || inputTwo == ''){
    //     alert('Please enter two numbers and a calculation symbol between them.');
    //     return true;
    // }
}// end empty fields



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


//STRETCH GOALS:
    //✅  convert interface to normal calc 
                //✅ number buttons
    // ✅   Show an alert if they left inputs empty
    //TODO: Clear history by clicking on a button. NOT A GET nor a POST
            //TODO: research DELETE request!
            // $.ajax({
            //     url: '/script.cgi',
            //     type: 'DELETE',
            //     success: function(result) {
            //         // Do something with the result
            //     }
            // });
    //TODO: Allow a user to click on an entry in the History list to re-run that calculation. 
        //  This should display the answer on the calculator interface like a normal calculation.
    //TODO: Other logical progression?