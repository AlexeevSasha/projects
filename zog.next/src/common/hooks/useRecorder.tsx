import { useCallback, useEffect, useState } from "react";

const requestRecorder = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
};

export const useRecorder = () => {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  useEffect(() => {
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    const handleData = (e: BlobEvent) => {
      setAudioBlob(e.data);
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = useCallback(() => {
    audioBlob && setAudioBlob(null);
    setIsRecording(true);
  }, [audioBlob]);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
  }, []);

  return { audioBlob, isRecording, startRecording, stopRecording };
};
