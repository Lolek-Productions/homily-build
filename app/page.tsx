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
