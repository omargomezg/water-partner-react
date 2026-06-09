type Props = {
  url?: string;
  name?: string;
  icon?: string;
};
export const SocialNetworkLinkComponent: React.FC<Props> = ({ url, name, icon }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {name}
    </a>
  );
};
