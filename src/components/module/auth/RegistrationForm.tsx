'use client';

import InputFieldError from '@/components/shared/InputFieldError';
import {Button} from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import {Input} from '@/components/ui/input';
import {registerUser} from '@/services/auth/registerUser';
import {useActionState, useEffect} from 'react';
import {toast} from 'sonner';

export default function RegistrationForm() {
    const [state, formAction, isPending] = useActionState(registerUser, null);

    useEffect(() => {
        if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state]);
    return (
        <form action={formAction}>
            <FieldGroup>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/* Name */}
                    <Field>
                        <FieldLabel htmlFor='name'>Full Name</FieldLabel>
                        <Input
                            id='name'
                            name='name'
                            type='text'
                            placeholder='John Doe'
                        />
                        <InputFieldError field='name' state={state} />
                    </Field>
                    {/* Location */}
                    <Field>
                        <FieldLabel htmlFor='location'>Location</FieldLabel>
                        <Input
                            id='location'
                            name='location'
                            type='text'
                            placeholder='123 Main St'
                        />
                        <InputFieldError field='location' state={state} />
                    </Field>
                    {/* Email */}
                    <Field>
                        <FieldLabel htmlFor='email'>Email</FieldLabel>
                        <Input
                            id='email'
                            name='email'
                            type='email'
                            placeholder='m@example.com'
                        />

                        <InputFieldError field='email' state={state} />
                    </Field>
                    {/* Password */}
                    <Field>
                        <FieldLabel htmlFor='password'>Password</FieldLabel>
                        <Input id='password' name='password' type='password' />

                        <InputFieldError field='password' state={state} />
                    </Field>
                    {/* Confirm Password */}
                    <Field className='md:col-span-2'>
                        <FieldLabel htmlFor='confirmPassword'>
                            Confirm Password
                        </FieldLabel>
                        <Input
                            id='confirmPassword'
                            name='confirmPassword'
                            type='password'
                        />

                        <InputFieldError
                            field='confirmPassword'
                            state={state}
                        />
                    </Field>
                </div>
                <FieldGroup className='mt-4'>
                    <Field>
                        <Button type='submit' disabled={isPending}>
                            {isPending
                                ? 'Creating Account...'
                                : 'Create Account'}
                        </Button>

                        <FieldDescription className='px-6 text-center'>
                            Already have an account?{' '}
                            <a
                                href='/login'
                                className='text-blue-600 hover:underline'
                            >
                                Sign in
                            </a>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
}
