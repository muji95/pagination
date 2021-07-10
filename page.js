var req = new XMLHttpRequest;
req.open('GET',"https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json", true);
req.send();
req.onload = function()
{
    var data = JSON.parse(this.response);
    console.log(data);
    window.info = data;
    pagereaction(data);
}

function createtd (elename, value="")
{
    var td = document.createElement(elename);
    td.innerHTML = value;
    return td;
}

function pagereaction(data)
{    
var table = document.createElement("table");
table.className = "table";

var thead = document.createElement("thead");
thead.className = "thead-dark";

var tr = document.createElement('tr'),
    th1 = createtd('th', 'ID'),
    th2 = createtd('th', 'Name'),
    th3 = createtd('th', 'Email');
tr.append(th1,th2,th3);
thead.append(tr);

var tbody = document.createElement('tbody'),
    diver = document.createElement('div');
    diver.setAttribute('class','pageno');

for(var i = 0; i < 10; i++)
{
    var tr = document.createElement('tr');
    var td1 = createtd('td', data[i].id);
        td1.setAttribute('class','id');
    var td2 = createtd('td', data[i].name);
        td2.setAttribute('class','name');
    var td3 = createtd('td', data[i].email);
        td3.setAttribute('class','email');
    tr.append(td1,td2,td3);
    tbody.append(tr);

    var bt1 = document.createElement('button');
    bt1.innerHTML = String(i + 1);
    bt1.className = 'numbers';
    if(i + 1 == 1){
        bt1.className = bt1.className + ' ' + 'active';
    }
    diver.append(bt1);
}

tbody.append(diver);
table.append(thead, tbody);
document.body.append(table);

//Creating Previous and Next buttons
var finder = document.querySelectorAll('div.pageno'),
       bt1 = document.createElement('button'),
       bt2 = document.createElement('button'),
       bt3 = document.createElement('button'),
       bt4 = document.createElement('button');
       bt1.innerHTML = "Previous";
       bt2.innerHTML = "Next";
       bt3.innerHTML = 'First';
       bt4.innerHTML = 'Last';
finder[0].insertBefore(bt2,finder[0].childNodes[0]);
finder[0].insertBefore(bt1,finder[0].childNodes[0]);
finder[0].insertBefore(bt3,finder[0].childNodes[0]);
finder[0].appendChild(bt4);

//Form Filler
function formfiller(starter){
    var temp = 0,
        tabler = document.querySelectorAll('tbody tr');
    for(var i = starter; i < starter + 10; i++){
        var divisions = tabler[temp].querySelectorAll('td');
        for(var j = 0; j < divisions.length; j++){
            if(divisions[j].className == 'id'){
                divisions[j].innerText = window.info[i - 1].id;
            }
            else if(divisions[j].className == 'name'){
                divisions[j].innerText = window.info[i - 1].name;
            }
            else if(divisions[j].className == 'email'){
                divisions[j].innerText = window.info[i - 1].email;
            }
        }
        temp++;
    }
}

//Class Changer
function classchanger(pos){
 var buttons = document.querySelectorAll('div.pageno button.numbers');
 for(var i = 0; i < buttons.length; i++){
     if(Number(buttons[i].innerText) == pos){
         buttons[i].className = buttons[i].className + ' ' + 'active';
     }
     else{
         buttons[i].className = 'numbers';
     }
 }
}

//Page No and Other Behaviours
var pagebottom = document.querySelectorAll('div.pageno > button');
for(var i = 0; i < pagebottom.length; i++){
    pagebottom[i].addEventListener('click',function(e){
        //debugger;
        if(this.innerText.toLowerCase() == 'previous'){
            var activepos = Number(document.querySelector('div.pageno button.active').innerText),
            starter = ((activepos - 2) * 10) + 1;
            if(activepos != 1){
            classchanger(activepos - 1);
            formfiller(starter);
            }
        }
        else if(this.innerText.toLowerCase() == 'next'){
            var activepos = Number(document.querySelector('div.pageno button.active').innerText),
            starter = (activepos * 10) + 1;
            if(activepos != 10){
            classchanger(activepos + 1);
            formfiller(starter);
            }
        }
        else if(this.innerText.toLowerCase() == 'first'){
            classchanger(1);
            formfiller(1);
        }
        else if(this.innerText.toLowerCase() == 'last'){
            var laster = document.querySelectorAll('div.pageno button.numbers');
            classchanger(laster.length);
            formfiller(((laster.length - 1 )* 10) + 1);
        }
        else{
            var clicker = Number(this.innerText),
            starter = ((clicker - 1) * 10) + 1,
            activepos = Number(document.querySelector('div.pageno button.active').innerText);
            if(clicker != activepos){
            classchanger(Number(this.innerText));
            }
            formfiller(starter);
        }
    });
}

}