<img src='https://github.com/combiCaolan/eCompass/blob/main/assets/ecompassLogo.png'/>

# 👋 Welcome to eCompass!

**eCompass** is your secure, web-based platform for managing, editing, and viewing equipment parameter files—built especially for Combilift staff and partners. We’ve designed eCompass to make your job easier, while keeping your data safe and access tightly controlled through WordPress authentication.

---

## ✨ What Can eCompass Do for You?

- **Safe & Simple Login:** Log in with your WordPress account—no extra passwords to remember.
- **Easy File Management:** View, edit, and organize equipment parameter files from anywhere.
- **Always Up-to-Date:** eCompass automatically fetches fresh data when you’re online, and works offline by showing the most recent data it saved.
- **Your Access, Your Role:** Only see or edit what you’re allowed to—thanks to WordPress role management.
- **Modern, Intuitive Interface:** Enjoy a smooth experience on desktop, tablet, or mobile.

---

## 🚦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher works best)
- Access to your team’s WordPress login

### Quick Start

```bash
git clone https://github.com/combiCaolan/eCompass.git
cd eCompass
npm install
npm start
```
Now just open [http://localhost:3000](http://localhost:3000) in your browser!

---

## 🔐 How Authentication Works

eCompass uses your WordPress login to keep things simple and secure. All user roles and permissions are managed through WordPress, so you can trust that only the right people have access to sensitive files.

---

## 🗂️ Project Overview

```
eCompass/
├── public/           # Static images and assets
├── src/              # Main app code (components, hooks, utils)
├── package.json      # Project settings and dependencies
└── ...
```

---

## 🌍 Try eCompass Live

A live demo will be available soon at:  
[https://combiCaolan.github.io/eCompass/](https://combiCaolan.github.io/eCompass/)

---

## 🤝 Want to Contribute?

We’d love your help!  
Here’s how to get started:

1. Fork the repo and create a new branch:  
   `git checkout -b my-feature`
2. Make your changes and commit:  
   `git commit -am 'Add my feature'`
3. Push and open a pull request!

For more info, see our [contributing guide](docs/contributing.md).

---

## 🛡️ Security

If you spot a security issue, please contact the maintainers or your Combilift representative directly. Don’t post security issues publicly.

---

## 📚 Learn More

Check out our [docs folder](docs/) for setup help, troubleshooting, and more!

---

**© Combilift. All rights reserved.**
