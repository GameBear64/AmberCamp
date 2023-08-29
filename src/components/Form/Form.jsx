import { Form } from 'react-final-form';
export default function FormInputs(props) {
  return (
    <Form onSubmit={props.onSubmit} render={({ handleSubmit }) => <form onSubmit={handleSubmit}>{props.children}</form>}></Form>
  );
}
