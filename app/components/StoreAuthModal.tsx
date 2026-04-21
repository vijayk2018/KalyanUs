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
  const [signupPassword, setSignupPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);
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

  return (
    <div className="fixed flex justify-center items-center inset-0 z-[100] bg-black/50 p-4">
      <div className="mx-auto  w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-2xl relative">

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
            <div className="grid md:grid-cols-2">
              <div className="hidden md:block">
                <img src={LoginImage} alt="Login banner" className="h-full w-full object-cover" />
              </div>

              <div className="px-6 pb-8 md:px-10  pt-8">
                <h2 className="text-3xl text-[#b80f47] font-light mb-5">Login</h2>
                <p className="text-[12px] text-gray-500 mb-6 pb-3">
                  To enjoy a seamless experience while shopping
                  <div className='px-5 border-b border-[#b80f47] w-[6rem] mt-3 '></div>
                </p>
                <Form method="get" action="/account/login">
                  <input
                    type="text"
                    name="login_hint"
                    value={loginHint}
                    onChange={(event) => {
                      setLoginHint(event.target.value);
                      if (inlineError) setInlineError('');
                    }}
                    placeholder="Enter E Mail / Mobile number"
                    className="w-full rounded border border-gray-200 placeholder:text-gray-200 px-4 py-3 text-sm outline-none mb-4"
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
                  <button type="submit" className="w-full bg-[#cf254a] py-3 text-sm font-semibold text-white"
                    onClick={(event) => {
                        if (!normalizedLoginHint) {
                          event.preventDefault();
                          setInlineError('Please enter Email ID or Mobile number');
                        }
                      }}
                  >
                    CONTINUE
                  </button>
                </Form>
                <div className="my-7 flex items-center">
                  <div className="h-px flex-1 bg-[#d0d4e2]" />
                  <span className="px-3 text-2xl text-[#5f678b]">OR</span>
                  <div className="h-px flex-1 bg-[#d0d4e2]" />
                </div>
                <button type="button" className="flex items-center gap-3 justify-center w-full rounded border border-gray-200 py-3 text-sm text-gray-700"
                  onClick={`/account/login?acr_values=provider:google&return_to=${encodeURIComponent(returnTo)}`}>
                  <img src={GoogleImg} alt="Login banner" className="h-3 w-3 object-cover" /> <span>Login Using Google</span>
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
          <div className="grid md:grid-cols-2">
            <div className="hidden md:block">
              <img src={Register} alt="Signup banner" className="h-full w-full object-contain" />
            </div>
            <div className="px-6 pb-8 md:px-10 pt-8 mt-8">

              <div className="space-y-4">
                <input type="text" placeholder="Enter Full Name" value={signupName}
                    onChange={(event) => setSignupName(event.target.value)} className="w-full rounded border border-[#d8dff5] placeholder:text-gray-200 px-4 py-3 outline-none" />
                <input type="email" placeholder="Email" value={signupEmail}
                    onChange={(event) => setSignupEmail(event.target.value)} className="w-full rounded border border-[#d8dff5] placeholder:text-gray-200 px-4 py-3 outline-none" />
                <div className="grid grid-cols-[100px_1fr] gap-0">
                  <input
                    type="text"
                    defaultValue="+1"
                    className="py-3 px-4 rounded-l-md border border-r-0 border-[#d8dceb] text-lg outline-none focus:border-[#cf254a]"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={signupPhone}
                    onChange={(event) => setSignupPhone(event.target.value)}
                    placeholder="Phone"
                    className="py-3 px-4 rounded-r-md border border-[#d8dceb] text-lg outline-none focus:border-[#cf254a]"
                  />
                  
                </div>
                <input
                  type="password"
                  name="password"
                  value={signupPassword}
                  onChange={(event) => setSignupPassword(event.target.value)}
                  placeholder="Create Password"
                  className="h-14 w-full rounded-md border border-[#d8dceb] px-4 text-lg outline-none focus:border-[#cf254a]"
                />
              </div>
              <label className="mt-5 flex items-center gap-2 text-[12px] text-gray-600">
                <input
                  type="checkbox"
                  name="accept_terms"
                  checked={acceptTerms}
                  onChange={(event) => setAcceptTerms(event.target.checked)}
                  className="h-4 w-4 accent-[#cf254a]"
                />
                <p>I agree to the <span className='text-[#cf254a]'>Terms of Use</span> & <span className='text-[#cf254a]'>Privacy Policy</span></p>
              </label>
              <button type="button" className="mt-6 w-full bg-[#cf254a] py-3 text-sm font-semibold text-white">
                SEND OTP
              </button>
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
      {inlineError ? (
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-60 w-[min(92vw,560px)] -translate-x-1/2 rounded-md bg-[#fb6262] px-5 py-3 text-center text-[18px] text-white shadow-xl">
          {inlineError}
        </div>
      ) : null}
    </div>
  );
}
