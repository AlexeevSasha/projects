import { MicrophoneIcon } from "@heroicons/react/24/solid";
import { useCallback, useState } from "react";
import { Modal } from "../modal/modal";
import { AudioCommentForm } from "./audioCommentForm";
import { addAudio } from "../../../api/order";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

interface IProps {
  id: string;
  currentAudio: string;
}

export const AudioComment = ({ id, currentAudio }: IProps) => {
  const { locale } = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const onClose = useCallback(() => setShowModal(false), []);

  const onSubmit = async (blob: Blob) => {
    setLoading(true);
    await addAudio(blob, id, currentAudio);
    window.location.reload();
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className={"h-5 w-5 text-gray-400 transition-colors hover:text-orange-500"}
      >
        <MicrophoneIcon />
      </button>

      {showModal && (
        <Modal
          loading={loading}
          title={getLanguage(locale).modal.application.recording_audio}
          content={<AudioCommentForm onClose={onClose} onSubmit={onSubmit} />}
          outsideClick={onClose}
          classNames={"max-w-md"}
        />
      )}
    </div>
  );
};
