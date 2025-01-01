import { Metadata } from 'next'; // 4k (gzipped: 1.8k)
import FormSignIn from './form';
import { FC } from 'react';

interface SignInPageProps {}

export const metadata: Metadata = {
  title: 'Dashboard | Sign In'
};

const SignInPage: FC<SignInPageProps> = () => {
  return (
    <FormSignIn />
  );
};

export default SignInPage;