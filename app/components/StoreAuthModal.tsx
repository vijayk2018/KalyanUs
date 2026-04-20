import {useEffect, useState} from 'react';
import {X} from 'lucide-react';
import {Form} from 'react-router';
import LoginImage from '../assets/Sign-in.jpg'
import Register from '../assets/regiteer.png'
import GoogleImg from '../assets/google.svg';

interface StoreAuthModalProps {
  open: boolean;
  onClose: () => void;
}

type AuthView = 'login' | 'signup';

export default function StoreAuthModal({open, onClose}: StoreAuthModalProps) {
  const [activeView, setActiveView] = useState<AuthView>('login');
  const [loginHint, setLoginHint] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [inlineError, setInlineError] = useState('');
  const [returnTo, setReturnTo] = useState('/');

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
    setReturnTo(`${window.location.origin}/`);
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

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label="Close store login popup"
      />
      <div className="relative flex min-h-full items-center justify-center p-4">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-lg bg-[#f8f8f8] shadow-2xl lg:grid-cols-[48%_52%]">
          <div
            className={`relative h-full text-white`}
          >
            {activeView === 'login' ? (
              <div className="mt-auto flex h-full flex-col">
                <img src={LoginImage} alt="Login" className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="mt-auto flex h-full flex-col">
                <img src={Register} alt="Register" className="h-full w-full object-cover" />
              </div>
            )}
          </div>

          <div className="relative p-7 lg:p-10">
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-3 text-[#737ca0] hover:text-[#4f5678]"
              aria-label="Close popup"
            >
              <X size={28} />
            </button>

            {activeView === 'login' ? (
              <div className="mt-8">
                <h2 className="text-4xl font-light text-[#cf254a]">Login</h2>
                <p className="mt-4 text-[18px] text-[#70789a]">
                  To enjoy a seamless experience while shopping
                </p>
                <div className="mt-3 h-[2px] w-28 bg-[#cf254a]" />

                <Form method="get" action="/account/login">
                  <input
                    type="text"
                    name="login_hint"
                    value={loginHint}
                    onChange={(event) => {
                      setLoginHint(event.target.value);
                      if (inlineError) setInlineError('');
                    }}
                    placeholder="Enter E-Mail ID / Mobile number"
                    className="mt-12 h-14 w-full rounded-md border border-[#d8dceb] px-4 text-lg outline-none focus:border-[#cf254a]"
                    required
                  />
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
                  <button
                    type="submit"
                    onClick={(event) => {
                      if (!normalizedLoginHint) {
                        event.preventDefault();
                        setInlineError('Please enter Email ID or Mobile number');
                      }
                    }}
                    className="mt-8 h-14 w-full rounded-md bg-[#cf254a] text-[20px] font-semibold tracking-[0.06em] text-white"
                  >
                    CONTINUE
                  </button>
                </Form>

                <div className="my-7 flex items-center">
                  <div className="h-px flex-1 bg-[#d0d4e2]" />
                  <span className="px-3 text-2xl text-[#5f678b]">OR</span>
                  <div className="h-px flex-1 bg-[#d0d4e2]" />
                </div>

                <a
                  href={`/account/login?acr_values=provider:google&return_to=${encodeURIComponent(returnTo)}`}
                  className="h-14 w-full flex items-center justify-center rounded-md border border-[#d8dceb] text-[20px] text-[#6e7596] no-underline"
                >
                  <img src={GoogleImg} alt="Google" className="mr-2" />
                  <span>Login using Google</span>
                </a>

                <p className="mt-9 text-center text-[20px] text-[#6e7596]">
                  Do not have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setInlineError('');
                      setActiveView('signup');
                    }}
                    className="font-medium text-[#cf254a]"
                  >
                    SIGN UP
                  </button>
                </p>
              </div>
            ) : (
              <div className="mt-8">
                <div className="space-y-4">
                  <input
                    type="text"
                    value={signupName}
                    onChange={(event) => setSignupName(event.target.value)}
                    placeholder="Enter Full Name"
                    className="h-14 w-full rounded-md border border-[#d8dceb] px-4 text-lg outline-none focus:border-[#cf254a]"
                  />
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(event) => setSignupEmail(event.target.value)}
                    placeholder="Email"
                    className="h-14 w-full rounded-md border border-[#d8dceb] px-4 text-lg outline-none focus:border-[#cf254a]"
                  />
                  <div className="grid grid-cols-[100px_1fr] gap-0">
                    <input
                      type="text"
                      defaultValue="+1"
                      className="h-14 rounded-l-md border border-r-0 border-[#d8dceb] px-3 text-lg outline-none focus:border-[#cf254a]"
                    />
                    <input
                      type="tel"
                      value={signupPhone}
                      onChange={(event) => setSignupPhone(event.target.value)}
                      placeholder="Phone"
                      className="h-14 rounded-r-md border border-[#d8dceb] px-4 text-lg outline-none focus:border-[#cf254a]"
                    />
                  </div>
                </div>

                <label className="mt-8 flex items-center gap-2 text-[20px] text-[#5f678b]">
                  <input type="checkbox" className="h-4 w-4 accent-[#cf254a]" defaultChecked />
                  <span>
                    I agree to the <span className="text-[#cf254a]">Terms of Use</span> &{' '}
                    <span className="text-[#cf254a]">Privacy Policy</span>
                  </span>
                </label>

                <Form method="get" action="/account/login">
                  <input
                    type="hidden"
                    name="login_hint"
                    value={signupEmail.trim() || signupPhone.trim()}
                  />
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
                  <button
                    type="submit"
                    onClick={(event) => {
                      const signupHint = signupEmail.trim() || signupPhone.trim();
                      if (!signupName.trim() || !signupHint) {
                        event.preventDefault();
                        setInlineError('Please fill required signup details');
                      } else {
                        setInlineError('');
                      }
                    }}
                    className="mt-8 h-14 w-full rounded-md bg-[#cf254a] text-[20px] font-semibold tracking-[0.06em] text-white"
                  >
                    SEND OTP
                  </button>
                </Form>

                <p className="mt-8 text-center text-[20px] text-[#6e7596]">
                  Already a member with us?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setInlineError('');
                      setActiveView('login');
                    }}
                    className="font-medium text-[#cf254a]"
                  >
                    LOGIN
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {inlineError ? (
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-60 w-[min(92vw,560px)] -translate-x-1/2 rounded-md bg-[#fb6262] px-5 py-3 text-center text-[18px] text-white shadow-xl">
          {inlineError}
        </div>
      ) : null}
    </div>
  );
}
