var price = {
  almonds: 25.00,
  cashew: 100.75,
  walnut:23.00,
  peanuts:150.00,
  jessica: 120.50,
  bourborn: 20.00,
  milk: 12.00,
  goodday: 12.00,
  nice: 2.00,
  mariagold: 1.00,
  apple: 14.00,
  strawberry: 2.00,
  orange: 31.00,
  guva: 2.50,
  grapes: 10.60,
  icecream: 2.50,
  flan: 3.00,
  cookie: 1.25,
  cupcake: 1.75,
  milkshake: 30.00
};

var nuts = ["almonds", "cashew", "walnut", "peanuts","jessica"];
var biscuits = ["bourborn", "milk", "goodday", "nice","mariagold"];
var drink = ["milkshake"];
var fruit = ["apple", "strawberry", "orange", "guva","grapes"];
var sweet = ["icecream", "flan", "cookie", "cupcake"];

var cats = { drink, nuts, biscuits, fruit, sweet };

var nutsIdx = 0;
var biscuitsIdx = 0;
var drinkIdx = 0;
var fruitIdx = 0;
var sweetIdx = 0;


function setAttributes() {
  var unassigned = document.getElementsByTagName("img");
  for (i = 0; i < unassigned.length; i++) {
    unassigned[i].onclick = function () { addItem(this); };
    unassigned[i].style.width = "150px";
  }
} setAttributes();

function getPrice(obj) {
  var id = obj.id;
  for (i in price) {
    if (i == id) {
      return price[i];
    }
  }
};

function getCategory(obj) {
  var id = obj.id;
  for (i in cats) {
    for (j = 0; j < cats[i].length; j++) {
      if (id == cats[i][j]) {
        return i;
      }
    }
  }
};

function calculatePrice() {
  var total = 0;
  for (i in cats) {
    var div = document.getElementById(i);
    var nodes = div.childNodes;
    for (j = 0; j < nodes.length; j++) {
      total += parseFloat(nodes[j].getAttribute("price"));
    }
  }
  var parseTotal = total.toFixed(2);
  var totalDiv = document.getElementById("total");
  totalDiv.innerHTML = "Total: $" + parseTotal;
}

function clearTotal() {
  var div = document.getElementById("total");
  if (div.innerHTML != "") {
    div.innerHTML = "&nbsp";
  }
}

function clearList() {
  for (i in cats) {
    var div = document.getElementById(i)
    while (div.hasChildNodes()) {
      var nodes = div.childNodes;
      div.removeChild(nodes[0]);
    }
  }
  drinkIdx = 0;
  nutsIdx = 0;
  biscuitsIdx = 0;
  fruitIdx = 0;
  sweetIdx = 0;
  clearTotal();
}

function clearColumn(obj) {
  var cat = obj.nextElementSibling.id;
  var div = document.getElementById(cat);
  while (div.hasChildNodes()) {
    div.removeChild(div.childNodes[0]);
  }
  switch (cat) {
    case "drink":
      if (drinkIdx > 0) {
        clearTotal();
      }
      drinkIdx = 0;
      break;
    case "biscuits":
      if (biscuitsIdx > 0) {
        clearTotal();
      }
      biscuitsIdx = 0;
      break;
    case "nuts":
      if (nutsIdx > 0) {
        clearTotal();
      }
      nutsIdx = 0;
      break;
    case "fruit":
      if (fruitIdx > 0) {
        clearTotal();
      }
      fruitIdx = 0;
      break;
    case "sweet":
      if (sweetIdx > 0) {
        clearTotal();
      }
      sweetIdx = 0;
      break;
  }
}


function clearCell(obj, category, price) {
  var idx = obj.tabIndex;
  var div = document.getElementById(category);
  var nodes = div.childNodes;
  var itemP = nodes[idx].getAttribute("price");
  var n = itemP / price;
  for (i = 0; i < n - 1; i++) {
    deleteItem(obj, category, price);
  }
}

