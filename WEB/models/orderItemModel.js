class OrderItem{
    constructor(id,OrderId,itemId,itemName,qty,sub_total){
        this.id = id;
        this.OrderId = OrderId;
        this.itemId = itemId;
        this.itemName = itemName;
        this.qty = qty;
        this.sub_total = sub_total;
    }
}

module.exports = OrderItem;