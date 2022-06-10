import { useState } from 'react'
import { Form, Field } from 'react-final-form'

import { toast } from 'react-toastify'

import Condition from '../Condition/Condition'

import parseInputAsNumber from '../../utilities/parseInputAsNumber'
import { formatOnlyNumbersPreparationTime } from '../../utilities/formatString'
import { OnChange } from 'react-final-form-listeners'

import { FormObject } from '../../interfaces/interfaces'
import postRecipe from '../../api/postRecipe'

const FormComponent = () => {
  const [bgImage, setBgImage] = useState('cutting-board')

  const onSubmit = (formObj: FormObject) => {
    const newObject = parseInputAsNumber(formObj)

    try {
      postRecipe(newObject)

      toast.success('Form sent!')
    } catch (error) {
      toast.error('Something went wrong, try again later')
      console.log(error)
    }
  }

  const required = (value: string) => (value ? undefined : 'Required')

  const requiredNumber = (min: number, max: number) => (value: number) =>
    value && value >= min && value <= max
      ? undefined
      : `Must be a number between ${min} - ${max}`

  const requiredPreparation = (value: string) => {
    if (!value) {
      return 'Required'
    } else if (value.length !== 8) {
      return 'Please enter the correct format: 00:00:00'
    }
    return undefined
  }

  return (
    <div className='form__section'>
      <div className={`form__section-img form__section-img-${bgImage}`}>
        <div className='form__section-container'>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, dirty }) => (
              <form onSubmit={handleSubmit} className='form__section-form'>
                <Field name='name' validate={required}>
                  {({ input, meta }) => {
                    return (
                      <div className='input__container'>
                        <label htmlFor='name'>Dish Name</label>
                        <input
                          {...input}
                          type='text'
                          placeholder='Dish Name'
                          id='name'
                          className={
                            meta.error && meta.touched && 'input-error'
                          }
                        />
                        {meta.error && meta.touched && (
                          <span className='error__message'>{meta.error}</span>
                        )}
                      </div>
                    )
                  }}
                </Field>
                <Field name='type' validate={required}>
                  {({ input, meta }) => {
                    return (
                      <div className='input__container'>
                        <label htmlFor='type'>Dish Type</label>
                        <select
                          {...input}
                          id='type'
                          className={
                            meta.error && meta.touched && 'input-error'
                          }
                        >
                          <option value=''>Select a dish type</option>
                          <option value='pizza'>Pizza</option>
                          <option value='soup'>Soup</option>
                          <option value='sandwich'>Sandwich</option>
                        </select>
                        {meta.error && meta.touched && (
                          <span className='error__message'>{meta.error}</span>
                        )}
                      </div>
                    )
                  }}
                </Field>

                <OnChange name='type'>
                  {(value: string) => {
                    if (value === 'pizza') {
                      setBgImage('pizza')
                    } else if (value === 'soup') {
                      setBgImage('soup')
                    } else if (value === 'sandwich') {
                      setBgImage('sandwich')
                    } else {
                      setBgImage('cutting-board')
                    }
                  }}
                </OnChange>

                <Condition when='type' is='pizza'>
                  <Field name='no_of_slices' validate={requiredNumber(1, 100)}>
                    {({ input, meta }) => {
                      return (
                        <div className='input__container'>
                          <label htmlFor='no_of_slices'>
                            Number of slices:
                          </label>
                          <input
                            {...input}
                            type='number'
                            min='1'
                            max='100'
                            placeholder='1-100'
                            id='no_of_slices'
                            className={
                              meta.error && meta.touched && 'input-error'
                            }
                          />
                          {meta.error && meta.touched && (
                            <span className='error__message'>{meta.error}</span>
                          )}
                        </div>
                      )
                    }}
                  </Field>
                </Condition>
                <Condition when='type' is='pizza'>
                  <Field name='diameter' validate={requiredNumber(1, 100)}>
                    {({ input, meta }) => {
                      return (
                        <div className='input__container'>
                          <label htmlFor='diameter'>Diameter:</label>
                          <input
                            {...input}
                            type='number'
                            step='0.1'
                            placeholder='1-100'
                            min='1'
                            max='100'
                            id='diameter'
                            className={
                              meta.error && meta.touched && 'input-error'
                            }
                          />
                          {meta.error && meta.touched && (
                            <span className='error__message'>{meta.error}</span>
                          )}
                        </div>
                      )
                    }}
                  </Field>
                </Condition>
                <Condition when='type' is='soup'>
                  <Field
                    name='spiciness_scale'
                    validate={requiredNumber(1, 10)}
                  >
                    {({ input, meta }) => {
                      return (
                        <div className='input__container'>
                          <label htmlFor='spiciness_scale'>Spiciness:</label>
                          <input
                            {...input}
                            type='number'
                            min='1'
                            max='10'
                            placeholder='1-10'
                            id='spiciness_scale'
                            className={
                              meta.error && meta.touched && 'input-error'
                            }
                          />
                          {meta.error && meta.touched && (
                            <span className='error__message'>{meta.error}</span>
                          )}
                        </div>
                      )
                    }}
                  </Field>
                </Condition>
                <Condition when='type' is='sandwich'>
                  <Field
                    name='slices_of_bread'
                    validate={requiredNumber(1, 100)}
                  >
                    {({ input, meta }) => {
                      return (
                        <div className='input__container'>
                          <label htmlFor='slices_of_bread'>
                            Number of slices of bread required:
                          </label>
                          <input
                            {...input}
                            type='number'
                            min='1'
                            max='100'
                            id='slices_of_bread'
                            placeholder='1-100'
                            className={
                              meta.error && meta.touched && 'input-error'
                            }
                          />
                          {meta.error && meta.touched && (
                            <span className='error__message'>{meta.error}</span>
                          )}
                        </div>
                      )
                    }}
                  </Field>
                </Condition>

                <Field
                  name='preparation_time'
                  parse={formatOnlyNumbersPreparationTime}
                  validate={requiredPreparation}
                >
                  {({ input, meta }) => {
                    return (
                      <div className='input__container'>
                        <label htmlFor='preparation_time'>
                          Preparation Time
                        </label>
                        <input
                          {...input}
                          type='text'
                          placeholder='00:00:00'
                          id='preparation_time'
                          className={
                            meta.error && meta.touched && 'input-error'
                          }
                        />
                        {meta.error && meta.touched && (
                          <span className='error__message'>{meta.error}</span>
                        )}
                      </div>
                    )
                  }}
                </Field>

                <div className='form__button-container'>
                  <button
                    type='submit'
                    disabled={submitting}
                    className='form__button form__button-submit'
                  >
                    Submit
                  </button>

                  <button
                    onClick={form.reset}
                    disabled={!dirty}
                    className='form__button form__button-clear'
                  >
                    Clear
                  </button>
                </div>
              </form>
            )}
          ></Form>
        </div>
      </div>
    </div>
  )
}

export default FormComponent
