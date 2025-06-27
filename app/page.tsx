import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  Globe,
  Heart
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <PublicHeader currentPath="/" />
      <div className="flex flex-col">

          {/* Hero Section */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-300 dark:from-blue-950 dark:to-indigo-500 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Create Meaningful Homilies
                  <span className="block text-primary">For Every Context</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  The comprehensive platform for Catholic preachers to create contextual, high-quality homilies efficiently
                  across different audiences and settings.
                </p>
                <div className="w-full max-w-2xl mx-auto mb-8">
                  <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full border-0"
                      src="https://www.youtube.com/embed/Dvzzds2S7wY" 
                      title="Homily Builder Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                
                <div className="flex justify-center mt-6">
                  <Link href="/auth/sign-up">
                    <Button size="lg" className="w-full">
                      Create Your Free Account
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
                {/* <p className="text-sm text-gray-500 mt-4">Free trial • No credit card required</p> */}
              </div>
            </div>
          </section>

          {/* Workflow Section */}
          <section className="py-16 sm:py-24 bg-muted/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Simple 6-Step Workflow</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Transform your homily preparation with our streamlined process: from selecting readings and defining key themes to crafting engaging questions and finalizing your message—all designed to help you create meaningful, contextual homilies efficiently.
                </p>
                <Link href="/how-it-works">
                  <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                    See How It Works
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>           
            </div>
          </section>

          {/* Testimonial Section */}
          <section className="py-16 sm:py-24 bg-background border-y border-border">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative">
                <svg
                  className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-primary/20"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.68968 8.45999C7.15998 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9163 8.45999C14.3866 8.93999 14.6242 9.55333 14.6242 10.3Z"
                    fill="currentColor"
                  />
                </svg>
                
                <blockquote className="relative z-10">
                  <div className="text-lg sm:text-xl font-medium text-foreground italic">
                    <p>
                      "This is brilliant! At first I was skeptical, and was concerned that AI would eliminate the need for higher level thinking, and not leave room for the Holy Spirit to speak to the writer. I love the use of the questions requiring answers that have to be formulated—the helpmate doesn't work without it! The questions prompt the user for insights gleaned and stories and this ensures no two homilies will ever be the same!"
                    </p>
                  </div>
                  <footer className="mt-8">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 overflow-hidden rounded-full bg-primary/10 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <div className="text-base font-medium text-foreground">Dr. Sandy Miles</div>
                        <div className="text-sm text-muted-foreground">Former Hutchens Distinguished Professor at Murray State University</div>
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          </section>

          {/* Philosophical Quote Section */}
          <section className="py-16 sm:py-20 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-xl sm:text-2xl font-medium text-foreground mb-4">
                "The humans have to notice the divine. The machine can help craft and formulate what the human noticed."
              </p>
              <p className="text-base text-muted-foreground">
                — Fr. Josh McCarty, Founder of Homily.build
              </p>
            </div>
          </section>

          {/* Multi-Context Section */}
          <section className="py-16 sm:py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Designed to Fit your Audience</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Many priests serve diverse congregations. With Homily Build, you can quickly create different homilies for the same weekend. Changing a few parameters will enable you to speak to each community&apos;s unique needs and cultural context.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-card p-6 rounded-lg border">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Multilingual Support</h3>
                  </div>
                  <p className="text-card-foreground/80">Create homilies for English and Spanish-speaking communities with ease.</p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Diverse Audiences</h3>
                  </div>
                  <p className="text-card-foreground/80">Tailor your message for student masses, parish communities, and more.</p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Special Occasions</h3>
                  </div>
                  <p className="text-card-foreground/80">Perfect for weddings, funerals, and other special celebrations.</p>
                </div>
              </div>
            </div>
          </section>

        {/* Footer */}
        <PublicFooter />
      </div>
    </main>
  );
}
