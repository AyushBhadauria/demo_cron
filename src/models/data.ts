var mongoose =require ('mongoose');
class Schema {
    public model;
    constructor() {
        var dataSchema = mongoose.Schema({
            totalProfit: { type:Number, required: true},
            btcQuantity:{ type:Number, required: true},
            time:  {type: Date, default: Date.now()},
        });
        this.model = mongoose.model('dataSchema', dataSchema);
    }
}



export default  new Schema().model;
