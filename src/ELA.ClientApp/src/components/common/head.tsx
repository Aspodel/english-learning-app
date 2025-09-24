type HeadProps = {
  title?: string;
  description?: string;
};
export const Head = ({ title = '', description = '' }: HeadProps) => {
  const defaultTitle = 'ELA';
  const defaultDescription =
    'ELA is a language learning app designed to help you improve your skills through engaging and effective practice.';

  return (
    <>
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
      <meta name='description' content={description || defaultDescription} />
    </>
  );
};
