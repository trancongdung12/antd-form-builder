import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  Typography,
} from 'antd'
import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'
import React from 'react'
import FormBuilder from './FormBuilder'

const mapOptions = options => {
  if (!isArray(options)) {
    throw new Error('Options should be array in form builder meta.')
  }
  return options.map(opt => {
    if (isArray(opt)) {
      return { value: opt[0], label: opt[1] }
    } else if (isPlainObject(opt)) {
      return opt
    } else {
      return { value: opt, label: opt }
    }
  })
}

FormBuilder.defineWidget('checkbox', Checkbox, field => {
  return { ...field, valuePropName: 'checked' }
})

FormBuilder.defineWidget('switch', Switch, field => {
  return { ...field, valuePropName: 'checked' }
})

FormBuilder.defineWidget('button', Button)
FormBuilder.defineWidget('typography', Typography)
FormBuilder.defineWidget('input', Input)
FormBuilder.defineWidget('password', Input.Password)
FormBuilder.defineWidget('textarea', Input.TextArea)
FormBuilder.defineWidget('number', InputNumber)
FormBuilder.defineWidget('date-picker', DatePicker)
FormBuilder.defineWidget('radio', Radio)
FormBuilder.defineWidget('radio-group', Radio.Group, field => {
  const RadioComp = field.buttonGroup ? Radio.Button : Radio
  if (field.options && !field.children) {
    return {
      ...field,
      widgetProps: {
        ...field.widgetProps,
        name: field.key,
      },
      children: mapOptions(field.options).map(opt => (
        <RadioComp value={opt.value} key={opt.value}>
          {opt.label}
        </RadioComp>
      )),
    }
  }
  return field
})

FormBuilder.defineWidget('checkbox-group', Checkbox.Group, field => {
  if (field.options && !field.children) {
    return {
      ...field,
      children: mapOptions(field.options).map(opt => (
        <Checkbox value={opt.value} key={opt.value}>
          {opt.label}
        </Checkbox>
      )),
    }
  }
  return field
})
FormBuilder.defineWidget('select', Select, field => {
  if (field.options && !field.children) {
    return {
      ...field,
      children: mapOptions(field.options).map(opt => (
        <Select.Option label={opt.label} value={opt.value} key={opt.value} disabled={opt.disabled}>
          {opt.children || opt.label}
        </Select.Option>
      )),
    }
  }
  return field
})
