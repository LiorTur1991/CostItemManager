window.costManager = {};

window.costManager.getCostItem = function(title, description, date, price, note){
    let costItem = {};
    costItem.title = title;
    costItem.description = description;
    costItem.date = date;
    costItem.price = price;
    costItem.note = note;
    return costItem;
};

window.costManager.addItem = function(ob) {
    let data = costManager.getItems();
    data.push(ob)
    let dataString = JSON.stringify(data);
    localStorage.setItem("data", dataString);
};

window.costManager.getItems = function() {
    let data = localStorage.getItem("data");
    if(data)
        return JSON.parse(data);
    else {
        data = [];
        return data;
    }
};

window.costManager.clearLocalStorageData = function () {
    let data = [];
    let dataString = JSON.stringify(data);
    localStorage.setItem("data",dataString);
    window.costManager.updateListView(window.costManager.getItems());
    window.costManager.createPieChart("sortedContainer",-1)
    $("#pop-up-clearData").popup("open");

}

window.costManager.getCostsPerMonth = function(monthNumber) {
    let data = localStorage.getItem("data");
    let vec = JSON.parse(data);
    let result = [];
    if(vec.length > 0) {
        if (monthNumber < 0) {
            vec.forEach(
                function (ob) {
                    result.push(ob);
                });
            return result;
        }
        vec.forEach(
            function (ob) {
                let obDateFormat = new Date(ob.date);
                if (obDateFormat.getMonth() === monthNumber)
                    result.push(ob);
            });
    }
    return result;
};


window.costManager.updateListView = function(items){
    let itemsList = "<ul data-role='listview' id='list'>";
    items.forEach(
        function (ob) {
            itemsList+= "<li data-role='collapsible'>";
            itemsList+= "<h3>" + ob.title + "</h3>";
            itemsList+= "<p>" + ob.description + "</p>";
            itemsList+= "<p><strong>" + ob.date + "</strong></p>";
            itemsList+= "</li>";
        });
    itemsList+= "</ul>";
    $("#list").html(itemsList);
    $("#list").trigger('create');
};


window.costManager.getCurrentMonthString = function (currentMonth){
    let monthText;
    switch (currentMonth){
        case 0:
            monthText = "January";
            break;
        case 1:
            monthText = "February";
            break;
        case 2:
            monthText = "March";
            break;
        case 3:
            monthText = "April";
            break;
        case 4:
            monthText = "May";
            break;
        case 5:
            monthText = "June";
            break;
        case 6:
            monthText = "July";
            break;
        case 7:
            monthText = "August";
            break;
        case 8:
            monthText = "September";
            break;
        case 9:
            monthText = "October";
            break
        case 10:
            monthText = "November";
            break;
        case 11:
            monthText = "December";
            break;
        default:
            monthText = "Anytime";
            break;

    }
    return monthText;
};

window.costManager.applySort = function(){
    let sortMonth = parseInt(document.getElementById('sortMonth').value);
    window.costManager.updateListView(costManager.getCostsPerMonth(sortMonth));
    window.costManager.createPieChart("sortedContainer",sortMonth);
};

window.costManager.calcPieData = function (data){
    if(data == undefined) return;
    let totalCounter = 0;
    let dataMap = new Map();
    data.forEach(function (calcData) {
            if (!dataMap.has(calcData.category))
                dataMap.set(calcData.category, parseInt(calcData.price))
            else {
                let counter = dataMap.get(calcData.category);
                counter = counter + parseInt(calcData.price);
                dataMap.set(calcData.category, counter)
            }
            totalCounter = totalCounter + parseInt(calcData.price);
        }
    )
    let pieData = [];
    dataMap.forEach((value, key) => {
            pieData.push({y: (value/totalCounter)*100,label: key})
        })

    return pieData;
}

window.costManager.createPieChart = function (pieChartName,currentMonth){
    let picChartDiv = document.getElementById(pieChartName);
    while (picChartDiv.lastElementChild) {
        picChartDiv.removeChild(picChartDiv.lastElementChild);
    }
    let data = window.costManager.calcPieData(window.costManager.getCostsPerMonth(currentMonth));
    let currentMonthText = costManager.getCurrentMonthString(currentMonth);
    let text = currentMonthText + " summery";
    if(data.length > 0) {
        let chart = new CanvasJS.Chart(pieChartName, {
            animationEnabled: true,
            title: {
                text: text
            },
            data: [{
                type: "pie",
                startAngle: 240,
                yValueFormatString: "##0.00\"%\"",
                indexLabel: "{label} {y}",
                dataPoints: data
            }]
        });
        chart.render();
        return;
    }
    else{
        let h3=document.createElement("h3");
        h3.innerHTML="There is No expenses in "+currentMonthText;
        picChartDiv.appendChild(h3);
    }
}

window.costManager.handleAddButtonClick =  function (){
    try {
        let ob = {};
        ob.title = document.getElementById("title").value;
        ob.description = document.getElementById("description").value;
        ob.date = document.getElementById("date").value;
        ob.price = document.getElementById("price").value;
        ob.category = document.getElementById("category").value;
        if(ob.title=="" || ob.description=="" || ob.date=="" || ob.price=="" || ob.category==""){
            $("#pop-up-warning").popup("open");
            return;
        }
        window.costManager.addItem(ob);
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("date").value = "";
        document.getElementById("price").value = "";
        $("#pop-up-success").popup("open");
    }
    catch{
        $("#pop-up-warning").popup("open");
    }
}

window.costManager.updateReportView = function (){
    window.costManager.updateListView(window.costManager.getItems());
    window.costManager.createPieChart("sortedContainer",-1);
}

window.costManager.updateHomeView = function (){
    let currentDate = new Date();
    let CurrentMonth = costManager.getCurrentMonthString(currentDate.getMonth());
    document.getElementById("currentMonth").innerHTML = "Current Month: " + CurrentMonth;
    window.costManager.createPieChart("chartContainer", currentDate.getMonth());
}