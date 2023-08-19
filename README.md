# @React Datepicker

A simple datepicker react/typescript component.

You can set an id, name, placeholder, a onChange callback,
className and a preselected value via props.

[See demo link](https://sankarbala.github.io/datepicker/)

## Installation

The package can be installed via npm or yarn:

```bash
npm install @sankarbala/datepicker
```

```bash
yarn add @sankarbala/datepicker
```

## Usage

```js
import React, { useState } from "react";
import { DatePicker } from "@sankarbala/datepicker";

const MyForm = ({ data }) => {
  const [date, setDate] = useState("01/02/2023");

  const handleInputChanged = ({ e }) => {
    setDate(e.target.value);
  };

  <DatePicker
    id="birthday"
    name="birthday"
    onChange={handleInputChanged}
    value={date}
    className="form-control"
  />;
};
```

## Props

**_id_** : an optional id for the datepicker (optional:string)\
**_name_** : an optional name for the datepicker (optional:string)\
**_placeholder_** : a placeholder string (optional:string)\
**_value_** : set the value of the datepicker input (optional:date)\
**_onChange_** : a callback function that takes as argument (target:func)\
**_className_** : an optional attribute for the datepicker (optional:string)\
**_disabled_** : an optional attribute for the datepicker (optional:boolean)\
**_otherAttributes_** : an optional attribute for object of the rest attributes the datepicker (optional:object)
