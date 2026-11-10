import { useState } from 'react';
import styles from './Input.module.css';
import { Eye, EyeSlash } from '../../../assets/icons/Common/Common';

export const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  hint,
  required = false,
  disabled = false,
  readOnly = false,
  fullWidth = true,
  id,
  className = '',
  ...rest
}) => {

  const [showPassword, setShowPassword] = useState(false);

  const inputId = id || name || `input-${Math.random().toString(36).slice(2, 9)}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  const groupClasses = [
    styles.group,
    fullWidth ? styles.fullWidth : '',
    error ? styles.hasError : '',
    disabled ? styles.isDisabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={groupClasses}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-hidden="true"> *</span>}
        </label>
      )}

      <div className={styles.fieldWrapper}>
        <input
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
          className={`${styles.input} ${isPassword ? styles.hasEye : ''}`}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            tabIndex={-1}
          >
            {showPassword ? <EyeSlash /> : <Eye />}
          </button>
        )}

      </div>

      {hint && !error && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}

      {error && (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};