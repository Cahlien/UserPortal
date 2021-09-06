export class Transaction {
    id;
    transactionType;
    transactionAmount;
    transactionStatus;
    source;
    target;
    statusTime;
    notes;

    constructor(id, transactionType, transactionAmount, transactionStatus, source, target, statusTime, notes) {
        this.id = id;
        this.transactionType = transactionType;
        this.transactionAmount = transactionAmount;
        this.transactionStatus = transactionStatus;
        this.source = source;
        this.target = target;
        this.statusTime = statusTime;
        this.notes = notes;
    }

    static from({id, transactionType, transactionAmount, transactionStatus, source, target, statusTime, notes}){
        return new Transaction(id, transactionType, transactionAmount, transactionStatus, source, target, statusTime, notes)
    }
}
