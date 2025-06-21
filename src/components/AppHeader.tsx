
import DynamicHeader from "./DynamicHeader";

interface AppHeaderProps {
  onMenuClick?: () => void;
  appLogo?: string;
}

const AppHeader = ({ onMenuClick, appLogo }: AppHeaderProps) => {
  return <DynamicHeader onMenuClick={onMenuClick} appLogo={appLogo} />;
};

export default AppHeader;
