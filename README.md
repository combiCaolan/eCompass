<img src='https://github.com/combiCaolan/eCompass/blob/main/assets/ecompassLogo.png'/>

# eCompass

eCompass is a web-based application for managing, configuring, and activating parameters for Combilift vehicles. It provides a user-friendly interface for loading, editing, and saving parameter files, as well as activating special modules using MoCAS codes.

---

## Features

- Parameter file management (`.clp` files)
- MoCAS module activation (e.g., Work Lights, Hourmeters)
- Special parameter blocks (MoCAS, Full Passwords)
- User management and access control
- Multi-language parameter descriptions
- Restore factory defaults
- Dialog system for user interactions

---

## Project Structure

```
eCompass/
│
├── assets/
│   ├── css/
│   ├── js/
│   ├── icons/
│   ├── Truck_Images/
│   └── Combilift-Logo.png
│
├── includes/
│   ├── Api-Make-Backend.php
│   ├── Dialog.html
│   ├── headContents.html
│   └── ...
│
├── MoCAS/
│
├── Settings-files/
│   ├── API-100/
│   │   └── english/
│   │       └── Description_Main.txt
│   └── API-101/
│       └── english/
│           └── Description_Main.txt
│
├── SpecialBlocks/
│
├── Truck_Default_Files/
│
├── Download.php
├── Download1.php
├── editor.php
├── frontpage.php
├── index.php
├── README.md
└── UnsupportedBrowserCheck.js```

---

## Getting Started

### Prerequisites

- Web server with PHP (e.g., Apache, Nginx)
- Modern web browser

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-org/eCompass.git
   ```
2. **Deploy files to your web server's root directory.**
3. **Access the app:**  
   Open your browser and go to `http://localhost/eCompass/frontpage.php` (or your server’s URL).

---

## Usage

- **Load Parameter File:** Open a `.clp` file via the interface.
- **Edit Parameters:** Make changes as needed.
- **Activate Modules:** Use the Special Blocks dialog.
- **Save:** Download or save the updated file.

---

## Customization

- **Add Parameters:** Edit `Description_Main.txt` in the relevant `Settings-files` folder.
- **Add Modules:** Update `SpecialBlocks/` and related JS logic.

---

## Contributing

Pull requests and issues are welcome!

---

## License

MIT License

---

## Contact

For support, use the in-app dialog or email support@combilift.com.
