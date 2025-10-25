import { useState, useRef } from 'react';

function VoiceInput({ onTranscriptionComplete }) {
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);
      console.log("Opptak startet");
    } catch (err) {
      console.error('Mikrofon-tilgang nektet:', err);
      alert('Kunne ikke få tilgang til mikrofon. Sjekk nettleserinnstillinger.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      console.log("Opptak stoppet");
    }
  };

  const transcribeAudio = async (audioBlob) => {
    setProcessing(true);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      
      reader.onloadend = async () => {
        const base64Audio = reader.result;

        console.log("Sender lyd til transkripsjon...");

        const res = await fetch('http://localhost:3001/api/transcribe-audio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ audioBase64: base64Audio })
        });

        const data = await res.json();
        
        if (data.text) {
          console.log("Transkribert tekst:", data.text);
          onTranscriptionComplete(data.text);
        } else {
          alert('Kunne ikke transkribere lyd');
        }
      };
    } catch (err) {
      console.error('Feil:', err);
      alert('Noe gikk galt ved transkripsjon');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="text-center my-4">
      {!recording && !processing && (
        <button 
          className="btn btn-primary btn-lg"
          onClick={startRecording}
        >
          🎤 Snakk inn ingredienser
        </button>
      )}

      {recording && (
        <div>
          <div className="mb-3">
            <span className="badge bg-danger fs-5">🔴 Tar opp...</span>
          </div>
          <button 
            className="btn btn-danger btn-lg"
            onClick={stopRecording}
          >
            ⏹️ Stopp opptak
          </button>
        </div>
      )}

      {processing && (
        <div className="alert alert-info">
          Transkriberer tale med Whisper AI...
        </div>
      )}
    </div>
  );
}

export default VoiceInput;