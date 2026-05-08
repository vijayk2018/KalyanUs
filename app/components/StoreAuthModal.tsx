import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router';
import PhoneInput from 'react-phone-input-2';
import LoginImage from '../assets/Sign-in.jpg'
import Register from '../assets/regiteer.png'
import GoogleImg from '../assets/google.svg';

interface StoreAuthModalProps {
  open: boolean;
  onClose: () => void;
}

type AuthView = 'login' | 'signup';

export default function StoreAuthModal({ open, onClose }: StoreAuthModalProps) {
  const [activeView, setActiveView] = useState<AuthView>('login');
  const [loginHint, setLoginHint] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [inlineError, setInlineError] = useState('');
  const [returnTo, setReturnTo] = useState('/');
  const [isLoginChecking, setIsLoginChecking] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    terms: ''
  });

  const normalizedLoginHint = loginHint.trim();

  useEffect(() => {
    if (!open) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || typeof window === 'undefined') return;
    setReturnTo(
      `${window.location.pathname}${window.location.search}${window.location.hash}`,
    );
    const params = new URLSearchParams(window.location.search);
    const authError =
      params.get('error_description') ||
      params.get('error') ||
      params.get('customerAccountError');

    if (authError) {
      setInlineError(decodeURIComponent(authError).replace(/\+/g, ' '));
    }
  }, [open]);

  if (!open) return null;

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoginChecking) return;

    const email = normalizedLoginHint.toLowerCase();

    if (!email) {
      setInlineError('Please enter Email ID');
      return;
    }

    if (!isValidEmail(email)) {
      setInlineError('Please enter valid Email ID/Mobile number');
      return;
    }

    try {
      setInlineError('');
      setIsLoginChecking(true);

      const response = await fetch('/api/customer-exists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        exists?: boolean;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        setInlineError(result.error || 'Unable to verify account. Please try again.');
        return;
      }

      if (!result.exists) {
        setInlineError('Account not found. Please sign up first.');
        return;
      }

      const nextUrl = `/account/login?login_hint=${encodeURIComponent(
        email,
      )}&login_hint_mode=submit&return_to=${encodeURIComponent(returnTo)}`;
      window.location.href = nextUrl;
    } catch {
      setInlineError('Unable to verify account. Please try again.');
    } finally {
      setIsLoginChecking(false);
    }
  };

  const handleSignupSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const newErrors = {
      name: !signupName.trim() ? 'This field is required' : '',
      email: !signupEmail.trim() ? 'This field is required' : (isValidEmail(signupEmail.trim()) ? '' : 'Please enter a valid email address.'),
      phone: !signupPhone.trim() ? 'This field is required' : '',
      terms: !acceptTerms ? 'Please accept Terms of Use and Privacy Policy.' : ''
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.phone || newErrors.terms) {
      event.preventDefault();
      return;
    }
  };

  return (
    <div className="fixed flex justify-center items-center inset-0 z-[100] bg-black/50 p-4">
      <div className="mx-auto w-full max-w-[834px] overflow-hidden rounded-lg bg-white shadow-2xl relative">

        <div className="absolute top-0 right-0 p-3">
          <button
            type="button"
            onClick={onClose}
            className="text-[#8aa1d8]"
            aria-label="Close auth popup"
          >
            <X size={26} />
          </button>
        </div>

        {activeView === 'login' ? (
          <div className="grid md:grid-cols-[397px_1fr]">
            <div className="hidden md:block">
              <img src={LoginImage} alt="Login banner" className="h-full w-full object-cover " />
            </div>

            <div className="px-6 pb-8 md:px-10  pt-8">
              <h2 className="text-3xl text-[#cf254a] font-helvetica-light mt-4 mb-5">Login</h2>
              <p className="text-[15px] text-gray-400 font-helvetica-light mb-6 pb-3">
                To enjoy a seamless experience while shopping
                <div className='px-7 border-b border-[#cf254a] w-[6rem] mt-3 '></div>
              </p>
              <form onSubmit={handleLoginSubmit}>
                <input
                  type="text"
                  name="login_hint"
                  value={loginHint}
                  onChange={(event) => {
                    setLoginHint(event.target.value);
                    if (inlineError) setInlineError('');
                  }}
                  placeholder="Enter E-Mail ID / Mobile number"
                  className={`w-full rounded border border-gray-200 placeholder:text-gray-300 px-5 py-5 text-base outline-none focus:outline-none focus:border-gray-200 focus:ring-0 ${inlineError ? 'mb-1' : 'mb-6'}`}
                />
                {inlineError && (
                  <p className="text-[11px] text-red-500 mb-4">{inlineError}</p>
                )}
                <input
                  type="hidden"
                  name="login_hint_mode"
                  value="submit"
                />
                <input
                  type="hidden"
                  name="return_to"
                  value={returnTo}
                />
                <button type="submit" className="w-full bg-[#cf254a] py-4 text-base font-semibold text-white uppercase tracking-wider"
                  disabled={isLoginChecking}
                >
                  {isLoginChecking ? 'PLEASE WAIT...' : 'CONTINUE'}
                </button>
              </form>
              <div className="my-7 flex items-center">
                <div className="h-px flex-1 bg-[#d0d4e2]" />
                <span className="px-3 text-2xl text-[#5f678b]">OR</span>
                <div className="h-px flex-1 bg-[#d0d4e2]" />
              </div>
              <button type="button" className="flex items-center gap-3 justify-center w-full rounded border border-gray-200 py-4 text-base text-gray-700"
                onClick={() => {
                  window.location.href = `/account/login?acr_values=provider:google&return_to=${encodeURIComponent(returnTo)}`;
                }}>
                <img src={GoogleImg} alt="Google" className="h-5 w-5 object-contain" /> <span>Login Using Google</span>
              </button>
              <p className="mt-6 text-center text-sm text-gray-500">
                Do not have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setInlineError('');
                    setActiveView('signup');
                  }}
                  className="font-semibold text-[#cf254a]"
                >
                  SIGN UP
                </button>
              </p>

            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-[397px_1fr]">
            <div className="hidden md:block overflow-hidden">
              <img src={Register} alt="Signup banner" className="h-full w-full object-cover object-center scale-[1.02]" />
            </div>
            <div className="pl-6 pr-6 pb-8 md:pl-10 md:pr-6 flex flex-col pt-25">
              <form
                method="post"
                action="/account/register"
                onSubmit={handleSignupSubmit}
              >
                <div className="space-y-4">
                  <div className="w-full">
                    <input
                      type="text"
                      name="full_name"
                      placeholder="Enter Full Name"
                      value={signupName}
                      onChange={(event) => {
                        setSignupName(event.target.value);
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`w-full h-[56px] rounded border border-gray-200 placeholder:text-gray-300 px-5 outline-none focus:outline-none focus:border-gray-200 focus:ring-0 ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div className="w-full">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={signupEmail}
                      onChange={(event) => {
                        setSignupEmail(event.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full h-[56px] rounded border border-gray-200 placeholder:text-gray-300 px-5 outline-none focus:outline-none focus:border-gray-200 focus:ring-0 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  <div className="relative w-full">
                    <p className='text-[#6e7191] bg-white text-[12px] absolute -top-2.5 left-2 z-10 px-1'>Mobile No.</p>
                    <PhoneInput
                      country={'us'}
                      value={signupPhone}
                      onChange={(value) => {
                        setSignupPhone(value);
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      specialLabel=""
                      inputProps={{
                        name: 'phone',
                        required: true,
                      }}
                      containerStyle={{
                        width: '100%',
                      }}
                      inputStyle={{
                        width: '100%',
                        height: '56px',
                        fontSize: '14px',
                        borderRadius: '6px',
                        border: errors.phone ? '1px solid #ef4444' : '1px solid #e5e7eb',
                      }}
                      buttonStyle={{
                        borderTopLeftRadius: '6px',
                        borderBottomLeftRadius: '6px',
                        border: errors.phone ? '1px solid #ef4444' : '1px solid #e5e7eb',
                        backgroundColor: '#fff',
                      }}
                    />
                    {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <input type="hidden" name="return_to" value={returnTo} />
                <div className="mt-10">
                  <div className="flex items-center gap-2 text-[12px] text-gray-600">
                    <input
                      type="checkbox"
                      name="accept_terms"
                      checked={acceptTerms}
                      onChange={(event) => {
                        setAcceptTerms(event.target.checked);
                        if (errors.terms) setErrors({ ...errors, terms: '' });
                      }}
                      className="h-4 w-4 accent-[#cf254a]"
                    />
                    <p>
                      I agree to the{' '}
                      <Link
                        to="/terms-and-conditions"
                        onClick={onClose}
                        className="text-[#cf254a] underline underline-offset-2"
                      >
                        Terms of Use
                      </Link>{' '}
                      &{' '}
                      <Link
                        to="/privacy-policy"
                        onClick={onClose}
                        className="text-[#cf254a] underline underline-offset-2"
                      >
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                  {errors.terms && <p className="text-[11px] text-red-500 mt-1">{errors.terms}</p>}
                </div>
                <button type="submit" className="mt-20 w-full bg-[#cf254a] py-4 text-base font-semibold text-white uppercase tracking-wider">
                  SEND OTP
                </button>
              </form>
              <p className="mt-6 text-center text-sm text-gray-500">
                Already a member with us?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setInlineError('');
                    setActiveView('login');
                  }}
                  className="font-semibold text-[#cf254a]"
                >
                  LOGIN
                </button>
              </p>
            </div>
          </div>
        )}

      </div>
      {inlineError && activeView === 'signup' ? (
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-60 w-[min(92vw,560px)] -translate-x-1/2 rounded-md bg-[#fb6262] px-5 py-3 text-center text-[18px] text-white shadow-xl">
          {inlineError}
        </div>
      ) : null}
    </div>
  );
}
