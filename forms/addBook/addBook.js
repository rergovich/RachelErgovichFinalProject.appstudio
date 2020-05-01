
  
btnAdd.onclick=function(){
    let title = inptTitle.value
    title.trim()
    let author = inptAuthor.value
    author.trim()
    let genre = inptGenre.value
    genre.trim()
    let dateRead = inptDateRead.value
    dateRead.trim()
    let query = `INSERT INTO bookshelf (title, author, genre, date_read) VALUES ('${title}', '${author}', '${genre}', '${dateRead}')`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=rje33080&pass=Bluejays$1!&database=rje33080&query=" + query)

    if (req.status == 200) { //transit worked.
      if (req.responseText == 500) {   // means the insert succeeded
        NSB.MsgBox(`You have successfully added ${title} to your bookshelf!`)
      } else
        NSB.MsgBox(`There was a problem with adding the ${title} to the bookshelf.`)
    } else {
      // transit error
      NSB.MsgBox(`Error: ${req.status}`);
    }  
    inptTitle.value = ''
    inptAuthor.value = ''
    inptGenre.value = ''
    inptDateRead.value = ''
    
    ChangeForm(navigation)
}


hbrAddBook.onclick=function(s){
  if (typeof(s) == "object") 
    return
  else {
    switch (s) {
    case 'Home':
      ChangeForm(navigation)
      break;
    case 'Find a Book':
      ChangeForm(findBook)
      break;
    case 'Javascript Books':
      ChangeForm(topicSearch)
      break;
    }
  }
}