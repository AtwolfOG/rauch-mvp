import { cn } from "cn";
import { Bell, CircleQuestionMark, CircleStop, Mic, MicOff, Play } from "lucide-react";
import { useEffect, useReducer } from "react";
import { toast } from "sonner";
import {motion} from "motion/react"

interface State {
  isRecording: boolean,
  speechRecognition: SpeechRecognition | null,
  transcript: string[],
  startTime: Date | null,
  time: string,
  isMuted: boolean,
}

export default function Consultation() {
    const [state, dispatch] = useReducer(reducer, {
      isRecording: false,
      isMuted: false,
      speechRecognition: null,
      transcript: ["Hi Eleanor, I'm having some issues with my heart lately."],
      startTime: null,
      time: "00:00",
      isMuted: false,
    });
    const handleClick = () => {
      if(state.isRecording) {
        if(state.speechRecognition) {
          state.speechRecognition.stop();
          dispatch({ type: "STOP_RECORDING" });
        }
      } else {
        const speechRecognition = startTranscript(dispatch);
        if(speechRecognition) {
          dispatch({ type: "START_RECORDING", payload: speechRecognition });
          speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                dispatch({ type: "ADD_TRANSCRIPT", payload: " " + event.results[i][0].transcript });
              }
            }
            
          };
          // handle error
          speechRecognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            toast.error("Speech recognition error detected: " + event.error);
          };
          // handle end
          speechRecognition.onend = () => {
            dispatch({ type: "STOP_RECORDING" });
            toast.success("Speech recognition service disconnected.");
          };
        }
    }
    }

    useEffect(()=>{
      if(state.isRecording && state.startTime) {
        const interval = setInterval(() => {
          const elapsed = Math.floor((new Date().getTime() - state.startTime!.getTime()) / 1000);
          const minutes = Math.floor(elapsed / 60);
          const seconds = elapsed % 60;
          dispatch({ type: "SET_TIME", payload: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` });
        }, 1000);
        return () => clearInterval(interval);
      }
    },[state.isRecording, state.startTime])
    return (
        <div className="flex flex-col">
          <header className="border-b pb-2 max-lg:pr-12">
            <div className="flex flex-wrap justify-between">
              <h3>Consultation {state.isRecording && "Recording"}: Eleanor Vance</h3>
              <div className="flex flew-wrap items-center gap-4">
                <p className="flex gap-1 items-center text-primary! bg-primary/10 p-1 rounded-full text-sm!"><span className="bg-primary size-2 rounded-full animate-pulse"/>live Sync Active</p>
                <p>{new Date().toLocaleDateString()}</p>
                <div>
                  <Bell size={20}/>
                </div>
                <CircleQuestionMark size={20}/>
              </div>
            </div>
          </header>
          <div className="flex flex-col gap-8 w-[90%] max-w-[700px] mx-auto py-24">
              <div className="flex flex-col items-center my-12">
                <div onClick={()=>{dispatch({type: "TOGGLE_MUTED"})}} className={cn("border p-6 my-6 rounded-full cursor-pointer bg-primary/90 hover:bg-primary text-text-inverted transition-all duration-300", state.isMuted? "bg-error/80 hover:bg-error" : "")}>{state.isMuted? <MicOff size={32}/> : <Mic size={32}/>}</div>
                <h2 className="mt-4">{state.time}</h2>
                <p className="text-muted!">{state.isRecording ? "Stop" : "Click to start recording"}</p>
              </div>
              <div className="w-full h-100">
                <div className="py-4 px-1 bg-surface-muted">
                  <h4>LIVE TRANSCRIPT</h4>
                </div>
                <div className="flex flex-col gap-4 h-full bg-surface/80 py-6 px-6 overflow-y-auto">
                  {state.transcript.map((transcript, index) => (
                      <motion.div 
                      initial={{opacity:0, y:50, scale:0.5, transformOrigin: index%2 == 0? "right" : "left"}}
                      animate={{opacity:1, y:0, scale:1}}
                      transition={{duration:0.5, type: "spring", bounce: 0.4}}
                      key={index} className={cn("flex flex-col", index%2 == 0? "ml-auto" : "mr-auto justify-end")}>
                        <h4 className={cn("text-sm",index%2 == 0? "text-right" : "text-left")}>{index%2 == 0 ? "Patient":"Doctor"}</h4>
                        <div>
                          <p className={cn(" border rounded-b-xl p-4", index%2 == 0? "rounded-tl-xl" : "rounded-tr-xl")}>{transcript}</p>
                        </div>
                      </motion.div>
                  ))}

                </div>

              </div>
          </div>
          <div className="flex justify-center items-center mb-12">
              {
                state.isRecording?
                <button className="bg-error/70 text-text-inverted px-4 py-2 rounded-lg flex items-center gap-2" onClick={handleClick}><CircleStop/> Stop</button>:
                <button className="bg-primary text-text-inverted px-4 py-2 rounded-lg flex items-center gap-2" onClick={handleClick}><Play/> Start</button>
              }
          </div>
        </div>
    )
}   

function reducer(state: State, {type, payload}: {type: string, payload: SpeechRecognition | SpeechRecognitionEvent | string | null}) {
  switch (type) {
    case 'START_RECORDING':{
      const newState = {...state, isRecording: true, speechRecognition: payload, startTime: new Date()}
      return newState;
    }
    case 'STOP_RECORDING':{
      const newState = {...state, isRecording: false, speechRecognition: null, startTime: null, time: "00:00"}
      return newState;
    }
    case 'ADD_TRANSCRIPT':{
      console.log("hit")
      payload = (payload as string).trim();
      if (!payload) return state;
      if (state.transcript.length <= 0){
        const newState = {...state, transcript: [payload as string]}
        return newState;
      }
      const lastTranscript = state.transcript[state.transcript.length - 1]
      
      if (lastTranscript && lastTranscript.endsWith(payload as string)) {
        const newState = state
        return newState
      }
      if (lastTranscript.split(" ").length < 4){
        const newState = { ...state, transcript: [...state.transcript.slice(0, -1), `${lastTranscript} ${payload as string}`] };
        return newState;
      }
      const newState = {...state, transcript: [...state.transcript, payload as string]}
      return newState;
    }
    case 'SET_RECORDING':{
      const newState = {...state, recording: payload}
      return newState;
    }
    case 'SET_TIME':{
      const newState = {...state, time: payload}
      return newState;
    }
    case 'TOGGLE_MUTED':{
      const newState = {...state, isMuted: !state.isMuted}
      return newState;
    }
    default:
      return state;
  }
}

function startTranscript(dispatch: (action: {type: string, payload: SpeechRecognition | string | null}) => void) {
  try {
    // 1. Initialize API with fallback for Safari
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Web Speech API is not supported in this browser.");
      return null;
    } else {
      const recognition = new SpeechRecognition();
      dispatch({ type: "SET_SPEECH_RECOGNITION", payload: recognition });
      // 2. Configure Settings
      recognition.continuous = true;          // Keep listening after user pauses
      recognition.lang = 'en-US';              // Set transcription language

      recognition.onstart = () => {
        toast.success("Voice recognition active. Speak into the microphone.");
      };


      // 4. Control Recording
      recognition.start();
      return recognition;
      // To stop:  recognition.stop();
    }
  } catch (error) {
    toast.error("Error starting speech recognition: " + error);
    return null;
  }

}
