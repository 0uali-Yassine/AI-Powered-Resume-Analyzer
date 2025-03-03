import { useState } from 'react';
import './App.css';

function App() {
  // State variables to hold various pieces of information
  const [message, setMessage] = useState('');
  const [textContent, setTextContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [longSentences, setLongSentences] = useState([]);

  // Function to handle file upload
  const uploadFile = async (e) => {
    setMessage('');
    setTextContent('');
    const file = e.target.files[0];
    if (!file) {
      setMessage("No file selected. Please choose a file");
      return;
    }
    
    // Check if the file type is supported
    if (!file.type.startsWith('text') && !file.type.startsWith('application')) {
      setMessage('Unsupported file type. Please select a text or PDF file');
      return;
    }

    setMessage('Loading...');

    // Read the file based on its type
    if (file.type.startsWith('text')) {
      readTextFile(file);
    } else if (file.type.startsWith('application')) {
      await readPdfFile(file);
    }
  };

  // Function to read text files
  const readTextFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setTextContent(reader.result);
      const wordCountArray = reader.result.split(' ').filter(Boolean);
      setWordCount(wordCountArray.length);
      checkSentences(reader.result);
    };
    reader.onerror = () => setMessage("Error reading the file. Please try again.");
    reader.readAsText(file);
  };

  // Function to read PDF files
  const readPdfFile = async (file) => {
    try {
      const extractedText = await extractTextFromPDF(file);
      setTextContent(extractedText);
      const wordCountArray = extractedText.split(' ').filter(Boolean);
      setWordCount(wordCountArray.length);
      checkSentences(extractedText);
    } catch (error) {
      setMessage("Error reading the PDF file. Please try again.");
      console.error(error);
    }
  };

  // Function to check for long sentences
  const checkSentences = (text) => {
    const longSentences = findLongSentences(text, 30);
    setLongSentences(longSentences);
    if (longSentences.length > 0) {
      setMessage("Some sentences exceed 30 words. Please review them.");
    } else {
      setMessage("All sentences are within the 30-word limit.");
    }
  };

  // Function to find sentences longer than a specified number of words
  const findLongSentences = (text, maxWords) => {
    const sentences = text.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s+/);
    return sentences.filter(sentence => sentence.split(/\s+/).length > maxWords);
  };

  // Function to extract text from PDF files
  const extractTextFromPDF = async (file) => {
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
  };

  return (
    <div className="App container mt-5">
      <h1 className="text-center mb-4">File Upload & Text Analysis</h1>
      
      <div className="mb-3">
        <input 
          onChange={uploadFile} 
          type="file" 
          className="form-control" 
        />
      </div>

      {message && (
        <div className="alert alert-info">
          <h4>{message}</h4>
        </div>
      )}

      <hr />

      {textContent && (
        <div>
          <h5>Extracted Content</h5>
          <pre className="border p-3">{textContent}</pre>
        </div>
      )}

      <hr />

      <h5>Text Analysis</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>✅ Check</th>
            <th>❌ Problem</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Word Count:</td>
            <td>{wordCount}</td>
          </tr>
          <tr>
            <td>Sentences exceeding 30 words:</td>
            <td>{longSentences.length > 0 ? 'Yes' : 'No'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
