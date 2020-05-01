
hbrFindBook.onclick=function(s){
  if (typeof(s) == "object") 
    return
  else {
    switch (s) {
    case 'Home':
      ChangeForm(navigation)
      break;
    case 'Add a Book':
      ChangeForm(addBook)
      break;
    case 'Javascript Books':
      ChangeForm(topicSearch)
      break;
    }
  }
}

let titles = []
findBook.onshow=function(){
  let query = `SELECT * FROM bookshelf`
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=rje33080&pass=Bluejays$1!&database=rje33080&query=" + query)

  if (req.status == 200) { //transit worked.
    let results = JSON.parse(req.responseText)
        
    if (results.length == 0)
      NSB.MsgBox(`There are no books on your bookshelf.`)
    else {        
      // Fill select with Titles
        for (i = 0; i <= results.length - 1; i++)
          titles.push(results[i][1])
        
        for (i = 0; i <= titles.length -1; i++)
          selTitles.addItem(titles[i])
    } // end else

  } else
      //transit error
      NSB.MsgBox(`Error code: ${req.status}`)
}

btnFind.onclick=function(){
  
  let title = selTitles.value
  let query = `SELECT title, author, genre, date_read FROM bookshelf WHERE title = '${title}'`
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=rje33080&pass=Bluejays$1!&database=rje33080&query=" + query)
  
  if (req.status == 200) { //transit worked.
        
    let results = JSON.parse(req.responseText)
    let chosenBook = results[0]
    mdlResponse.toggle()    
    if (results.length == 0) {
      mdlResponse.value = `Could not retrieve information for ${title}.`
    } else {        
      //output book information
      mdlResponse.value = `You chose ${chosenBook[0]} by ${chosenBook[1]}. The genre is ${chosenBook[2]}, and the date read was ${chosenBook[3]}.` 
    } // end else

  } else
      //transit error
      mdlResponse.value = `Error code: ${req.status}`
}

btnOK.onclick=function(){
  mdlResponse.toggle()
  ChangeForm(navigation)
}
