import { TabSwitchT } from "../../../common/interfaces/TabSwitchT";
import { DiagnoseCarouselImg } from "../components/diagnoseCarouselImg";
import { DiagnoseDamageRanges } from "../components/diagnoseDamageRanges";
import { DiagnoseJsonTable } from "../components/diagnoseJsonTable";
import { DiagnosePersonTrees } from "../components/diagnosePersonTrees";
import { DiagnosePollutionDrawer } from "../components/diagnosePollutionDrawer";
import { LanguageT } from "../../../common/interfaces/LanguageT";
import { DiagnoseAudio } from "../components/diagnoseAudio";

export const diagnoseTab = (lang: LanguageT): TabSwitchT[] => {
  return [
    {
      title: lang.table.appeal,
      component: (
        <DiagnoseJsonTable
          hide={[
            "name",
            "tranid",
            "formid",
            "formname",
            "id",
            "createdAt",
            "updatedAt",
            "stage",
            "audio_comment",
          ]}
          labels={{
            birthdate: lang.table.birthday,
            location: lang.table.place,
            illnesses: lang.table.diseases,
            health_state: lang.table.state_health,
            aims: lang.table.goals,
            hebits: lang.table.habits,
            about_photos: lang.table.photo_description,
            phone: lang.table.phone,
            med_files: lang.table.medical_documents,
            photos: lang.table.photos,
            type: lang.table.type,
            radio: lang.table.communication_method,
            email: lang.table.email,
          }}
        />
      ),
    },
    {
      title: lang.table.photo,
      component: <DiagnoseCarouselImg />,
    },
    {
      title: lang.table.spheres_life,
      component: <DiagnoseDamageRanges />,
    },
    {
      title: lang.table.kaphi,
      component: <DiagnosePollutionDrawer />,
    },
    {
      title: lang.table.tree,
      component: <DiagnosePersonTrees />,
    },
    {
      title: lang.table.voice_comments,
      component: <DiagnoseAudio />,
    },
  ];
};
