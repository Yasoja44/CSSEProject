class Item{
    constructor(itemId,itemSupplierId,itemName,itemPrice,itemPic,itemPolicyFlag){
        this.itemId = itemId;
        this.itemSupplierId = itemSupplierId;
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.itemPic = itemPic;
        this.itemPolicyFlag = itemPolicyFlag;
    }
}

module.exports = Item;