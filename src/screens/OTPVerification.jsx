import { authService } from '../services/authService';

export default function OTPVerification() {
  const navigate = useNavigate();
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const email = sessionStorage.getItem('athpex_reset_email') || '';

  const inputRefs = useRef([]);

  // Countdown timer for Resend OTP
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle digit change and auto-advance focus
  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle Backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle Paste 6-digit OTP
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasteData)) {
      const digits = pasteData.split('');
      setOtp(digits);
      inputRefs.current[OTP_LENGTH - 1].focus();
    }
  };

  const handleResend = async () => {
    if (!canResend || !email) return;
    setOtp(new Array(OTP_LENGTH).fill(''));
    setTimer(45);
    setCanResend(false);
    setErrorMsg('');

    const res = await authService.resendOTP(email);
    if (!res.success) {
      setErrorMsg(res.error || 'Failed to resend OTP code.');
    }
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length < OTP_LENGTH) {
      setErrorMsg('Please enter all 6 digits of the OTP code.');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    const res = await authService.verifyOTP(email, fullOtp);
    setLoading(false);

    if (res.success) {
      if (res.resetToken) {
        sessionStorage.setItem('athpex_reset_token', res.resetToken);
      }
      setIsVerified(true);
      setTimeout(() => {
        navigate('/reset-password');
      }, 1200);
    } else {
      setErrorMsg(res.error || 'Invalid or expired OTP code.');
    }
  };

  return (
    <>
      <InnerBanner title="OTP Verification" />

      <section className="otp-section py-20 bg-black text-white">
        <div className="container">
          <div className="max-w-md mx-auto">
            <div className="bg-[#0b0b0e] border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl relative">
              {/* Back Link */}
              <Link
                to="/forgot-password"
                className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white mb-6 font-sans transition-colors"
              >
                <AiOutlineArrowLeft /> Back to Reset Request
              </Link>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#98B4E7] text-2xl mx-auto mb-3">
                  <AiOutlineSafety />
                </div>
                <span className="tagline text-xs text-[#98B4E7] block mb-2 font-semibold">
                  ONE-TIME PASSWORD
                </span>
                <h2 className="h2-dine text-white text-2xl md:text-3xl">Verify OTP Code</h2>
                <p className="text-xs md:text-sm text-neutral-400 font-sans mt-2">
                  We've sent a 6-digit security code to your email. Enter the code below to proceed.
                </p>
              </div>

              {!isVerified ? (
                <form onSubmit={handleVerify} className="flex flex-col gap-6">
                  {errorMsg && (
                    <div className="bg-red-950/50 border border-red-800/80 rounded-xl p-3 text-xs text-red-400 text-center">
                      {errorMsg}
                    </div>
                  )}

                  {/* 6 OTP Input Boxes */}
                  <div className="flex justify-center gap-2 md:gap-3" onPaste={handlePaste}>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-11 h-13 md:w-12 md:h-14 bg-neutral-900 border border-neutral-800 focus:border-[#98B4E7] text-white text-xl md:text-2xl font-bold font-mono text-center rounded-xl focus:outline-none transition-all shadow-inner"
                      />
                    ))}
                  </div>

                  {/* Resend Timer */}
                  <div className="text-center text-xs text-neutral-400 font-sans">
                    {canResend ? (
                      <button
                        type="button"
                        onClick={handleResend}
                        className="text-[#98B4E7] font-semibold hover:underline cursor-pointer"
                      >
                        Resend OTP Code
                      </button>
                    ) : (
                      <span>
                        Resend OTP code in <strong className="text-white font-mono">{timer}s</strong>
                      </span>
                    )}
                  </div>

                  {/* Verify Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-full justify-center py-3.5 text-sm font-semibold tracking-wider cursor-pointer shadow-lg shadow-blue-500/20"
                  >
                    VERIFY OTP CODE
                  </button>
                </form>
              ) : (
                /* Verification Success State */
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 text-3xl mx-auto mb-4 animate-bounce">
                    <AiOutlineCheckCircle />
                  </div>
                  <h3 className="h3-dine text-white text-xl mb-2">OTP Code Verified!</h3>
                  <p className="text-xs text-neutral-400 font-sans">
                    Redirecting to set your new password...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
