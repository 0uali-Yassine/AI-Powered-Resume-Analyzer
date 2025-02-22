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
          <code>{calssify}</code>
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
