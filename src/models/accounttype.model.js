export class AccountType {
    id;
    description;
    name;


    constructor(typeId, typeDescription, typeName) {
        this.id = typeId;
        this.description = typeDescription;
        this.name = typeName;
    }

    static valueOf({id, description, name}){
        return new AccountType(id, description, name);
    }

    static byName(name){
        return new AccountType('unknown', 'an unknown account type', name);
    }
}
