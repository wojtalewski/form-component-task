import { useState } from 'react'
import { Form, Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'

import Condition from '../Condition/Condition'

import backgroundCuttingBoard from '../../assets/img/cuttingBoard.webp'
import backgroundPizza from '../../assets/img/pizza.webp'
import backgroundSoup from '../../assets/img/soup.webp'
import backgroundSandwich from '../../assets/img/sandwich.webp'

import parseInputAsNumber from '../../utilities/parseInputAsNumber'
import {
  formatOnlyNumbersFloat,
  formatOnlyNumbersInt,
  formatOnlyNumbersPreparationTime,
} from '../../utilities/formatString'

import { FormObject } from '../../interfaces/interfaces'

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const FormComponent: React.FC<Props> = ({ setLoading }) => {
  const [bgUrl, setBgUrl] = useState(backgroundCuttingBoard)

  const styles = {
    backgroundImage: `url(${bgUrl})`,
    backgroundSize: 'cover',
  }

  const onSubmit = (formObj: FormObject) => {
    const newObject = parseInputAsNumber(formObj)
    console.log(newObject)
  }

  const required = (value: string) => (value ? undefined : 'Required')
  const minMaxValue = (min: number, max: number) => (value: number) =>
    isNaN(value) || (value >= min && value <= max)
      ? undefined
      : `Should be a number between ${min} - ${max}`

  const composeValidators =
    (...validators: Function[]) =>
    (value: string) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      )

  return (
    <div className='form__section' style={styles}>
      <div className='form__section-container'>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting }) => (
            <form onSubmit={handleSubmit} className='form__section-form'>
              <Field name='name' validate={required}>
                {({ input, meta }) => {
                  return (
                    <div>
                      <label>Dish Name</label>
                      <input {...input} type='text' placeholder='Dish Name' />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )
                }}
              </Field>
              <Field name='type' validate={required}>
                {({ input, meta }) => {
                  return (
                    <div>
                      <label>Dish Type</label>
                      <select {...input}>
                        <option value=''>Select a dish type</option>
                        <option value='pizza'>Pizza</option>
                        <option value='soup'>Soup</option>
                        <option value='sandwich'>Sandwich</option>
                      </select>
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )
                }}
              </Field>
              <OnChange name='type'>
                {(value: string) => {
                  if (value === 'pizza') {
                    setBgUrl(backgroundPizza)
                  } else if (value === 'soup') {
                    setBgUrl(backgroundSoup)
                  } else if (value === 'sandwich') {
                    setBgUrl(backgroundSandwich)
                  } else {
                    setBgUrl(backgroundCuttingBoard)
                  }
                }}
              </OnChange>

              <Condition when='type' is='pizza'>
                <Field
                  name='no_of_slices'
                  validate={required}
                  parse={formatOnlyNumbersInt}
                >
                  {({ input, meta }) => {
                    return (
                      <div>
                        <label>Number of slices:</label>
                        <input
                          {...input}
                          type='number'
                          min='1'
                          placeholder='1'
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )
                  }}
                </Field>
              </Condition>
              <Condition when='type' is='pizza'>
                <Field
                  name='diameter'
                  validate={required}
                  parse={formatOnlyNumbersFloat}
                >
                  {({ input, meta }) => {
                    return (
                      <div>
                        <label>Diameter:</label>
                        <input
                          {...input}
                          type='number'
                          step='0.1'
                          placeholder='1'
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )
                  }}
                </Field>
              </Condition>
              <Condition when='type' is='soup'>
                <Field
                  name='spiciness_scale'
                  validate={composeValidators(required, minMaxValue(1, 10))}
                  parse={formatOnlyNumbersInt}
                >
                  {({ input, meta }) => {
                    return (
                      <div>
                        <label>Spiciness:</label>
                        <input
                          {...input}
                          type='number'
                          min='1'
                          max='10'
                          placeholder='1'
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )
                  }}
                </Field>
              </Condition>
              <Condition when='type' is='sandwich'>
                <Field
                  name='slices_of_bread'
                  validate={required}
                  parse={formatOnlyNumbersInt}
                >
                  {({ input, meta }) => {
                    return (
                      <div>
                        <label>Number of slices of bread required:</label>
                        <input {...input} type='number' min='0' />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )
                  }}
                </Field>
              </Condition>

              <Field
                name='preparation_time'
                parse={formatOnlyNumbersPreparationTime}
                validate={required}
              >
                {({ input, meta }) => {
                  return (
                    <div>
                      <label>Preparation Time</label>
                      <input {...input} type='text' placeholder='00:00:00' />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )
                }}
              </Field>

              <button type='submit' disabled={submitting}>
                Submit
              </button>

              <button onClick={form.reset}>Clear</button>
            </form>
          )}
        ></Form>
      </div>
    </div>
  )
}

export default FormComponent
