console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();
  clearInput(); //clears user input on page load

  $('#readyButton').on("click", koalaReadyHandler);
}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object - DONE
    // NOT WORKING YET :( - WORKING
    // using a test object - ADDED INPUT VALUES
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new object
    saveKoala( koalaToSend );
    clearInput();
  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  //koalas ("name", "gender", 
  //"age", "readyForTransfer", "notes")
  
  $('#viewKoalas').empty();
  
  $.ajax({
    type: 'GET',
    url: '/koalas',//DOUBLE CHECK WHICH URL
  }).then(function (response){
    console.log('in getKoalas', response);
    //append koala info to DOM
    renderKoalaInfo(response)
  }).catch(error => {
  console.log('Error rendering Koala info to DOM', error);
  })
};// end getKoalas

function renderKoalaInfo(response){
for (let i= 0; i < response.length; i++){

  if(`${response[i].readyForTransfer}` == `N`){
  $('#viewKoalas').append(`
      <tr>
        <td>${response[i].name}</td>
        <td>${response[i].gender}</td>
        <td>${response[i].age}</td>
        <td>${response[i].readyForTransfer}</td>
        <td>${response[i].notes}</td>
        <td><button id="transferButton" data-id="${response.id}"> Ready for Transfer </button></td>
      </tr>
      `)
}else if(`${response[i].readyForTransfer}` == `Y`){
  $('#viewKoalas').append(`
      <tr>
        <td>${response[i].name}</td>
        <td>${response[i].gender}</td>
        <td>${response[i].age}</td>
        <td>${response[i].readyForTransfer}</td>
        <td>${response[i].notes}</td>
      </tr>
      `)
}
}//end for loop
};//end render function

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala,
  }).then( (response) => {
    clearInput();
    getKoalas();
  })
 
}

function clearInput() {
  $('#nameIn').val('');
  $('#ageIn').val('');
  $('#genderIn').val('');
  $('#readyForTransferIn').val('');
  $('#notesIn').val('');
}
function koalaReadyHandler(){
  koalaReady($(this).data('id'));
}

function koalaReady (koalaId) {
  $.ajax({
    method: 'PUT',
    url: `/koalas/${koalaId}`
  })
  .then ((response)=>{
    console.log('Koala update:', response);
    getKoalas(); // this should represent whatever code gets and displays updated data
  })
  .catch (error =>{
    alert('Something went wrong', error);
  });
}
