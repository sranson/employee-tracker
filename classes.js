class Role {
    constructor(title, salary, deptID) {
        this.title = title;
        this.salary = salary;
        this.deptID = deptID
    }
}

class Department {
    constructor(deptName) {
        this.deptName = deptName
    }
}


module.export = {
    Role,
    Department
};