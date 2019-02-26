import styled from 'styled-components';
import SignupForm from '../components/SignupForm';
import SigninForm from '../components/SigninForm';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20;
`;
const Signup = props => (
  <Columns>
    <SignupForm />
    <SigninForm />
    <SignupForm />
  </Columns>
);
export default Signup;
