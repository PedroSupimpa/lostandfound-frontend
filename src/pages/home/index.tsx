import ItemsListContainer from "@/components/ItemsListContainer";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {t("app.name")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("app.description")}
          </p>
        </div>

        <ItemsListContainer />
      </div>
    </div>
  );
};

export default Home;
