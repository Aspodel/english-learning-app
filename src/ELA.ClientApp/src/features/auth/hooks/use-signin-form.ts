import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    .regex(/(?=.*\d)/, 'Password must contain at least one number')
    .regex(
      /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])/,
      'Password must contain at least one special character'
    ),
});

export type formSchemaType = z.infer<typeof formSchema>;

export function useSigninForm() {
  const initialValues: formSchemaType = {
    username: '',
    password: '',
  };

  const form = useForm<formSchemaType>({
    defaultValues: initialValues,
    resolver: zodResolver(formSchema),
  });

  return { form };
}
