


/*  
//  Fetch Api from 6-01

var tableBody = document.getElementById('repo-table');
var fetchButton = document.getElementById('fetch-button');

function getApi() {
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl = 'https://api.github.com/orgs/nodejs/repos';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      //Loop over the data to generate a table, each table row will have a link to the repo url
      for (var i = 0; i < data.length; i++) {
        // Creating elements, tablerow, tabledata, and anchor
        var createTableRow = document.createElement('tr');
        var tableData = document.createElement('td');
        var link = document.createElement('a');

        // Setting the text of link and the href of the link
        link.textContent = data[i].html_url;
        link.href = data[i].html_url;

        // Appending the link to the tabledata and then appending the tabledata to the tablerow
        // The tablerow then gets appended to the tablebody
        tableData.appendChild(link);
        createTableRow.appendChild(tableData);
        tableBody.appendChild(createTableRow);
      }
    });
}

fetchButton.addEventListener('click', getApi);

//  AJAX call from 3rd party API, JQuery
$.ajax({
  url: requestUrl,
  method: 'GET',
}).then(function (response) {
  console.log('Ajax Response \n-------------');
  console.log(response);
});


//  Dynamically Generated Elements

var usersContainer = document.getElementById('users');
var fetchButton = document.getElementById('fetch-button');

function getApi() {
  var requestUrl = 'https://api.github.com/users?per_page=5';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //Using console.log to examine the data
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        //Creating a h3 element and a p element
        var userName = document.createElement('h3');
        var userUrl = document.createElement('p');

        //Setting the text of the h3 element and p element.
        userName.textContent = data[i].login;
        userUrl.textContent = data[i].html_url;

        //Appending the dynamically generated html to the div associated with the id="users"
        //Append will attach the element as the bottom most child.
        usersContainer.append(userName);
        usersContainer.append(userUrl);
      }
    });
}
fetchButton.addEventListener('click', getApi);


//  FECTCH STATUS

var badRequestUrl = 'https://api.github.com/orgs/nodejs/oreps';

var responseText = document.getElementById('response-text');

function getApi(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      console.log(response.status);
      //  Conditional for the the response.status.
      if (response.status !== 200) {
        // Place the response.status on the page.
        responseText.textContent = response.status;
      }
      return response.json();
    })
    .then(function (data) {
      // Make sure to look at the response in the console and read how 404 response is structured.
      console.log(data);
    });
}

getApi(badRequestUrl);


// FETCH OPTIONS

fetch('https://api.github.com/repos/nodejs/node/issues?per_page=5', {
  method: 'GET', //GET is the default.
  credentials: 'same-origin', // include, *same-origin, omit
  redirect: 'follow', // manual, *follow, error
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });


//  REVIEW MODULE 6 REVIEWS
*/

