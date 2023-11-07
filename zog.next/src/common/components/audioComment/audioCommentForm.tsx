import { MicrophoneIcon, PauseIcon } from "@heroicons/react/24/solid";
import { useRecorder } from "../../hooks/useRecorder";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";
import { toast } from "react-toastify";

interface IProps {
  onSubmit: (blob: Blob) => void;
  onClose: () => void;
}

const checkMicro = async () => {
  return await navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(() => true)
    .catch(() => false);
};

export const AudioCommentForm = ({ onSubmit, onClose }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);

  const { startRecording, stopRecording, isRecording, audioBlob } = useRecorder();

  const onClick = async () => {
    const check = await checkMicro();
    if (!check) {
      toast.error("Дайте доступ к микрофону");
      return;
    }
    isRecording ? stopRecording() : startRecording();
  };

  return (
    <div className={"p-4"}>
      <div className={"mt-5 flex flex-col items-center justify-center"}>
        {!audioBlob ? (
          <div
            onClick={onClick}
            style={{ padding: "10px" }}
            className={"h-16 w-16 cursor-pointer rounded-full bg-red-600"}
          >
            {isRecording ? (
              <PauseIcon className={"fill-white"} />
            ) : (
              <MicrophoneIcon className={"fill-white"} />
            )}
          </div>
        ) : (
          <div>
            <span
              onClick={onClick}
              className={"mr-2 cursor-pointer text-sm font-bold text-red-600"}
            >
              {lang.modal.application.add_new_audio}
            </span>
            * {lang.modal.application.delete_old}
          </div>
        )}
        {isRecording && <div className={"mt-2"}>{lang.modal.application.audio_starting} ... </div>}
      </div>

      {audioBlob && !isRecording && (
        <div className={"mt-6 flex justify-center"}>
          <audio controls src={URL.createObjectURL(audioBlob)} />
        </div>
      )}
      <div className="mt-10 flex items-center justify-end rounded-b border-t border-solid border-slate-200 pt-6 pl-6 pr-6">
        <button
          onClick={onClose}
          className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
          type="button"
        >
          {lang.common.cancel}
        </button>
        <button
          onClick={() => onSubmit(audioBlob as Blob)}
          className={`mr-1 mb-1 rounded bg-blue-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600 ${
            audioBlob ? "" : "pointer-events-none bg-gray-400"
          }`}
          type="submit"
        >
          {lang.common.add}
        </button>
      </div>
    </div>
  );
};
