/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//declaring global variables
const ul = document.querySelector('.student-list')
const studentList = ul.children;


//show page function, shows appropriate list items for a chosen page.
const showPage = (list, page) => {
  for(let i=0; i<list.length; i++) {
    if(i >= ((page * 10) - 10) && i < (page * 10))  //cycles through all students.
      {list[i].style.display = 'block'}  //if student li should be on page, unhide
        else
          {list[i].style.display = 'none'} //else hide them
        }

    }

//calling showPage function to mute all but first 10 of student list.
showPage(studentList, 1);

//creating the appendPageLinks function to dynamically add page button links
const appendPageLinks = (list) =>
  {//creating the div, appening under .page class, creating and appending ul to house page divs
  const listCount = list.length;
  const requiredPages = (Math.ceil(listCount / 10));
  const newDiv = document.createElement("div");
  newDiv.className = "pagination";
  document.querySelector(".student-list").parentNode.appendChild(newDiv);
  const ul = document.createElement('ul');
  newDiv.appendChild(ul);
  //each loop creates li and a tags for the required number of pages
    for (let y = 1; y <= requiredPages; y ++)
          {
            const li = document.createElement('li');
            ul.appendChild(li);
            const a = document.createElement('a');
            a.href = '#'
            li.appendChild(a);
            a.textContent = y;
            a.addEventListener('click', (e) =>
              {
                showPage(list, y)   //upon click, showPage invoked to mute/unmute student li's for a given page
                });
          }
}

appendPageLinks(studentList);  //invokes the function for list of students

//creating and appending search button and input
const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
document.querySelector('.page-header').appendChild(searchDiv);
const searchInput = document.createElement('input');
searchInput.placeholder = "Search for students";
searchDiv.appendChild(searchInput);
const searchButton = document.createElement('button');
searchButton.textContent = "Search";
searchDiv.appendChild(searchButton);

//adding functionality to buttons
searchButton.addEventListener('click', (e) =>{
  const pel = document.querySelector('.pagination').parentNode;
  const cel = document.querySelector('.pagination');
  pel.removeChild(cel);  //66-68 removes prior pagination.
  const studentNames = document.getElementsByTagName('h3');  //pulls name of student only
  let searchList = [];  //empty array to house search matches

  for(let i = 0; i <studentList.length; i++){
    const stg = studentNames[i].textContent.toUpperCase();  //the string name of each student
    const inpt = searchInput.value.toUpperCase();  //the string input value (uppercased for standardization)
    const selStudents = studentList[i];

      if (inpt == stg || stg.includes(inpt)){  //if input ='s or contains string input,'
        selStudents.style.display = 'block';   //then unhide such student
        searchList.push(selStudents);    //and push to searchList array

      }
          else {selStudents.style.display = 'none'}   //else, hide the student; loop repeats for each student

  }

  showPage(searchList, 1)
  appendPageLinks(searchList, 10);   //invoke showPage and appendPageLinks

});
