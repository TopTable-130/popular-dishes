# TopTable
Popular-dishes service module

Full stack module for displaying popular dishes of the restaurant

## Related Projects

  - https://github.com/TopTable-130/Reviews
  - https://github.com/TopTable-130/photos-carousel-service
  - https://github.com/TopTable-130/Calendar

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

## Server API

### Get list of all dishes from a restaurant
  * GET `/api/restaurants/:id/dishes`

**Path Parameters:**
  * `id` restaurant id

**Success Status Code:** `200`

**Returns:** JSON

```json
  [
    {
      "id": "Number",
      "name": "String",
      "description": "String",
      "reviews": [
        {
          "id": "Number",
          "user": "String",
          "date": "Date",
          "restaurant_rating": "Number",
          "review_text": "String"
        }
      ],
      "price": "Number"
    }
   ]
```

### Add a dish to a restaurant
  * POST `/api/restaurants/:id/dishes`

**Path Parameters:**
  * `id` restaurant id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "name": "String",
      "restaurant_id": "Number",
      "description": "String",
      "price": "Number"
    }
```


### Update restaurant info
  * PATCH `/api/restaurant/:id/dishes/:dishid`

**Path Parameters:**
  * `id` restaurant id
  * `dishid` dish id


**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
     {
      "name": "String",
      "restaurant_id": "Number",
      "description": "String",
      "price": "Number"
     }
```

### Delete restaurant
  * DELETE `/api/restaurant/:id/dishes/:dishid`

**Path Parameters:**
  * `id` restaurant id
  * `dishid` dish id

**Success Status Code:** `204`


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 10.22
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```
