
# Two Can Play That Game

Welcome to **Two Can Play That Game**, a resume optimization tool designed to help you craft a resume that beats Applicant Tracking Systems (ATS). This application will assist you in tailoring your resume to job descriptions, ensuring you match keywords and job requirements to enhance your chances of passing initial screenings.

## Instructions

### Setup

1. **Fill in Your Resume:**
   - Begin by navigating to the **Setup** page.
   - Enter all the necessary details about your resume in as much detail as possible.

2. **Add Job Listing:**
   - Head to the **Resume** page via the navigation bar and click **Add Job Listing**.
   - You'll be prompted to enter a LinkedIn job posting URL or select **Custom** to manually paste a job description.

3. **Scan Job Posting (LinkedIn Only):**
   - If you've provided a LinkedIn job link, click **Scan Job Posting** to retrieve the job description.

4. **Generate Resume:**
   - Once the job posting is scanned or manually entered, switch to the **Resume** tab and click **Generate Resume**.
   - The app will automatically tailor your resume based on the job description provided.

5. **Download Your Resume:**
   - After generating the resume, click **Download Word Resume** to save your resume in Word format.

### Save and Load Your Data

- All information is stored locally on your machine using `localStorage`. To save your data for future use, be sure to click **Export** at the top of the page.
- You can also use the **Import** feature to load a previously saved state.

### Requirements

To use this application, you need to generate an API key from OpenAI. Follow these steps to set up your API key:

1. Create a `.env` file in the root of the project.
2. Add your OpenAI API key in the `.env` file: 

   ```
   OPENAI_API_KEY=your-api-key-here
   ```

### Installation

1. Install the necessary dependencies:
   ```bash
   npm install
   ```
   
2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`. The app should load (you might need to refresh the page once due to a minor bug).

## Features

- **Resume Generation**: Tailors your resume to job postings to help you stand out in the ATS.
- **LinkedIn Integration**: Automatically scans job descriptions from LinkedIn.
- **Custom Job Descriptions**: Manually input job descriptions for non-LinkedIn job postings.
- **Downloadable Word Format**: Save your resume in `.docx` format.
- **Export/Import**: Save and load your resume data at any time.
