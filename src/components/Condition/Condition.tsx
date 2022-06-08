import { Field } from 'react-final-form'

interface Props {
  when: string
  is: string
  children: React.ReactNode
}

const Condition: React.FC<Props> = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
)

export default Condition
