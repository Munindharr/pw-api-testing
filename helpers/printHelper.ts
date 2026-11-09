export function printAge(age: number){
    console.log(age);
}

export function printName(name: string){
    console.log(name);
}

class CustomerDetails {
printFirstName(firstName: string){
    console.log(firstName);
    }
    printLastName(lastName: string){
    console.log(lastName);
    }
    printAddress(address: string){
    console.log(address);
    }
}   
export const customerdetails = new CustomerDetails();      