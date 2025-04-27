import { Card } from "@/components/ui/card"
import { TeamMember } from "@/components/team-member"
import { generateAboutPageSchema } from "@/lib/schema-utils";
import Script from "next/script";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - CavCount",
  description: "Learn about CavCount, a free OCR word and sentence counter, its origins as a student project, and its developer, Leo.",
  alternates: {
    canonical: "https://cavcount.app/about",
  },
}

// Pre-generate the schema at build time
const schemas = generateAboutPageSchema();

export default function AboutPage() {
  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={`about-schema-${index}`}
          id={`about-schema-${index}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          data-cfasync="false"
        />
      ))}

      <div className="container py-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight">About Us</h1>
          </div>

          <Card className="mb-8 p-6">
            <p className="mb-4 text-lg">
              CavCount was originally a research project done in senior high school. It was developed from scratch and has been updated with new features each time. I am Leo, one of the creators of this app, and I decided to continue CavCount as a free online app because it will be helpful for other students, me, and other professionals.
            </p>

            <p className="mb-4 text-lg">
              CavCount has an OCR function that enables you to upload images of texts, and it will convert them to text. The app can instantly count words and sentences. The best thing about it is that it is free and has no advertisements.
            </p>

            <p className="mb-4 text-lg">
              The application, "CavCount," comes from the name of the province of Cavite, and this application is for all Caviteños. We also thank all users from other provinces and countries who use our app and find it helpful.
            </p>
          </Card>

          <div className="mb-8">
            <h2 className="mb-6 text-2xl font-semibold">Team Members</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <TeamMember
                name="Leo"
                roleDescription="Developer & Maintainer"
                avatarIndex={1}
                primaryContributor={true}
              />
              <TeamMember
                name="Allen M."
                roleDescription="Developer"
                avatarIndex={2}
              />
              <TeamMember
                name="Mark Allen"
                roleDescription="Developer"
                avatarIndex={3}
              />
              <TeamMember
                name="Moises"
                roleDescription="Developer"
                avatarIndex={4}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
