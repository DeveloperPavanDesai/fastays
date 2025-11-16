import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';

export default function Index() {
  const router = useRouter();
  const { isOtpVerified } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOtpVerified) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [isOtpVerified, router]);

  return null;
}