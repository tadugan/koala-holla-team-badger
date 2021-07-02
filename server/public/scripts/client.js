console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();
  $('#readyButton').on("click", koalaReadyHandler);
  // listener to delete a koala on button click
  $('#viewKoalas').on('click', 'button#deleteButton' deleteKoalaHandler);
}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
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

// handler for delete button
function deleteKoalaHandler() {
  deleteKoala($(this).data('id'));
}

// ajax request to delete a koala from the database
function deleteKoala(koalaId) {
  $.ajax({
    method: 'DELETE',
    url: `/koalas/${koalaId}`
  })
  .then(response () => {
    console.log('Goodbye koala friend!!');
    getKoalas(); // MC's function to GET and display koala data
  })
  .catch((error) => {
    alert(`There was a problem deleting ${koalaId}. Please try again.`);
  });
}