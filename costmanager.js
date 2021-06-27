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

window.costManager.getCostsPerMonth = function(monthNumber) {
    let data = localStorage.getItem("data");
    let vec = JSON.parse(data);
    let result = [];
    if(monthNumber < 0){
        vec.forEach(
            function (ob) {
                result.push(ob);
            });
        return result;
    }
    vec.forEach(
        function (ob) {
            let obDateFormat = new Date(ob.date);
            if(obDateFormat.getMonth() === monthNumber)
                result.push(ob);
    });
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

    }
    return monthText;
};

window.costManager.applySort = function(){
    let sortMonth = parseInt(document.getElementById('sortMonth').value);
    window.costManager.updateListView(costManager.getCostsPerMonth(sortMonth));
};

window.costManager.createPieData = function (data){
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
