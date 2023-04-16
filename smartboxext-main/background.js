chrome.runtime.onMessage.addListener(function(response,sender,sendResponse){
    var link = response;
    if(link.startsWith("https")){
        alert("This Site " + response + " is Secured");
    }
    else{
        alert("This Site " + response + "is not Secured. Do you want to continue with this?");
    }
})