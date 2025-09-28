import { Footer } from '@/app/ui/footer.jsx';
import { Header } from '@/app/ui/header.jsx';
import { FormControl } from '@/app/ui/form-control';
import styles from './styles/sellers.module.scss';
import { registerSeller } from '../lib/actions';

export default function Sellers() {
  return (
    <div>
      <Header />

      <main className={styles.container}>
      {/* <picture className={styles.banner}>
        <source srcSet="/images/banner-form-desktop.webp" media="(min-width: 1024px)" />
        <source srcSet="/images/banner-form-desktop.webp" media="(min-width: 768px)" />
        <img src="/images/banner-form.webp" alt="banner" className={styles.bannerImage} />
      </picture> */}

      <h1 className={styles.title}>Apply as a Seller</h1>
      <p className={styles.subtitle}>
        Create your account and tell us about your craft. We’ll review and get back to you.
      </p>

      <form action={registerSeller} id="sellerSignupForm" className={styles.form}>
        {/* Account */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Account</legend>

          <div className={styles.grid2}>
            <FormControl label="Email *" id="email" name="email" type="email" required autoComplete="email" />
            <FormControl label="Username (optional)" id="username" name="username" type="text" autoComplete="username" />
          </div>

          <div className={styles.grid2}>
            <FormControl
              label="Password *"
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              placeholder="At least 8 characters"
              minLength={8}
            />
            <FormControl
              label="Confirm Password *"
              id="confirm"
              name="confirm"
              type="password"
              required
              autoComplete="new-password"
            />
          </div>
        </fieldset>

        {/* Business profile */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Basic Company Information</legend>

          <FormControl label="Brand / Shop Name *" id="company-name" name="company-name" required />

          <div className={styles.grid3}>
            <FormControl label="Website or Social" id="website" name="website" type="url" placeholder="https://…" />
            <FormControl
              label="Main Sector *"
              id="sector"
              name="sector"
              required
              placeholder="e.g., Handmade jewelry, Leather, Woodwork"
            />
          </div>

        </fieldset>

        {/* Primary contact */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Primary Contact</legend>

          <div className={styles.grid3}>
            <FormControl label="Full Name *" id="contact-name" name="contact-name" required autoComplete="name" />
            <FormControl label="Contact Phone *" id="contact-phone" name="contact-phone" type="tel" required />
          </div>
        </fieldset>

        <div className={styles.termsRow}>
          <input id="terms" name="terms" type="checkbox" required className={styles.checkbox} />
          <label htmlFor="terms" className={styles.termsText}>
            I agree to the <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.
          </label>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitBtn}>Create account & Apply</button>
        </div>
      </form>
    </main>
        
      <Footer />
    </div>
  );
}