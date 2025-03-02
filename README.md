# Resume Scanner App

This web application is designed to help users analyze and improve their resumes. It scans the content of a resume to check for missing sections, formatting issues, grammar mistakes, and keyword matching for job descriptions.

## Features

### 1️⃣ **Bullet Points & Contact Information Check**
- ✔ **Bullet Points in Work Experience** → Check if job descriptions use • or - bullet points.
- ✔ **Contact Information Check** → Ensure there’s an email and phone number in the text.

### 2️⃣ **Section Detection (Must-Have Sections)**
Your app can scan the text and check if these key sections exist:
- ✔ **Personal Information** (Name, Email, Phone Number)
- ✔ **Work Experience** (Contains words like "Company," "Job Title," "Years," "Responsibilities")
- ✔ **Education** (Detect words like "Degree," "University," "Graduation Year")
- ✔ **Skills Section** (Looks for words like "Skills," "Technologies," "Tools")

If any section is missing, your app will alert the user!

### 3️⃣ **Job Matching Checks (Keyword Analysis)**
- ✔ **Compare Resume to a Job Description** → Let users paste a job description and check if important keywords exist in the resume.
  - Example: If applying for a "Frontend Developer" role, check if words like "React," "JavaScript," "CSS" appear in the resume.
- ✔ **Highlight missing keywords** and suggest adding them.

### 4️⃣ **Formatting & Readability Checks**
- ✔ **Check for Too Many Paragraphs** → Warn if work experience is written in large paragraphs instead of bullet points.
- ✔ **Check for Excessive Capital Letters** → Avoid all-caps resumes.
- ✔ **Spacing Issues** → Detect if there are too many or too few spaces between sections.

### 5️⃣ **Grammar & Spelling Check (Using a Free API)**
- ✔ **Use a Free API like LanguageTool.org** to check spelling mistakes.
- ✔ **Highlight typos and incorrect grammar** in the resume.

## Technologies Used

- **React** - Frontend framework to build the user interface.
- **Tailwind CSS** - For fast and responsive design.
- **LanguageTool API** - For grammar and spelling checks.
- **PDF.js** - For extracting text from PDF files.

## How to Use

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/resume-scanner-app.git
   cd ai-powered-resume-analyzer
2. **Install dependencies:**

    ```bash
    npm install

3. **Run the app:**

    ```bash
    npm start
The app will be available at http://localhost:3000.


## How it Works

1. The user uploads a resume in either a text or PDF format.
2. The app scans the resume and checks for the must-have sections, keyword matches, formatting, and grammar issues.
3. It then displays alerts and suggestions for the user to improve their resume.

## Future Features (Coming Soon!)

- ✔ **PDF Text Extraction** → Extract and analyze resumes directly from PDF files.
- ✔ **Job-Specific Keyword Detection** → Better matching of resume to specific job descriptions based on industry-specific terms.

## Contributing

If you'd like to contribute, feel free to fork the repository, make changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
