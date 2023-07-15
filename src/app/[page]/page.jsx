import { getPage, getPages } from '@/helpers/sanity';
import MainImage from '@/components/Images/MainImage';
import Sections from '@/components/Sections/Sections';
import PageLayout from '@/components/PageLayout/PageLayout';
import styles from './page.module.scss';

export const generateStaticParams = async () => {
  const pages = await getPages();
  return pages.filter(({ status }) => status === 'available').map(({ slug }) => ({ page: slug }));
};

const Page = async ({ params }) => {
  const page = await getPage(params.page, 'no') || {};
  const { title, mainImage, sections } = page;

  return (
    <PageLayout pageName={params.page === 'index' ? '/' : `/${params.page}`}>
      {
        mainImage?.asset?._ref
          ? <MainImage image={mainImage} title={title} />
          : <h1 className={styles.pageTitle}>{title}</h1>
      }
      <Sections sections={sections} />
    </PageLayout>
  );
};

export default Page;
