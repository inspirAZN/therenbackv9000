// Userlist data array for filling in info box
var momentsData = [];

// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the user table on initial page load
  populateMoments();

});

// Functions =============================================================

// Fill table with data
function populateMoments() {

  // Empty content string
  var momentContent = '';

  // jQuery AJAX call for JSON
  $.getJSON( '/momentslist', function( data ) {

    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
      momentContent += '<tr>';
      momentContent += '<td><a href="#" class="linkshowuser" rel="' + this.mymoments + '" title="Show Details">' + this.username + '</td>';
      momentContent += '<td>' + this.email + '</td>';
      momentContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
      momentContent += '</tr>';
    });

    // Inject the whole content string into our existing HTML table
    $('#favorites').html(momentContent);
  });
};