'use client'

import styles from '@styles/crud-form.module.scss';

interface FormControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  className?: string;
}

export function FormControl({ id, label, className, ...rest }: FormControlProps) {
  return (
    <div className={styles.control}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input 
        id={id} 
        className={`${styles.input} ${className || ''}`} 
        {...rest} 
      />
    </div>
  );
}