function addItem(obj) {
  var idx; 
  var category = getCategory(obj);
  var div = document.getElementById(category);

  switch (category) {
    case "drink":
      idx = drinkIdx;
      break;
    case "biscuits":
      idx = biscuitsIdx;
      break;
    case "nuts":
      idx = nutsIdx;
      break;
    case "fruit":
      idx = fruitIdx;
      break;
    case "sweet":
      idx = sweetIdx;
      break;
  }


  var stack = false;
  if (idx > 0) {
    var srcImg = 'url("' + obj.src + '")';
    var nodes = document.getElementById(category).childNodes;
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i].style.backgroundImage == srcImg) {
        stack = true;
      }
    }
  }

  
  if (!stack) {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "fix");
    newDiv.style.backgroundImage = "url(" + obj.src + ")";
    newDiv.style.backgroundSize = "150px 150px";
    newDiv.style.backgroundRepeat = "no-repeat";
    newDiv.setAttribute("price", getPrice(obj));
    newDiv.tabIndex = idx;
    newDiv.onclick = function () { deleteItem(this, category, getPrice(obj)); };

    var text = document.createElement("div");
    text.innerHTML = "x1";
    text.setAttribute("class", "fixed")

    var dollar = document.createElement("div");
    dollar.innerHTML = "$" + getPrice(obj).toFixed(2);
    dollar.setAttribute("class", "fixed")

    var inputDiv = document.createElement("div");
    var input = document.createElement("input");
    input.value = "clear"
    input.type = "button"
    input.onclick = function () { clearCell(newDiv, category, getPrice(obj)); };
    inputDiv.setAttribute("class", "fixer")
    inputDiv.appendChild(input)
    newDiv.appendChild(text);
    newDiv.appendChild(dollar);
    newDiv.appendChild(inputDiv);
    div.appendChild(newDiv);

    switch (category) {
      case "drink":
        drinkIdx++;
        break;
      case "biscuits":
        biscuitsIdx++;
        break;
      case "nuts":
        nutsIdx++;
        break;
      case "fruit":
        fruitIdx++;
        break;
      case "sweet":
        sweetIdx++;
        break;
    }
  } else {
    var index;
    for (i = 0; i < div.childNodes.length; i++) {
      if (div.childNodes[i].style.backgroundImage == srcImg) {
        index = i;
      }
    }
    var node = div.childNodes[index];
    var itemP = parseFloat(node.getAttribute("price"));
    var count = node.firstElementChild;
    var num = parseInt(count.innerHTML.substr(1, count.innerHTML.length)) + 1;

    var dollar = count.nextElementSibling;
    var amount = parseFloat(dollar.innerHTML.substr(1, dollar.innerHTML.length));
    amount += getPrice(obj);

    count.innerHTML = "x" + num;
    dollar.innerHTML = "$" + amount.toFixed(2);
    node.setAttribute("price", itemP + getPrice(obj));
  }
  clearTotal();
};



function deleteItem(obj, category, price) {
  var idx = obj.tabIndex;
  var div = document.getElementById(category);
  var nodes = div.childNodes;
  var itemP = parseFloat(nodes[idx].getAttribute("price")).toFixed(2);

  if (itemP > price) {
    nodes[idx].setAttribute("price", itemP - price);
    var count = nodes[idx].firstElementChild;
    var dollar = count.nextElementSibling;

    var num = parseInt(count.innerHTML.substr(1, count.innerHTML.length)) - 1;
    var amount = parseFloat(dollar.innerHTML.substr(1, dollar.innerHTML.length));
    amount -= price;

    count.innerHTML = "x" + num;
    dollar.innerHTML = "$" + amount.toFixed(2);
  } else {
    div.removeChild(nodes[idx])
    for (i = idx; i < nodes.length; i++) {
      nodes[i].tabIndex = i;
    }

    switch (category) {
      case "drink":
        drinkIdx--;
        break;
      case "biscuits":
        biscuitsIdx--;
        break;
      case "nuts":
        nutsIdx--;
        break;
      case "fruit":
        fruitIdx--;
        break;
      case "sweet":
        sweetIdx--;
        break;
    }
  }
  clearTotal();
};