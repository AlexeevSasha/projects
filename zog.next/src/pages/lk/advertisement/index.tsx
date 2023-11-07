import { Layout } from "../../../modules/layout/components/layout";

export default function LKPage() {
  return (
    <div style={{ width: "75vw", height: "90vh" }}>
      <iframe className="h-full w-full" src="https://consultation.torsunov.ru" />
    </div>
  );
}

LKPage.getLayout = Layout.Auth;
LKPage.auth = true;
