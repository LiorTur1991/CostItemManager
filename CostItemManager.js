window.costManager = {};

window.costManager.CostItem = function(title,description,date, price,note){
    let costItem;
    costItem.Title = title;
    costItem.Description = description;
    costItem.Date = date;
    costItem.price = price;
    costItem.Note = note;
    return costItem;
}

window.costManager.addItem = function(ob) {
    let data = costManager.getItems();
    if(data == null)
        data = [];
    data.push(ob)
    let dataString = JSON.stringify(data);
    localStorage.setItem("data", dataString);
};
window.costManager.getItems = function() {
    let data = localStorage.getItem("data");
    if(data) return JSON.parse(data);
}

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
}
