interface InputInterface {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  icon: string;
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  showPassword?: boolean; // ✅ Added
  togglePassword?: () => void; // ✅ Added
  rightElement?: React.ReactNode;
  children?: React.ReactNode;
}

export const Input = ({
  label,
  name,
  type,
  placeholder,
  icon,
  form,
  handleChange,
  error,
  showPassword,
  togglePassword,
  rightElement,
  children,
}: InputInterface) => {
  const isPassword = type === 'password';

  return (
    <div className="flex flex-col gap-1.5">
      <label className="section-label">{label}</label>

      <div
        className={`flex items-center gap-3 px-4 h-11 rounded-xl border bg-[#0D1017] transition-all duration-200 focus-within:border-[rgba(0,229,255,0.3)] ${
          error ? 'border-[rgba(255,59,92,0.4)]' : 'border-[#1A2030]'
        }`}
      >
        <img
          src={icon}
          className="w-4 h-4 shrink-0"
          alt={name}
          style={{ filter: 'invert(0.35)' }}
        />

        <input
          type={isPassword && showPassword ? 'text' : type}
          name={name}
          value={form[name] || ''}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete={name}
          className="flex-1 bg-transparent text-white text-sm placeholder-[#3A4155] outline-none font-['Barlow',sans-serif]"
        />

        {/* Password toggle button */}
        {isPassword && togglePassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="shrink-0 opacity-40 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img
              src={
                showPassword
                  ? 'https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/eye-off.svg'
                  : 'https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/eye.svg'
              }
              className="w-4 h-4"
              alt="toggle password"
              style={{ filter: 'invert(1)' }}
            />
          </button>
        )}

        {/* Any additional right element */}
        {rightElement}
      </div>

      {children}

      {error && <span className="text-[#FF3B5C] text-xs pl-1">{error}</span>}
    </div>
  );
};
