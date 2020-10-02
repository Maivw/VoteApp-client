# Vote App Schema

## User

| attrubute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| email          |  string   |              not null |
| username       |  string   |              not null |
| picture        |  string   |              not null |
| alreadyPaid    |  boolean  |                       |


## Payment

| attrubute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| payerId        |  string   |              not null |
| userId         |  integer  |  not null, foreignkey |
| emailAddress   |  string   |              not null |
| amount         |  string   |              not null |
| currentcyCode  |  string   |              not null |
| payerName      |  string   |              not null |
| alreadyPaid    |  boolean  |                       |


## Form


| attrubute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| userId         |  integer  |   not null,foreignkey |
| officeTitle    |  string   |              not null |
| candidateName  |  string   |              not null |
| district       |  string   |              not null |
| address        |  string   |              not null |
| occupation     |  string   |              not null |
