console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();
  clearInput(); //clears user input on page load

  $('table').on("click", '#transferButton', koalaReadyHandler);
  // listener to delete a koala on button click
  $('#viewKoalas').on('click', 'button#deleteButton', deleteKoalaHandler);
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
        <td>${response[i].age}</td>
        <td>${response[i].gender}</td>
        <td>${response[i].readyForTransfer}</td>
        <td>${response[i].notes}</td>
        <td>
          <img src="https://i.dailymail.co.uk/i/pix/2013/03/15/article-2293725-189FDDDD000005DC-515_634x415.jpg" alt="Sad Koala" width="70px">
          <br>
          <button id="transferButton" data-id="${response[i].id}"> Ready for Transfer </button>
        </td>
        <td><button id="deleteButton" data-id="${response[i].id}" data-name="${response[i].name}">Delete</button></td>
      </tr>
      `)
}else if(`${response[i].readyForTransfer}` == `Y`){
  $('#viewKoalas').append(`
      <tr>
        <td>${response[i].name}</td>
        <td>${response[i].age}</td>
        <td>${response[i].gender}</td>
        <td>${response[i].readyForTransfer}</td>
        <td>${response[i].notes}</td>
        <td><img src="https://preview.redd.it/3v6yrnl6fme31.jpg?width=598&auto=webp&s=e4a84f8b4a0a382e2dbf733c81b2b0083ab2f3dc" alt="Happy Koala" width="70px"></td>
        <td><button id="deleteButton" data-id="${response[i].id}" data-name="${response[i].name}">Delete</button></td>
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

// handler for delete button
function deleteKoalaHandler() {
  deleteKoala($(this).data('id'), $(this).data('name'));
}

// ajax request to delete a koala from the database
function deleteKoala(koalaId, koalaName) {

    Swal.fire({
    title: `Are you sure you want to abandon ${koalaName}, you monster?`,
    text: "You won't be able to find them again. Ever.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, abandon this beautiful creature!!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        `${koalaName} has been abandoned`,
        'It\'s gone now. I hope you are happy.',
        'success'
      );

      $.ajax({
        method: 'DELETE',
        url: `/koalas/${koalaId}`
      })
      .then(response => {
        console.log('Goodbye koala friend!!');
        getKoalas(); // MC's function to GET and display koala data
      })
      .catch((error) => {
        alert(`There was a problem deleting ${koalaId}. Please try again.`);
      });
    }
    else {
      return;
    }
  });

}