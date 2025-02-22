import { useState } from 'react';
import './App.css';

/*api key wqCXaympF5PiR1DyLN37n2y8Fbf6BFoOoTq4bobW */

function App() {
  const [mesg, setMesg] = useState('');
  const [textContent, setTextContent] = useState('');
  const [calssify,setClassify] = useState('----');

  const uploadFile = async e => {
    setMesg("");
    setTextContent('');
    const file = e.target.files[0];
    console.log(file);

    if (!file) {
      setMesg("No file selected. Please choose a file");
      return;
    }

    if (!file.type.startsWith('text') && !file.type.startsWith('application')) {
      setMesg('Unsupported file type. Please select a text file');
      return;
    }

    setMesg('wait.....');

    if(file.type.startsWith('text')){
      const reader = new FileReader();
      reader.onload = async () => {
        setTextContent(reader.result)
        const result = await analyzeQuality(reader.result);
        if (result) {
          setClassify(result.label);
        } // Display the text content
        // Display the extracted text
        
      };
      reader.onerror = () => {
        setMesg("Error reading the file. Please try again.");
      };
      reader.readAsText(file);
    }

    if(file.type.startsWith('application')){
      try {
        const extractedText = await extractTextFromPDF(file);
        setTextContent(extractedText)
        const result = await analyzeQuality(extractedText);
        if (result) {
          setClassify(result);
        }// Display the extracted text
      } catch (error) {
        setMesg("Error reading the PDF file. Please try again.");
        console.error(error);
      }
    }

  }



async function extractTextFromPDF(file) {
  const fileURL = URL.createObjectURL(file);
  const pdf = await window.pdfjsLib.getDocument(fileURL).promise;
  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    fullText += textContent.items.map(item => item.str).join(" ");
  }

  URL.revokeObjectURL(fileURL); // Clean up
  return fullText;
}


// api 
async function analyzeQuality(text) {
  const apiKey = "wqCXaympF5PiR1DyLN37n2y8Fbf6BFoOoTq4bobW";
  try {
    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command", // Use the "command" model
        prompt: `Analyze the quality of the following text and provide feedback. Also, suggest improvements:\n\n${text}`,
        max_tokens: 500, // Increased to allow for longer feedback
        temperature: 0.7, // Controls creativity (0 = strict, 1 = creative)
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log("API Response:", result); // Log the response

    if (!result.generations || result.generations.length === 0) {
      throw new Error("No generations found in the response.");
    }

    // Format the feedback
    const feedback = result.generations[0].text;
    const formattedFeedback = formatFeedback(feedback);
    return formattedFeedback;
  } catch (error) {
    console.error("Error in analyzeQuality:", error);
    throw error;
  }
}

function formatFeedback(feedback) {
  // Split the feedback into sections
  const qualityAnalysis = feedback.match(/Feedback: (.*?)(?=Suggestions:|$)/s)?.[1]?.trim();
  const suggestions = feedback.match(/Suggestions: (.*)/s)?.[1]?.trim();

  // Format the feedback
  let formattedFeedback = "";
  if (qualityAnalysis) {
    formattedFeedback += `**Quality Analysis:**\n${qualityAnalysis}\n\n`;
  }
  if (suggestions) {
    formattedFeedback += `**Suggestions for Improvement:**\n${suggestions}\n\n`;
  }

  // If no sections are found, return the original feedback
  return formattedFeedback || feedback;
}

return (
  <div className="App">

    <div>
      <input onChange={uploadFile} type="file" />
      <h4>{mesg}</h4>
      <hr />
      <p>{textContent}</p>


    </div>
    <hr/>
    <table border={1}>
      <thead>
      <tr>
          <th>Classify</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <pre>{calssify}</pre>
          <td></td>
          <td></td>
        </tr>
        <tr>
        <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr></tr>
        <tr></tr>
      </tbody>
    </table>

  </div>
);
}

export default App;
