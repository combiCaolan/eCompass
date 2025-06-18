# 🔒 Security Guidelines for eCompass

Welcome to the security documentation for **eCompass**. Keeping your data and our users safe is a top priority. This guide explains how security is managed throughout the application, best practices to follow, and what to do if you spot a vulnerability.

---

## 1. Overview

eCompass is designed for secure management of sensitive equipment parameter files. We use industry best practices to safeguard user data, ensure only authorized access, and protect against common vulnerabilities.

---

## 2. Authentication & Authorization

- **WordPress Integration:**  
  All user authentication and role management is handled via our connected WordPress instance. Only authenticated users with appropriate roles (e.g., admin, editor, viewer) can access or modify sensitive data.
- **Session Management:**  
  Sessions are managed securely via WordPress. Never share your credentials or session tokens.

---

## 3. Data Protection

- **HTTPS Required:**  
  All traffic between your browser, the frontend, and backend services must use HTTPS.
- **Sensitive Data:**  
  Equipment parameter files and user information are never exposed to unauthorized users.
- **Local Storage:**  
  Only non-sensitive, minimal data (such as UI preferences) is stored locally in the browser. Sensitive tokens or credentials are never stored in local storage.

---

## 4. Secrets & Credentials

- **Environment Variables:**  
  All secrets (API keys, service passwords, etc.) must be stored as environment variables—never hard-coded or committed to the repository.
- **.env Files:**  
  Use a `.env.example` file to document required environment variables. Never commit real `.env` files.

---

## 5. Common Vulnerabilities & Mitigations

- **XSS (Cross-Site Scripting):**  
  - All user input is sanitized and escaped before rendering.
- **CSRF (Cross-Site Request Forgery):**  
  - All sensitive actions are protected by CSRF tokens or WordPress nonce mechanisms.
- **CORS (Cross-Origin Resource Sharing):**  
  - CORS policies are set to only allow trusted origins.

---

## 6. Dependencies

- **Keeping Up to Date:**  
  We use automated tools like `npm audit` and Dependabot to monitor for vulnerable dependencies.
- **Review Before Adding:**  
  All new third-party packages must be reviewed for security and maintenance status.

---

## 7. Reporting Security Issues

If you discover a security issue:

1. **Do not** open a public GitHub issue.
2. Contact the project maintainers or your Combilift representative directly.
3. Provide detailed information about the vulnerability and steps to reproduce.

We appreciate your help in keeping eCompass secure!

---

## 8. Compliance & Best Practices

- Follow all Combilift IT security and data privacy policies.
- Peer review is required for all code changes, especially those affecting authentication, authorization, or data handling.
- No sensitive data (user info, equipment files) should be committed to the repository.

---

## 9. Further Resources

- [WordPress Security Documentation](https://wordpress.org/documentation/article/hardening-wordpress/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.dev/learn/nodejs-security-best-practices)

---

**Thank you for helping us keep eCompass safe and secure!**
