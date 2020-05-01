
function onXHRLoad() {
    let message = ""
    let apiData = JSON.parse(this.responseText)
    for (i = 0; i <= apiData.items.length - 1; i++) {
        message = `${message} Title: ${apiData.items[i].volumeInfo.title} \n Author(s): ${apiData.items[i].volumeInfo.authors} \n \n`
    }
    txtTopicSearch.value = message
   
}

function callAPI(URL) {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', URL)
    xhttp.addEventListener('load', onXHRLoad)
    xhttp.send()
}

let requestURL = "https://www.googleapis.com/books/v1/volumes?q=subject:Javascript&printType=books&key=AIzaSyC5u7xUAWLIO2Hk2hz-diewAGpaJgaMIIA"

topicSearch.onshow=function(){
  txtTopicSearch_contents.style.height = "300px"
  txtTopicSearch_contents.style.width = "300px"
  callAPI(requestURL)
}

hbrTopicSearch.onclick=function(s){
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
    case 'Find a Book':
      ChangeForm(findBook)
      break;
    }
  }
}

btnReturn.onclick=function(){
  ChangeForm(navigation)
}
