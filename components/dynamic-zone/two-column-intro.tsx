import { Container } from "@/components/container";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export const TwoColumnIntro = ({
  Heading,
  Content,
  layout = "BigHeading",
}: {
  Heading: string;
  Content: any;
  layout?: "BigHeading" | "SmallHeading" | "NoHeading";
}) => {
  return (
    <Container className={`flex flex-col md:flex-row ${layout === "SmallHeading" ? "items-start" : "items-center"} ${layout === "NoHeading" ? "xl:max-w-[800px] xl:mx-auto px-5 md:px-5 xl:px-0" : "px-5 md:px-10 xl:px-25"} justify-between mt-25 mb-20 gap-10 lg:gap-25`}>
      {Heading && (
      <h2
        className={
          layout === "SmallHeading"
            ? "font-semibold text-xl leading-snug text-secondary md:w-1/2 text-center md:text-left"
            : "font-bold text-[34px] md:text-5xl leading-snug text-secondary md:w-1/2 text-center md:text-left"
        }
      >
        {Heading}
      </h2>
      )}
      <div className={`intro ${layout === "SmallHeading" ? "text-xl" : "text-base"} text-gray-500 ${layout === "NoHeading" ? "md:w-full text-center" : "md:w-1/2 text-center md:text-left"}`}>
        <BlocksRenderer content={Content} />
      </div>
    </Container>
  );
};
