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
        let returnValue = null;

        if(name === "SuperSaver Savings"){
            returnValue = new AccountType(
                1,
                'Our signature SuperSaver savings account is designed for ' +
                'savers of all ages and incomes. It has a low interest rate, but as long ' +
                'as you maintain a $50.00 balance, there are no monthly fees!',
                'SuperSaver'
            );
        } else if (name === "CoolCash Checking") {
            returnValue = new AccountType(
                2,
                "The CoolCash Checking account allows you to make purchases" +
                " in the way that is most convenient for you: online, in person, or through" +
                " the mail!  Disclaimer: BeardTrust is not responsible for CoolCash-induced" +
                " frostbite or other cold-related injuries.",
                'CoolCash'
            );
        } else {
            returnValue = new AccountType('unknown', 'an unknown account type', name);
        }

        return returnValue
    }
}
