class Calculator {

    constructor() {
        this.btns = document.getElementsByClassName("calcbtn");
        this.operationOutput = document.getElementById("calcScreenTextOperation");
        this.resultOutput = document.getElementById("calcScreenTextResult");
        this.calcBtns = Array.from(this.btns);
        this.allClear()
    }

    claculation() {

        this.calcBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                switch (btn.innerHTML) {
                    case "AC":
                        this.allClear();
                        break;

                    case "+":
                        this.operation(btn.innerHTML,this.resultOutput.innerHTML);
                        break;
                    case "-":
                        this.operation(btn.innerHTML,this.resultOutput.innerHTML);
                        break;
                    case "*":
                        this.operation(btn.innerHTML,this.resultOutput.innerHTML);
                        break;
                    case "/":
                        this.operation(btn.innerHTML,this.resultOutput.innerHTML);
                        break;
                    case "%":
                        this.operation(btn.innerHTML,this.resultOutput.innerHTML);
                        break;
                    case "exp":
                        this.operation("**",this.resultOutput.innerHTML);
                        break;
                    case "=":
                        if(this.resultOutput.innerHTML){
                            this.updateScreen();
                            this.equl(this.resultOutput.innerHTML);
                        }else{
                            var notifi={
                                type:"basic",
                                iconUrl:"./icon/icon48.png",
                                title:"Empty Process !!!",
                                message:"please, enter valid process."
                            }
                            chrome.notifications.create('errorNotif',notifi);
                            chrome.notifications.clear('errorNotif');
                        }
                        break;
                    case ".":
                        this.dotBtn(btn.innerHTML, this.resultOutput.innerHTML);
                        break;
                    case "DEL":
                        this.deleteChar(this.resultOutput.innerHTML)
                        break;
                    case "Ans":
                        this.get_from_storage_add_to_expression();
                        break;

                    default:
                        this.resultOutput.innerHTML += `${btn.innerHTML}`;
                        break;
                }

            })
        });


    }

    //clear all text on screen
    allClear() {
        this.resultOutput.innerHTML = "";
        this.operationOutput.innerHTML = "0";
    }

    //method to add space before & after math sign 
    // using template Literals
    operation(operationChar,resultScreenText) {

        let index= resultScreenText.length;
        let last=resultScreenText[index - 1];
        (last== "+") ||(last== "-")||(last== "*")||(last== "/")||(last== "%")||(last== "**")?
            this.resultOutput.innerHTML +="" :
            this.resultOutput.innerHTML += operationChar;

    }

    updateScreen() {
        this.operationOutput.innerHTML = this.resultOutput.innerHTML;
    }


    equl(resultScreenText) {
        try{
        resultScreenText.includes(".") ?
            this.resultOutput.innerHTML = eval(resultScreenText).toFixed(3) :
            this.resultOutput.innerHTML = eval(resultScreenText);
            chrome.storage.sync.set({'total': this.resultOutput.innerHTML });
        }
        catch(error){
            var notifi={
                type:"basic",
                iconUrl:"./icon/icon48.png",
                title:"Invalid Process!!!",
                message:"please, enter valid process."
            }
            chrome.notifications.create('errorNotif',notifi);
            chrome.notifications.clear('errorNotif');
        }
    }

    get_from_storage_add_to_expression(){
            chrome.storage.sync.get('total',function(answer){
                if (answer.total==undefined){
                    document.getElementById("calcScreenTextResult").innerHTML +="0"
                }else{
                    document.getElementById("calcScreenTextResult").innerHTML +=answer.total;
                }

        });
    }

    dotBtn(dotSign, resultScreenText) {

        let index = resultScreenText.length;
        resultScreenText[index - 1]=="." ?
            this.resultOutput.innerHTML += "" :
            this.resultOutput.innerHTML += ".";

    }
    deleteChar(resultScreenText) {
            this.resultOutput.innerHTML = resultScreenText.slice(0, -1);
        
    }

}

myCalculator = new Calculator;

myCalculator.claculation();