MysqlCntl: Mysql Controller
=========

## TL:DR
* This project is developed by nate.crema
* If error, please report issuse to github!

------
* email(developer): nate.crema@gmail.com




## Index
* [Introduction](#Introduction)
* [Installing](#Installing)






## Introduction

Mysql Controller module (support DML)



## Installing

Use npm: <br>

    $ npm install mysqlCntl

Use unpkg CDN: <br>

```html
<script src="https://unpkg.com/mysqlCntl@latest/lib/control.min.js"></script>
```


## Usage

### 0.default

```javascript
const sqlCnt = require("mysqlCntl");
```


### 1. Insert


usage:

```javascript
const Insert = sqlCnt.DML.Insert;
Insert(table, data, done)
// or
Insert(table, data)
.then((result))
.catch((e))
```

data type:

```
table: String
data: Object or Array
```

example: 

```javascript
const { Insert } = require("mysqlCntl").DML;
Insert('user', [{
    userId: "testerId",
    userPw: "testerPw"
}, {
    userId: "testerId2",
    userPw: "testerPw2"
}])
.then((result) => {
    console.log(result);
})
.catch((e) => {
    console.error(e);
})

// or

Insert('user', [{
    userId: "testerId",
    userPw: "testerPw"
}, {
    userId: "testerId2",
    userPw: "testerPw2"
}], (err, result) => {
    if (err) console.error(err);
    else console.log(result);
})
```


### 1. Insert


usage:

```javascript
const Insert = sqlCnt.DML.Insert;
Insert(table, data, done)
// or
Insert(table, data)
.then((result))
.catch((e))
```

data type:

```
table: String
data: Object or Array
```

example: 

```javascript
const { Insert } = require("mysqlCntl").DML;
Insert('user', [{
    userId: "testerId",
    userPw: "testerPw"
}, {
    userId: "testerId2",
    userPw: "testerPw2"
}])
.then((result) => {
    console.log(result);
})
.catch((e) => {
    console.error(e);
})

// or

Insert('user', [{
    userId: "testerId",
    userPw: "testerPw"
}, {
    userId: "testerId2",
    userPw: "testerPw2"
}], (err, result) => {
    if (err) console.error(err);
    else console.log(result);
})
```


### 2. Update


usage:

```javascript
const Update = sqlCnt.DML.Update;
Update(table, base, alter, done)
// or
Update(table, base, alter)
.then((result))
.catch((e))
```

data type:

```
table: String
base: Object
alter: Object
```

example: 

```javascript
const { Update } = require("mysqlCntl").DML;
Update('user', {
    userId: "testerId"
}, {
    email: "test@test.com",
    level: 20
})
.then((result) => {
    console.log(result);
})
.catch((e) => {
    console.error(e);
})

// or

Update('user', {
    userId: "testerId"
}, {
    email: "test@test.com",
    level: 20
}, (err, result) => {
    if (err) console.error(err);
    else console.log(result);
})
```


### 3. Select


usage:

```javascript
const Select = sqlCnt.DML.Select;
Select(table, output, filter, done)
// or
Select(table, output, filter)
.then((result))
.catch((e))
```

data type:

```
table: String
output: String (default: *) // column name that output
filter: Object
```

example: 

```javascript
const { Select } = require("mysqlCntl").DML;
Select('user', "*", {
    userId: "testId"
})
.then((result) => {
    console.log(result);
})
.catch((e) => {
    console.error(e);
})

// or

Select('user', "*", {
    userId: "testId"
}, (err, result) => {
    if (err) console.error(err);
    else console.log(result);
})
```

### 4. Delete


usage:

```javascript
const Delete = sqlCnt.DML.Delete;
Delete(table, filter, done)
// or
Delete(table, filter)
.then((result))
.catch((e))
```

data type:

```
table: String
output: String (default: *) // column name that output
filter: Object
```

example: 

```javascript
const { Delete } = require("mysqlCntl").DML;
Delete('user', {
    userId: "testId"
})
.then((result) => {
    console.log(result);
})
.catch((e) => {
    console.error(e);
})

// or

Delete('user', {
    userId: "testId"
}, (err, result) => {
    if (err) console.error(err);
    else console.log(result);
})
```

