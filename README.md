# BiteSpeed Backend Task: Identity Reconciliation
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hemakumarm/)



[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/24948386-2sA35LUye7)


## https://bitespeed-akrh.onrender.com

1. User <br>
   a. Identity POST <br>
   b. Identity GET <br>

# Identity POST

### Prerequisites

One of the following scopes are required to execute this request: POST

### HTTP Request

```
https://bitespeed-akrh.onrender.com/v1/api/user/identity
```

### Request Body

In the request URL, provide the following query parameters with values.

| Parameter   | Type   | Description            |
| :---------- | :----- | :--------------------- |
| email       | String | ?email or `null`       |
| phoneNumber | String | ?phoneNumber or `null` |

### Example TestCase: 1

##### Request

```json
{
     "email": "mcfly@hillvalley.edu",
     "phoneNumber": "123456"
}
```

##### Response

```json
{
  "success": true,
  "contact": {
    "primaryContactId": 1,
    "emails": ["lorraine@hillvalley.edu"],
    "phoneNumbers": ["123456"],
    "secondaryContactIds": []
  }
}
```

### Example TestCase: 2

## Extending the previous example:

##### Request

```json
{
     "email": "mcfly@hillvalley.edu",
     "phoneNumber": "123456"
}
```

##### Response

```json
{
  "success": true,
  "contact": {
    "primaryContactId": 1,
    "emails": ["lorraine@hillvalley.edu", "mcfly@hillvalley.edu"],
    "phoneNumbers": ["123456"],
    "secondaryContactIds": [2]
  }
}
```

### Can primary contacts turn into secondary?

#### Yes. Let’s take an example

#### Existing state of database:

```js
{
	id                   3
  phoneNumber          "919191"
  email                "george@hillvalley.edu"
  linkedId             null
  linkPrecedence       "primary"
  createdAt            2023-04-11 00:00:00.374+00
  updatedAt            2023-04-11 00:00:00.374+00
  deletedAt            null
},
{
	id                   4
  phoneNumber          "717171"
  email                "biffsucks@hillvalley.edu"
  linkedId             null
  linkPrecedence       "primary"
  createdAt            2023-04-21 05:30:00.11+00
  updatedAt            2023-04-21 05:30:00.11+00
  deletedAt            null
}
```

### Example TestCase: 3

## Extending the previous example:

##### Request

```json
{
  "email": "george@hillvalley.edu",
  "phoneNumber": "717171"
}
```

##### Response

```json
{
  "success": true,
  "contact": {
    "primaryContactId": 3,
    "emails": ["george@hillvalley.edu", "biffsucks@hillvalley.edu"],
    "phoneNumbers": ["919191", "717171"],
    "secondaryContactIds": [4]
  }
}
```

# Identity GET

### Prerequisites

One of the following scopes are required to execute this request: GET

### HTTP Request

```
https://bitespeed-akrh.onrender.com/v1/api/user/identity
```

### Request Body

In the request URL, provide the following query parameters with values.

##### Response

```json
{
  "success": true,
  "contact": [
    {
      "id": 1,
      "phoneNumber": "123456",
      "email": "lorraine@hillvalley.edu",
      "linkedId": null,
      "linkPrecedence": "primary",
      "deletedAt": null,
      "createdAt": "2024-04-04T14:34:10.000Z",
      "updatedAt": "2024-04-04T14:34:10.000Z"
    },
    {
      "id": 2,
      "phoneNumber": "123456",
      "email": "mcfly@hillvalley.edu",
      "linkedId": 1,
      "linkPrecedence": "secondary",
      "deletedAt": null,
      "createdAt": "2024-04-04T14:36:16.000Z",
      "updatedAt": "2024-04-04T14:36:16.000Z"
    },
    {
      "id": 3,
      "phoneNumber": "919191",
      "email": "george@hillvalley.edu",
      "linkedId": null,
      "linkPrecedence": "primary",
      "deletedAt": null,
      "createdAt": "2024-04-04T14:43:31.000Z",
      "updatedAt": "2024-04-04T14:43:31.000Z"
    },
    {
      "id": 4,
      "phoneNumber": "717171",
      "email": "biffsucks@hillvalley.edu",
      "linkedId": 3,
      "linkPrecedence": "secondary",
      "deletedAt": null,
      "createdAt": "2024-04-04T14:43:50.000Z",
      "updatedAt": "2024-04-04T14:44:13.000Z"
    },
    {
      "id": 5,
      "phoneNumber": "717171",
      "email": null,
      "linkedId": 4,
      "linkPrecedence": "secondary",
      "deletedAt": null,
      "createdAt": "2024-04-04T14:45:16.000Z",
      "updatedAt": "2024-04-04T14:45:16.000Z"
    },
    {
      "id": 6,
      "phoneNumber": "717171",
      "email": null,
      "linkedId": 4,
      "linkPrecedence": "secondary",
      "deletedAt": null,
      "createdAt": "2024-04-04T14:45:20.000Z",
      "updatedAt": "2024-04-04T14:45:20.000Z"
    }
  ]
}
```
