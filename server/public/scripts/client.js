$(document).ready(onReady);

function onReady() {
    // as soon as page loads > get list of artists from server
    $('#submit-btn').on('click', submit)

    $('#plus').on('click', setCalc)
    $('#minus').on('click', setCalc)
    $('#divide').on('click', setCalc)
    $('#multiply').on('click', setCalc)
} // end onReady


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
       // do something
    }).catch((res) => { 
    });// if bad response
    


}//end submit

$.ajax({   
    type: 'GET',  
    url: '/place' 
}).then( (res) => { // if good response ie 200,201:
   // do something
}).catch((res) => { 
});// if bad response






//  ✅    
//  ✅      two inputs, one submit('='), 'C' clear button, +, -, * /
// TODO:    client POST inputs
// TODO:    server POST inputs
// TODO:    server data structure
            //  History: Array of all previous calculations
            //      UPDATE (rerenderDOM)
// TODO:    server perform math operations
            //  Addition, Subtraction, Multiplication, and Division.
            // server responds 'OK' 
// TODO:    client GET req
// TODO:    server GET
// TODO:    client update DOM
// TODO:    
// TODO:    
// * Do not use eval()


//STRETCH GOALS:
    //TODO: convert interface to normal calc
    //TODO: Show an alert if they left inputs empty
    //TODO: Clear history by clicking on a button. NOT A GET nor a POST
            //TODO: research DELETE request!
    //TODO: Allow a user to click on an entry in the History list to re-run that calculation. 
        //  This should display the answer on the calculator interface like a normal calculation.
    //TODO: Other logical progression?