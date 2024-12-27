import React, { useRef, useCallback, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Video } from 'lucide-react';
import { useExamStore } from '../store/examStore';

const ProctorCamera: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const { isExamActive } = useExamStore();

  const videoConstraints = {
    width: 256,
    height: 144,
    facingMode: "user",
    aspectRatio: 16/9
  };

  const handleUserMedia = useCallback((stream: MediaStream) => {
    console.log('Camera access granted');
    try {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      if (isExamActive && !isRecording) {
        mediaRecorderRef.current.start();
        setIsRecording(true);
      }
    } catch (error) {
      console.error('MediaRecorder error:', error);
      setCameraError('Failed to initialize recording');
    }
  }, [isExamActive, isRecording]);

  const handleCameraError = useCallback((error: string | DOMException) => {
    console.error('Camera error:', error);
    setCameraError('Failed to access camera');
  }, []);

  // Initialize camera when exam becomes active
  useEffect(() => {
    if (isExamActive && webcamRef.current && !webcamRef.current.stream) {
      navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: false })
        .then(stream => {
          if (webcamRef.current && webcamRef.current.video) {
            webcamRef.current.video.srcObject = stream;
          }
        })
        .catch(error => {
          console.error('Camera initialization error:', error);
          setCameraError('Failed to access camera');
        });
    }
  }, [isExamActive]);

  useEffect(() => {
    console.log('Exam active status:', isExamActive);
  }, [isExamActive]);

  if (!isExamActive) return null;

  return (
    <div className="fixed top-4 right-4 w-64 z-50">
      <div className="relative">
        <Webcam
          ref={webcamRef}
          audio={false}
          className="rounded-lg shadow-lg w-full"
          onUserMedia={handleUserMedia}
          onUserMediaError={handleCameraError}
          mirrored={true}
          videoConstraints={videoConstraints}
        />
        {isRecording && (
          <div className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full animate-pulse">
            <Video className="w-4 h-4" />
          </div>
        )}
        {cameraError && (
          <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-2 text-sm text-center">
            {cameraError}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProctorCamera;